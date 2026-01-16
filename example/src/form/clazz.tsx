/**
 * title: Class 中使用
 */

import { CCForm } from '@guc/react-form';
import { Button, Input } from 'antd';
import React, { Component } from 'react';

import { Field } from '../components/Field';

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
      <CCForm form={this.form}>
        <div className={'flex gap-8 cc-form-layout-col'}>
          <Field form={'name'} initialValue={'hooks'} title={'Name'}>
            <Input className={'w-3xs'} />
          </Field>
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
