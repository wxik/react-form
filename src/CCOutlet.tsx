/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author Quia
 * @since 2020-05-21 11:47
 */
import type {ComponentType, ForwardRefExoticComponent, PropsWithoutRef, ReactElement, RefAttributes} from 'react';
import {cloneElement, forwardRef} from 'react';

import {CCFormListViewContext} from './CCContext';
import {CCForm} from './CCForm';
import type {CCListContext, ICCFormContext} from './interface';

export interface ICCOutlet extends ICCFormContext {
  eachConfig?: CCListContext;
}

export interface IOutlet {
  children: ReactElement;
  forProps?: (props: ICCOutlet) => Record<string, any>;
}

export function CCOutlet<P = {}, T = any>() {
  return function (
    Target: ComponentType<P & ICCOutlet>,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
    return forwardRef<T, P>((props, ref) => (
      <CCFormListViewContext.Consumer>
        {(eachContext) => (
          <CCForm.Context.Consumer>
            {(fieldContext) => <Target {...props} ref={ref} {...fieldContext!} eachConfig={eachContext || void 0} />}
          </CCForm.Context.Consumer>
        )}
      </CCFormListViewContext.Consumer>
    ));
  };
}

export const CCOutletView = CCOutlet<IOutlet>()((props) => {
  const {children, forProps, ...rest} = props;
  return cloneElement(children, forProps ? forProps(rest) : rest);
});
