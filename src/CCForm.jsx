/**
 * @author wxik
 * @sine 2020-04-11 16:03
 */
import React from 'react';
import { Tools, Types } from '@wxik/core';
import { observable, raw } from '@wxik/observer';

/**
 * @typedef FormData
 * @property {*} str
 */

/**
 * @typedef Emitter
 * @property {(key: Function) => void} addListener
 * @property {(key: Function) => void} removeListener
 * @property {(key: string, value: []) => void} emit
 */

/**
 * @typedef Props
 * @property {FormData} [data]
 * @property {Object} [initialValue]
 * @property {(data: FormData) => void} [onChange]
 * @property {Emitter} [emitter] 字段改变发射器
 * @property {Array<Object>} [config] 表单配置,暂时不用
 */

/**
 * @typedef State
 * @property {FormData} data
 * @property {FormData} originData
 */

export const Const = {
  Field: 1,
  List: 2,
};

export const StateConst = {
  DEFAULT: 0,
  SET: 1,
};

const CCFormContext = React.createContext();

export class CCForm extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, initialValue } = nextProps;
    if (data && data !== prevState.originData) {
      return { data: observable(data), originData: data };
    }
    if (initialValue && initialValue !== prevState.initialValue) {
      return { data: observable({}), originData: {}, initialValue };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let that = this;
    const { emitter } = props;
    that.state = { data: observable({}), originData: {} };
    that.changeState = StateConst.DEFAULT;
    that.fields = new Set();
    that.updateFields = new Set();
    that.listFields = new Set();
    that.handleChange = that.handleChange.bind(that);
    that.handleFormChange = that.handleFormChange.bind(that);
    that.handleDeleteField = that.handleDeleteField.bind(that);
    that.handleFieldChange = that.handleFieldChange.bind(that);
    that.fieldAutoRun = that.fieldAutoRun.bind(that);
    that.setField = that.setField.bind(that);
    that.getField = that.getField.bind(that);
    that.unmountField = that.unmountField.bind(that);

    that.providerValue = {
      onFieldChange: this.handleFieldChange,
      deleteField: this.handleDeleteField,
      formChange: this.handleFormChange,
      unmountField: this.unmountField,
      setField: this.setField,
      getField: this.getField,
      target: this,
      emitter,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.unObserveField();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.data !== this.state.data || nextProps.children !== this.props.children;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.unObserveField();
      this.revertField();
      this.revertListField();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, SS) {
    this.changeState = StateConst.DEFAULT;
    if (prevState.data !== this.state.data) {
      this.observeField();
    }
  }

  revertListField() {
    let that = this;
    for (const fl of that.listFields) {
      const state = fl.initState();
      fl.removeOutData(state.data.length);
      fl.setState(state);
    }
  }

  revertField() {
    let that = this;
    for (const field of that.fields) {
      const state = field.initState();
      const form = field.getFormName();
      if (!(form in that.state.data)) {
        that._setFieldRawValue(form, state.value);
      }
      field.setState(state);
    }
  }

  unObserveField() {
    for (const field of this.fields) {
      field.unObserveData();
    }
  }

  observeField() {
    for (const field of this.fields) {
      field.observeData();
    }
  }

  fieldAutoRun() {
    for (const field of this.updateFields) {
      field.observeData();
    }
    this.updateFields.clear();
  }

  /**
   * form data on field change to callback
   * @param {Array} [fields]
   */
  handleChange(fields) {
    let that = this;
    // setTimeout(() => that.props.onChange?.(that.state.originData));
    that.props.onChange?.(that.state.originData, fields);
    that.changeState = StateConst.DEFAULT;
  }

  /**
   * field value change
   * @param {string} name field name
   * @param {*} value filed change value
   * @param {{raw: boolean = false}} options
   */
  handleFieldChange(name, value, options = {}) {
    let that = this;
    const { raw = false } = options;
    if (!name || that.state.data[name] === value) return;
    raw ? that._setFieldRawValue(name, value) : that._setFieldValue(name, value);

    that.handleFormChange(name);
  }

  handleDeleteField(name, options = {}) {
    const { isChange = true, raw: isRaw = false } = options;
    if (name) {
      delete this.state.data[name];
      delete this.state.originData[name];
      isChange && this.handleFormChange(name);
    }
  }

  handleFormChange(name) {
    let that = this;
    clearTimeout(that._timeoutChange);
    let ps = that.getField(name)?.props;
    that._temp_fields = that._temp_fields || [];
    ps && that._temp_fields.push(ps);
    that._timeoutChange = setTimeout(() => {
      that.handleChange(that._temp_fields);
      that._temp_fields = [];
    });
  }

  _setFieldValue(name, value) {
    if (name) {
      this.state.data[name] = value;
      this.state.originData[name] = value;
    }
  }

  _setFieldRawValue(name, value) {
    if (name) {
      raw(this.state.data)[name] = value;
      this.state.originData[name] = value;
    }
  }

  /**
   * 设置字段代理
   * @param {Object} field
   */
  setField(field) {
    const { form, fieldType } = field.config;

    if (fieldType === Const.Field) {
      this.fields.add(field);
      this._setFieldRawValue(form, field.value);
      this.updateFields.add(field);

      clearTimeout(this._autoRunTime);
      this._autoRunTime = setTimeout(this.fieldAutoRun);
    } else {
      this.listFields.add(field);
    }
  }

  /**
   * 获取字段代理信息
   * @param name
   * @returns {*}
   */
  getField(name) {
    if (Types.isBlank(name)) return null;
    for (const f of this.fields) {
      const { form } = f.config;
      if (form === name) return f;
    }
    return null;
  }

  /**
   * 字段被销毁
   * @param field
   */
  unmountField(field) {
    const { form, fieldType } = field.config;
    if (fieldType === Const.Field) {
      field.unObserveData();
      this.fields.delete(field);
    } else {
      this.listFields.delete(field);
    }
  }

  /**
   * 初始化表单数据
   * @param {Object} data
   */
  setOriginData(data) {
    this.originData = data;
    for (const f of this.listFields) {
      const { form } = f.config;
      if (form) {
        const value = Tools.get(data, form);
        value && f.setData(value);
      } else if (Array.isArray(data)) {
        f.setData(data);
      }
    }
    this.setData(data, { isGet: true, isChange: false });
  }

  /**
   * 设置字段数据
   * @param {Array|Object} data
   * @param {Object} options
   */
  setFieldData(data, options = {}) {
    this.setData(data, { isGet: true, isChange: true });
  }

  /**
   * 设置表单数据, 默认不调用 getValue
   * @param {Object} data
   * @param {Object} options
   */
  setData(data, options = {}) {
    const that = this;
    if (Types.isEmpty(data)) return;
    const { isGet = false, isChange = false } = options;
    that.changeState = StateConst.SET;

    let count = 0;
    const callback = () => {
      setTimeout(() => {
        count--;
        if (count <= 0) that.changeState = StateConst.DEFAULT;
      });
    };
    for (const f of this.fields) {
      let { form, getValue, alias } = f.config;
      if (form) {
        let sym = Symbol();
        let prevValue = f.value;
        let value = sym;

        for (let dk of [form, ...alias]) {
          let v = Tools.get(data, dk, sym);
          if (v !== sym) {
            value = v;
            form = dk;
          }
        }
        if (sym === value) continue;

        value = isGet && Types.isFunction(getValue) ? f.execGetValue(form, value, data) : value;

        count++;
        if (isChange) {
          f.handleChange(value, callback);
        } else {
          f.setValue(value, callback);
        }
      }
    }
    if (count === 0) that.changeState = StateConst.DEFAULT;
  }

  /**
   * 添加字段数据(字段可不存在)
   * @param {Object} data
   */
  addData(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this._setFieldValue(key, data[key]);
      }
    }
  }

  /**
   * 验证表单
   * @returns {boolean}
   */
  validate() {
    return this.validateErrors().length === 0;
  }

  /**
   * 验证表单, 返回错误信息
   */
  validateErrors() {
    let errors = new Map();
    for (let f of this.fields) {
      let field = f.config;
      if (field.form && (f.error = !f.validate())) {
        errors.set(field.form, {
          key: field.form,
          ref: f,
        });
      }
    }
    return Array.from(errors.values());
  }

  /**
   * 获取表单submitData
   * @returns {Object}
   */
  subData(options = {}) {
    const { merge = false } = options;
    const config = [],
      ignoreKeys = [];
    const { data, initialValue } = this.state;
    for (const f of this.fields) {
      const field = f.config;
      if (field.form) {
        ignoreKeys.push(field.form);
        !field.ignore && f.visible && config.push(field);
      }
    }
    const subData = Tools.extractData(data, config);

    // 外层直接添加到data的数据
    for (const key in data) {
      if (!~ignoreKeys.indexOf(key) && !(key in subData)) {
        subData[key] = data[key];
      }
    }

    // 合并数据
    const originData = this.originData ?? initialValue;
    if (merge && originData) {
      for (const f of this.listFields) {
        const { form } = f.config;
        const listData = f.getData();
        let deleteIndex = f.deleteIndex;
        const subListData = Tools.get(subData, form);
        if (form && subListData && listData && Types.isObject(listData[0])) {
          listData.forEach((da, index) => {
            if (!deleteIndex.includes(index)) {
              subListData[index] = Object.assign({}, da, subListData[index]);
            }
          });
        }
      }

      return Object.assign({}, originData, subData);
    }
    return subData;
  }

  // 表单原始数据
  get data() {
    return this.state.data;
  }

  render() {
    const { data, originData, initialValue } = this.state;
    const providerValue = this.providerValue;
    providerValue.data = data;
    providerValue.originData = originData;
    providerValue.initialValue = initialValue;
    return <CCFormContext.Provider value={providerValue} children={this.props.children} />;
  }
}

CCForm.Const = Const;
CCForm.StateConst = StateConst;
CCForm.Context = CCFormContext;
