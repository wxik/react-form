/**
 *
 * @author Quia
 * @sine 2020-04-11 11:43
 */
import type {Ref} from 'react';
import React from 'react';

import type {CCFormData, CCFormName, ICCFormContextValue} from './CCForm';
import {CCFieldEnum, CCForm, CCFormStateStatusEnum} from './CCForm';
import type {CCListOperation} from './CCList';
import {CCFormListContext} from './CCList';
import {Observer, Tools, Types} from './helper';
import {getValueFromEvent} from './helper/Tools';

export interface ICCFieldListener {
  key: string;
  getValue: (value: any, data: CCFormData) => any;
  setValue: (value: any, data: CCFormData) => any;
}

interface CCFieldObserveOptions {
  data: CCFormData;
  options: Record<string, any> & Partial<CCListOperation>;
  originData: CCFormData;
}

type CCFieldOptions = CCFieldObserveOptions['options'] & {
  val?: any;
  data?: CCFormData;
};

export interface ICCField {
  form?: CCFormName; // field name
  alias?: string | Array<string>; // alias field name
  title?: string | ((form?: string) => string); // field title
  label?: string; //
  unique?: string; //唯一标识, 默认 = id
  inline?: boolean; // 是否内联对象(默认: true), false => {a: 1, b: {b1: 1}} => {a: 1, b1: 1}
  ignore?: boolean; // 是否忽略此字段
  field?: string | ((data: any, formData: CCFormData) => any); // 提交取值处理数据
  value?: any;

  onChange?: (value: any) => void;
  visible?: boolean | ((formData: CCFormData, options: CCFieldOptions) => boolean);
  disabled?: boolean | ((formData: CCFormData, options: CCFieldOptions) => boolean);
  union?: string | string[] | ((options: CCFieldObserveOptions['options']) => string | string[]);
  unionValue?: (value: any, data: {val: any; data: CCFormData; form?: string}) => any;
  getValue?: (value: any) => any;
  rules?: boolean | Array<CCRulesType> | CCRulesType; // 验证
  eachConfig?: CCListOperation; //循环内
  initialValue?: any;
  defaultValue?: any;
  forwardRef?: Ref<any>;
  normalize?: (value: any, data: {val: any; data: CCFormData; args: any[]}) => any; // 触发 onChange 时进行值转换后存入 Form
  valuePropName?: string; // value 进入子组件后的别名
  forValue?: (value: any, formData: CCFormData) => any; // 转换 value 给组件
  listener?: ICCFieldListener;
  refreshMark?: any; // 刷新标志
}

/**
 * 给最后的组件 props 使用
 */
export interface IFieldItem extends Omit<ICCField, 'forwardRef' | 'valuePropName' | 'forValue'> {
  title?: string;
  value: any;
  data: CCFormData;
  error: boolean; // 是否验证错误
  errors?: string[]; // 验证错误的提示信息
  disabled: boolean; // 是否禁用
  required: boolean; // 是否必填验证
  onChange: (value: any, ...args: any[]) => void;
}

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

export type CCRulesType =
  | CCRequiredType
  | RegExp
  | ((formData: CCFormData, options: CCFieldOptions) => boolean | string);

const DEFAULT_UNIQUE = 'id';
export class CCFieldWrapper extends React.Component<ICCField, CCFieldState> {
  declare context: React.ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    inline: true,
    unique: DEFAULT_UNIQUE,
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

  private changeFlag: boolean = false;
  private changeForm: boolean = false;
  private isObserveUion = false;
  private unmount: boolean = false;
  private observeReactions: Array<() => void> = []; // 监听对象
  public fieldType = CCFieldEnum.Field;

  constructor(props: ICCField, context: any) {
    super(props, context);
    let that = this;
    that.listenerValueChange = that.listenerValueChange.bind(that);
    that.onChange = that.onChange.bind(that);
    that.observeVisible = that.observeVisible.bind(that);
    that.observeDisabled = that.observeDisabled.bind(that);
    that.observeRules = that.observeRules.bind(that);
    that.state = that.initState();
    // console.log('>>>>>>', props.form);
  }

  initState() {
    const that = this,
      props = that.props,
      context = that.context as ICCFormContextValue;
    const {initialValue, getValue, defaultValue, visible, disabled} = props;

    const formName = that.getFormName(props);
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
    let {options, data} = this.getObserveOptions();
    let state = {
      value: Types.isFunction(getValue) ? that.execGetValue(formName, value, formData) : value,
      initialValue: value,
      visible: !Types.isEmpty(visible) ? !!this.isCallbackKey(visible, data, options) : true,
      disabled: !Types.isEmpty(disabled) ? !!this.isCallbackKey(disabled, data, options) : false,
      error: false,
      required: props.rules === true,
      _refreshMark: {},
    };

    that.changeFlag = false;
    that.changeForm = false;
    that.isObserveUion = false;
    return state;
  }

