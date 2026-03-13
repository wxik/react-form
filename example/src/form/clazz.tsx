/**
 * title: Class 中使用
 * description: 通过 union 和 unionValue 实现2个字段双向关联
 */

import { CCForm } from '@guc/react-form';
import { Button, Input } from 'antd';
import React, { Component } from 'react';

import { CCItem } from '../components/Item';

export default class extends Component {
  form = CCForm.createForm();

  onOk = () => {
    console.log('form data:', this.form.subData());
  };

  onReset = () => {
    this.form.resetFields();
  };

  render() {
    return (
      <CCForm form={this.form} initialValue={{ name: 'union', 'user.name': '2424' }}>
        <div className={'flex gap-8 cc-form-layout-col'}>
          <CCItem form={'name'} title={'Name'} union={'name'} unionValue={(v) => v}>
            <Input className={'w-3xs'} />
          </CCItem>
          <CCItem form={'name'} title={'Name'} union={'name'} unionValue={(v) => v}>
            <Input className={'w-3xs'} />
          </CCItem>
          <div className={'flex gap-2'}>
            <Button onClick={this.onReset}>Reset</Button>
            <Button type={'primary'} onClick={this.onOk}>
              Submit
            </Button>
          </div>
        </div>
      </CCForm>
    );
  }
}
