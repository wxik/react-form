/**
 *
 * @author Quia
 * @sine 2020-04-11 11:43
 */
import type {ComponentType, ContextType, ReactElement, ReactNode, Ref} from 'react';
import {Component} from 'react';

import type {CCListContext, CCListViewContext, ICCFieldContext, ICCFormContext} from './CCContext';
import {CCFieldContext, CCFormListViewContext} from './CCContext';
import type {CCFormData, CCFormInstance, CCNamePath} from './CCForm';
import {CCFieldEnum, CCForm, CCFormStateStatusEnum} from './CCForm';
import {FormHelper, Observer, Tools, Types} from './helper';

export interface ICCFieldListener {
  key: string;
  convertValue: (value: any, data: CCFormData) => any;
  transform: (value: any, data: CCFormData) => any;
}

interface CCFieldObserveOptions {
  data: CCFormData;
  options: Record<string, any> & Partial<CCListContext>;
  originData: CCFormData;
}

type CCFieldOptions = CCFieldObserveOptions['options'] & {
  val?: any;
  data?: CCFormData;
};

interface ReturnValidateError {
  error: boolean;
  errors?: string[];
}

export interface ICCField {
  form?: CCNamePath; // field name
  alias?: string | Array<string>; // alias field name
  title?: ReactNode | ((form?: string) => ReactNode); // field title
  label?: string; //
  unique?: string; //唯一标识, 默认 = id
  /**
   * 是否内联对象 false => {a: 1, b: {b1: 1}} => {a: 1, b1: 1}
   * @default true
   */
  inline?: boolean;
  /**
   *  是否忽略此字段
   */
  ignore?: boolean;
  /**
   * 自动拼接集合传递的 formName
   */
  injectListName?: boolean;
  /**
   * 提交取值处理数据
   */
  transform?: string | ((data: any, formData: CCFormData) => any);
  value?: any;

  onChange?: (value: any) => void;
  /**
   * 是否保护子节点在隐藏是不销毁, 并接受 visible 值
   */
  preserve?: boolean;
  visible?: boolean | ((formData: CCFormData, options: CCFieldOptions) => boolean);
  disabled?: boolean | ((formData: CCFormData, options: CCFieldOptions) => boolean);
  union?: string | string[] | ((options: CCFieldObserveOptions['options']) => string | string[]);
  unionValue?: (value: any, data: {val: any; data: CCFormData; form?: string}) => any;
  convertValue?: (value: any) => any;
  rules?: boolean | Array<CCRulesType> | CCRulesType; // 验证
  eachConfig?: CCListContext; //循环内
  initialValue?: any;
  defaultValue?: any;
  forwardRef?: Ref<any>;
  /**
   * 触发 onChange 时进行值转换后存入 Form
   * @param {any} value
   * @param {{val: any, data: CCFormData: args: any[]}} data
   */
  normalize?: (value: any, data: {val: any; data: CCFormData; args: any[]}) => any;
  /**
   * value 进入子组件后的别名
   */
  valuePropName?: string;
  /**
   *  转换 value 给组件
   * @param {any} value
   * @param {CCFormData} formData
   */
  forValue?: (value: any, formData: CCFormData) => any;
  listener?: ICCFieldListener;
  /**
   * 自定义字段更新逻辑
   */
  shouldUpdate?: any | any[];
  /**
   * 注入节点信息给下级
   * @default true
   */
  deliver?: boolean;
  parentField: ICCFieldContext; // 上级字段节点数据
}

/**
 * 给最后的组件 props 使用
 */
export interface IFieldItem extends Omit<ICCField, 'forwardRef' | 'valuePropName' | 'forValue'> {
  title?: ReactNode;
  value: any;
  data: CCFormData;
  error: boolean; // 是否验证错误
  errors?: string[]; // 验证错误的提示信息
  disabled: boolean; // 是否禁用
  visible: boolean;
  required: boolean; // 是否必填验证
  formInstance: CCFormInstance;
  onChange: (value: any, ...args: any[]) => void;
}

