/**
 *
 * @author wxik
 * @sine 2020-04-11 11:43
 */
import type {ComponentType, ContextType, ReactElement} from 'react';
import {Component} from 'react';

import {CCFieldContext, CCFormListViewContext} from './CCContext';
import {CCFieldEnum, CCForm, CCFormStateStatusEnum} from './CCForm';
import {FormHelper, Observer, Tools, Types} from './helper';
import type {
  CCFormData,
  CCFormInstance,
  CCListViewContext,
  CCNamePath,
  CCOptions,
  CCRequiredType,
  CCRulesType,
  ICCField,
  ICCFieldContext,
  ICCFieldOmit,
  ICCFormContext,
  IFieldItem,
  IFieldOptions,
  ReturnRuleType,
  ReturnValidateError,
} from './interface';

interface CCFieldState {
  value: any; // 存储的值
  defaultValue?: any; // 默认值
  required: boolean; // 是否必填验证
  requiredMsg?: string; // 必填验证的提示信息
  error?: boolean; // 是否验证错误
  errors?: string[]; // 验证错误的提示信息
  visible: boolean; // 是否显示
  disabled: boolean; // 是否禁用
  _refreshMark: Object; // 刷新标志, 触发: shouldComponentUpdate 验证
  [key: string]: any;
}

const DEFAULT_UNIQUE = 'id';
const DEFAULT_INLINE = true;
const DEFAULT_OMIT_CONTEXT = true;
const DEFAULT_INJECT_LIST_NAME = true;
const DEFAULT_PRESERVE = false;
const DEFAULT_UNION_VALIDATE = false;

export class CCFieldWrapper extends Component<ICCField, CCFieldState> {
  declare context: ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    inline: DEFAULT_INLINE,
    unique: DEFAULT_UNIQUE,
    deliver: DEFAULT_OMIT_CONTEXT,
    injectListName: DEFAULT_INJECT_LIST_NAME,
    preserve: DEFAULT_PRESERVE,
    unionValidate: DEFAULT_UNION_VALIDATE,
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