  /**
   * 字段名称
   * @param {ICCField} [props]
   * @returns {string}
   */
  getFormName(props?: ICCField): CCFormName {
    let {form, eachConfig} = props || this.props;
    return eachConfig ? (typeof form !== 'number' && form ? `${eachConfig.form}.${form}` : eachConfig.form) : form;
  }

  /**
   * 字段别名
   * @param {ICCField} props
   * @returns {[string]}
   */
  getFormAlias(props: ICCField) {
    let {alias, eachConfig} = props || this.props;
    if (Types.isBlank(alias)) return [];

    alias = (Array.isArray(alias) ? alias : [alias]) as string[];
    return alias.map((formName) =>
      eachConfig ? (formName ? `${eachConfig.form}.${formName}` : eachConfig.form) : formName,
    );
  }

  execGetValue(formName: CCFormName, value: any, data: CCFormData) {
    let {getValue, eachConfig, inline} = this.props;

    if (!inline && !Types.isBlank(formName)) {
      const name = String(formName);
      let pForm = eachConfig && eachConfig.form ? eachConfig.form : name.substring(0, name.lastIndexOf('.'));
      let pData = !Types.isBlank(pForm) ? Tools.get(data, pForm) : data;
      value = pData ?? value;
    }

    try {
      // @ts-ignore
      return getValue(value);
    } catch (e) {
      console.warn('取值GetValue异常:', e);
    }
  }

  observeData() {
    let that = this;
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
    const {eachConfig} = that.props;
    const context = that.context as ICCFormContextValue;
    const data = context.data;
    const originData = context.originData;
    const options = {};

    if (eachConfig) {
      Object.assign(options, eachConfig);
    }
    return {options, data, originData};
  }

