/**
 * defaultShowCode: true
 * title: Hooks 中使用
 */

import {CCForm} from '@wxik/react-form';

import {Input} from './Input';

export default () => {
  const [form] = CCForm.useForm();

  const handleOk = () => {
    console.log('表单数据:', form.subData());
  };

  return (
    <CCForm form={form}>
      <div className={'flex gap-2'}>
        <Input form={'name'} initialValue={'hooks'} title={'Name'} />
        <button onClick={handleOk}>Submit</button>
      </div>
    </CCForm>
  );
};
