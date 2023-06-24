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

export interface ICCListView {
  children: (props: ICCListOperation) => ReactNode;
}

export const CCListView: FC<ICCListView> = (props) => {
  const {children} = props;
  const context = useContext(CCFormListContext);

  if (!context || !children) return null;

  const {keys, form: formName, listInstance} = context;

  return (
    <>
      {keys.map((key, index) => {
        const values: ICCListOperation = {
          ...context,
          form: Types.isBlank(formName) ? String(index) : `${formName}.${index}`,
          index,
          key,
          remove: listInstance.removeItem.bind(listInstance, index),
          add: listInstance.addItem.bind(listInstance),
          move: listInstance.moveItem.bind(listInstance),
        };
        return <CCFormListViewContext.Provider value={values} key={key} children={children(values)} />;
      })}
    </>
  );
};
