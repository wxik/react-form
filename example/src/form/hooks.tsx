/**
 * defaultShowCode: false
 * title: 基本使用
 * description: 基本的表单数据域控制展示，包含布局、初始化、验证、提交。
 */

import { CCForm } from '@guc/react-form';
import { Button, Input } from 'antd';
import React from 'react';

import { Field } from '../components/Field';

export default () => {
  const [form] = CCForm.useForm();

  const handleOk = () => {
    if (form.validate()){
      console.log('validate success: ', form.subData());
    } else {
      console.log('form data:', form.subData());
    }
  };

  return (
    <CCForm form={form}>
      <div className={'flex flex-col w-80'}>
        <Field
          form={'name'}
          initialValue={'admin'}
          title={'Username'}
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Field>
        <Field
          form={'password'}
          initialValue={'admin'}
          title={'Password'}
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Field>
        <Button type={'primary'} onClick={handleOk} className={'w-full mt-2'}>
          Login
        </Button>
      </div>
    </CCForm>
  );
};
