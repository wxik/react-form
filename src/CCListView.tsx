/**
 *
 * @author wxik
 * @since 2023-06-12 16:47
 */
import type {FC, ReactNode} from 'react';
import {useContext} from 'react';

import {CCFormListContext, CCFormListViewContext} from './CCContext';
import {Types} from './helper';
import type {ICCListOperation} from './interface';
import type {CCListContext} from './interface';

export interface ICCListView {
  component?: (values: CCListContext, children: ReactNode) => ReactNode;
  provider?: (operation: ICCListOperation, children: ReactNode) => ReactNode;
  children: (operation: ICCListOperation) => ReactNode;
}

export const CCListView: FC<ICCListView> = (props) => {
  const {children, component, provider} = props;
  const context = useContext(CCFormListContext);

  if (!context || !children) return null;

  const {keys, form: formName, listInstance} = context;

  const viewContent = keys.map((key, index) => {
    const values: ICCListOperation = {
      ...context,
      form: Types.isBlank(formName) ? String(index) : `${formName}.${index}`,
      index,
      key,
      remove: listInstance.removeItem.bind(listInstance, index),
      add: listInstance.addItem.bind(listInstance),
      move: listInstance.moveItem.bind(listInstance),
    };
    const child = <CCFormListViewContext.Provider value={values} key={key} children={children(values)} />;
    return provider ? provider(values, child) : child;
  });
  return component ? component(context, viewContent) : <>{viewContent}</>;
};