  /**
   * 监听禁用
   * @private
   */
  private observeDisabled() {
    let that = this;
    if (that.unmount) return;
    let {disabled} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(disabled)) {
      that.disabled = !!that.isCallbackKey(disabled, data, options);
    }
  }

  /**
   * 监听显示
   * @private
   */
  private observeVisible() {
    let that = this;
    if (that.unmount) return;
    let {visible} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(visible)) {
      that.visible = !!that.isCallbackKey(visible, data, options);
    }
  }

  /**
   * 监听验证规则
   * @private
   */
  private observeRules() {
    let that = this;
    if (that.unmount) return;
    let {rules} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(rules)) {
      if (Array.isArray(rules)) {
        const required = rules.find(
          (da) => Types.isObject(da) && !!that.isCallbackKey((da as CCRequiredType).required, data, options),
        ) as CCRequiredType;

        that.required = !!required?.required;
        that.requiredMsg = required?.message || '';
      } else {
        that.required = that.isCallbackKey(rules, data, options) === true;
      }
    }
  }

  /**
   * 监听联动取值
   * @private
   */
  private observeUnion() {
    const that = this;
    that.isObserveUion = false;
    const context = that.context as ICCFormContextValue;
    const union = that.getUnionList();
    if (that.unmount || Types.isEmptyArray(union)) return;

    let {unionValue} = that.props;
    const {options, data, originData} = that.getObserveOptions();
    const form = context.form;

    unionValue = Types.isFunction(unionValue) ? unionValue : () => void 0;

    let findUnion = function (name: string, ks: string[] = []) {
      let pUnions = form.getField(name)?.getUnionList() || [];
      pUnions.forEach((un: string | string[]) => {
        let fd = Array.isArray(un) ? un[0] : un;
        if (ks.indexOf(fd) === -1) {
          ks.push(fd);
          findUnion(fd, ks);
        }
      });
      return ks;
    };

    union.forEach((un: string | [string, Function]) => {
      let [name, func] = Array.isArray(un) ? un : [un, unionValue];
      let unionAll = findUnion(name, [name]);
      let reaction = Observer.autoRun(() => {
        let value = that.isCallbackKey(func, data[name], {
          ...options,
          val: that.value,
          data: originData,
        });
        if (that.isObserveUion && form?.changeState !== CCFormStateStatusEnum.SET) {
          name in data && that.handleChange(value);
        } else {
          // 递归监听一下上级.上级.等等
          unionAll.forEach((pun) => data[pun]);
        }
      });
      that.observeReactions.push(reaction);
    });
    that.isObserveUion = true;
  }

  getUnionList() {
    let that = this;
    let {union} = that.props;
    if (Types.isBlank(union)) return null;

    let {options} = that.getObserveOptions();
    union = Types.isFunction(union) ? union(options) : union;

    if (Types.isBlank(union)) return null;
    union = Array.isArray(union) ? union : union.split(',');
    return union;
  }

  isCallbackKey<T>(func: any | ((...a: T[]) => any), ...args: T[]) {
    try {
      return Types.isFunction(func) ? func(...args) : func;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  get title(): string {
    let {options, data} = this.getObserveOptions();
    return this.isCallbackKey(this.props.title, data, options);
  }

  get config() {
    let that = this;
    let {inline, field, ignore, getValue} = that.props;
    let {disabled, visible} = that.state;
    let title = that.title;
    return {
      inline,
      form: that.getFormName(that.props),
      alias: that.getFormAlias(that.props),
      title,
      field,
      visible,
      disabled,
      ignore,
      getValue,
    };
  }

  onChange(value: any, ...args: any[]) {
    const {normalize, valuePropName = 'value'} = this.props;
    const context = this.context as ICCFormContextValue;
    value = getValueFromEvent(valuePropName, value);
    this.handleChange(normalize ? normalize(value, {val: this.state.value, data: context.data, args}) : value);
  }

  handleChange(value: any, callback?: () => void) {
    const that = this;
    if (that.unmount || value === that.state.value) return;

    const context = this.context as ICCFormContextValue;
    const {listener: {key, setValue} = {}} = that.props;

    that.changeFlag = true;
    that.changeForm = true;
    key && context.emitter?.emit(key, setValue ? setValue(value, context.data) : value);
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
    const {value: prevValue} = this.state;
    if (!this.unmount && !this.equalsValue(value, prevValue)) {
      this.setState({value}, callback);
    } else {
      callback && callback();
    }
  }

  equalsValue(value: any, preValue: any): boolean {
    const {label, unique = DEFAULT_UNIQUE} = this.props;
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
      return this.equalsValue(v1, v2);
    };
    if (Types.isObject(value) || Types.isObject(preValue)) {
      return isEqualObject(value, preValue);
    } else if (Array.isArray(value) || Array.isArray(preValue)) {
      if (Types.isEmptyArray(value) || Types.isEmptyArray(preValue)) return false;
      if (value.length !== preValue.length) return false;

      return value.every((da: any, di: number) => this.equalsValue(da, preValue[di]));
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

  public set requiredMsg(requiredMessage: string) {
    requiredMessage !== this.state.requiredMsg && this.setState({requiredMsg: requiredMessage});
  }

  get visible() {
    return this.state.visible;
  }

  set visible(visible) {
    visible !== this.visible && this.setState({visible});
  }

  validateErrors(): {error: boolean; errors?: string[]} {
    const that = this;
    const {errors, error} = that.state;

    let errorMessages;
    let currentError;
    const valid = that.validate();
    if (Types.isBoolean(valid)) {
      currentError = !valid;
      errorMessages = void 0;
    } else {
      currentError = !!valid.length;
      errorMessages = valid;
    }

    if (currentError !== error) {
      that.setState({error: currentError});
    }
    if (!this.equalsValue(errors, errorMessages)) {
      that.setState({errors: errorMessages, _refreshMark: {}});
    }
    return {error: currentError, errors: errorMessages};
  }

  /**
   * 验证字段
   * @returns {boolean}
   */
  validate(): string[] | boolean {
    const that = this;
    const context = that.context as ICCFormContextValue;
    const {ignore, rules, eachConfig} = that.props;
    const {required, requiredMsg, value} = that.state;

    if (ignore || !that.visible) return true;

    const isEmpty = that.validateEmpty(value);
    if (required && isEmpty) return !Types.isBlank(requiredMsg) ? [requiredMsg] : false;
    if (isEmpty) return true;

    let options = {val: that.value};
    if (eachConfig) {
      Object.assign(options, eachConfig);
    }

    const validRule = (rule?: CCRulesType) => {
      if (rule && rule instanceof RegExp) {
        return rule.test(value);
      } else if (Types.isFunction(rule)) {
        return (rule as Function)(context.data, options);
      } else if (Types.isObject(rule)) {
        const {pattern, message} = rule;
        if (pattern && !pattern.test(value)) {
          return message || false;
        }
      }
      return true;
    };

    if (Array.isArray(rules)) {
      const messages: string[] = [];
      let error = true;
      rules.forEach((rule) => {
        const valid = validRule(rule);
        if (Types.isString(valid)) {
          messages.push(valid);
        } else if (!valid) {
          error = false;
        }
      });
      return messages.length ? messages : error;
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
    } else if (Array.isArray(value)) {
      return Types.isEmptyArray(value) || (Types.isObject(value[0]) && isEmptyObject(value[0]));
    } else {
      return Types.isEmpty(value);
    }
  }

  listenerValueChange(value: any) {
    const that = this;
    const context = this.context as ICCFormContextValue;
    const {listener} = that.props;
    that.handleValue(listener?.getValue ? listener.getValue(value, context.data) : value);
  }

  componentDidMount() {
    const that = this;
    const context = that.context as ICCFormContextValue;
    const {listener: {key} = {}} = that.props;
    key && context.emitter?.addListener(key, that.listenerValueChange);
    context.form.setField(that);
  }

  componentWillUnmount() {
    const that = this;
    that.unmount = true;
    const context = that.context as ICCFormContextValue;
    const {listener: {key} = {}} = that.props;
    key && context.emitter?.removeListener(key, that.listenerValueChange);
    context.form.unmountField(that);
  }

  shouldComponentUpdate(nextProps: ICCField, nextState: CCFieldState) {
    let that = this,
      props = that.props,
      state = that.state;
    return (
      nextProps.refreshMark !== props.refreshMark ||
      nextState.value !== state.value ||
      nextState.required !== state.required ||
      nextState.error !== state.error ||
      nextState.visible !== state.visible ||
      nextState.disabled !== state.disabled ||
      nextState._refreshMark !== state._refreshMark ||
      nextProps.form !== props.form ||
      that.getFormName(nextProps) !== that.getFormName(props)
    );
  }

  getSnapshotBeforeUpdate(prevProps: ICCField, prevState: CCFieldState) {
    if (prevProps.form !== this.props.form) {
      const context = this.context as ICCFormContextValue;
      context.form.unmountField(this);
    }
    return null;
  }

  componentDidUpdate(prevProps: ICCField, prevState: CCFieldState) {
    const that = this;
    const context = this.context as ICCFormContextValue;
    const {value, required} = that.state;
    const formName = that.getFormName(that.props);
    if (value !== prevState.value) {
      context.form.onFieldChange(formName, value, {raw: !that.changeForm});
      that.changeFlag && that.props.onChange?.(value);
    }

    if ((value !== prevState.value && that.changeFlag) || (required !== prevState.required && !required)) {
      that.validateErrors();
    }

    if (prevProps.form !== that.props.form) {
      context.form.setField(that);
    }

    if (formName !== that.getFormName(prevProps)) {
      context.form.onFieldChange(formName, value, {raw: true});
    }

    that.changeFlag = false;
    that.changeForm = false;
  }

  render() {
    const that = this;
    const context = this.context as ICCFormContextValue;
    const {value, required, error, errors, disabled, visible} = that.state;
    // @ts-ignore
    const {forwardRef, __Component__: Target, title, valuePropName, forValue, ...rest} = that.props;
    if (!visible) return null;

    const nowValue = forValue ? forValue(value, context.data) : value;
    // @ts-ignore
    if (valuePropName) rest[valuePropName] = nowValue;

    return (
      <Target
        {...rest}
        title={that.title}
        data={context.data}
        value={nowValue}
        required={required}
        disabled={context.disabled || disabled}
        error={error}
        errors={errors}
        onChange={that.onChange}
        ref={forwardRef}
      />
    );
  }
}

/**
 * @param {{defaultValue?: any}} options
 * @returns {function(*=): *}
 */
export function CCField<T = {}>(options: {defaultValue?: any} = {}) {
  const {defaultValue} = options;
  return function (Target: React.ComponentType<T & IFieldItem>) {
    return React.forwardRef<CCFieldWrapper, T & ICCField>((props, ref) => (
      <CCFormListContext.Consumer>
        {(eachData) => {
          const listData = eachData as CCListOperation;
          let {initialValue, form, inline = true} = props;
          if (listData) {
            const item = listData.data[listData.index];
            initialValue = form
              ? Types.isObject(item) && form in item
                ? item[form]
                : inline
                ? initialValue
                : item
              : item;
            // console.log('--->', form, initialValue, item, initialValue);
          }
          return (
            <CCFieldWrapper
              defaultValue={defaultValue}
              {...props}
              initialValue={initialValue}
              eachConfig={listData}
              ref={ref}
              __Component__={Target}
            />
          );
        }}
      </CCFormListContext.Consumer>
    ));
  };
}
