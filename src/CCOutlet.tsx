/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author Quia
 * @since 2020-05-21 11:47
 */
import React from 'react';

import type {CCFormContextValue} from './CCForm';
import {CCForm} from './CCForm';
import type {CCFormListConfig} from './CCFormList';
import {CCFormListContext} from './CCFormList';

export interface CCOutletProps extends CCFormContextValue {
  eachConfig: CCFormListConfig;
}

export function CCOutlet() {
  return function <T, P extends CCOutletProps>(Target: React.ComponentType<P>) {
    return React.forwardRef<T, P>((props, ref) => (
      <CCFormListContext.Consumer>
        {(eachContext) => (
          <CCForm.Context.Consumer>
            {(fieldContext) => <Target {...props} ref={ref} {...fieldContext} eachConfig={eachContext!} />}
          </CCForm.Context.Consumer>
        )}
      </CCFormListContext.Consumer>
    ));
  };
}
