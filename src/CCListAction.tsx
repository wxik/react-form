/**
 *
 * @author wxik
 * @since 2023-06-12 17:18
 */
import type {FC, ReactNode} from 'react';
import {useContext} from 'react';

import {CCFormListContext} from './CCContext';
import type {ICCListActionOperation} from './interface';

export interface ICCListAction {
  children: (props: ICCListActionOperation) => ReactNode;
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
