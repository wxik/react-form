/**
 *
 * @author Quia
 * @sine 2020-04-20 11:27
 */

import type {ContextType, FC} from 'react';
import {Component, useContext} from 'react';

import {CCFormListContext, CCFormListViewContext} from './CCContext';
import {CCFieldEnum, CCForm} from './CCForm';
import {CCListView} from './CCListView';
import {Tools, Types} from './helper';
import type {CCListContext, CCListViewContext, CCNamePath, ICCFormContext, ICCList, IListItem} from './interface';

interface ICCListState {
  keys: string[]; // 存储的值
  data: any[];
}

export class CCListWrapper extends Component<ICCList, ICCListState> {
  declare context: ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    initRows: 1,
  };

  deleteIndex: number[] = [];
  private uuid: number = 0;
  public fieldType = CCFieldEnum.List;

  constructor(props: ICCList, context?: any) {
    super(props, context);
    const that = this;
    const {formList} = props;
    that.genID = that.genID.bind(that);
    that.addItem = that.addItem.bind(that);
    that.removeItem = that.removeItem.bind(that);
    that.moveItem = that.moveItem.bind(that);
    that.state = that.initState();

    // @ts-ignore
    if (formList && formList.__REF__) formList.__REF__.current = that;
  }

  initState() {
    const that = this,
      props = that.props,
      context = that.context as ICCFormContext;
    that._initID();
    let {initRows, initialValue} = props;

    const formName = that.getFormName(props);

    if (context && context.initialValue) {
      if (!Types.isBlank(formName)) {
        initialValue = Tools.get(context.initialValue, formName, initialValue);
      } else if (Types.isArray(context.initialValue)) {
        initialValue = context.initialValue;
      }
    }

    let data = Array(initRows);
    const values = initialValue as any[];
    if (Types.isArray(initialValue) && values.length) {
      initRows = values.length;
      data = values;
    }

    const keys = Array(initRows).fill(1).map(that.genID);
    return {keys, data};
  }

  private _initID() {
    this.uuid = 1000;
  }

  genID() {
    return `CC${++this.uuid}`;
  }

  getFormName(props: ICCList): CCNamePath {
    const {form, eachConfig} = props;
    return eachConfig ? (form ? `${eachConfig.form}.${form}` : eachConfig.form) : form;
  }

  setData(data: any[]) {
    const that = this;
    const {initRows} = that.props;
    let {keys} = that.state;
    if (Types.isEmpty(data) || !Types.isArray(data)) {
      data = [];
    } else if (data.length === 0) {
      data = Array(initRows);
    }
    // 如果初始化 id 会导致之前的数据不刷新
    // this._initID();
    that.removeOutData(data.length);
    // key 的改变会出发销毁, 导致Field重新创建, 取了表单中数据
    // const keys = Array.from(data).fill(1).map(that.genID);
    keys = keys.slice(0, data.length);
    that.setState({keys, data});
  }

  getData() {
    return this.state.data;
  }

  addItem(item?: any, insertIndex?: number) {
    const that = this;
    let uuid = that.genID();
    let {data, keys} = that.state;
    keys = Array.from(keys);
    if (!Types.isEmpty(insertIndex) && insertIndex < data.length) {
      keys.splice(insertIndex, 0, uuid);
      data.splice(insertIndex, 0, item);
      that.removeListData(insertIndex, 1);
    } else {
      keys.push(uuid);
      data.push(item);
    }
    that.setState({keys, data});
    that.context?.formInstance.formChange();
  }

  /**
   * 删除行数据项, 会过滤无效的 index
   * @param {number|number[]} index 行数据下标或者行数据集合
   */
  removeItem(index: number | number[]) {
    const that = this;
    let {data, keys} = that.state;
    let size = keys.length;
    let nowIndex = (Types.isArray(index) ? index : [index]).filter((it) => it < size);
    if (nowIndex.length) {
      that.deleteIndex.push(...nowIndex);
      that.removeListData(size - nowIndex.length, nowIndex.length);

      keys = Array.from(keys);
      nowIndex.forEach((removeIndex, ix) => {
        keys.splice(removeIndex - ix, 1);
        data.splice(removeIndex - ix, 1);
      });
      that.setState({keys, data});
    }
  }

  moveItem(from: number, to: number) {
    const that = this;
    let {data, keys} = that.state;
    if (from !== to && from >= 0 && from < keys.length && to >= 0 && to < keys.length) {
      keys = Array.from(keys);
      let fromKey = keys[from];
      let fromData = data[from];

      keys.splice(from, 1);
      keys.splice(to, 0, fromKey);
      data.splice(from, 1);
      data.splice(to, 0, fromData);

      that.setState({keys, data});
      that.context?.formInstance.formChange();
    }
  }

  private removeListData(start: number, deleteCount: number = 0) {
    const that = this;
    const formName = that.getFormName(that.props);
    const {data, formInstance} = that.context!;
    const count = start + deleteCount;
    const pads = [];
    for (let key = start; key < count; key++) {
      pads.push(formName ? `${formName}.${key}` : String(key));
    }
    for (let fi in data) {
      pads.forEach((pad) => {
        if (fi.indexOf(pad) === 0) {
          formInstance.deleteField(fi);
        }
      });
    }
  }

  /**
   * 删除不存在的行数据
   * @param {Number} size 存在行数量
   */
  removeOutData(size: number) {
    const that = this;
    const formName = that.getFormName(that.props);
    const {data, formInstance} = that.context!;
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
          formInstance.deleteField(fi, {isChange: false});
        } else if (/^[0-9]+$/.test(ois) && Number(ois) >= size) {
          formInstance.deleteField(fi, {isChange: false});
        }
      } else if (fi.indexOf(String(formName)) === 0 && inForms.findIndex((da) => fi.indexOf(da) !== -1) === -1) {
        formInstance.deleteField(fi, {isChange: false});
      }
    });
  }

  getConfig() {
    return {form: this.getFormName(this.props)};
  }

  componentDidMount() {
    const that = this;
    // @ts-ignore
    that.props.formList?.__REF__.mount(that);
    that.context?.formInstance.setField(that);
  }

  componentWillUnmount() {
    const that = this;
    // @ts-ignore
    that.props.formList?.__REF__.unmount();
    that.context?.formInstance.unmountField(that);
  }

  shouldComponentUpdate(nextProps: ICCList, nextState: ICCListState) {
    const that = this,
      props = that.props,
      state = that.state;
    return (
      nextProps.form !== props.form ||
      nextState.keys !== state.keys ||
      that.getFormName(nextProps) !== that.getFormName(props) ||
      Tools.shouldUpdate(props.shouldUpdate, nextProps.shouldUpdate)
    );
  }

  componentDidUpdate(prevProps: Readonly<ICCList>, prevState: Readonly<ICCListState>, snapshot?: any) {
    if (prevState.keys !== this.state.keys) {
      this.context?.formInstance.observeField();
    }
  }

  render() {
    const that = this;
    const context = that.context as ICCFormContext;
    const form = that.getFormName(that.props);
    const {children} = that.props;
    const {keys, data} = that.state;

    if (!children || !Types.isArray(keys)) return null;

    const contextValues: CCListContext = {
      form,
      listInstance: that,
      keys,
      data,
      length: keys.length,
      formData: context.data,
    };
    const renderChildren = Types.isFunction(children) ? <CCListView children={children} /> : children;
    return <CCFormListContext.Provider value={contextValues} children={renderChildren} />;
  }
}

export const CCList: FC<IListItem> & {View: typeof CCListView} = (props) => {
  const eachData = useContext(CCFormListViewContext);

  let {form, initialValue, children} = props;
  const listData = eachData as CCListViewContext;
  if (listData) {
    const item = listData.data[listData.index];
    initialValue = form ? (Types.isObject(item) && form in item ? item[form] : initialValue) : item;
  }
  return <CCListWrapper {...props} initialValue={initialValue} eachConfig={listData} children={children} />;
};

CCList.View = CCListView;
