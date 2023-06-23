/**
 *
 * @author wxik
 * @since 2023-06-14 00:55
 */
import cls from 'classnames';
import type {SyntheticEvent} from 'react';

interface IProps {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void;
  status?: 'error';
}
export function Input(props: IProps) {
  const {value = '', placeholder, onChange, status, disabled} = props;
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cls(
        'caret-[#298df8] border text-sm rounded-md focus:ri border-[#f2f2f3] bg-[#f6f7f8] border-solid px-2 h-9 hover:border-[#298df8]',
        status === 'error' && '!border-[#ff6161]',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    />
  );
}
