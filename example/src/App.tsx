/**
 *
 * @author wxik
 * @sine 2020-04-16 10:14
 */
import '@ibot/ibot/lib/root/index.css';
import '@ibot/ibot/lib/radio/index.css';
import '@ibot/ibot/lib/check/index.css';
import './assets/rc-select.pcss';

import {TrashIcon} from '@heroicons/react/24/outline';
// @ts-ignore
import {CheckGroup as ICheckGroup} from '@ibot/ibot/lib/check';
// @ts-ignore
import {RadioGroup as IRadioGroup} from '@ibot/ibot/lib/radio';
import type {CCFormData} from '@wxik/react-form';
import {CCField, CCForm, CCListAction, CCListView, CCOutletView} from '@wxik/react-form';
import Select from 'rc-select';
import React, {useEffect} from 'react';

import {Input} from './components/Input';
import type {IField} from './Field';
import {Field} from './Field';

class App extends React.Component<any> {
  form = CCForm.createForm();
  list2 = CCForm.createList();
  list1 = CCForm.createList();
  config: Array<IField>;
  formList: Array<IField>;

  private uuid = 0;

  state = {
    initialValue: {
      select: 'java',
      radio: 'on',
      sl: [{c: ['Award Name 1', '32']}, {c: ['Award Name 2', 'aw 2']}],
      job: Array(4)
        .fill({
          id: 1,
          name: 'c',
        })
        .map((it, ix) => ({...it, name: 'c' + ix, a: ix, id: ix % 3})),
    },
  };

  constructor(props: any) {
    super(props);
    this.config = [
      {
        form: `name`,
        alias: 'alias',
        title: 'T - name ',
        initialValue: 'T - Name',
        onChange: (v: any) => console.log(v),
        rules: [
          {
            required: (formData, {status, selfStatus}) => {
              return status.name2?.validate !== true || !!selfStatus.validate;
            },
            message: '请输入名称',
          },
          {pattern: /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/, message: '请输入数值 - 正则'},
          (data: CCFormData) => {
            const valid = /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/.test(data.name);
            return valid || '请输入数值 - 方法处理';
          },
        ],
      },
      {
        form: `name2`,
        title: 'T - name 2',
        rules: [
          {
            required: (formData, {status, selfStatus}) => {
              return status.name?.validate !== true || !!selfStatus.validate;
            },
            message: '请输入名称',
          },
          {pattern: /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/, message: '请输入数值 - 正则'},
        ],
      },
    ];
    Array(2)
      .fill(1)
      .forEach((da, dx) => {
        this.config.push({
          form: `test.` + dx,
          title: 'T - name ' + dx,
          initialValue: 'T - Name ' + dx,
        });
      });

    this.formList = [
      {
        form: `a`,
        title: 'a',
        initialValue: 'a',
        rules: true,
      },
      {
        form: `b`,
        title: 'Name 2 - ',
        initialValue: 'name - b',
        // union: ({form}) => [`${form}.a`, [`${form}.sex`, (value, {form, data}) => Number(value) * 2]],
        union: ({form}) => `${form}.a`,
        unionValue: (value, {val, data, form}) => (value == 2 ? val : value),
        rules: true,
      },
      {
        form: 'sex',
        title: 'Sex',
        rules: true,
        initialValue: Math.random(),
        union: ({form}) => [`${form}.b`],
        disabled: (data: CCFormData, {form}) => data[`${form}.a`] == 2,
      },
      {
        form: 'id',
        title: '下拉(Object)',
        inline: false,
        transform: (da) =>
          da && {
            c_id: da.id,
            c_name: da.value,
          },
        convertValue: (da) =>
          da && {
            id: da.id,
            value: da.name,
          },
        forValue: (value) => value?.id,
        normalize: (v: any, {args}) => args[0]?.data,
        antd: true,
        label: 'value',
        fieldType: 'select',
        fieldProps: {
          options: [
            {label: '对弈', value: 0, data: {id: 0, value: '对弈'}},
            {label: '对弈 - 1', value: 1, data: {id: 1, value: '对弈 - 1'}},
            {label: '对弈 - 2', value: 2, data: {id: 2, value: '对弈 - 2'}},
          ],
        },
      },
      {
        form: 'sex2',
        title: 'Sex 2 - ',
        rules: [/^[1-9]\d*$/, {required: (data, {form}) => data[`${form}.a`] == 3}],
        visible: (data, {form}) => data[`${form}.a`] != 2,
      },
    ];
    console.time('App');
    // console.profile('App');
  }

