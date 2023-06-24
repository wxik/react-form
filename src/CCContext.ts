/**
 *
 * @author wxik
 * @since 2023-06-12 14:35
 */
import {createContext} from 'react';

import type {CCListContext, CCListViewContext, ICCFieldContext, ICCFormContext} from './interface';

const DEFAULT_CONTEXT_VALUE = {
  visible: true,
};

export const CCFormContext = createContext<ICCFormContext | null>(null);

export const CCFormListContext = createContext<CCListContext | null>(null);

export const CCFormListViewContext = createContext<CCListViewContext | null>(null);

export const CCFieldContext = createContext<ICCFieldContext>(DEFAULT_CONTEXT_VALUE as ICCFieldContext);
