/**
 *
 * @author wxik
 * @sine 2020-04-11 11:43
 */
import React from 'react';
import {CCForm} from './CCForm';
import {Tools, Types} from '@wxik/core';
import {CCFormListContext} from './CCFormList';
import {autoRun, unobserve} from '@wxik/observer';
import type {
  CCFieldProps,
  CCFieldState,
  CCFormContextValue,
  FormData,
  Required,
  CCFieldRef,
  CCFormListConfig,
} from './interface';

class CCFieldComponentWrapper extends React.Component<CCFieldProps, CCFieldState> {
  declare context: React.ContextType<typeof CCForm.Context>;
  static contextType = CCForm.Context;

  static defaultProps = {
    inline: true,
  };

  static getDerivedStateFromProps(nextProps: CCFieldProps, prevState: CCFieldState) {
    let state: {[x: string]: any} | null = null;

    function p2s(name: string) {
      let value = nextProps[name];
      if (typeof value !== 'undefined' && value !== prevState[`_${name}`]) {
        state = state ?? {};
        state[name] = value;
        state[`_${name}`] = value;
      }
    }

    ['value'].forEach(p2s);
    return state;
  }

  changeFlag: boolean = false;
  changeForm: boolean = false;
  _observeUS: Array<() => void> | null = null;
  unmount: boolean = false;

  constructor(props: CCFieldProps, context: any) {
    super(props, context);
    let that = this;
    that.listenerValueChange = that.listenerValueChange.bind(that);
    that.onChange = that.onChange.bind(that);
    that._observeVisible = that._observeVisible.bind(that);
    that._observeDisabled = that._observeDisabled.bind(that);
    that._observeRules = that._observeRules.bind(that);
    that.state = that.initState();
    console.log('>>>>>>', props.form);
  }

  initState() {
    const that = this,
      props = that.props,
      context = that.context as CCFormContextValue;
    const {initialValue, getValue, defaultValue, visible, disabled} = props;

    const form = that.getFormName(props);
    let formData: FormData = {},
      value = Types.isUndefined(initialValue) ? defaultValue : initialValue;

    if (!Types.isBlank(form) && context) {
      if (context.initialValue) {
        formData = context.initialValue;
        value = Tools.get(context.initialValue, form, value);
      }

      if (context.data && form in context.data && !Types.isUndefined(context.data[form])) {
        value = context.data[form];
      }
    }
    let {options, data} = this.getObserveOptions();
    let state = {
      value: Types.isFunction(getValue) ? that.execGetValue(form, value, formData) : value,
      initialValue: value,
      visible: !Types.isEmpty(visible) ? !!this.isCallbackKey(visible, data, options) : true,
      disabled: !Types.isEmpty(disabled) ? !!this.isCallbackKey(disabled, data, options) : false,
      error: false,
      required: props.rules === true,
    };

    that.changeFlag = false;
    that.changeForm = false;
    that._observeUS = null;
    return state;
  }

  /**
   * 字段名称
   * @param {CCFieldProps} [props]
   * @returns {string}
   */
  getFormName(props: CCFieldProps) {
    let {form, eachConfig} = props || this.props;
    return eachConfig ? (form ? `${eachConfig.form}.${form}` : eachConfig.form) : form;
  }

  /**
   * 字段别名
   * @param {CCFieldProps} props
   * @returns {[string]}
   */
  getFormAlias(props: CCFieldProps) {
    let {alias, eachConfig} = props || this.props;
    if (Types.isBlank(alias)) return [];

    alias = (Types.isArray(alias) ? alias : [alias]) as string[];
    return alias.map((form) => (eachConfig ? (form ? `${eachConfig.form}.${form}` : eachConfig.form) : form));
  }

  execGetValue(form: string, value: any, data: FormData) {
    let {getValue, eachConfig, inline} = this.props;

    if (!inline) {
      let pForm = eachConfig && eachConfig.form ? eachConfig.form : form.substr(0, form.lastIndexOf('.'));
      let pData = !Types.isBlank(pForm) ? Tools.get(data, pForm) : data;
      value = pData ?? value;
    }

    try {
      return getValue(value);
    } catch (e) {
      console.warn('取值GetValue异常:', e);
    }
  }

  observeData() {
    let that = this;
    autoRun(that._observeVisible);
    autoRun(that._observeDisabled);
    autoRun(that._observeRules);

    that._observeUnion();
  }

