/**
 *
 * @author wxik
 * @since 2023-05-10 11:37
 */
import type {MutableRefObject} from 'react';
import {createRef, useContext, useMemo, useRef} from 'react';

import {CCFormContext, CCFormListContext} from '../CCContext';
import type {CCForm} from '../CCForm';
import type {CCListWrapper} from '../CCList';
import type {CCFormData, CCFormInstance, CCListInstance, CCNamePath} from '../interface';
import {isArray} from './Types';

export const formHandler = (ref: MutableRefObject<CCForm | undefined>): CCFormInstance => {
  let tmpData: {originData?: CCFormData; fieldData?: CCFormData} = {};
  return {
    subData: (options) => {
      return ref.current?.subData(options)!;
    },
    validate: () => {
      return ref.current?.validate()!;
    },
    asyncValidate: async () => {
      return await ref.current?.asyncValidate()!;
    },
    validateErrors: (paths?: CCNamePath[]) => {
      return ref.current?.validateErrors(paths)!;
    },
    asyncValidateErrors: async (paths?: CCNamePath[]) => {
      return ref.current?.asyncValidateErrors(paths)!;
    },
    resetFields: (paths?: CCNamePath[]) => {
      return ref.current?.resetFields(paths)!;
    },
    setOriginData: (data: CCFormData | any[]) => {
      const { current } = ref;
      if (current) {
        current.setOriginData(data);
      } else {
        tmpData.originData = isArray(data) ? data : Object.assign({}, tmpData.originData, data);
      }
    },
    setFieldData: (data) => {
      const { current } = ref;
      if (current) {
        current.setFieldData(data);
      } else {
        tmpData.fieldData = isArray(data) ? data : Object.assign({}, tmpData.fieldData, data);
      }
    },
    addData: (data) => {
      return ref.current?.addData(data);
    },
    setData: (data) => {
      return ref.current?.setData(data);
    },
    // @ts-ignore
    __REF__: {
      mount: (target: CCForm) => {
        const { originData, fieldData } = tmpData;
        ref.current = target;
        if (originData) target.setOriginData(originData);
        if (fieldData) target.setFieldData(fieldData);
        tmpData = {};
      },
      unmount: () => {
        ref.current = void 0;
        tmpData = {};
      },
    },
  };
};

const listHelder = (ref: MutableRefObject<CCListWrapper | undefined>): CCListInstance => {
  return {
    add: (value?: any, insertIndex?: number) => {
      return ref.current?.addItem(value, insertIndex);
    },
    remove: (index: number | number[]) => {
      return ref.current?.removeItem(index);
    },
    move: (from: number, to: number) => {
      return ref.current?.moveItem(from, to);
    },
    setData: (data: any[]) => {
      return ref.current?.setData(data);
    },
    getData: () => {
      return ref.current?.getData();
    },
    getSize: () => {
      return ref.current?.getData().length || 0;
    },
    // @ts-ignore
    __REF__: {
      mount: (target: CCListWrapper) => (ref.current = target),
      unmount: () => (ref.current = void 0),
    },
  };
};

export const createForm = (): CCFormInstance => {
  return formHandler(createRef() as MutableRefObject<CCForm>);
};

export const useForm = (): [CCFormInstance] => {
  const ref = useRef<CCForm>();
  return [useMemo<CCFormInstance>(() => formHandler(ref), [])];
};

export const useFormInstance = (): CCFormInstance => {
  const {formInstance} = useContext(CCFormContext)!;
  const ref = useRef<CCForm>(formInstance);
  ref.current = formInstance;
  return useMemo<CCFormInstance>(() => formHandler(ref), []);
};

export const createList = (): CCListInstance => {
  return listHelder(createRef() as MutableRefObject<CCListWrapper>);
};

export const useList = (): [CCListInstance] => {
  const ref = useRef<CCListWrapper>();
  return [useMemo<CCListInstance>(() => listHelder(ref), [])];
};

export const useListInstance = (): CCListInstance => {
  const {listInstance} = useContext(CCFormListContext)!;
  const ref = useRef<CCListWrapper>(listInstance);
  ref.current = listInstance;
  return useMemo<CCListInstance>(() => listHelder(ref), []);
};
