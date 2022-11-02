import React, {ReactNode} from 'react';

export interface FormData {
  [key: string]: any;
}

export interface Emitter {
  addListener: (key: string, Function) => void;
  removeListener: (key: string, Function) => void;
  emit: (key, ...value) => void;
}

export interface CCFormProps {
  data?: FormData;
  initialValue?: Object;
  onChange?: (data: FormData, fields: Array<CCFieldProps>) => void;
  emitter?: Emitter; // 字段改变发射器
  config?: Array<Object>; //表单配置,暂时不用
  children: ReactNode;
}

export interface CCFormState {
  data: FormData;
  originData: FormData;
  initialValue?: FormData;
}

export interface CCFieldOptions {
  defaultValue?: any;
}

export interface Required {
  required: boolean | ((formData: Object) => any);
}

export interface CCFieldProps {
  form: string; // field name
  alias?: string | Array<string>; // alias field name
  title?: string | ((form?: string) => string); // field title
  label?: string; //
  inline?: boolean; // 是否内联对象
  ignore?: boolean; // 是否忽略此字段
  unique?: string; //唯一标识, 默认 = id
  field?: string | ((data: any, formData) => any); // 提交取值处理数据

  value?: any;
  onChange?: (value: any) => void;
  visible?: boolean | ((formData) => boolean);
  disabled?: boolean | ((formData) => boolean);
  unionValue?: (value, data: {val: any; data: Object; form?: string}) => any;
  rules?: boolean | Array<RegExp | Required> | Required | RegExp | ((formData) => boolean); // 验证
  error?: boolean;
  eachConfig?: CCFormListConfig; //循环内
  [key: string]: any;
}

export interface CCFieldState {
  value: any; // 存储的值
  defaultValue?: any; // 默认值
  required: boolean; // 是否必填验证
  error: boolean; // 是否验证错误
  visible: boolean; // 是否显示
  disabled: boolean; // 是否禁用
  [key: string]: any;
}

export interface CCOutletOptions {}

export interface CCOutletProps {
  data: Object;
  originData: Object;
  initialValue: Object;
  onFieldChange: () => any;
  deleteField: () => any;
  formChange: () => any;
  unmountField: () => any;
  setField: () => any;
  getField: () => any;
}

export interface CCFormListProps {
  form: string;
  initRows?: number;
  initialValue?: Array<any>;
  eachConfig?: CCFormListConfig;
  children: (props: CCFormListRow) => React.ReactNode;
}

export interface CCFormListState {
  keys: string[]; // 存储的值
  data: any[];
}

export class CCFormRef extends React.Component<CCFieldProps, CCFieldState> {
  changeState: 0 | 1;
}

export class CCFieldRef extends React.Component<CCFieldProps, CCFieldState> {
  initState: () => CCFieldState;
  getFormName: (props?: CCFieldProps) => string;
  unObserveData: () => void;
  observeData: () => void;
  execGetValue: (form: string, value: any, data: FormData) => any;
  handleChange: (value: any, callback: () => any) => void;
  setValue: (value: any, callback: () => any) => void;
  getUnionList: () => Array<string | Array<string | Function>>;
  validate: () => boolean;

  get value(): {};

  set error(): void;

  get visible(): boolean;
  set visible(): void;

  get config(): {
    form: string;
    alias: string[];
    fieldType: number;
    ignore: boolean;
    getValue?: () => any;
  };
}

export class CCFormListRef extends React.Component<CCFormListProps, CCFormListState> {
  initState: () => CCFormListState;
  removeOutData: (size: number) => void;
  setData: (data?: any[]) => void;
  getData: () => any[];
  deleteIndex: number[];

  get config(): {
    form: string;
    fieldType: number;
  };
}

export interface CCFormContextValue {
  data: FormData;
  originData: FormData;
  initialValue?: FormData;
  formChange: (name?: string) => void;
  deleteField: (name: string, options: {isChange?: boolean; raw?: boolean} = {}) => void;
  setField: (field: CCFieldRef | CCFormListRef) => void;
  unmountField: (field: CCFieldRef | CCFormListRef) => void;
  getField: (name: string) => CCFieldRef | null;
  onFieldChange: (name: string, value: any, options: {raw?: boolean} = {}) => void;
  emitter: Emitter;
  target: CCFormRef;
}

export function CCForm(props: CCFormProps): React.ReactElement<CCFormProps>;

export interface CCFormListConfig {
  form: string;
  index: number;
  key: string;
  length: number;
  data: any[];
}

export interface CCFormListRow extends CCFormListConfig {
  target: CCFormListRef;
}

export function CCField(options: CCFieldOptions): React.ForwardRefExoticComponent<CCFieldProps>;

export function CCOutlet(options: CCOutletOptions): React.ReactElement<CCOutletProps>;

export function CCFormList(): React.ReactElement<CCFormListProps>;
