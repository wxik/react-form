import {CCField} from '@wxik/react-form';

interface IProps {
  type?: string;
}

export const Input = CCField<IProps>()((props) => {
  const {title, value = '', onChange, type = 'text'} = props;
  return (
    <>
      <span>{title}:</span>
      <input value={value} onChange={onChange} type={type} />
    </>
  );
});
