/**
 * 对于普通组件也可以注入表单数据
 * 1. 循环体中的行数据
 * 2. 表单整体数据
 * @author wxik
 * @since 2020-05-21 11:47
 */
import React from 'react';
import {CCFormListContext} from './CCFormList';
import {CCForm} from './CCForm';
import type {CCFieldProps} from './CCField';
import type {CCFormListConfig} from './CCFormList';

export function CCOutlet() {
  return function <T>(Target: React.ComponentType<CCFieldProps>) {
    return React.forwardRef<T, CCFieldProps>((props, ref) => (
      <CCFormListContext.Consumer>
        {(eachContext) => (
          <CCForm.Context.Consumer>
            {(fieldContext) => (
              <Target {...props} ref={ref} {...fieldContext} eachConfig={eachContext as CCFormListConfig} />
            )}
          </CCForm.Context.Consumer>
        )}
      </CCFormListContext.Consumer>
    ));
  };
}
