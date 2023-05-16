/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author Quia
 * @since 2020-05-21 11:47
 */
import type {ReactElement} from 'react';
import React from 'react';

import type {ICCFormContext} from './CCForm';
import {CCForm} from './CCForm';
import type {CCListOperation} from './CCList';
import {CCFormListContext} from './CCList';

export interface ICCOutlet extends ICCFormContext {
  eachConfig?: CCListOperation;
}

export interface IOutlet {
  children: ReactElement;
  forProps?: (props: ICCOutlet) => Record<string, any>;
}

export function CCOutlet<T = {}, P = any>() {
  return function (Target: React.ComponentType<T & ICCOutlet>) {
    return React.forwardRef<P, T>((props, ref) => (
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
  return React.cloneElement(children, forProps ? forProps(rest) : rest);
});
