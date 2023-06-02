/**
 * 表单字段处理
 * @author Quia (zehua.tang)
 * @since 2023-05-12 11:27
 */
import {Types} from '@wxik/core';
import type {ICCField} from '@wxik/react-form';
import {CCField} from '@wxik/react-form';
import cls from 'classnames';
import type {FC, ReactElement} from 'react';
import {Children, cloneElement, useMemo} from 'react';

// @ts-ignore
import styles from './index.module.css';

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
    antd,
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

  const forProps = () => {
    const cProps: Record<string, any> = {
      onChange: handleChange,
      [valueKey]: Types.isNumber(value) ? String(value) : value,
      disabled,
    };
    if (antd) {
      cProps.status = error ? 'error' : void 0;
    } else {
      cProps.isInvalid = error;
    }
    return cProps;
  };

  // console.log('Field:', value);
  const element = childCount === 1 ? cloneElement(children as ReactElement, forProps()) : children;
  return (
    <div className={cls(styles.itemWarp, className, !visible && '!atom-hidden')}>
      {title ? (
        <div
          className={cls(
            styles.item,
            warpClassName,
            layout === 'horizontal'
              ? styles.horizontal
              : layout === 'vertical'
              ? styles.vertical
              : styles.defaultLayout,
          )}>
          <label className={cls(styles.itemLabel, required && styles.requiredMarkOptional, labelClassName)}>
            {title}
          </label>
          {element}
        </div>
      ) : (
        element
      )}

      {errors && (
        <div className={cls(styles.errorWarp, errorClassName)}>
          {errors.map((it, ix) => (
            <div key={`${ix}-${it}`} className={cls(styles.error)}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
