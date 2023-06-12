/**
 *
 * @author pai.ic - zehua
 * @since 2023-06-12 17:18
 */
import type {FC, ReactNode} from 'react';
import {useContext} from 'react';

import type {CCListContext} from './CCContext';
import {CCFormListContext} from './CCContext';

interface ListAction extends CCListContext {
  remove: (index: number | number[]) => void;
  add: (item?: any, insertIndex?: number) => void;
  move: (from: number, to: number) => void;
}

export interface ICCListAction {
  children: (props: ListAction) => ReactNode;
}

export const CCListAction: FC<ICCListAction> = (props) => {
  const {children} = props;
  const context = useContext(CCFormListContext);
  if (!context) return null;
  const {listInstance} = context;

  const values = {
    ...context,
    remove: listInstance.removeItem,
    add: listInstance.addItem,
    move: listInstance.moveItem,
  };
  return <>{children(values)}</>;
};
