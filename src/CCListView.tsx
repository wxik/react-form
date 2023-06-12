/**
 *
 * @author pai.ic - zehua
 * @since 2023-06-12 16:47
 */
import type {FC, ReactNode} from 'react';
import {useContext} from 'react';

import type {CCListViewContext, ICCListOperation} from './CCContext';
import {CCFormListContext, CCFormListViewContext} from './CCContext';
import {Types} from './helper';

export interface ICCListView {
  children: (props: CCListViewContext) => ReactNode;
}

export const CCListView: FC<ICCListView> = (props) => {
  const {children} = props;
  const context = useContext(CCFormListContext);

  if (!context || !children) return null;

  const {keys, form: formName, listInstance} = context;

  return (
    <>
      {keys.map((key, index) => {
        const values: CCListViewContext = {
          ...context,
          form: Types.isBlank(formName) ? String(index) : `${formName}.${index}`,
          index,
          key,
          remove: listInstance.removeItem.bind(listInstance, index),
          add: listInstance.addItem.bind(listInstance),
          move: listInstance.moveItem.bind(listInstance),
        };
        return (
          <CCFormListViewContext.Provider value={values} key={key} children={children(values as ICCListOperation)} />
        );
      })}
    </>
  );
};
