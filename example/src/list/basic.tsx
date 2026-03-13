/**
 * defaultShowCode: false
 * title: 基础使用
 * description: 动态表单数据域控制展示，包含布局、初始化、验证、提交。
 */

import { CCForm, CCList } from '@guc/react-form';
import { Button, Input } from 'antd';
import React, { useMemo } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { CCItem } from '../components/Item';
import { Operation } from './components/Operation';

export default () => {
  const [form] = CCForm.useForm();

  const handleOk = () => {
    if (form.validate()) {
      console.log('validate success: ', form.subData());
    } else {
      console.log('form data:', form.subData());
    }
  };

  const initialValue = useMemo(
    () => [
      { attrName: 'color', attrValue: 'red' },
      { attrName: 'size', attrValue: 'small' },
    ],
    [],
  );

  return (
    <CCForm form={form}>
      <div className={'flex flex-col items-baseline'}>
        <CCList initialValue={initialValue}>
          <CCList.View>
            <div className={'flex gap-x-6 flex-wrap'}>
              <CCItem
                name={'attrName'}
                title={'Attribute name'}
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </CCItem>
              <CCItem
                name={'attrValue'}
                title={'Attribute value'}
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </CCItem>
              <Operation />
            </div>
          </CCList.View>
        </CCList>

        <Button type={'primary'} onClick={handleOk} className={'mt-2'}>
          Submit
        </Button>
      </div>
    </CCForm>
  );
};