  unObserveData() {
    let that = this;
    unobserve(that._observeVisible);
    unobserve(that._observeDisabled);
    unobserve(that._observeRules);

    that._observeUS?.forEach((da) => unobserve(da));
  }

  getObserveOptions(): {data: FormData; options: {[key: string]: any}; originData: FormData} {
    let that = this;
    let {eachConfig} = that.props;
    const context = that.context as CCFormContextValue;
    let data = context?.data;
    let originData = context?.originData;
    let options = {};

    if (eachConfig) {
      Object.assign(options, eachConfig);
    }
    return {options, data, originData};
  }

  /**
   * 监听禁用
   * @private
   */
  _observeDisabled() {
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
  _observeVisible() {
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
  _observeRules() {
    let that = this;
    if (that.unmount) return;
    let {rules} = that.props;
    let {options, data} = that.getObserveOptions();
    options.val = that.value;

    if (!Types.isEmpty(rules)) {
      if (Array.isArray(rules)) {
        that.required =
          rules.findIndex(
            (da) => Types.isObject(da) && !!that.isCallbackKey((da as Required).required, data, options),
          ) !== -1;
      } else {
        that.required = that.isCallbackKey(rules, data, options) === true;
      }
    }
  }

  /**
   * 监听联动取值
   * @private
   */
  _observeUnion() {
    const that = this;
    that._observeUS = null;
    const context = that.context as CCFormContextValue;
    const union = that.getUnionList();
    if (that.unmount || Types.isEmptyArray(union)) return;

    let {unionValue} = that.props;
    let {options, data, originData} = that.getObserveOptions();
    let getField = context?.getField;
    let target = context?.target;

    unionValue = Types.isFunction(unionValue) ? unionValue : () => void 0;

    let findUnion = function (name: string, ks: string[] = []) {
      let pUnions = getField(name)?.getUnionList() || [];
      pUnions.forEach((un) => {
        let fd = (Types.isArray(un) ? un[0] : un) as string;
        if (ks.indexOf(fd) === -1) {
          ks.push(fd);
          findUnion(fd, ks);
        }
      });
      return ks;
    };

    that._observeUS = union.map((un: string | [string, Function]) => {
      let [name, func] = Array.isArray(un) ? un : [un, unionValue];
      let unionAll = findUnion(name, [name]);
      let getUnValue = () => {
        let value = that.isCallbackKey(func, data[name], {
          ...options,
          val: that.value,
          data: originData,
        });

        if (!Types.isEmpty(that._observeUS) && target?.changeState !== CCForm.StateConst.SET) {
          name in data && that.onChange(value);
        } else {
          // 递归监听一下上级.上级.等等
          unionAll.forEach((pun) => data[pun]);
        }
      };
      autoRun(getUnValue);
      return getUnValue;
    });
  }

  getUnionList() {
    let that = this;
    let {union} = that.props;
    if (Types.isBlank(union)) return null;

    let {options} = that.getObserveOptions();
    union = Types.isFunction(union) ? union(options) : union;

    if (Types.isBlank(union)) return null;
    union = Types.isArray(union) ? union : union.split(',');
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

  get title() {
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
      fieldType: CCForm.Const.Field,
    };
  }

  onChange(value: any) {
    this.handleChange(value);
  }

  handleChange(value: any, callback?: () => void) {
    const that = this;
    if (that.unmount || value === that.state.value) return;

    const context = this.context as CCFormContextValue;
    const {key, setValue} = that.getListener();
    that.changeFlag = true;
    that.changeForm = true;
    key && context?.emitter?.emit(key, setValue ? setValue(value, context?.data) : value);
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

  set value(value) {
    this.handleValue(value);
  }

  equalsValue(value: any, preValue: any): boolean {
    let {label, unique = 'id'} = this.props;
    if (value === preValue) return true;

    let isEqualObject = (obj: {[key: string]: any}, prevObj: {[key: string]: any}) => {
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

  set disabled(disabled) {
    disabled !== this.state.disabled && this.setState({disabled});
  }

  get disabled() {
    return this.state.disabled;
  }

  set required(required) {
    required !== this.state.required && this.setState({required});
  }

  get required() {
    return this.state.required;
  }

  get visible() {
    return this.state.visible;
  }

  set visible(visible) {
    visible !== this.state.visible && this.setState({visible});
  }

  set error(error: boolean) {
    error !== this.state.error && this.setState({error});
  }

  /**
   * 验证字段
   * @returns {boolean}
   */
  validate() {
    const that = this;
    const context = that.context as CCFormContextValue;
    let {ignore, rules, eachConfig} = that.props;
    let {required, value} = that.state;

    if (ignore || !that.visible) return true;

    let isEmpty = that.validateEmpty(value);
    if (required && isEmpty) return false;
    if (isEmpty) return true;

    let options = {val: that.value};
    if (eachConfig) {
      Object.assign(options, eachConfig);
    }

    if (Array.isArray(rules)) {
      return rules.find((da) => {
        if (da instanceof RegExp) {
          return da.test(value);
        } else if (Types.isFunction(da)) {
          // @ts-ignore
          return da(context?.data, options);
        }
      });
    } else if (rules && rules instanceof RegExp) {
      return rules.test(value);
    } else if (Types.isFunction(rules)) {
      return (rules as Function)(context?.data, options);
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
      return Types.isEmptyObject(obj) || !!(label && Types.isBlank(obj[label]) && Types.isBlank(obj.name));
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

  getListener() {
    let {listener} = this.props;
    let key = listener,
      getValue,
      setValue;
    if (key && Types.isObject(key)) {
      getValue = key.getValue;
      setValue = key.setValue;
      key = key.key;
    }
    return {key, getValue, setValue};
  }

  listenerValueChange(value: any) {
    const that = this;
    const context = this.context as CCFormContextValue;
    const {getValue} = that.getListener();
    that.value = getValue ? getValue(value, context?.data) : value;
  }

  componentDidMount() {
    const that = this;
    const context = this.context as CCFormContextValue;
    const {key} = this.getListener();
    key && context?.emitter?.addListener(key, that.listenerValueChange);
    context?.setField(that as CCFieldRef);
  }

  componentWillUnmount() {
    const that = this;
    that.unmount = true;
    const context = this.context as CCFormContextValue;
    const {key} = this.getListener();
    key && context?.emitter?.removeListener(key, that.listenerValueChange);
    context?.unmountField(that as CCFieldRef);
  }

  shouldComponentUpdate(nextProps: CCFieldProps, nextState: CCFieldState) {
    let that = this,
      props = that.props,
      state = that.state;
    return (
      nextState.value !== state.value ||
      nextState.required !== state.required ||
      nextState.error !== state.error ||
      nextState.visible !== state.visible ||
      nextState.disabled !== state.disabled ||
      nextProps.form !== props.form ||
      that.getFormName(nextProps) !== that.getFormName(props)
    );
  }

  getSnapshotBeforeUpdate(prevProps: CCFieldProps, prevState: CCFieldState) {
    if (prevProps.form !== this.props.form) {
      const context = this.context as CCFormContextValue;
      context?.unmountField(this as CCFieldRef);
    }
    return null;
  }

  componentDidUpdate(prevProps: CCFieldProps, prevState: CCFieldState) {
    const that = this;
    const context = this.context as CCFormContextValue;
    const {value, required} = that.state;
    const form = that.getFormName(that.props);
    if (value !== prevState.value) {
      context?.onFieldChange(form, value, {raw: !that.changeForm});
      that.changeFlag && that.props.onChange?.(value);
    }

    if ((value !== prevState.value && that.changeFlag) || (required !== prevState.required && !required)) {
      that.error = !that.validate();
    }

    if (prevProps.form !== that.props.form) {
      context?.setField(that as CCFieldRef);
    }

    if (form !== that.getFormName(prevProps)) {
      context?.onFieldChange(form, value, {raw: true});
    }

    that.changeFlag = false;
    that.changeForm = false;
  }

  render() {
    const that = this;
    const context = this.context as CCFormContextValue;
    const {value, required, error, disabled, visible} = that.state;
    const {forwardRef, __Component__: Target, title, ...rest} = that.props;
    if (!visible) return null;
    return (
      <Target
        {...rest}
        title={that.title}
        data={context?.data}
        value={value}
        required={required}
        disabled={disabled}
        error={error}
        onChange={that.onChange}
        ref={forwardRef}
      />
    );
  }
}

/**
 * @param {{
 *     defaultValue: *
 * }} options
 * @returns {function(*=): *}
 */
export function CCField(options: {defaultValue?: any} = {}) {
  const {defaultValue} = options;
  return function (Target: React.ComponentType<CCFieldProps>) {
    return React.forwardRef<CCFieldComponentWrapper, CCFieldProps>((props, ref) => (
      <CCFormListContext.Consumer>
        {(eachData) => {
          const listData = eachData as CCFormListConfig;
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
            <CCFieldComponentWrapper
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