  constructor(props: ICCField, context?: ContextType<typeof CCForm.Context>) {
    super(props, context);
    const that = this;
    that.listenerValueChange = that.listenerValueChange.bind(that);
    that.onChange = that.onChange.bind(that);
    that.observeVisible = that.observeVisible.bind(that);
    that.observeDisabled = that.observeDisabled.bind(that);
    that.observeRequired = that.observeRequired.bind(that);
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
    let {options, data} = that.getOptions();
    let {required, message: requiredMsg} = that.findRequired(data, options);
    let state = {
      value: Types.isFunction(convertValue) ? that.execGetValue(formName, value, formData) : value,
      initialValue: value,
      visible: !Types.isEmpty(visible) ? !!that.execCallback(visible, data, options) : true,
      disabled: !Types.isEmpty(disabled) ? !!that.execCallback(disabled, data, options) : false,
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
   * @param {CCOptions} options
   * @private
   * @return {require: boolean, message?: string}
   */
  private findRequired(data: CCFormData, options: CCOptions) {
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
      console.warn('ConvertValue:', e);
    }
  }

  observeData() {
    const that = this;
    that.unObserveData();
    that.observeReactions.push(
      Observer.autoRun(that.observeVisible),
      Observer.autoRun(that.observeDisabled),
      Observer.autoRun(that.observeRequired),
    );
    that.observeUnion();
  }

  unObserveData() {
    this.observeReactions.forEach((func) => Observer.unobserve(func));
    this.observeReactions = [];
  }

  getOptions(): IFieldOptions {
    const that = this;
    let {form, data: listData} = that.props.eachConfig || {};
    let {value, disabled, visible, error, required} = that.state || {};
    let {data, originData, fieldStatus} = that.context as ICCFormContext;
    let options = {
      form,
      val: value,
      data: originData, // 使用 originData 不会触发连锁反应
      status: fieldStatus,
      selfStatus: {
        disabled,
        visible,
        required,
        validate: Types.isEmpty(error) ? void 0 : !error,
      },
      listData,
    };
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
    let {options, data} = that.getOptions();
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
    let {options, data} = that.getOptions();
    if (!Types.isEmpty(visible)) {
      that.visible = !!that.execCallback(visible, data, options);
    }
  }

  /**
   * 监听验证规则
   * @private
   */
  private observeRequired() {
    const that = this;
    if (that.unmount) return;
    let {options, data} = that.getOptions();
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

    let {unionValue, unionValidate} = that.props;
    const formInstance = context.formInstance;
    const formName = that.getFormName();

    unionValue = Types.isFunction(unionValue) ? unionValue : () => (unionValidate ? that.value : void 0);

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
        const {options, data, originData} = that.getOptions();
        const value = that.execCallback(func, data[name], {
          ...options,
          data: originData, // originData 不会引起连锁触发
        });
        let isFlag = false;
        const onValue = (options: {valid?: boolean} = {}) => {
          const {valid = false} = options;
          !that.unmount &&
            name in data &&
            that.handleChange(value, () => {
              valid && unionValidate && that.asyncValidateErrors();
            });
        };
        if (that.isObserveUnion && formInstance?.changeState !== CCFormStateStatusEnum.SET) {
          isFlag = true;
          onValue({valid: true});
        } else {
          // 递归监听一下上级.上级.等等
          unionAll.forEach((pun) => data[pun]);
        }
        // 如果没有字段名称, 初始化时触发联动设值
        if (!isFlag && Types.isEmpty(formName)) onValue();
      });
      that.observeReactions.push(reaction);
    });
    that.isObserveUnion = true;
  }

  getUnionList() {
    const that = this;
    let {union} = that.props;
    if (Types.isBlank(union)) return null;

    let {options} = that.getOptions();
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
    let {options, data} = that.getOptions();
    return that.execCallback(that.props.title, data, options);
  }

  getConfig(props?: ICCField, state?: CCFieldState) {
    const that = this;
    props = props || that.props;
    state = state || that.state;
    const {inline, transform, ignore, convertValue, parentField} = props;
    const {disabled, visible, error, required} = state;
    return {
      inline,
      form: that.getFormName(props),
      alias: that.getFormAlias(props),
      transform,
      visible,
      parentVisible: parentField.visible,
      disabled,
      ignore,
      error,
      required,
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
    if (that.unmount || value === that.state.value) {
      callback?.();
      return;
    }

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
      callback?.();
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
      if (!visible) that.setState({error: void 0, errors: void 0});
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
    const {ignore, rules} = that.props;
    const {required, requiredMsg, value, visible} = that.state;

    if ((ignore && !required) || !visible) return true;

    const isEmpty = that.validateEmpty(value);
    if (required && isEmpty) return !Types.isBlank(requiredMsg) ? [requiredMsg] : false;
    if (isEmpty) return true;

    const {options: callArgs, originData} = that.getOptions();

    const validRule = (rule?: CCRulesType) => {
      if (rule && rule instanceof RegExp) {
        return rule.test(value);
      } else if (Types.isFunction(rule)) {
        return (rule as Function)(originData, callArgs);
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

    return (
      nextState.value !== state.value ||
      nextState.required !== state.required ||
      nextState.error !== state.error ||
      nextState.visible !== state.visible ||
      nextState.disabled !== state.disabled ||
      nextState._refreshMark !== state._refreshMark ||
      nextProps.form !== props.form ||
      that.getFormName(nextProps) !== that.getFormName(props) ||
      Tools.shouldUpdate(props.shouldUpdate, nextProps.shouldUpdate)
    );
  }

  getSnapshotBeforeUpdate(prevProps: ICCField, prevState: CCFieldState) {
    const that = this;
    const {formInstance} = this.context as ICCFormContext;
    const {required, error, visible, disabled} = that.state;
    const formName = that.getFormName(that.props);
    const prevFormName = that.getFormName(prevProps);
    if (prevProps.form !== this.props.form) {
      formInstance.unmountField(this);
    }

    if (formName !== prevFormName && !Types.isBlank(formName)) {
      formInstance.renameField(formName, that);
    }

    if (
      required !== prevState.required ||
      error !== prevState.error ||
      visible !== prevState.visible ||
      disabled !== prevState.disabled
    ) {
      formInstance.setFieldStatus(formName, {required, error, visible, disabled});
    }

    return null;
  }

  componentDidUpdate(prevProps: ICCField, prevState: CCFieldState) {
    const that = this;
    const {formInstance} = this.context as ICCFormContext;
    const {value, required, error} = that.state;
    const formName = that.getFormName(that.props);
    if (value !== prevState.value) {
      formInstance.fieldChange(formName, value, {raw: !that.changeForm});
      that.changeFlag && that.props.onChange?.(value);
    }

    if (
      (value !== prevState.value && that.changeFlag) ||
      (required !== prevState.required && !required && !Types.isEmpty(error))
    ) {
      that.asyncValidateErrors();
    }

    if (prevProps.form !== that.props.form) {
      formInstance.setField(that);
    }

    if (formName !== that.getFormName(prevProps)) {
      formInstance.fieldChange(formName, value, {raw: true});
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
