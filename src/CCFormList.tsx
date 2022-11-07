/**
 *
 * @author wxik
 * @sine 2020-04-20 11:27
 */
import React from 'react';
import {CCForm} from './CCForm';
import {Tools, Types} from '@wxik/core';
import type {CCFormContextValue} from './CCForm';

export interface CCFormListProps {
  form: string;
  initRows?: number;
  initialValue?: Array<any>;
  eachConfig?: CCFormListConfig;
  children: (props: CCFormListRow) => React.ReactNode;
}

interface CCFormListState {
  keys: string[]; // 存储的值
  data: any[];
}

export interface CCFormListRef extends React.Component {
  initState: () => CCFormListState;
  removeOutData: (size: number) => void;
  setData: (data?: any[]) => void;
  getData: () => any[];
  deleteIndex: number[];

  get config(): {
    form: string;
    fieldType: number;
  };
}

export interface CCFormListRow extends CCFormListConfig {
  target: CCFormListRef;
}

export interface CCFormListConfig {
  form: string;
  index: number;
  key: string;
  length: number;
  data: any[];
}

export const CCFormListContext = React.createContext<CCFormListConfig | null>(null);

class CCFormListComponentWrapper extends React.Component<CCFormListProps, CCFormListState> {
  declare context: React.ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    initRows: 1,
  };

  deleteIndex: number[] = [];
  uuid: number = 0;

  constructor(props: CCFormListProps, context: any) {
    super(props, context);
    let that = this;
    that.genID = that.genID.bind(that);
    that.addItem = that.addItem.bind(that);
    that.removeItem = that.removeItem.bind(that);
    that.state = that.initState();
  }

  initState() {
    let that = this,
      props = that.props,
      context = that.context as CCFormContextValue;
    that._initID();
    let {initRows, initialValue} = props;

    const form = this.getFormName(props);

    if (context && context.initialValue) {
      if (!Types.isBlank(form)) {
        initialValue = Tools.get(context.initialValue, form, initialValue);
      } else if (Array.isArray(context.initialValue)) {
        initialValue = context.initialValue;
      }
    }

    let data = Array(initRows);
    const values = initialValue as any[];
    if (Types.isArray(initialValue) && values.length) {
      initRows = values.length;
      data = values;
    }

    const keys = Array(initRows).fill(1).map(this.genID);
    return {keys, data};
  }

  _initID() {
    this.uuid = 1000;
  }

  genID() {
    return `CC${++this.uuid}`;
  }

  getFormName(props: CCFormListProps) {
    const {form, eachConfig} = props;
    return eachConfig ? (form ? `${eachConfig.form}.${form}` : eachConfig.form) : form;
  }

  setData(data: any[]) {
    const {initRows} = this.props;
    if (Types.isEmpty(data) || !Types.isArray(data)) {
      data = [];
    } else if (data.length === 0) {
      data = Array(initRows);
    }
    //TODO 如果初始化 id 会导致之前的数据不刷新
    // this._initID();
    this.removeOutData(data.length);
    const keys = Array.from(data).fill(1).map(this.genID);
    this.setState({keys, data});
  }

  getData() {
    return this.state.data;
  }

  addItem(item = {}) {
    let that = this;
    let {data, keys} = that.state;
    keys = Array.from(keys);
    keys.push(that.genID());
    data.push(item);
    that.setState({keys, data});
    (that.context as CCFormContextValue)?.formChange();
  }

  removeItem(index: number) {
    let that = this;
    that.deleteIndex.push(index);
    that.removeListEndData();
    let {data, keys} = that.state;

    keys = Array.from(keys);
    keys.splice(index, 1);
    data.splice(index, 1);
    that.setState({keys, data});
  }

  removeListEndData() {
    const form = this.getFormName(this.props);
    const {keys} = this.state;
    const key = keys.length - 1;
    const pad = form ? `${form}.${key}` : String(key);

    const {data, deleteField} = this.context as CCFormContextValue;

    Object.keys(data).forEach((fi) => {
      if (fi.indexOf(pad) === 0) {
        deleteField(fi, {raw: true});
      }
    });
  }

  /**
   * 删除不存在的行数据
   * @param {Number} size 存在行数量
   */
  removeOutData(size: number) {
    const form = this.getFormName(this.props);
    const {data, deleteField} = this.context as CCFormContextValue;
    const inForms = form
      ? Array(size)
          .fill(1)
          .map((d, ix) => `${form}.${ix}`)
      : [];

    Object.keys(data).forEach((fi) => {
      if (Types.isBlank(form)) {
        let nfi = Number(fi);
        let ois = fi.substr(0, fi.indexOf('.'));
        if (String(nfi) === fi && nfi < size) {
          deleteField(fi, {isChange: false});
        } else if (/^[0-9]+$/.test(ois) && Number(ois) >= size) {
          deleteField(fi, {isChange: false});
        }
      } else if (fi.indexOf(form) === 0 && inForms.findIndex((da) => fi.indexOf(da) !== -1) === -1) {
        deleteField(fi, {isChange: false});
      }
    });
  }

  get config() {
    const form = this.getFormName(this.props);
    return {form, fieldType: CCForm.Const.List};
  }

  componentDidMount() {
    (this.context as CCFormContextValue).setField(this as CCFormListRef);
  }

  componentWillUnmount() {
    (this.context as CCFormContextValue)?.unmountField(this as CCFormListRef);
  }

  shouldComponentUpdate(nextProps: CCFormListProps, nextState: CCFormListState) {
    return nextState.keys !== this.state.keys;
  }

  render() {
    const that = this;
    const form = this.getFormName(this.props);
    const {children} = that.props;
    const {keys, data} = that.state;

    if (!children) return null;
    return Array.isArray(keys)
      ? keys.map((key, index) => {
          const pro: CCFormListConfig = {
            form: Types.isBlank(form) ? String(index) : `${form}.${index}`,
            index,
            key,
            length: keys.length,
            data,
          };
          const cfg: CCFormListRow = {
            ...pro,
            target: that as CCFormListRef,
          };
          return (
            <CCFormListContext.Provider value={pro} key={key}>
              {children(cfg)}
            </CCFormListContext.Provider>
          );
        })
      : null;
  }
}

export const CCFormList = React.forwardRef<CCFormListComponentWrapper, CCFormListProps>((props, ref) => (
  <CCFormListContext.Consumer>
    {(eachData) => {
      let {form, initialValue, children} = props;
      const listData = eachData as CCFormListConfig;
      if (listData) {
        const item = listData.data[listData.index];
        initialValue = form ? (Types.isObject(item) && form in item ? item[form] : initialValue) : item;
      }
      return (
        <CCFormListComponentWrapper
          {...props}
          ref={ref}
          initialValue={initialValue}
          eachConfig={listData}
          children={children}
        />
      );
    }}
  </CCFormListContext.Consumer>
));