export type ICCFieldOmit = Omit<ICCField, 'parentField' | 'eachConfig'>;

interface CCFieldState {
  value: any; // 存储的值
  defaultValue?: any; // 默认值
  required: boolean; // 是否必填验证
  requiredMsg?: string; // 必填验证的提示信息
  error: boolean; // 是否验证错误
  errors?: string[]; // 验证错误的提示信息
  visible: boolean; // 是否显示
  disabled: boolean; // 是否禁用
  _refreshMark: Object; // 刷新标志, 触发: shouldComponentUpdate 验证
  [key: string]: any;
}

export type CCRequiredType = {
  required?: boolean | ((formData: CCFormData, options: CCFieldOptions) => boolean);
  pattern?: RegExp;
  message?: string;
};

type ReturnRuleType = undefined | boolean | string;

export type CCRulesType =
  | CCRequiredType
  | RegExp
  | ((formData: CCFormData, options: CCFieldOptions) => ReturnRuleType | Promise<ReturnRuleType | unknown>);

export interface CCFieldError {
  key: CCNamePath;
  messages?: string[];
  ref: CCFieldWrapper;
}

const DEFAULT_UNIQUE = 'id';
const DEFAULT_INLINE = true;
const DEFAULT_OMIT_CONTEXT = true;
const DEFAULT_INJECT_LIST_NAME = true;

