import React, { ReactNode } from 'react';

type FormData = Record<string, any>;

interface Emitter {
  addListener: (key: string, Function) => void;
  removeListener: (key: string, Function) => void;
  emit: (key, ...value) => void;
}

interface Required {
  required: boolean | ((formData: Object) => any);
}

/**
 *
 * @author wxik
 * @sine 2020-04-20 11:27
 */

interface CCFormListProps {
    form: string;
    initRows?: number;
    initialValue?: Array<any>;
    eachConfig?: CCFormListConfig;
    children: (props: CCFormListRow) => React.ReactNode;
}
interface CCFormListState {
    keys: string[];
    data: any[];
}
interface CCFormListRef extends React.Component {
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
interface CCFormListRow extends CCFormListConfig {
    target: CCFormListRef;
}
interface CCFormListConfig {
    form: string;
    index: number;
    key: string;
    length: number;
    data: any[];
}
declare class CCFormListComponentWrapper extends React.Component<CCFormListProps, CCFormListState> {
    context: React.ContextType<typeof CCForm.Context>;
    static contextType: React.Context<CCFormContextValue | null>;
    static defaultProps: {
        initRows: number;
    };
    deleteIndex: number[];
    uuid: number;
    constructor(props: CCFormListProps, context: any);
    initState(): {
        keys: string[];
        data: any[];
    };
    _initID(): void;
    genID(): string;
    getFormName(props: CCFormListProps): string;
    setData(data: any[]): void;
    getData(): any[];
    addItem(item?: {}): void;
    removeItem(index: number): void;
    removeListEndData(): void;
    /**
     * 删除不存在的行数据
     * @param {Number} size 存在行数量
     */
    removeOutData(size: number): void;
    get config(): {
        form: string;
        fieldType: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: CCFormListProps, nextState: CCFormListState): boolean;
    render(): JSX.Element[] | null;
}
declare const CCFormList: React.ForwardRefExoticComponent<CCFormListProps & React.RefAttributes<CCFormListComponentWrapper>>;

/**
 *
 * @author wxik
 * @sine 2020-04-11 11:43
 */

interface CCFieldProps {
    form: string;
    alias?: string | Array<string>;
    title?: string | ((form?: string) => string);
    label?: string;
    inline?: boolean;
    ignore?: boolean;
    unique?: string;
    field?: string | ((data: any, formData: FormData) => any);
    value?: any;
    onChange?: (value: any) => void;
    visible?: boolean | ((formData: FormData) => boolean);
    disabled?: boolean | ((formData: FormData) => boolean);
    unionValue?: (value: any, data: {
        val: any;
        data: Object;
        form?: string;
    }) => any;
    rules?: boolean | Array<RegExp | Required> | Required | RegExp | ((formData: FormData) => boolean);
    error?: boolean;
    eachConfig?: CCFormListConfig;
    [key: string]: any;
}
interface CCFieldState {
    value: any;
    defaultValue?: any;
    required: boolean;
    error: boolean;
    visible: boolean;
    disabled: boolean;
    [key: string]: any;
}
interface CCFieldRef extends React.Component {
    props: CCFieldProps;
    initState: () => CCFieldState;
    getFormName: (props?: CCFieldProps) => string;
    unObserveData: () => void;
    observeData: () => void;
    execGetValue: (form: string, value: any, data: FormData) => any;
    handleChange: (value: any, callback: () => any) => void;
    setValue: (value: any, callback: () => any) => void;
    getUnionList: () => Array<string | Array<string>>;
    validate: () => boolean;
    get value(): {};
    set error(err: boolean);
    get visible(): boolean;
    set visible(visible: boolean);
    get config(): {
        form: string;
        alias: string[];
        fieldType: number;
        ignore: boolean;
        getValue?: () => any;
    };
}
declare class CCFieldComponentWrapper extends React.Component<CCFieldProps, CCFieldState> {
    context: React.ContextType<typeof CCForm.Context>;
    static contextType: React.Context<CCFormContextValue | null>;
    static defaultProps: {
        inline: boolean;
    };
    static getDerivedStateFromProps(nextProps: CCFieldProps, prevState: CCFieldState): null;
    changeFlag: boolean;
    changeForm: boolean;
    private observeUS;
    unmount: boolean;
    constructor(props: CCFieldProps, context: any);
    initState(): {
        value: any;
        initialValue: any;
        visible: boolean;
        disabled: boolean;
        error: boolean;
        required: boolean;
    };
    /**
     * 字段名称
     * @param {CCFieldProps} [props]
     * @returns {string}
     */
    getFormName(props: CCFieldProps): string;
    /**
     * 字段别名
     * @param {CCFieldProps} props
     * @returns {[string]}
     */
    getFormAlias(props: CCFieldProps): string[];
    execGetValue(form: string, value: any, data: FormData): any;
    observeData(): void;
    unObserveData(): void;
    getObserveOptions(): {
        data: FormData;
        options: {
            [key: string]: any;
        };
        originData: FormData;
    };
    /**
     * 监听禁用
     * @private
     */
    private observeDisabled;
    /**
     * 监听显示
     * @private
     */
    private observeVisible;
    /**
     * 监听验证规则
     * @private
     */
    private observeRules;
    /**
     * 监听联动取值
     * @private
     */
    private observeUnion;
    getUnionList(): any;
    isCallbackKey<T>(func: any | ((...a: T[]) => any), ...args: T[]): any;
    get title(): any;
    get config(): {
        inline: boolean | undefined;
        form: string;
        alias: string[];
        title: any;
        field: string | ((data: any, formData: FormData) => any) | undefined;
        visible: boolean;
        disabled: boolean;
        ignore: boolean | undefined;
        getValue: any;
        fieldType: number;
    };
    onChange(value: any): void;
    handleChange(value: any, callback?: () => void): void;
    setValue(value: any, callback: () => void): void;
    get value(): any;
    handleValue(value: any, callback?: () => void): void;
    set value(value: any);
    equalsValue(value: any, preValue: any): boolean;
    set disabled(disabled: boolean);
    get disabled(): boolean;
    set required(required: boolean);
    get required(): boolean;
    get visible(): boolean;
    set visible(visible: boolean);
    set error(error: boolean);
    /**
     * 验证字段
     * @returns {boolean}
     */
    validate(): any;
    /**
     * 验证是否为空数据
     * @returns {boolean}
     */
    validateEmpty(value: any): boolean;
    getListener(): {
        key: any;
        getValue: any;
        setValue: any;
    };
    listenerValueChange(value: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: CCFieldProps, nextState: CCFieldState): boolean;
    getSnapshotBeforeUpdate(prevProps: CCFieldProps, prevState: CCFieldState): null;
    componentDidUpdate(prevProps: CCFieldProps, prevState: CCFieldState): void;
    render(): JSX.Element | null;
}
/**
 * @param {{
 *     defaultValue: *
 * }} options
 * @returns {function(*=): *}
 */
declare function CCField(options?: {
    defaultValue?: any;
}): (Target: React.ComponentType<CCFieldProps>) => React.ForwardRefExoticComponent<Pick<CCFieldProps, keyof CCFieldProps> & React.RefAttributes<CCFieldComponentWrapper>>;

/**
 * @author wxik
 * @sine 2020-04-11 16:03
 */

interface CCFormProps {
    data?: FormData;
    initialValue?: Object;
    onChange?: (data: FormData, fields: Array<CCFieldProps>) => void;
    emitter?: Emitter;
    config?: Array<Object>;
    children: ReactNode;
}
interface CCFormState {
    data: FormData;
    originData: FormData;
    initialValue?: FormData;
}
interface CCFormContextValue {
    data: FormData;
    originData: FormData;
    initialValue?: FormData;
    formChange: (name?: string) => void;
    deleteField: (name: string, options?: {
        isChange?: boolean;
        raw?: boolean;
    }) => void;
    setField: (field: CCFieldRef | CCFormListRef) => void;
    unmountField: (field: CCFieldRef | CCFormListRef) => void;
    getField: (name: string) => CCFieldRef | null;
    onFieldChange: (name: string, value: any, options?: {
        raw?: boolean;
    }) => void;
    emitter: Emitter;
    target: CCFormRef;
}
interface CCFormRef extends React.Component {
    changeState: 0 | 1;
}
declare class CCForm extends React.Component<CCFormProps, CCFormState> {
    static Const: {
        Field: number;
        List: number;
    };
    static StateConst: {
        DEFAULT: number;
        SET: number;
    };
    static Context: React.Context<CCFormContextValue | null>;
    static getDerivedStateFromProps(nextProps: CCFormProps, prevState: CCFormState): {
        data: FormData;
        originData: FormData;
        initialValue?: undefined;
    } | {
        data: {};
        originData: {};
        initialValue: Object;
    } | null;
    originData: FormData;
    changeState: number;
    fields: Set<CCFieldRef>;
    updateFields: Set<CCFieldRef>;
    listFields: Set<CCFormListRef>;
    providerValue: CCFormContextValue | {};
    private timeoutChange;
    private tempFields;
    private autoRunTime;
    constructor(props: CCFormProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: CCFormProps, nextState: CCFormState): boolean;
    getSnapshotBeforeUpdate(prevProps: CCFormProps, prevState: CCFormState): null;
    componentDidUpdate(prevProps: CCFormProps, prevState: CCFormState): void;
    revertListField(): void;
    revertField(): void;
    unObserveField(): void;
    observeField(): void;
    fieldAutoRun(): void;
    /**
     * form data on field change to callback
     * @param {Array<CCFieldProps>} [fields]
     */
    handleChange(fields: Array<CCFieldProps>): void;
    /**
     * field value change
     * @param {string} name field name
     * @param {*} value filed change value
     * @param {{raw: boolean}} options
     */
    handleFieldChange(name: string, value: any, options?: {
        raw?: boolean;
    }): void;
    handleDeleteField(name: string, options?: {
        isChange?: boolean;
        raw?: boolean;
    }): void;
    handleFormChange(name?: string): void;
    _setFieldValue(name: string, value: FormData): void;
    _setFieldRawValue(name: string, value: FormData): void;
    /**
     * 设置字段代理
     * @param {CCFieldRef | CCFormListRef} field
     */
    setField(field: CCFieldRef | CCFormListRef): void;
    /**
     * 获取字段代理信息
     * @param {string} name
     * @returns {*}
     */
    getField(name: string): CCFieldRef | null;
    /**
     * 字段被销毁
     * @param field
     */
    unmountField(field: CCFieldRef | CCFormListRef): void;
    /**
     * 初始化表单数据
     * @param {FormData | any[]} data
     */
    setOriginData(data: FormData | any[]): void;
    /**
     * 设置字段数据
     * @param {Array|Object} data
     */
    setFieldData(data: FormData | any[]): void;
    /**
     * 设置表单数据, 默认不调用 getValue
     * @param {: FormData | any[]} data
     * @param {{isGet: boolean, isChange: boolean}} options
     */
    setData(data: FormData | any[], options?: {
        isChange?: boolean;
        isGet?: boolean;
    }): void;
    /**
     * 添加字段数据(字段可不存在)
     * @param {FormData} data
     */
    addData(data: FormData): void;
    /**
     * 验证表单
     * @returns {boolean}
     */
    validate(): boolean;
    /**
     * 验证表单, 返回错误信息
     */
    validateErrors(): any[];
    /**
     * 获取表单submitData
     * @returns {{merge ?: boolean}}
     */
    subData(options?: {
        merge?: boolean;
    }): FormData;
    get data(): FormData;
    render(): JSX.Element;
}

/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author wxik
 * @since 2020-05-21 11:47
 */

declare function CCOutlet(): <T>(Target: React.ComponentType<CCFieldProps>) => React.ForwardRefExoticComponent<Pick<CCFieldProps, keyof CCFieldProps> & React.RefAttributes<T>>;

export { CCField, CCForm, CCFormList, CCOutlet };
