/**
 *
 * @author Quia (zehua.tang)
 * @since 2023-05-10 11:37
 */
import type {RefObject} from 'react';
import {createRef, useMemo, useRef} from 'react';

import type {CCForm, CCFormData, FormInstance} from '../CCForm';
import type {CCListWrapper} from '../CCList';
import type {ListInstance} from '../CCList';

const formHandler = (ref: RefObject<CCForm>): FormInstance => {
  return {
    subData: (options: {merge?: boolean} = {}) => {
      return ref.current?.subData(options)!;
    },
    validate: () => {
      return ref.current?.validate()!;
    },
    setOriginData: (data: CCFormData | any[]) => {
      return ref.current?.setOriginData(data);
    },
    setFieldData: (data: CCFormData | any[]) => {
      return ref.current?.setFieldData(data);
    },
    addData: (data: CCFormData) => {
      return ref.current?.addData(data);
    },
    setData: (data: CCFormData) => {
      return ref.current?.setData(data);
    },
    // @ts-ignore
    __REF__: ref,
  };
};

const listHelder = (ref: RefObject<CCListWrapper>): ListInstance => {
  return {
    addItem: (value?: any) => {
      return ref.current?.addItem(value);
    },
    removeItem: (index: number) => {
      return ref.current?.removeItem(index);
    },
    setData: (data: any[]) => {
      return ref.current?.setData(data);
    },
    // @ts-ignore
    __REF__: ref,
  };
};

export const createForm = () => {
  return formHandler(createRef<CCForm>());
};

export const useForm = (): [FormInstance] => {
  const ref = useRef<CCForm>(null);
  return [useMemo<FormInstance>(() => formHandler(ref), [])];
};

export const createList = () => {
  return listHelder(createRef<CCListWrapper>());
};

export const useList = (): [ListInstance] => {
  const ref = useRef<CCListWrapper>(null);
  return [useMemo<ListInstance>(() => listHelder(ref), [])];
};