  componentDidMount() {
    setTimeout(() => {
      // console.profileEnd('App');
      console.timeEnd('App');
    });
  }

  count() {
    if (this.form.validate()) {
      console.log('验证>>', this.form.subData({merge: true}));
    } else {
      console.log('<>', this.form.subData());
    }
    // this.setState({data});
  }

  async countAsync() {
    try {
      const valid = await this.form.asyncValidateErrors(['des']);
      console.log('异步验证:', valid, this.form.subData());
    } catch (e) {
      console.log('-----');
    }
  }

  inject() {
    this.form.setOriginData({
      // name: 'Inject Name: ' + Math.random(),
      alias: 'Inject Alias ' + Math.random(),
      sb: ['76656', '654'],
      check_group: ['react'],
      select: 'react',
      select2: {key: 2, value: '2'},
      sl: [{c: [Math.random(), '----324---' + Math.random()]}],
      job: Array(1).fill({
        id: 2,
        name: 'c',
        sex: Math.random(),
        sex2: 'test',
      }),
    });
  }

  genUUID() {
    return ++this.uuid;
  }

  addList2() {
    this.list2.add({sex2: 'test', sex: Math.random()}, 0);
  }

  addList1(length: number) {
    const name = `Award Name ${length + 1}`;
    this.list1.add({c: [name], name});
  }

  validateItem = (data: any, options: any) => {
    console.log(data, options);
    return new Promise((resolve) => {
      console.log('validateItem');
      setTimeout(() => {
        console.log('validateItem');
        resolve('异步验证错误');
      }, 1000);
    });
  };

