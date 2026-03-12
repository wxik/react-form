/**
 * defaultShowCode: false
 * title: 基础使用
 * description: 动态表单数据域控制展示，包含布局、初始化、验证、提交。
 */

import { CCForm, CCList } from '@guc/react-form';
import { Button, Input } from 'antd';
import React, { useMemo } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

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

  const initialValue = useMemo(
    () => [
      { attrName: 'color', attrValue: 'red' },
      { attrName: 'size', attrValue: 'small' },
    ],
    [],
  );
  console.log('‼️LOG‼️', initialValue);

  return (
    <CCForm form={form}>
      <div className={'flex flex-col items-baseline'}>
        <CCList initialValue={initialValue}>
          {({ add, remove, index, length }) => (
            <div className={'flex gap-x-6 flex-wrap'}>
              <Field
                form={'attrName'}
                title={'Attribute name'}
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </Field>
              <Field
                form={'attrValue'}
                title={'Attribute value'}
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </Field>
              <div className={'flex items-center gap-2'}>
                <Button
                  onClick={() => add(void 0, index + 1)}
                  icon={<PlusIcon className="size-4" />}
                  shape="circle"
                  type="dashed"
                />
                <Button
                  disabled={length === 1}
                  onClick={() => remove()}
                  icon={<MinusIcon className="size-4" />}
                  shape="circle"
                  type="dashed"
                />
              </div>
            </div>
          )}
        </CCList>

        <Button type={'primary'} onClick={handleOk} className={'mt-2'}>
          Submit
        </Button>
      </div>
    </CCForm>
  );
};
