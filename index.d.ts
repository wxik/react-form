import * as React from 'react';


declare module '@wxik/react-form' {
    export interface FormData {
        [key: string]: any;
    }

    export interface Emitter {
        addListener: (key: Function) => void;
        removeListener: (key: Function) => void;
        emit: (key, ...value) => void;
    }

    export interface CCFormProps {
        data?: FormData;
        initialValue?: Object;
        onChange?: (data: FormData) => void;
        emitter?: Emitter; // 字段改变发射器
        config?: Array<Object>; //表单配置,暂时不用
    }

    export interface CCFormState {
        data: FormData;
        originData?: FormData;
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
        unionValue?: (value, da: { val: any; data: Object; form?: string }) => any;
        rules?: boolean | Array<RegExp | Required> | Required | RegExp | ((formData) => boolean); // 验证
        error?: boolean;
        eachConfig?: { form: string; index: number; length: number }; //循环内
    }

    export interface CCFieldState {
        value: any; // 存储的值
        defaultValue: any; // 默认值
        required: boolean; // 是否必填验证
        error: boolean; // 是否验证错误
        visible: boolean; // 是否显示
        disabled: boolean; // 是否禁用
    }

    export interface CCOutletOptions {

    }

    export interface CCOutletProps {
        data: Object,
        originData: Object,
        initialValue: Object,
        onFieldChange: () => any,
        deleteField: () => any,
        formChange: () => any,
        unmountField: () => any,
        setField: () => any,
        getField: () => any,
    }

    export interface CCFormListProps {
        form: string,
        initRows?: number,
        initialValue?: Array<any>
    }

    export function CCForm(props: CCFormProps): React.ReactElement;

    export function CCField(options: CCFieldOptions): React.ForwardRefExoticComponent<CCFieldProps>;

    export function CCOutlet(options: CCOutletOptions): React.ForwardRefExoticComponent<CCOutletProps>;

    export const CCFormList: React.ForwardRefExoticComponent<CCFormListProps>;
}
