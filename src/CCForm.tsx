/**
 * @author Quia
 * @sine 2020-04-11 16:03
 */
import type {FC, ReactNode} from 'react';
import React from 'react';

import type {CCFieldWrapper, ICCField, IFieldItem} from './CCField';
import type {ICCFieldOmit} from './CCField';
import type {CCListInstance, CCListWrapper, IListItem} from './CCList';
import type {ICCOutlet} from './CCOutlet';
import type {IOutlet} from './CCOutlet';
import {FormHelper, Observer, Tools, Types} from './helper';

export type CCFormData = Record<string, any>;

export type CCFormName = string | number | undefined;

export interface ICCForm {
  form?: CCFormInstance;
  data?: CCFormData;
  initialValue?: Object;
  onChange?: (data: CCFormData, fields: Array<ICCField>) => void;
  emitter?: ICCEmitter; // 字段改变发射器
  children: ReactNode;
  disabled?: boolean;
}

interface ICCFormState {
  data: CCFormData;
  originData: CCFormData;
  initialValue?: CCFormData;
}

export interface ICCEmitter {
  addListener: (key: string, handle: (...value: any[]) => void) => void;
  removeListener: (key: string, handle: (...value: any[]) => void) => void;
  emit: (key: string, ...value: any[]) => void;
}

export interface ICCFormContext {
  data: CCFormData;
  originData: CCFormData;
  initialValue?: CCFormData;
  emitter?: ICCEmitter;
  formInstance: CCForm;
  disabled: boolean;
}

export interface CCFormInstance {
  /**
   * 获取表单submitData
   * @returns {{merge ?: boolean}}
   */
  subData: (options?: {merge?: boolean}) => CCFormData;
  /**
   * 验证表单
   * @returns {boolean}
   */
  validate: () => boolean;
  /**
   * 初始化表单数据, 不触发 onChange
   * @param {CCFormData | any[]} data
   */
  setOriginData: (data: CCFormData | any[]) => void;
  /**
   *  初始化表单数据, 触发 onChange, 不触发联动
   * @param {Array|Object} data
   */
  setFieldData: (data: CCFormData | any[]) => void;
  /**
   * 添加字段数据(字段可不存在)并触发 onChange
   * @param {CCFormData} data
   */
  addData: (data: CCFormData) => void;
  /**
   * 设置表单数据, 默认不调用 getValue
   * @param {: FormData | any[]} data
   * @param {{isGet: boolean, isChange: boolean}} options
   */
  setData: (data: CCFormData) => void;
}

export enum CCFieldEnum {
  Field = 1,
  List,
}

export enum CCFormStateStatusEnum {
  DEFAULT,
  SET,
}

function isField(field: CCFieldWrapper | CCListWrapper): field is CCFieldWrapper {
  return field.fieldType === CCFieldEnum.Field;
}

const CCFormContext = React.createContext<ICCFormContext | null>(null);

export class CCForm extends React.Component<ICCForm, ICCFormState> {
  static Context = CCFormContext;

  static useForm: () => [CCFormInstance] = FormHelper.useForm;
  static useList: () => [CCListInstance] = FormHelper.useList;
  static createForm: () => CCFormInstance = FormHelper.createForm;
  static createList: () => CCListInstance = FormHelper.createList;

  static List: React.ForwardRefExoticComponent<React.PropsWithoutRef<IListItem> & React.RefAttributes<CCListWrapper>>;

  static Field: <T = {}>(options?: {
    defaultValue?: any;
  }) => (
    Target: React.ComponentType<T & IFieldItem>,
  ) => React.ForwardRefExoticComponent<React.PropsWithoutRef<T & ICCFieldOmit> & React.RefAttributes<CCFieldWrapper>>;

  static Outlet: <T = {}, P = any>() => (
    Target: React.ComponentType<T & ICCOutlet>,
  ) => React.ForwardRefExoticComponent<React.PropsWithoutRef<T> & React.RefAttributes<P>>;

  static OutletView: FC<IOutlet>;

  static getDerivedStateFromProps(nextProps: ICCForm, prevState: ICCFormState) {
    const {data, initialValue} = nextProps;
    if (data && data !== prevState.originData) {
      return {data: Observer.observable(data), originData: data};
    }
    if (initialValue && initialValue !== prevState.initialValue) {
      return {data: Observer.observable({}), originData: {}, initialValue};
    }
    return null;
  }

