/**
 *
 * @author wxik
 * @since 2023-06-12 14:35
 */
import {createContext} from 'react';

import type {CCFieldWrapper} from './CCField';
import type {CCForm, CCFormData, ICCEmitter} from './CCForm';
import type {CCNamePath} from './CCForm';
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
  form: CCNamePath;
  listInstance: CCListWrapper;
  keys: string[];
  data: any[];
  length: number;
  formData: CCFormData;
}

export interface CCListViewContext extends CCListContext {
  form: CCNamePath;
  index: number;
  key: string;
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

export type ICCListOperation = CCListViewContext;

export const CCFormContext = createContext<ICCFormContext | null>(null);

export const CCFormListContext = createContext<CCListContext | null>(null);

export const CCFormListViewContext = createContext<CCListViewContext | null>(null);

export const CCFieldContext = createContext<ICCFieldContext>(DEFAULT_CONTEXT_VALUE as ICCFieldContext);
