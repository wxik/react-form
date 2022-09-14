/**
 * @author wxik
 * @since 2020-05-21 11:47
 */
import React from 'react';
import {CCFormList} from './CCFormList';
import {CCForm} from './CCForm';

export function CCOutlet(options = {}) {
  return function (Target) {
    return React.forwardRef((props, ref) => (
      <CCFormList.Context.Consumer>
        {(eachContext) => (
          <CCForm.Context.Consumer>
            {(fieldContext) => <Target {...props} ref={ref} {...fieldContext} eachConfig={eachContext} />}
          </CCForm.Context.Consumer>
        )}
      </CCFormList.Context.Consumer>
    ));
  };
}
