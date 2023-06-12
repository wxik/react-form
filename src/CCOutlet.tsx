/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author Quia
 * @since 2020-05-21 11:47
 */
import type {ComponentType, ReactElement} from 'react';
import {cloneElement, forwardRef} from 'react';

import type {CCListContext, ICCFormContext} from './CCContext';
import {CCFormListContext} from './CCContext';
import {CCForm} from './CCForm';

export interface ICCOutlet extends ICCFormContext {
  eachConfig?: CCListContext;
}

export interface IOutlet {
  children: ReactElement;
  forProps?: (props: ICCOutlet) => Record<string, any>;
}

export function CCOutlet<T = {}, P = any>() {
  return function (Target: ComponentType<T & ICCOutlet>) {
    return forwardRef<P, T>((props, ref) => (
      <CCFormListContext.Consumer>
        {(eachContext) => (
          <CCForm.Context.Consumer>
            {(fieldContext) => <Target {...props} ref={ref} {...fieldContext!} eachConfig={eachContext || void 0} />}
          </CCForm.Context.Consumer>
        )}
      </CCFormListContext.Consumer>
    ));
  };
}

CCOutlet.View = CCOutlet<IOutlet>()((props) => {
  const {children, forProps, ...rest} = props;
  return cloneElement(children, forProps ? forProps(rest) : rest);
});
