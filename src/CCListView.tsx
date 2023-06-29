/**
 *
 * @author wxik
 * @since 2023-06-12 16:47
 */
import type {FC} from 'react';
import {useContext} from 'react';

import {CCFormListContext, CCFormListViewContext} from './CCContext';
import {Types} from './helper';
import type {ICCListOperation, ICCListView} from './interface';

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
