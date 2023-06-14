/**
 * 表单字段处理
 * @author Quia (zehua.tang)
 * @since 2023-05-12 11:27
 */
import './index.css';

import type {ICCField} from '@wxik/react-form';
import {CCField} from '@wxik/react-form';
import cls from 'classnames';
import type {FC, ReactElement} from 'react';
import {Children, cloneElement, useMemo} from 'react';

interface IFieldProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  warpClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  layout?: 'horizontal' | 'vertical';
  fieldNames?: {
    value?: string;
  };
  antd?: boolean;
  fieldType?: string;
  fieldProps?: Record<string, any>;
}

export type IField = IFieldProps & ICCField;

export const LayoutHorizontal = 'layout-horizontal';

export const Field: FC<IField> = CCField<IFieldProps>()((props) => {
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
  } = props;
  const {value: valueKey = 'value'} = fieldNames;

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

  // console.log('Field:', value);
  const element =
    childCount === 1
      ? cloneElement(children as ReactElement, {
          onChange: handleChange,
          [valueKey]: value,
          disabled,
          status: error ? 'error' : void 0,
        })
      : children;
  return (
    <div className={cls('form-item-warp', className, !visible && 'form-hidden')}>
      {title ? (
        <div
          className={cls(
            'form-item',
            warpClassName,
            layout === 'horizontal'
              ? 'form-horizontal'
              : layout === 'vertical'
              ? 'form-vertical'
              : 'form-default-layout',
          )}>
          <label className={cls('form-item-label', required && 'required-mark-optional', labelClassName)}>
            {title}
          </label>
          {element}
        </div>
      ) : (
        element
      )}

      {errors && (
        <div className={cls('form-error-warp', errorClassName)}>
          {errors.map((it, ix) => (
            <div key={`${ix}-${it}`} className={'form-error'}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
