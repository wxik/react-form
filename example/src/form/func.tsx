/**
 * defaultShowCode: false
 * title: 表单方法调用
 * description: 通过 Form.useForm 对表单数据域进行交互。 使用 visible 动态控制字段显示或隐藏。
 */

import { CCForm } from '@guc/react-form';
import { Button, Input, Select } from 'antd';
import React from 'react';

import { Field } from '../components/Field';

export default () => {
  const [form] = CCForm.useForm();

  const handleOk = () => {
    if (form.validate()) {
      console.log('validate success: ', form.subData());
    } else {
      console.log('form data:', form.subData());
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleFill = () => {
    form.setFieldData({ note: 'Hello world!', gender: 'male' });
  };

  const handleGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldData({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldData({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldData({ note: 'Hi there!' });
        break;
      default:
    }
  };

  return (
    <CCForm form={form}>
      <div className={'flex flex-col w-lg cc-form-layout-col'}>
        <Field
          form={'note'}
          title={'Note'}
          rules={[{ required: true }]}
          labelClassName={'w-40 justify-end'}>
          <Input />
        </Field>
        <Field
          form={'gender'}
          title={'Gender'}
          rules={[{ required: true }]}
          labelClassName={'w-40 justify-end'}>
          <Select
            allowClear
            placeholder="Select a option and change input text above"
            onChange={handleGenderChange}
            className={'w-full'}
            options={[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
              { label: 'other', value: 'other' },
            ]}
          />
        </Field>
        <Field
          form={'customizeGender'}
          title={'Customize Gender'}
          rules={[{ required: true }]}
          visible={(data) => data['gender'] === 'other'}
          labelClassName={'w-40 justify-end'}>
          <Input />
        </Field>
        <div className={'flex gap-2 ml-40'}>
          <Button onClick={handleReset}>Reset</Button>
          <Button type={'primary'} onClick={handleOk}>
            Submit
          </Button>
          <Button type="link" htmlType="button" onClick={handleFill}>
            Fill form
          </Button>
        </div>
      </div>
    </CCForm>
  );
};
