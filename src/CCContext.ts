/**
 *
 * @author pai.ic - zehua
 * @since 2023-06-12 14:35
 */
import {createContext} from 'react';

import type {CCFieldWrapper} from './CCField';
import type {CCForm, CCFormData, ICCEmitter} from './CCForm';
import type {CCListWrapper} from './CCList';

export interface ICCFormContext {
  data: CCFormData;
  originData: CCFormData;
  initialValue?: CCFormData;
  emitter?: ICCEmitter;
  formInstance: CCForm;
  disabled: boolean;
}

export interface CCListContext {
  listInstance: CCListWrapper;
  form: string;
  index: number;
  key: string;
  length: number;
  data: any[];
  formData: CCFormData;
  remove: () => void;
  add: (item?: any, insertIndex?: number) => void;
  move: (from: number, to: number) => void;
}

export interface ICCFieldContext {
  fieldInstance: CCFieldWrapper;
  visible: boolean;
}

const DEFAULT_CONTEXT_VALUE = {
  visible: true,
};

export type CCListOperation = CCListContext;

export const CCFormContext = createContext<ICCFormContext | null>(null);

export const CCFormListContext = createContext<CCListContext | null>(null);

export const CCFieldContext = createContext<ICCFieldContext>(DEFAULT_CONTEXT_VALUE as ICCFieldContext);