  private originData: CCFormData | undefined;
  changeState = CCFormStateStatusEnum.DEFAULT;
  private fields = new Set<CCFieldWrapper>();
  private removeFields = new Set<CCFieldWrapper>();
  private updateFields = new Set<CCFieldWrapper>();
  private listFields = new Set<CCListWrapper>();
  private providerValue: ICCFormContext | {} = {};
  private timeoutChange: any = void 0;
  private tempFields: Array<ICCField> | undefined;
  private autoRunTime: any = void 0;

  constructor(props: ICCForm) {
    super(props);
    let that = this;
    const {emitter, form} = props;
    that.state = {data: Observer.observable({}), originData: {}};
    that.handleChange = that.handleChange.bind(that);
    that.onFormChange = that.onFormChange.bind(that);
    that.onDeleteField = that.onDeleteField.bind(that);
    that.onFieldChange = that.onFieldChange.bind(that);
    that.fieldAutoRun = that.fieldAutoRun.bind(that);
    that.setField = that.setField.bind(that);
    that.getField = that.getField.bind(that);
    that.unmountField = that.unmountField.bind(that);

    that.providerValue = {
      formInstance: that,
      emitter,
    };
    // @ts-ignore
    if (form && form.__REF__) form.__REF__.current = that;
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.unObserveField();
  }

  shouldComponentUpdate(nextProps: ICCForm, nextState: ICCFormState) {
    return (
      nextState.data !== this.state.data ||
      nextProps.children !== this.props.children ||
      nextProps.disabled !== this.props.disabled
    );
  }

  getSnapshotBeforeUpdate(prevProps: ICCForm, prevState: ICCFormState) {
    if (prevState.data !== this.state.data) {
      this.unObserveField();
      this.revertField();
      this.revertListField();
    }
    return null;
  }

