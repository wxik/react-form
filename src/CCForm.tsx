/* eslint-disable react/no-direct-mutation-state */
/**
 * @author Quia
 * @sine 2020-04-11 16:03
 */
import type {
  ComponentType,
  FC,
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import {Component} from 'react';

import {CCFormContext} from './CCContext';
import type {CCFieldWrapper} from './CCField';
import type {CCListWrapper} from './CCList';
import type {ICCListAction} from './CCListAction';
import type {ICCListView} from './CCListView';
import type {ICCOutlet, IOutlet} from './CCOutlet';
import {FormHelper, Observer, Tools, Types} from './helper';
import type {
  CCFieldError,
  CCFormData,
  CCFormInstance,
  CCListInstance,
  CCNamePath,
  ICCField,
  ICCFieldOmit,
  ICCForm,
  ICCFormContext,
  IFieldItem,
  IListItem,
} from './interface';
import type {CCFieldStatus} from './interface';

interface ICCFormState {
  data: CCFormData;
  originData: CCFormData;
  initialValue?: CCFormData;
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

export class CCForm extends Component<ICCForm, ICCFormState> {
  static Context = CCFormContext;

  static useForm: () => [CCFormInstance] = FormHelper.useForm;
  static useFormInstance: () => CCFormInstance = FormHelper.useFormInstance;
  static useList: () => [CCListInstance] = FormHelper.useList;
  static useListInstance: () => CCListInstance = FormHelper.useListInstance;
  static createForm: () => CCFormInstance = FormHelper.createForm;
  static createList: () => CCListInstance = FormHelper.createList;

  static Outlet: <T = {}, P = any>() => (
    Target: ComponentType<T & ICCOutlet>,
  ) => ForwardRefExoticComponent<PropsWithoutRef<T> & RefAttributes<P>>;

  static OutletView: FC<IOutlet>;
  static List: FC<IListItem>;
  static Field: <T = {}>(options?: {
    defaultValue?: any;
  }) => (Target: ComponentType<T & IFieldItem>) => (props: T & ICCFieldOmit) => JSX.Element;
  static ListView: FunctionComponent<ICCListView>;
  static ListAction: FC<ICCListAction>;

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
  private fieldStatus: Record<string, CCFieldStatus> = Observer.observable({});
  public changeState = CCFormStateStatusEnum.DEFAULT;
  private fields = new Set<CCFieldWrapper>();
  private fieldsMap = new Map<string | number, CCFieldWrapper>();
  private removeFields = new Set<CCFieldWrapper>();
  private updateFields = new Set<CCFieldWrapper>();
  private listFields = new Set<CCListWrapper>();
  private providerValue: ICCFormContext | {} = {};
  private timeoutChange: any = void 0;
  private tempFields: Array<ICCField> | undefined;
  private autoRunTime: any = void 0;

  constructor(props: ICCForm) {
    super(props);
    const that = this;
    const {emitter, form} = props;
    that.state = {data: Observer.observable({}), originData: {}};
    that.providerValue = {
      formInstance: that,
      emitter,
    };
    // @ts-ignore
    if (form && form.__REF__) form.__REF__.current = that;
  }

  componentWillUnmount() {
    this.unObserveField();
  }

  shouldComponentUpdate(nextProps: ICCForm, nextState: ICCFormState) {
    const that = this;
    return (
      nextState.data !== that.state.data ||
      nextProps.children !== that.props.children ||
      nextProps.disabled !== that.props.disabled
    );
  }

  getSnapshotBeforeUpdate(prevProps: ICCForm, prevState: ICCFormState) {
    const that = this;
    if (prevState.data !== that.state.data) {
      that.unObserveField();
      that.revertField();
      that.revertListField();
    }
    return null;
  }

  componentDidUpdate(prevProps: ICCForm, prevState: ICCFormState) {
    const that = this;
    that.changeState = CCFormStateStatusEnum.DEFAULT;
    if (prevState.data !== that.state.data) {
      that.observeField();
    }
  }

  revertListField() {
    for (const fl of this.listFields) {
      const state = fl.initState();
      fl.removeOutData(state.data.length);
      fl.setState(state);
    }
  }

  revertField() {
    const that = this;
    for (const field of that.fields) {
      const state = field.initState();
      const form = field.getFormName();
      if (!Types.isBlank(form) && !(form in that.state.data)) {
        that._setFieldValue(form, state.value, {raw: true});
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
    const that = this;
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
  fieldChange(name: CCNamePath, value: any, options: {raw?: boolean} = {}) {
    const that = this;
    const {raw = false} = options;
    if (Types.isBlank(name) || that.state.data[name] === value) return;
    that._setFieldValue(name, value, {raw});

    that.formChange(name);
  }

  deleteField(name: string, options: {isChange?: boolean} = {}) {
    const that = this;
    const {isChange = true} = options;
    if (!Types.isEmpty(name)) {
      delete Observer.raw(that.state.data)[name];
      delete that.state.originData[name];
      isChange && that.formChange(name);
    }
  }

  formChange(name?: CCNamePath) {
    const that = this;
    clearTimeout(that.timeoutChange);
    let ps = !Types.isBlank(name) && that.getField(name)?.props;
    that.tempFields = that.tempFields || [];
    ps && that.tempFields.push(ps);
    that.timeoutChange = setTimeout(() => {
      that.handleChange(that.tempFields!);
      that.tempFields = [];
    });
  }

  private _setFieldValue(name: CCNamePath, value: CCFormData, options: {raw?: boolean} = {}) {
    const {raw = false} = options;
    if (!Types.isBlank(name)) {
      const {data} = this.state;
      (raw ? Observer.raw(data) : data)[name] = value;
      this.state.originData[name] = value;
    }
  }

  public setFieldStatus(
    name: CCNamePath,
    config: {disabled: boolean; required: boolean; error?: boolean; visible: boolean},
    options: {raw?: boolean} = {},
  ) {
    const {raw = false} = options;
    if (!Types.isBlank(name)) {
      const {disabled, required, error, visible} = config;
      (raw ? Observer.raw(this.fieldStatus) : this.fieldStatus)[name] = {
        disabled,
        visible,
        required,
        validate: Types.isEmpty(error) ? void 0 : !error,
      };
    }
  }

  /**
   * 设置字段代理
   * @param {CCFieldWrapper | CCListWrapper} field
   */
  setField(field: CCFieldWrapper | CCListWrapper) {
    const that = this;
    if (isField(field)) {
      let form = field.getFormName();
      if (!Types.isBlank(form)) that.fieldsMap.set(form, field);
      that.fields.add(field);
      that._setFieldValue(form, field.value, {raw: true});
      that.setFieldStatus(form, field.getConfig(), {raw: true});
      that.updateFields.add(field);

      clearTimeout(that.autoRunTime);
      that.autoRunTime = setTimeout(() => that.fieldAutoRun());
    } else {
      that.listFields.add(field);
    }
  }

  renameField(form: string | number, field: CCFieldWrapper) {
    this.fieldsMap.set(form, field);
  }

  /**
   * 获取字段代理信息
   * @param {string} name
   * @returns {*}
   */
  getField(name: CCNamePath) {
    return Types.isBlank(name) ? null : this.fieldsMap.get(name);
  }

  /**
   * 字段被销毁
   * @param field
   */
  unmountField(field: CCFieldWrapper | CCListWrapper) {
    const that = this;
    if (isField(field)) {
      let formName = field.getFormName();
      field.unObserveData();
      that.fields.delete(field);
      that.removeFields.add(field);
      !Types.isBlank(formName) && that.fieldsMap.delete(formName);
    } else {
      that.listFields.delete(field);
    }
  }

  /**
   * 初始化表单数据
   * @param {CCFormData | any[]} data
   */
  setOriginData(data: CCFormData | any[]) {
    const that = this;
    that.originData = data;
    for (const f of that.listFields) {
      const {form} = f.getConfig();
      if (!Types.isBlank(form)) {
        const value = Tools.get(data, String(form));
        value && f.setData(value);
      } else if (Types.isArray(data)) {
        f.setData(data);
      }
    }
    that.setData(data, {isGet: true, isChange: false});
  }

  /**
   * 设置字段数据
   * @param {CCFormData | any[]} data
   */
  setFieldData(data: CCFormData | any[]) {
    this.setData(data, {isGet: true, isChange: true});
  }

  /**
   * 设置表单数据
   * @param {CCFormData | any[]} data
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
    for (const f of that.fields) {
      let {form, convertValue, alias} = f.getConfig();
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

        value = isGet && Types.isFunction(convertValue) ? f.execGetValue(form, value, data) : value;

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
   * 添加字段数据(字段可不存在): 触发联动、字段不接收值
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
   * 验证表单, 不处理表单中带有异步的验证
   * @returns {boolean}
   */
  validate() {
    return this.validateErrors().length === 0;
  }

  /**
   * 异步验证表单
   */
  async asyncValidate() {
    return (await this.asyncValidateErrors()).length === 0;
  }

  /**
   * 验证表单, 返回错误信息
   * @param {CCNamePath[]} [paths]
   * @returns {CCValidateError[]}
   */
  validateErrors(paths: CCNamePath[] = []) {
    const errors = new Map<CCNamePath, CCFieldError>();
    this._validateErrors(errors, (field, callback) => callback(field.validateErrors()), paths);
    return Array.from(errors.values());
  }

  async asyncValidateErrors(paths: CCNamePath[] = []) {
    return new Promise<Array<CCFieldError>>((resolve) => {
      const errors = new Map<CCNamePath, CCFieldError>();
      let total = 0;
      let count = 0;
      let status = this._validateErrors(
        errors,
        (field, callback) => {
          total++;
          (async () => {
            callback(await field.asyncValidateErrors());
            count++;
            if (count === total) {
              resolve(Array.from(errors.values()));
            }
          })();
        },
        paths,
      );
      // 如果没有字段需要验证立即返回
      !status && resolve([]);
    });
  }

  /**
   * 验证表单, 返回错验证状态
   * @param {Map<CCNamePath, CCFieldError>} errors
   * @param {field: CCFieldWrapper, callback: (data: any) => void) => void} callback
   * @param {CCNamePath[]} [paths]
   * @returns {boolean}
   */
  private _validateErrors(
    errors: Map<CCNamePath, CCFieldError>,
    callback: (field: CCFieldWrapper, callback: (data: any) => void) => void,
    paths: CCNamePath[] = [],
  ): boolean {
    let validStatus = false;
    for (let f of this.fields) {
      let field = f.getConfig();
      if (
        field.form &&
        field.visible &&
        field.parentVisible &&
        (!paths.length || paths.findIndex((path) => String(field.form).indexOf(String(path)) === 0) !== -1)
      ) {
        validStatus = true;
        callback(f, (data: {error: boolean; errors?: string[]}) => {
          const {error, errors: messages} = data;
          error && errors.set(field.form, {key: field.form, ref: f, messages});
        });
      }
    }
    return validStatus;
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
      const field = f.getConfig();
      if (field.form) {
        ignoreKeys.push(field.form);
      }
    }
    for (const f of that.fields) {
      const field = f.getConfig();
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
        const {form} = f.getConfig();
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
    providerValue.fieldStatus = that.fieldStatus;
    return <CCFormContext.Provider value={providerValue} children={that.props.children} />;
  }
}