  render() {
    let that = this;
    const {initialValue} = that.state;
    return (
      <div className={'flex w-full justify-center overflow-auto p-5 flex-col'}>
        <CCForm form={that.form} initialValue={initialValue} disabled={false}>
          <div style={styles.form}>
            {that.config.map((config, index) => (
              <Field key={config.form} {...config}>
                <Input />
              </Field>
            ))}
          </div>
          <div className={'flex gap-4'}>
            <Field
              form={'check_group'}
              title={'多选'}
              initialValue={[]}
              normalize={(value) => value.valueList}
              fieldNames={{value: 'valueList'}}>
              <ICheckGroup
                placeholder="请选择"
                optionList={[
                  {label: 'Java', value: 'java'},
                  {label: 'React', value: 'react'},
                  {label: 'Vue', value: 'vue'},
                ]}
              />
            </Field>
            <Field
              form={'select2'}
              title={'对象'}
              unique={'value'}
              antd
              forValue={(data) => data?.value}
              normalize={(value) => ({value, key: value})}>
              <Select
                className={'w-44'}
                placeholder="请选择"
                options={[
                  {label: '驱逐舰', value: '1'},
                  {label: '大和舰', value: '2'},
                  {label: '凯利拉克', value: '3'},
                ]}
              />
            </Field>
          </div>
          <div style={styles.form}>
            <Field form={'radio'} title={'是否选择科目'} normalize={(data) => data?.value}>
              <IRadioGroup
                optionList={[
                  {label: '隐藏', value: 'off'},
                  {label: '开启', value: 'on'},
                ]}
              />
            </Field>
            <Field form={'select'} title={'科目'} antd visible={(formData) => formData.radio === 'on'}>
              <Select
                className={'w-44'}
                placeholder="请选择"
                options={[
                  {label: 'Java', value: 'java'},
                  {label: 'React', value: 'react'},
                  {label: 'Vue', value: 'vue'},
                ]}
              />
            </Field>
            <Field
              form={'des'}
              title={'科目描述'}
              union={'select'}
              initialValue={'cc'}
              rules={[that.validateItem]}
              unionValue={(value) => (value === 'react' ? '你好 React' : '')}
              visible={(formData, {status}) => formData.select !== 'vue' && status.select?.visible}>
              <Input />
            </Field>
          </div>
          <div style={styles.sop}>
            <div className={'flex gap-3'}>
              <CCForm.List form={'sl'} initRows={1} formList={that.list1}>
                <div className={'flex gap-3 flex-col'}>
                  <CCListView>
                    {({remove, index}) => (
                      <div className={'flex  gap-3 border-dotted border border-sky-500 rounded p-2.5 items-center '}>
                        <TabName injectListName={false} union={`sl.${index}.c.0`} unionValue={(v) => v} />

                        <button onClick={remove} className={'leading-[0px]'}>
                          <TrashIcon className="h-4" />
                        </button>
                      </div>
                    )}
                  </CCListView>
                  <CCListAction>
                    {({add, length, remove}) => (
                      <div className={'flex gap-2.5'}>
                        <button style={styles.btn} onClick={() => that.addList1(length)}>
                          添加一行
                        </button>
                        <button onClick={() => remove([1, 2])} style={styles.btn}>
                          删除 2, 3 行
                        </button>
                      </div>
                    )}
                  </CCListAction>
                </div>
                <div className={'flex flex-wrap gap-3'}>
                  <CCListView>
                    {({index}) => (
                      <div className={'border-dotted border border-sky-500  p-2.5 rounded'}>
                        <CCForm.List form="c" initRows={1}>
                          {({add, remove, key, index: index2}) => (
                            <div style={styles.form} key={key}>
                              <Field
                                rules
                                title={'SL 吃吃 - ' + (index + 1) + ' - ' + (index2 + 1)}
                                initialValue={String(index + 1)}>
                                <Input />
                              </Field>
                              <div className={'mt-[30px] gap-3 flex'}>
                                <button style={styles.btn2} onClick={() => add()}>
                                  +
                                </button>
                                <button style={styles.btn2} onClick={remove}>
                                  -
                                </button>
                              </div>
                            </div>
                          )}
                        </CCForm.List>
                      </div>
                    )}
                  </CCListView>
                </div>
              </CCForm.List>
            </div>
          </div>
          <div style={styles.sop}>
            <button onClick={() => that.addList2()} style={styles.btn}>
              最前面插入一行
            </button>
            <CCForm.List form={'job'} formList={that.list2} initRows={1}>
              {({add, remove, index, move}) => (
                <div style={styles.form}>
                  <div className={'mt-[30px] gap-3 flex'}>
                    <button style={styles.btn2} onClick={() => move(index, index - 1)}>
                      ↑
                    </button>
                    <button style={styles.btn2} onClick={() => move(index, index + 1)}>
                      ↓
                    </button>
                  </div>
                  {that.formList.map((config) => (
                    <Field key={config.form} {...config}>
                      {config.fieldType === 'select' ? <Select className={'w-44'} {...config.fieldProps} /> : <Input />}
                    </Field>
                  ))}
                  <div className={'mt-[30px] gap-3 flex'}>
                    <button style={styles.btn2} onClick={() => add({a: that.genUUID(), sex: '', b: ''}, index + 1)}>
                      +
                    </button>
                    <button style={styles.btn2} onClick={remove}>
                      -
                    </button>
                  </div>
                </div>
              )}
            </CCForm.List>
          </div>
          <div className={'gap-2.5 flex p-5'}>
            <button onClick={() => that.count()} style={styles.btn}>
              Submit
            </button>
            <button onClick={() => that.countAsync()} style={styles.btn}>
              Submit by Async
            </button>
            <CCOutletView forProps={(props) => ({disabled: props.disabled})}>
              <button style={styles.btn} onClick={() => that.inject()}>
                Inject
              </button>
            </CCOutletView>
          </div>
        </CCForm>
      </div>
    );
  }
}

const TabName = CCField()((props) => {
  const {value} = props;
  return (
    <div className={'flex-1'}>
      <div className={'w-64 truncate'}>{value} - test</div>
    </div>
  );
});

const TestUnMount = (props: {name: string}) => {
  const {name} = props;
  useEffect(() => {
    return () => {
      console.log('umount', name);
    };
  }, [name]);
  return null;
};

const styles: Record<string, any> = {
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    minHeight: 75,
    gap: 16,
  },

  button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
  },

  btn: {
    width: '100%',
    padding: '8px 24px',
    border: '1px solid #d9d9d9',
    borderRadius: 2,
  },

  btn2: {
    height: 34,
    width: 34,
    border: '1px solid #d9d9d9',
    borderRadius: 99,
  },

  sop: {
    border: '1px solid rgb(253 224 71)',
    borderRadius: 2,
    padding: '10px',
    margin: '16px 0',
  },
};

export default App;