export class CCFieldWrapper extends Component<ICCField, CCFieldState> {
  declare context: ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    inline: DEFAULT_INLINE,
    unique: DEFAULT_UNIQUE,
    deliver: DEFAULT_OMIT_CONTEXT,
    injectListName: DEFAULT_INJECT_LIST_NAME,
    preserve: false,
  };

  static getDerivedStateFromProps(nextProps: ICCField, prevState: CCFieldState) {
    let state: Record<string, any> | null = null;

    function p2s(name: keyof ICCField) {
      const value = nextProps[name];
      if (!Types.isUndefined(value) && value !== prevState[`_${name}`]) {
        state = state || {};
        state[name] = value;
        state[`_${name}`] = value;
      }
    }

    // @ts-ignore
    ['value'].forEach(p2s);
    return state;
  }

  private formInstance!: CCFormInstance;
  private changeFlag: boolean = false;
  private changeForm: boolean = false;
  private isObserveUnion = false;
  private unmount: boolean = false;
  private observeReactions: Array<() => void> = []; // 监听对象
  private providerValue: ICCFieldContext | {} = {};
  public fieldType = CCFieldEnum.Field;

  constructor(props: ICCField, context: ContextType<typeof CCForm.Context>) {
    super(props, context);
    const that = this;
    that.listenerValueChange = that.listenerValueChange.bind(that);
    that.onChange = that.onChange.bind(that);
    that.observeVisible = that.observeVisible.bind(that);
    that.observeDisabled = that.observeDisabled.bind(that);
    that.observeRules = that.observeRules.bind(that);
    that.formInstance = FormHelper.formHandler({current: context?.formInstance ?? null});
    that.state = that.initState();
    that.providerValue = {
      fieldInstance: that,
    };
    // console.log('>>>>>>', props.form);
  }

  initState() {
    const that = this,
      props = that.props,
      context = that.context as ICCFormContext;
    let {initialValue, convertValue, defaultValue, visible, disabled} = props;

    let formName = that.getFormName(props);
    let formData: CCFormData = {},
      value = Types.isUndefined(initialValue) ? defaultValue : initialValue;

    if (!Types.isBlank(formName) && context) {
      if (context.initialValue) {
        formData = context.initialValue;
        value = Tools.get(context.initialValue, formName, value);
      }

      if (context.data && formName in context.data && !Types.isUndefined(context.data[formName])) {
        value = context.data[formName];
      }
    }
    let {options, data} = that.getObserveOptions();
    let {required, message: requiredMsg} = that.findRequired(data, options);
    let state = {
      value: Types.isFunction(convertValue) ? that.execGetValue(formName, value, formData) : value,
      initialValue: value,
      visible: !Types.isEmpty(visible) ? !!that.execCallback(visible, data, options) : true,
      disabled: !Types.isEmpty(disabled) ? !!that.execCallback(disabled, data, options) : false,
      error: false,
      required,
      requiredMsg,
      _refreshMark: {},
    };

    that.changeFlag = false;
    that.changeForm = false;
    that.isObserveUnion = false;
    return state;
  }

  /**
   * 字段名称
   * @param {ICCField} [props]
   * @returns {string}
   */
  getFormName(props?: ICCField): CCNamePath {
    let {form, eachConfig, injectListName} = props || this.props;
    return eachConfig && injectListName
      ? typeof form !== 'number' && form
        ? `${eachConfig.form}.${form}`
        : eachConfig.form
      : form;
  }

  /**
   * 字段别名
   * @param {ICCField} props
   * @returns {[string]}
   */
  getFormAlias(props: ICCField) {
    let {alias, eachConfig} = props || this.props;
    if (Types.isBlank(alias)) return [];

    alias = (Types.isArray(alias) ? alias : [alias]) as string[];
    return alias.map((formName) =>
      eachConfig ? (formName ? `${eachConfig.form}.${formName}` : eachConfig.form) : formName,
    );
  }

  /**
   * 查找必填信息
   * @param {CCFormData} data
   * @param {CCFieldObserveOptions['options']} options
   * @private
   * @return {require: boolean, message?: string}
   */
  private findRequired(data: CCFormData, options: CCFieldObserveOptions['options']) {
    const that = this;
    let {rules} = that.props;
    if (!Types.isEmpty(rules)) {
      rules = Types.isObject(rules) ? ([rules] as CCRulesType[]) : rules;
      const findReq = (da: any) =>
        Types.isObject(da) && !!that.execCallback((da as CCRequiredType).required, data, options);
      if (Types.isArray(rules)) {
        const required = rules.find(findReq) as CCRequiredType;
        return {required: !!required?.required, message: required?.message};
      } else {
        return {required: that.execCallback(rules, data, options) === true};
      }
    }
    return {required: false};
  }

  execGetValue(formName: CCNamePath, value: any, data: CCFormData) {
    let {convertValue, eachConfig, inline} = this.props;

    if (!inline && !Types.isBlank(formName)) {
      const name = String(formName);
      let pForm = eachConfig && eachConfig.form ? eachConfig.form : name.substring(0, name.lastIndexOf('.'));
      let pData = !Types.isBlank(pForm) ? Tools.get(data, pForm) : data;
      value = pData ?? value;
    }

    try {
      // @ts-ignore
      return convertValue(value);
    } catch (e) {
      console.warn('取值GetValue异常:', e);
    }
  }

  observeData() {
    const that = this;
    that.unObserveData();
    that.observeReactions.push(
      Observer.autoRun(that.observeVisible),
      Observer.autoRun(that.observeDisabled),
      Observer.autoRun(that.observeRules),
    );
    that.observeUnion();
  }

  unObserveData() {
    this.observeReactions.forEach((func) => Observer.unobserve(func));
    this.observeReactions = [];
  }

  getObserveOptions(): CCFieldObserveOptions {
    const that = this;
    let {eachConfig} = that.props;
    let context = that.context as ICCFormContext;
    let data = context.data;
    let originData = context.originData;
    let options = {};

    if (eachConfig) {
      options = eachConfig;
      // 下列方式在大列表中性能极差
      // Object.assign(options, eachConfig);
    }
    return {options, data, originData};
  }

  /**
   * 监听禁用
   * @private
   */
  private observeDisabled() {
    const that = this;
    if (that.unmount) return;
    let {disabled} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(disabled)) {
      that.disabled = !!that.execCallback(disabled, data, options);
    }
  }

  /**
   * 监听显示
   * @private
   */
  private observeVisible() {
    const that = this;
    if (that.unmount) return;
    let {visible} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(visible)) {
      that.visible = !!that.execCallback(visible, data, options);
    }
  }

  /**
   * 监听验证规则
   * @private
   */
  private observeRules() {
    const that = this;
    if (that.unmount) return;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    let {required, message} = that.findRequired(data, options);
    that.required = required;
    that.requiredMsg = message;
  }

  /**
   * 监听联动取值
   * @private
   */
  private observeUnion() {
    const that = this;
    that.isObserveUnion = false;
    const context = that.context as ICCFormContext;
    const union = that.getUnionList();
    if (that.unmount || Types.isEmptyArray(union)) return;

    let {unionValue} = that.props;
    const {options, data, originData} = that.getObserveOptions();
    const formInstance = context.formInstance;
    const formName = that.getFormName();

    unionValue = Types.isFunction(unionValue) ? unionValue : () => void 0;

    /**
     * 递归查询级联
     * @param name
     * @param ks
     */
    const findUnion = function (name: string, ks: string[] = []) {
      let pUnions = formInstance.getField(name)?.getUnionList() || [];
      pUnions.forEach((un: string | string[]) => {
        let fd = Types.isArray(un) ? un[0] : un;
        if (ks.indexOf(fd) === -1) {
          ks.push(fd);
          findUnion(fd, ks);
        }
      });
      return ks;
    };

    union.forEach((un: string | [string, Function]) => {
      const [name, func] = Types.isArray(un) ? un : [un, unionValue];
      const unionAll = findUnion(name, [name]);
      const reaction = Observer.autoRun(() => {
        const value = that.execCallback(func, data[name], {
          ...options,
          val: that.value,
          data: originData,
        });
        const onValue = () => !that.unmount && name in data && that.handleChange(value);
        // 如果没有字段名称, 初始化时触发联动设值
        if (Types.isEmpty(formName)) onValue();
        if (that.isObserveUnion && formInstance?.changeState !== CCFormStateStatusEnum.SET) {
          onValue();
        } else {
          // 递归监听一下上级.上级.等等
          unionAll.forEach((pun) => data[pun]);
        }
      });
      that.observeReactions.push(reaction);
    });
    that.isObserveUnion = true;
  }

  getUnionList() {
    const that = this;
    let {union} = that.props;
    if (Types.isBlank(union)) return null;

    let {options} = that.getObserveOptions();
    union = Types.isFunction(union) ? union(options) : union;

    if (Types.isBlank(union)) return null;
    union = Types.isArray(union) ? union : union.split(',');
    return union;
  }

  execCallback<T>(func: any | ((...a: T[]) => any), ...args: T[]) {
    try {
      return Types.isFunction(func) ? func(...args) : func;
    } catch (e) {
      console.warn(e);
    }
  }

  getTitle(): ReactElement {
    const that = this;
    let {options, data} = that.getObserveOptions();
    return that.execCallback(that.props.title, data, options);
  }

  getConfig() {
    const that = this;
    const {inline, transform, ignore, convertValue, parentField} = that.props;
    const {disabled, visible} = that.state;
    return {
      inline,
      form: that.getFormName(that.props),
      alias: that.getFormAlias(that.props),
      title: that.getTitle(),
      transform,
      visible,
      parentVisible: parentField.visible,
      disabled,
      ignore,
      convertValue,
    };
  }

  onChange(value: any, ...args: any[]) {
    const that = this;
    const {normalize, valuePropName = 'value'} = that.props;
    const context = that.context as ICCFormContext;
    value = Tools.getValueFromEvent(valuePropName, value);
    that.handleChange(normalize ? normalize(value, {val: that.state.value, data: context.data, args}) : value);
  }

  handleChange(value: any, callback?: () => void) {
    const that = this;
    if (that.unmount || value === that.state.value) return;

    const context = that.context as ICCFormContext;
    const {listener: {key, transform} = {}} = that.props;

    that.changeFlag = true;
    that.changeForm = true;
    key && context.emitter?.emit(key, transform ? transform(value, context.data) : value);
    that.handleValue(value, callback);
  }

  setValue(value: any, callback: () => void) {
    // 触发表单raw, 否则visible等不会执行
    this.changeForm = true;
    this.handleValue(value, callback);
  }

  get value() {
    return this.state.value;
  }

  handleValue(value: any, callback?: () => void) {
    const that = this;
    const {value: prevValue} = that.state;
    if (!that.unmount && !that.equalsValue(value, prevValue)) {
      that.setState({value}, callback);
    } else {
      callback && callback();
    }
  }

  equalsValue(value: any, preValue: any): boolean {
    const that = this;
    const {label, unique = DEFAULT_UNIQUE} = that.props;
    if (value === preValue) return true;

    const isEqualObject = (obj: {[key: string]: any}, prevObj: {[key: string]: any}) => {
      if (Types.isEmptyObject(obj) || Types.isEmptyObject(prevObj)) return false;
      let v1, v2;
      if (unique in obj || unique in prevObj) {
        v1 = obj[unique];
        v2 = prevObj[unique];
      } else if (label && (label in obj || label in prevObj)) {
        v1 = obj[label];
        v2 = prevObj[label];
      }
      return that.equalsValue(v1, v2);
    };
    if (Types.isObject(value) || Types.isObject(preValue)) {
      return isEqualObject(value, preValue);
    } else if (Types.isArray(value) || Types.isArray(preValue)) {
      if (Types.isEmptyArray(value) || Types.isEmptyArray(preValue)) return false;
      if (value.length !== preValue.length) return false;

      return value.every((da: any, di: number) => that.equalsValue(da, preValue[di]));
    } else {
      return String(value) === String(preValue);
    }
  }

  set disabled(disabled: boolean) {
    disabled !== this.state.disabled && this.setState({disabled});
  }

  public set required(required: boolean) {
    required !== this.state.required && this.setState({required});
  }

  public set requiredMsg(requiredMessage: string | undefined) {
    requiredMessage !== this.state.requiredMsg && this.setState({requiredMsg: requiredMessage});
  }

  set visible(visible: boolean) {
    const that = this;
    if (visible !== that.state.visible) {
      if (!visible) that.setState({error: false, errors: void 0});
      that.setState({visible});
    }
  }

  /**
   * 同步验证
   */
  validateErrors(): ReturnValidateError {
    return this._validateErrors(this.validate());
  }

  /**
   * 异步验证
   */
  async asyncValidateErrors() {
    const that = this;
    let valid = that.validate({async: true});
    if (Types.isArray(valid)) {
      // 走一步
      let newValid: any[] = [];
      let validSuccess = true;
      for (const it of valid) {
        if (Types.isPromise(it)) {
          let value;
          try {
            value = await it;
          } catch (e) {
            value = e;
          }
          if (Types.isString(value)) {
            newValid.push(value);
          } else if (!value) {
            validSuccess = false;
          }
        } else {
          newValid.push(it);
        }
      }
      valid = newValid.length ? newValid : validSuccess;
    }
    return this._validateErrors(valid);
  }

  private _validateErrors(valid: Array<ReturnRuleType | Promise<ReturnRuleType>> | boolean) {
    const that = this;
    const {errors, error} = that.state;

    let errorMessages;
    let currentError;
    if (Types.isBoolean(valid)) {
      currentError = !valid;
      errorMessages = void 0;
    } else {
      currentError = !!valid.length;
      errorMessages = valid as string[];
    }

    if (currentError !== error) {
      that.setState({error: currentError});
    }
    if (!that.equalsValue(errors, errorMessages)) {
      that.setState({errors: errorMessages, _refreshMark: {}});
    }
    return {error: currentError, errors: errorMessages};
  }

  /**
   * 验证字段
   * @param {{async: boolean}} options
   * @returns {boolean}
   */
  private validate(options: {async?: boolean} = {}): Array<ReturnRuleType | Promise<ReturnRuleType>> | boolean {
    const that = this;
    const {async = false} = options;
    const context = that.context as ICCFormContext;
    const {ignore, rules, eachConfig} = that.props;
    const {required, requiredMsg, value, visible} = that.state;

    if ((ignore && !required) || !visible) return true;

    const isEmpty = that.validateEmpty(value);
    if (required && isEmpty) return !Types.isBlank(requiredMsg) ? [requiredMsg] : false;
    if (isEmpty) return true;

    let args = {val: that.value};
    if (eachConfig) {
      Object.assign(args, eachConfig);
    }

    const validRule = (rule?: CCRulesType) => {
      if (rule && rule instanceof RegExp) {
        return rule.test(value);
      } else if (Types.isFunction(rule)) {
        return (rule as Function)(context.data, args);
      } else if (Types.isObject(rule)) {
        const {pattern, message} = rule;
        if (pattern && !pattern.test(value)) {
          return message || false;
        }
      }
      return true;
    };

    if (Types.isArray(rules)) {
      const messages: Array<string | Promise<string | boolean>> = [];
      let validSuccess = true;
      rules.forEach((rule) => {
        const valid = validRule(rule);
        if (Types.isString(valid)) {
          messages.push(valid);
        } else if (async && Types.isPromise<string | boolean>(valid)) {
          messages.push(valid);
        } else if (!valid) {
          validSuccess = false;
        }
      });
      return messages.length ? messages : validSuccess;
    } else if (Types.isObject(rules)) {
      const valid = validRule(rules);
      return Types.isString(valid) ? [valid] : valid;
    }
    return true;
  }

  /**
   * 验证是否为空数据
   * @returns {boolean}
   */
  validateEmpty(value: any): boolean {
    let {label} = this.props;

    let isEmptyObject = (obj: {[key: string]: any}): boolean => {
      return Types.isEmptyObject(obj) || !!(label && Types.isBlank(obj[label]));
    };
    if (Types.isEmpty(value)) {
      return true;
    } else if (Types.isString(value)) {
      return Types.isBlank(value);
    } else if (Types.isObject(value)) {
      return isEmptyObject(value);
    } else if (Types.isArray(value)) {
      return Types.isEmptyArray(value) || (Types.isObject(value[0]) && isEmptyObject(value[0]));
    } else {
      return Types.isEmpty(value);
    }
  }

  listenerValueChange(value: any) {
    const that = this;
    const context = this.context as ICCFormContext;
    const {listener} = that.props;
    that.handleValue(listener?.convertValue ? listener.convertValue(value, context.data) : value);
  }

  componentDidMount() {
    const that = this;
    const context = that.context as ICCFormContext;
    const {listener: {key} = {}} = that.props;
    key && context.emitter?.addListener(key, that.listenerValueChange);
    context.formInstance.setField(that);
  }

  componentWillUnmount() {
    const that = this;
    that.unmount = true;
    const context = that.context as ICCFormContext;
    const {listener: {key} = {}} = that.props;
    key && context.emitter?.removeListener(key, that.listenerValueChange);
    context.formInstance.unmountField(that);
  }

  shouldComponentUpdate(nextProps: ICCField, nextState: CCFieldState) {
    const that = this,
      props = that.props,
      state = that.state;

    const shouldUpdate = () => {
      const nextUpdate = nextProps.shouldUpdate;
      const update = props.shouldUpdate;
      if (Types.isArray(nextUpdate) && Types.isArray(update)) {
        return nextUpdate.some((it, ix) => it !== update[ix]);
      } else {
        return nextUpdate !== update;
      }
    };
    return (
      nextState.value !== state.value ||
      nextState.required !== state.required ||
      nextState.error !== state.error ||
      nextState.visible !== state.visible ||
      nextState.disabled !== state.disabled ||
      nextState._refreshMark !== state._refreshMark ||
      nextProps.form !== props.form ||
      that.getFormName(nextProps) !== that.getFormName(props) ||
      shouldUpdate()
    );
  }

  getSnapshotBeforeUpdate(prevProps: ICCField, prevState: CCFieldState) {
    const that = this;
    const context = this.context as ICCFormContext;
    const formName = that.getFormName(that.props);
    const prevFormName = that.getFormName(prevProps);
    if (prevProps.form !== this.props.form) {
      context.formInstance.unmountField(this);
    }

    if (formName !== prevFormName && !Types.isBlank(formName)) {
      context.formInstance.renameField(formName, that);
    }

    return null;
  }

  componentDidUpdate(prevProps: ICCField, prevState: CCFieldState) {
    const that = this;
    const context = this.context as ICCFormContext;
    const {value, required} = that.state;
    const formName = that.getFormName(that.props);
    if (value !== prevState.value) {
      context.formInstance.fieldChange(formName, value, {raw: !that.changeForm});
      that.changeFlag && that.props.onChange?.(value);
    }

    if ((value !== prevState.value && that.changeFlag) || (required !== prevState.required && !required)) {
      that.asyncValidateErrors();
    }

    if (prevProps.form !== that.props.form) {
      context.formInstance.setField(that);
    }

    if (formName !== that.getFormName(prevProps)) {
      // that.observeData();
      context.formInstance.fieldChange(formName, value, {raw: true});
    }

    that.changeFlag = false;
    that.changeForm = false;
  }

  render() {
    const that = this;
    const context = that.context as ICCFormContext;
    const {value, required, error, errors, disabled, visible} = that.state;
    const {
      forwardRef,
      // @ts-ignore
      __Component__: Target,
      preserve,
      title,
      valuePropName,
      forValue,
      parentField,
      deliver,
      ...rest
    } = that.props;
    if (!visible && !preserve) return null;

    const nowValue = forValue ? forValue(value, context.data) : value;
    // @ts-ignore
    if (valuePropName) rest[valuePropName] = nowValue;

    const providerValue = that.providerValue as ICCFieldContext;
    providerValue.visible = visible;

    const element = (
      <Target
        {...rest}
        title={that.getTitle()}
        data={context.data}
        value={nowValue}
        required={required}
        disabled={context.disabled || disabled}
        visible={visible}
        formInstance={that.formInstance}
        error={error}
        errors={errors}
        onChange={that.onChange}
        ref={forwardRef}
      />
    );

    return !deliver ? element : <CCFieldContext.Provider value={providerValue} children={element} />;
  }
}

/**
 * @param {{defaultValue?: any}} options
 * @returns {function(*=): *}
 */
export function CCField<T = {}>(options: {defaultValue?: any} = {}) {
  const {defaultValue} = options;
  return function (Target: ComponentType<T & IFieldItem>) {
    return (props: T & ICCFieldOmit) => (
      <CCFormListViewContext.Consumer>
        {(eachData) => {
          const listData = eachData as CCListViewContext;
          let {initialValue, form, inline = DEFAULT_INLINE, injectListName = DEFAULT_INJECT_LIST_NAME} = props;
          if (listData && injectListName) {
            const item = listData.data[listData.index];
            initialValue = form
              ? Types.isObject(item) && form in item
                ? item[form]
                : inline
                ? initialValue
                : item
              : Types.isUndefined(item)
              ? initialValue
              : item;
          }

          return (
            <CCFieldContext.Consumer>
              {(parentField) => (
                <CCFieldWrapper
                  defaultValue={defaultValue}
                  {...props}
                  parentField={parentField}
                  initialValue={initialValue}
                  eachConfig={listData}
                  __Component__={Target}
                />
              )}
            </CCFieldContext.Consumer>
          );
        }}
      </CCFormListViewContext.Consumer>
    );
  };
}
