/**
 * defaultShowCode: false
 * title: 拖动排序
 * description: 可拖动排序的动态表单数据域控制展示。
 */

import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { CCForm, CCList } from '@guc/react-form';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Button, Input } from 'antd';
import cls from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

import { CCItem } from '../components/Item';
import { Operation } from './components/Operation';

const SortableItem = () => {
  const { index, key, length } = CCList.useItem();
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);

  const disabled = length === 1;

  useSortable({ id: key, index, element, handle: handleRef, disabled });

  return (
    <div className={'flex gap-x-6 flex-wrap'} ref={setElement}>
      <Button
        ref={handleRef}
        disabled={disabled}
        icon={<EllipsisVerticalIcon className="size-4" />}
        className={cls('self-center', !disabled && 'cursor-grab')}
      />
      <CCItem name={'attrName'} title={'Attribute name'} rules>
        <Input className={'w-60'} />
      </CCItem>
      <CCItem name={'attrValue'} title={'Attribute value'} rules>
        <Input className={'w-60'} />
      </CCItem>
      <Operation />
    </div>
  );
};

export default () => {
  const [form] = CCForm.useForm();
  const [formList] = CCForm.useList();

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
      { attrName: 'model', attrValue: 'Apple' },
    ],
    [],
  );

  const handleDragEnd: DragEndEvent = (event) => {
    const { target, source, canceled } = event.operation;
    if (!source || !target || canceled) return;

    const { initialIndex, index } = source as Record<string, any>;
    if (initialIndex !== index) {
      formList.move(initialIndex, index);
    }

    console.log('‼️LOG‼️', `from: ${initialIndex} to ${index}`);
  };

  return (
    <CCForm form={form}>
      <div className={'flex flex-col items-baseline'}>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <CCList formList={formList} initialValue={initialValue}>
            <CCList.View>
              <SortableItem />
            </CCList.View>
          </CCList>
        </DragDropProvider>

        <Button type={'primary'} onClick={handleOk} className={'mt-2'}>
          Submit
        </Button>
      </div>
    </CCForm>
  );
};
