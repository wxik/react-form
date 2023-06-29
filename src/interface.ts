/**
 *
 * @author wxik
 * @since 2023-06-24 22:27
 */
import type {ReactNode, Ref} from 'react';

import type {CCFieldWrapper} from './CCField';
import type {CCForm} from './CCForm';
import type {CCListWrapper} from './CCList';

export type CCFormData = Record<string, any>;

export type CCNamePath = string | number | undefined;

export interface ICCFormContext {
  data: CCFormData;
  originData: CCFormData;
  fieldStatus: Record<string, CCFieldStatus>;
  initialValue?: CCFormData;
  emitter?: ICCEmitter;
  formInstance: CCForm;
  disabled: boolean;
}

export interface ICCEmitter {
  addListener: (key: string, handle: (...value: any[]) => void) => void;
  removeListener: (key: string, handle: (...value: any[]) => void) => void;
  emit: (key: string, ...value: any[]) => void;
}

export interface CCOptions {
  val: any;
  form: CCNamePath;
  data: CCFormData;
  listData?: any[];
  status: Record<string, CCFieldStatus>;
  selfStatus: CCFieldStatus;
}

export interface IFieldOptions {
  data: CCFormData;
  options: CCOptions;
  originData: CCFormData;
}

export type CCRulesType =
  | CCRequiredType
  | RegExp
  | ((formData: CCFormData, options: CCOptions) => ReturnRuleType | Promise<ReturnRuleType | unknown>);

export interface CCListContext {
  form: CCNamePath;
  listInstance: CCListWrapper;
  keys: string[];
  data: any[];
  length: number;
  formData: CCFormData;
}

export interface ICCFieldContext {
  fieldInstance: CCFieldWrapper;
  visible: boolean;
}

export interface ICCField {
  form?: CCNamePath; // field name
  alias?: string | Array<string>; // alias field name
  title?: ReactNode | ((formData: CCFormData, options: CCOptions) => ReactNode); // field title
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
  visible?: boolean | ((formData: CCFormData, options: CCOptions) => boolean);
  disabled?: boolean | ((formData: CCFormData, options: CCOptions) => boolean);
  union?: string | string[] | ((options: CCOptions) => string | string[]);
  unionValue?: (value: any, data: {val: any; data: CCFormData; form?: string}) => any;
  /**
   * 开启联动验证
   * @default false
   */
  unionValidate?: boolean;
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

export interface ICCForm {
  form?: CCFormInstance;
  data?: CCFormData;
  initialValue?: Object;
  onChange?: (data: CCFormData, fields: Array<ICCField>) => void;
  emitter?: ICCEmitter; // 字段改变发射器
  children: ReactNode;
  disabled?: boolean;
}

export interface CCFieldError {
  key: CCNamePath;
  messages?: string[];
  ref: CCFieldWrapper;
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
   * 异步验证表单
   * @returns {Promise<boolean>}
   */
  asyncValidate: () => Promise<boolean>;
  /**
   * 验证表单
   * @param {CCNamePath[]} [paths]
   * @default []
   */
  validateErrors: (paths?: CCNamePath[]) => CCFieldError[];
  /**
   * 异步验证表单
   * @param {CCNamePath[]} [paths]
   * @default []
   */
  asyncValidateErrors: (paths?: CCNamePath[]) => Promise<CCFieldError[]>;
  /**
   * 初始化表单数据, 不触发 onChange
   * @param {CCFormData | any[]} data
   */
  setOriginData: (data: CCFormData | any[]) => void;
  /**
   * 设置表单数据, 触发字段 onChange 但不触发联动
   * @param {Array|Object} data
   */
  setFieldData: (data: CCFormData | any[]) => void;
  /**
   * 添加字段数据(字段可不存在): 触发联动、字段不接收值
   * @param {CCFormData} data
   */
  addData: (data: CCFormData) => void;
  /**
   * 设置表单数据, 默认不调用字段 convertValue 和 onChange
   * @param {CCFormData | any[]} data
   * @param {{isGet: boolean, isChange: boolean}} options
   */
  setData: (data: CCFormData) => void;
}

export interface CCValidateError {
  key: CCNamePath;
  messages?: string[];
}

export interface ICCFieldListener {
  key: string;
  convertValue: (value: any, data: CCFormData) => any;
  transform: (value: any, data: CCFormData) => any;
}

export interface ReturnValidateError {
  error: boolean;
  errors?: string[];
}

/**
 * 给最后的组件 props 使用
 */
export interface IFieldItem extends Omit<ICCField, 'forwardRef' | 'valuePropName' | 'forValue'> {
  title?: ReactNode;
  value: any;
  data: CCFormData;
  error?: boolean; // 是否验证错误
  errors?: string[]; // 验证错误的提示信息
  disabled: boolean; // 是否禁用
  visible: boolean;
  required: boolean; // 是否必填验证
  formInstance: CCFormInstance;
  onChange: (value: any, ...args: any[]) => void;
}

export type ICCFieldOmit = Omit<ICCField, 'parentField' | 'eachConfig'>;

export type CCRequiredType = {
  required?: boolean | ((formData: CCFormData, options: CCOptions) => boolean);
  pattern?: RegExp;
  message?: string;
};

export type ReturnRuleType = undefined | boolean | string;

export interface CCListInstance {
  add: (value?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
  setData: (data: any[]) => void;
  getData: () => void;
  getSize: () => number;
}

export interface CCListViewContext extends CCListContext {
  form: CCNamePath;
  index: number;
  key: string;
  remove: () => void;
  add: (item?: any, insertIndex?: number) => void;
  move: (from: number, to: number) => void;
}

export interface ICCList {
  form?: CCNamePath;
  formList?: CCListInstance;
  initRows?: number;
  initialValue?: Array<any>;
  eachConfig?: CCListViewContext;
  children: ((props: CCListViewContext) => ReactNode) | ReactNode;
  /**
   * 自定义字段更新逻辑
   */
  shouldUpdate?: any | any[];
}

export interface IListItem extends Omit<ICCList, 'eachConfig'> {}

export type ICCListOperation = CCListViewContext;

export interface ICCListActionOperation extends CCListContext {
  remove: (index: number | number[]) => void;
  add: (item?: any, insertIndex?: number) => void;
  move: (from: number, to: number) => void;
}

export interface CCFieldStatus {
  visible: boolean;
  disabled: boolean;
  required: boolean;
  validate?: boolean;
}

export interface ICCListView {
  component?: (values: CCListContext, children: ReactNode) => ReactNode;
  provider?: (operation: ICCListOperation, children: ReactNode) => ReactNode;
  children: (operation: ICCListOperation) => ReactNode;
}
