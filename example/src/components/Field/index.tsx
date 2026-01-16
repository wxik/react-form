/**
 * 表单字段处理
 * @author zehua.tang
 * @since 2023-05-12 11:27
 */
import './index.css';

import { CCField, CCTypes } from '@guc/react-form';
import cls from 'clsx';
import type { ReactElement } from 'react';
import { Children, cloneElement, useMemo } from 'react';

interface IChildProps {
  onChange?: any;
  disabled?: boolean;
  status?: string;
}

export interface IFieldProps {
  children?: ReactElement<IChildProps> | ReactElement<IChildProps>[];
  className?: string;
  warpClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  layout?: 'horizontal' | 'vertical';
  fieldNames?: {
    value?: string;
  };
  noStyle?: boolean;
  prefix?: string;
  colon?: boolean;
}

export const Field = CCField<IFieldProps>()((props) => {
  const {
    value,
    onChange,
    title,
    error,
    errors,
    disabled,
    required,
    children,
    className,
    warpClassName,
    labelClassName,
    errorClassName,
    layout,
    visible,
    fieldNames = {},
    noStyle,
    prefix = 'cc-form',
    colon = true,
  } = props;
  const isNotTitle = CCTypes.isUndefined(title);
  const { value: valueKey = 'value' } = fieldNames;

  const childCount = useMemo(() => {
    return Children.count(children);
  }, [children]);

  const handleChange = (...args: any[]) => {
    // @ts-ignore
    onChange(...args);
    if (childCount && children && 'props' in children) {
      children.props.onChange?.(...args);
    }
  };

  const element =
    childCount === 1
      ? cloneElement(children as ReactElement<IChildProps>, {
          onChange: handleChange,
          [valueKey]: value,
          disabled,
          status: error ? 'error' : void 0,
        })
      : children;

  const content = (
    <div className={cls('cc-form-item-content', isNotTitle && warpClassName)}>
      {element}
      <div className={cls(`${prefix}-error-warp`, noStyle && 'no-style', errorClassName)}>
        {errors &&
          errors.map((it, ix) => (
            <div key={`${ix}-${it}`} className={`${prefix}-error`}>
              {it}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className={cls(`${prefix}-item-warp`, className, !visible && `${prefix}-hidden`)}>
      {!isNotTitle ? (
        <div
          className={cls(
            `${prefix}-item`,
            warpClassName,
            layout === 'horizontal'
              ? `${prefix}-horizontal`
              : layout === 'vertical'
                ? `${prefix}-vertical`
                : `${prefix}-default-layout`,
          )}>
          <label
            className={cls(
              `${prefix}-item-label`,
              colon && `${prefix}-colon`,
              !CCTypes.isNull(title) && required && `${prefix}-required-optional`,
              labelClassName,
            )}>
            {title}
          </label>
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
});

export const HideField = CCField()(() => {
  return null;
});
