/**
 *
 * @author zehua.tang
 * @since 2023-06-12 16:47
 */
import type { FC } from 'react';
import { useContext } from 'react';

import { CCFormListContext, CCFormListItemContext } from './CCContext';
import { isBlank, isFunction } from './helper/Types';
import type { ICCListOperation, ICCListView } from './interface';

export const CCListView: FC<ICCListView> = (props) => {
  const { children, component, provider } = props;
  const context = useContext(CCFormListContext);

  if (!context || !children) return null;

  const { keys, name: formName, remove } = context;

  const viewContent = keys.map((key, index) => {
    const name = isBlank(formName) ? String(index) : `${formName}.${index}`;
    const values: ICCListOperation = {
      ...context,
      form: name,
      name,
      index,
      key,
      remove: (delIndex) => remove(delIndex ?? index),
    };
    const child = (
      <CCFormListItemContext.Provider
        value={values}
        key={key}
        children={isFunction(children) ? children(values) : children}
      />
    );
    return provider ? provider(values, child) : child;
  });
  return component ? component(context, viewContent) : <>{viewContent}</>;
};
