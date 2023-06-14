/**
 * title: Class 中使用
 */

import {CCForm} from '@wxik/react-form';
import {Component} from 'react';

import {Input} from './Input';

export default class extends Component {
  form = CCForm.createForm();

  handleOk = () => {
    console.log('表单数据:', this.form.subData());
  };

  render() {
    return (
      <CCForm form={this.form}>
        <div className={'flex gap-2'}>
          <Input form={'came'} title={'Came'} />
          <button onClick={this.handleOk}>Submit</button>
        </div>
      </CCForm>
    );
  }
}
