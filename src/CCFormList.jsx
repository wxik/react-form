/**
 *
 * @author wxik
 * @sine 2020-04-20 11:27
 */
import React from 'react';
import { CCForm } from './CCForm';
import { Tools, Types } from '@wxik/core';

const FormListContext = React.createContext();

class CCFormListComponentWrapper extends React.Component {
  static contextType = CCForm.Context;

  static defaultProps = {
    initRows: 1,
  };

  constructor(props, context) {
    super(props, context);
    let that = this;
    that.genID = that.genID.bind(that);
    that.addItem = that.addItem.bind(that);
    that.removeItem = that.removeItem.bind(that);
    that.state = that.initState();
    that.deleteIndex = [];
  }

  initState() {
    let that = this,
      props = that.props,
      context = that.context;
    that._initID();
    let { initRows, initialValue } = props;

    const form = this.getFormName(props);

    if (context && context.initialValue) {
      if (!Types.isBlank(form)) {
        initialValue = Tools.get(context.initialValue, form, initialValue);
      } else if (Array.isArray(context.initialValue)) {
        initialValue = context.initialValue;
      }
    }

    let data = Array(initRows);
    if (Types.isArray(initialValue) && initialValue.length) {
      initRows = initialValue.length;
      data = initialValue;
    }

    const value = Array(initRows).fill(1).map(this.genID);
    return { value, data };
  }

  _initID() {
    this.uuid = 1000;
  }

  genID() {
    return `CC${++this.uuid}`;
  }

  getFormName(props) {
    const { form, eachConfig } = props;
    return eachConfig ? (form ? `${eachConfig.form}.${form}` : eachConfig.form) : form;
  }

  setData(data) {
    const { initRows } = this.props;
    if (Types.isEmpty(data) || !Types.isArray(data)) {
      data = [];
    } else if (data.length === 0) {
      data = Array(initRows);
    }
    //TODO 如果初始化 id 会导致之前的数据不刷新
    // this._initID();
    this.removeOutData(data.length);
    const value = Array.from(data).fill(1).map(this.genID);
    this.setState({ value, data });
  }

  getData() {
    return this.state.data;
  }

  addItem(item = {}) {
    let that = this;
    let { data, value } = that.state;
    value = Array.from(value);
    value.push(that.genID());
    data.push(item);
    that.setState({ value, data });
    that.context?.formChange();
  }

  removeItem(index) {
    let that = this;
    that.deleteIndex.push(index);
    that.removeListEndData();
    let { data, value } = that.state;

    value = Array.from(value);
    value.splice(index, 1);
    data.splice(index, 1);
    that.setState({ value, data });
  }

  removeListEndData() {
    const form = this.getFormName(this.props);
    const { value } = this.state;
    const key = value.length - 1;
    const pad = form ? `${form}.${key}` : key;

    const { data, originData, deleteField } = this.context;

    Object.keys(data).forEach((fi, index) => {
      if (fi.indexOf(pad) === 0) {
        deleteField(fi, { raw: true });
      }
    });
  }

  /**
   * 删除不存在的行数据
   * @param {Number} size 存在行数量
   */
  removeOutData(size) {
    const form = this.getFormName(this.props);
    const { data, originData, deleteField } = this.context;
    const inForms =
      form &&
      Array(size).fill(1).map((d, ix) => `${form}.${ix}`);

    Object.keys(data).forEach((fi) => {
      let flag = false;
      if (Types.isBlank(form)) {
        let nfi = Number(fi);
        let ois = fi.substr(0, fi.indexOf('.'));
        if (String(nfi) === fi && nfi < size) {
          deleteField(fi, { isChange: false });
        } else if (/^[0-9]+$/.test(ois) && Number(ois) >= size) {
          deleteField(fi, { isChange: false });
        }
      } else if (fi.indexOf(form) === 0 && inForms.findIndex((da) => fi.indexOf(da) !== -1) === -1) {
        deleteField(fi, { isChange: false });
      }
    });
  }

  get config() {
    const form = this.getFormName(this.props);
    return { form, fieldType: CCForm.Const.List };
  }

  componentDidMount() {
    this.context.setField(this);
  }

  componentWillUnmount() {
    this.context?.unmountField(this);
  }

  shouldComponentUpdate(nextProps, nextState, ss) {
    return nextState.value !== this.state.value;
  }

  render() {
    const that = this;
    const form = this.getFormName(this.props);
    const { children } = that.props;
    const { value, data } = that.state;

    if (!children) return null;
    return Array.isArray(value)
      ? value.map((key, index) => {
        const pro = {
          form: Types.isBlank(form) ? index : `${form}.${index}`,
          index,
          key,
          length: value.length,
          data,
        };
        const cfg = {
          ...pro,
          target: that,
          key,
        };
        return (
          <FormListContext.Provider value={pro} key={key}>
            {children(cfg)}
          </FormListContext.Provider>
        );
      })
      : null;
  }
}

export const CCFormList = React.forwardRef((props, ref) => (
  <FormListContext.Consumer>
    {(eachData) => {
      let { form, initialValue } = props;
      if (eachData) {
        const item = eachData.data[eachData.index];
        initialValue = form ? (Types.isObject(item) && form in item ? item[form] : initialValue) : item;
      }
      return (
        <CCFormListComponentWrapper {...props} ref={ref} initialValue={initialValue} eachConfig={eachData} />
      );
    }}
  </FormListContext.Consumer>
));

CCFormList.Context = FormListContext;
