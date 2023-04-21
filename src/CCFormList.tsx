/**
 *
 * @author Quia
 * @sine 2020-04-20 11:27
 */
import React from 'react';

import type {CCFormContextValue} from './CCForm';
import {CCFieldEnum, CCForm} from './CCForm';
import {Tools, Types} from './helper';

interface CCFormListProps {
  form: string;
  initRows?: number;
  initialValue?: Array<any>;
  eachConfig?: CCFormListConfig;
  children: (props: CCFormListConfig) => React.ReactNode;
}

interface CCFormListState {
  keys: string[]; // 存储的值
  data: any[];
}

export interface CCFormListConfig {
  form: string;
  index: number;
  key: string;
  length: number;
  data: any[];
  remove: () => void;
  add: (item?: Record<any, any>) => void;
}

export const CCFormListContext = React.createContext<CCFormListConfig | null>(null);

export class CCFormListWrapper extends React.Component<CCFormListProps, CCFormListState> {
  declare context: React.ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    initRows: 1,
  };

  deleteIndex: number[] = [];
  private uuid: number = 0;
  public fieldType = CCFieldEnum.List;

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

    const formName = this.getFormName(props);

    if (context && context.initialValue) {
      if (!Types.isBlank(formName)) {
        initialValue = Tools.get(context.initialValue, formName, initialValue);
      } else if (Array.isArray(context.initialValue)) {
        initialValue = context.initialValue;
      }
    }

    let data = Array(initRows);
    const values = initialValue as any[];
    if (Array.isArray(initialValue) && values.length) {
      initRows = values.length;
      data = values;
    }

    const keys = Array(initRows).fill(1).map(this.genID);
    return {keys, data};
  }

  private _initID() {
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
    if (Types.isEmpty(data) || !Array.isArray(data)) {
      data = [];
    } else if (data.length === 0) {
      data = Array(initRows);
    }
    // 如果初始化 id 会导致之前的数据不刷新
    // this._initID();
    this.removeOutData(data.length);
    const keys = Array.from(data).fill(1).map(this.genID);
    this.setState({keys, data});
  }

  getData() {
    return this.state.data;
  }

  addItem(item?: Record<any, any>) {
    let that = this;
    let {data, keys} = that.state;
    keys = Array.from(keys);
    keys.push(that.genID());
    data.push(item);
    that.setState({keys, data});
    that.context?.form.onFormChange();
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

  private removeListEndData() {
    const formName = this.getFormName(this.props);
    const {keys} = this.state;
    const key = keys.length - 1;
    const pad = formName ? `${formName}.${key}` : String(key);

    const {data, form} = this.context!;

    Object.keys(data).forEach((fi) => {
      if (fi.indexOf(pad) === 0) {
        form.onDeleteField(fi);
      }
    });
  }

  /**
   * 删除不存在的行数据
   * @param {Number} size 存在行数量
   */
  removeOutData(size: number) {
    const formName = this.getFormName(this.props);
    const {data, form} = this.context!;
    const inForms = formName
      ? Array(size)
          .fill(1)
          .map((d, ix) => `${formName}.${ix}`)
      : [];

    Object.keys(data).forEach((fi) => {
      if (Types.isBlank(formName)) {
        let nfi = Number(fi);
        let ois = fi.substr(0, fi.indexOf('.'));
        if (String(nfi) === fi && nfi < size) {
          form.onDeleteField(fi, {isChange: false});
        } else if (/^[0-9]+$/.test(ois) && Number(ois) >= size) {
          form.onDeleteField(fi, {isChange: false});
        }
      } else if (fi.indexOf(formName) === 0 && inForms.findIndex((da) => fi.indexOf(da) !== -1) === -1) {
        form.onDeleteField(fi, {isChange: false});
      }
    });
  }

  get config() {
    const formName = this.getFormName(this.props);
    return {form: formName};
  }

  componentDidMount() {
    this.context?.form.setField(this);
  }

  componentWillUnmount() {
    this.context?.form.unmountField(this);
  }

  shouldComponentUpdate(nextProps: CCFormListProps, nextState: CCFormListState) {
    return nextState.keys !== this.state.keys;
  }

  componentDidUpdate(prevProps: Readonly<CCFormListProps>, prevState: Readonly<CCFormListState>, snapshot?: any) {
    if (prevState.keys.length !== this.state.keys.length) {
      this.context?.form.observeField();
    }
  }

  render() {
    const that = this;
    const formName = this.getFormName(this.props);
    const {children} = that.props;
    const {keys, data} = that.state;

    if (!children) return null;
    return Array.isArray(keys)
      ? keys.map((key, index) => {
          const pro: CCFormListConfig = {
            form: Types.isBlank(formName) ? String(index) : `${formName}.${index}`,
            index,
            key,
            length: keys.length,
            data,
            remove: that.removeItem.bind(that, index),
            add: that.addItem.bind(that),
          };
          return (
            <CCFormListContext.Provider value={pro} key={key}>
              {children(pro)}
            </CCFormListContext.Provider>
          );
        })
      : null;
  }
}

export const CCFormList = React.forwardRef<CCFormListWrapper, CCFormListProps>((props, ref) => (
  <CCFormListContext.Consumer>
    {(eachData) => {
      let {form, initialValue, children} = props;
      const listData = eachData as CCFormListConfig;
      if (listData) {
        const item = listData.data[listData.index];
        initialValue = form ? (Types.isObject(item) && form in item ? item[form] : initialValue) : item;
      }
      return (
        <CCFormListWrapper {...props} ref={ref} initialValue={initialValue} eachConfig={listData} children={children} />
      );
    }}
  </CCFormListContext.Consumer>
));