  componentDidUpdate(prevProps: ICCForm, prevState: ICCFormState) {
    this.changeState = CCFormStateStatusEnum.DEFAULT;
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
      if (!Types.isBlank(form) && !(form in that.state.data)) {
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
   * @param {Array<ICCField>} [fields]
   */
  handleChange(fields: Array<ICCField>) {
    let that = this;
    // setTimeout(() => that.props.onChange?.(that.state.originData));
    that.props.onChange?.(that.state.originData, fields);
    that.changeState = CCFormStateStatusEnum.DEFAULT;
  }

  /**
   * field value change
   * @param {string} name field name
   * @param {*} value filed change value
   * @param {{raw: boolean}} options
   */
  onFieldChange(name: CCFormName, value: any, options: {raw?: boolean} = {}) {
    let that = this;
    const {raw = false} = options;
    if (Types.isBlank(name) || that.state.data[name] === value) return;
    raw ? that._setFieldRawValue(name, value) : that._setFieldValue(name, value);

    that.onFormChange(name);
  }

  onDeleteField(name: string, options: {isChange?: boolean} = {}) {
    const {isChange = true} = options;
    if (name) {
      delete this.state.data[name];
      delete this.state.originData[name];
      isChange && this.onFormChange(name);
    }
  }

  onFormChange(name?: CCFormName) {
    let that = this;
    clearTimeout(that.timeoutChange);
    let ps = !Types.isBlank(name) && that.getField(name)?.props;
    that.tempFields = that.tempFields || [];
    ps && that.tempFields.push(ps);
    that.timeoutChange = setTimeout(() => {
      that.handleChange(that.tempFields!);
      that.tempFields = [];
    });
  }

  private _setFieldValue(name: CCFormName, value: CCFormData) {
    if (!Types.isBlank(name)) {
      this.state.data[name] = value;
      this.state.originData[name] = value;
    }
  }

  private _setFieldRawValue(name: string | number | undefined, value: CCFormData) {
    if (!Types.isBlank(name)) {
      Observer.raw(this.state.data)[name] = value;
      this.state.originData[name] = value;
    }
  }

  /**
   * 设置字段代理
   * @param {CCFieldWrapper | CCListWrapper} field
   */
  setField(field: CCFieldWrapper | CCListWrapper) {
    const {form} = field.config;

    if (isField(field)) {
      this.fields.add(field);
      this._setFieldRawValue(form, field.value);
      this.updateFields.add(field);

      clearTimeout(this.autoRunTime);
      this.autoRunTime = setTimeout(this.fieldAutoRun);
    } else {
      this.listFields.add(field);
    }
  }

  /**
   * 获取字段代理信息
   * @param {string} name
   * @returns {*}
   */
  getField(name: CCFormName): CCFieldWrapper | null {
    if (Types.isBlank(name)) return null;
    for (const f of this.fields) {
      const {form} = f.config;
      if (form === name) return f;
    }
    return null;
  }

  /**
   * 字段被销毁
   * @param field
   */
  unmountField(field: CCFieldWrapper | CCListWrapper) {
    if (isField(field)) {
      field.unObserveData();
      this.fields.delete(field);
      this.removeFields.add(field);
    } else {
      this.listFields.delete(field);
    }
  }

  /**
   * 初始化表单数据
   * @param {CCFormData | any[]} data
   */
  setOriginData(data: CCFormData | any[]) {
    this.originData = data;
    for (const f of this.listFields) {
      const {form} = f.config;
      if (!Types.isBlank(form)) {
        const value = Tools.get(data, String(form));
        value && f.setData(value);
      } else if (Array.isArray(data)) {
        f.setData(data);
      }
    }
    this.setData(data, {isGet: true, isChange: false});
  }

  /**
   * 设置字段数据
   * @param {Array|Object} data
   */
  setFieldData(data: CCFormData | any[]) {
    this.setData(data, {isGet: true, isChange: true});
  }

  /**
   * 设置表单数据, 默认不调用 getValue
   * @param {: FormData | any[]} data
   * @param {{isGet: boolean, isChange: boolean}} options
   */
  setData(data: CCFormData | any[], options: {isChange?: boolean; isGet?: boolean} = {}) {
    const that = this;
    if (Types.isEmpty(data)) return;
    const {isGet = false, isChange = false} = options;
    that.changeState = CCFormStateStatusEnum.SET;

    let count = 0;
    const callback = () => {
      setTimeout(() => {
        count--;
        if (count <= 0) that.changeState = CCFormStateStatusEnum.DEFAULT;
      });
    };
    for (const f of this.fields) {
      let {form, getValue, alias} = f.config;
      if (form) {
        let sym = Symbol();
        // let prevValue = f.value;
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
    if (count === 0) that.changeState = CCFormStateStatusEnum.DEFAULT;
  }

  /**
   * 添加字段数据(字段可不存在)
   * @param {CCFormData} data
   */
  addData(data: CCFormData) {
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
      if (field.form) {
        const {error, errors: messages} = f.validateErrors();
        if (error) {
          errors.set(field.form, {
            key: field.form,
            ref: f,
            messages,
          });
        }
      }
    }
    return Array.from(errors.values());
  }

  /**
   * 获取表单submitData
   * @returns {{merge ?: boolean}}
   */
  subData(options: {merge?: boolean} = {}) {
    const that = this;
    const {merge = false} = options;
    const config = [],
      ignoreKeys = [];
    const {data, initialValue} = that.state;
    for (const f of that.removeFields) {
      const field = f.config;
      if (field.form) {
        ignoreKeys.push(field.form);
      }
    }
    for (const f of that.fields) {
      const field = f.config;
      if (field.form) {
        ignoreKeys.push(field.form);
        !field.ignore && field.parentVisible && field.visible && config.push(field);
      }
    }
    const subData: CCFormData = Tools.extractData(data, config as any);

    // 外层直接添加到data的数据
    for (const key in data) {
      if (!~ignoreKeys.indexOf(key) && !(key in subData)) {
        subData[key] = data[key];
      }
    }

    // 合并数据
    const originData = that.originData ?? initialValue;
    if (merge && originData) {
      for (const f of that.listFields) {
        const {form} = f.config;
        const listData = f.getData();
        let deleteIndex = f.deleteIndex;
        const subListData = Tools.get(subData, String(form!));
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
    const that = this;
    const {disabled = false} = that.props;
    const {data, originData, initialValue} = that.state;
    const providerValue = that.providerValue as ICCFormContext;
    providerValue.data = data;
    providerValue.originData = originData;
    providerValue.initialValue = initialValue;
    providerValue.disabled = disabled;
    return <CCFormContext.Provider value={providerValue} children={that.props.children} />;
  }
}
