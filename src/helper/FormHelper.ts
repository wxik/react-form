/**
 *
 * @author wxik
 * @since 2023-05-10 11:37
 */
import type {RefObject} from 'react';
import {createRef, useContext, useMemo, useRef} from 'react';

import {CCFormContext, CCFormListContext} from '../CCContext';
import type {CCForm} from '../CCForm';
import type {CCListWrapper} from '../CCList';
import type {CCFormData, CCFormInstance, CCListInstance, CCNamePath} from '../interface';

export const formHandler = (ref: RefObject<CCForm>): CCFormInstance => {
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
    setOriginData: (data: CCFormData | any[]) => {
      return ref.current?.setOriginData(data);
    },
    setFieldData: (data) => {
      return ref.current?.setFieldData(data);
    },
    addData: (data) => {
      return ref.current?.addData(data);
    },
    setData: (data) => {
      return ref.current?.setData(data);
    },
    // @ts-ignore
    __REF__: ref,
  };
};

const listHelder = (ref: RefObject<CCListWrapper>): CCListInstance => {
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
    __REF__: ref,
  };
};

export const createForm = (): CCFormInstance => {
  return formHandler(createRef<CCForm>());
};

export const useForm = (): [CCFormInstance] => {
  const ref = useRef<CCForm>(null);
  return [useMemo<CCFormInstance>(() => formHandler(ref), [])];
};

export const useFormInstance = (): CCFormInstance => {
  const {formInstance} = useContext(CCFormContext)!;
  const ref = useRef<CCForm>(formInstance);
  ref.current = formInstance;
  return useMemo<CCFormInstance>(() => formHandler(ref), []);
};

export const createList = (): CCListInstance => {
  return listHelder(createRef<CCListWrapper>());
};

export const useList = (): [CCListInstance] => {
  const ref = useRef<CCListWrapper>(null);
  return [useMemo<CCListInstance>(() => listHelder(ref), [])];
};

export const useListInstance = (): CCListInstance => {
  const {listInstance} = useContext(CCFormListContext)!;
  const ref = useRef<CCListWrapper>(listInstance);
  ref.current = listInstance;
  return useMemo<CCListInstance>(() => listHelder(ref), []);
};
