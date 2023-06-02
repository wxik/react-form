/**
 *
 * @author wxik
 * @sine 2020-04-16 10:14
 */
import '@ibot/ibot/lib/root/index.css';
import '@ibot/ibot/lib/icon/index.css';
import '@ibot/ibot/lib/input/index.css';
import '@ibot/ibot/lib/radio/index.css';
import '@ibot/ibot/lib/check/index.css';
import './assets/rc-select.pcss';

// @ts-ignore
import {CheckGroup as ICheckGroup} from '@ibot/ibot/lib/check';
// @ts-ignore
import IBotInput from '@ibot/ibot/lib/input';
// @ts-ignore
import {RadioGroup as IRadioGroup} from '@ibot/ibot/lib/radio';
import {Types} from '@wxik/core';
import type {CCFormData, ICCField} from '@wxik/react-form';
import {CCField, CCForm, CCOutlet} from '@wxik/react-form';
import Select from 'rc-select';
import type {ReactElement} from 'react';
import React from 'react';

interface IField {
  children: ReactElement;
  fieldNames?: {
    value?: string;
  };
  antd?: boolean;
}

const Field = CCForm.Field<IField>()((props) => {
  const {value, onChange, title, error, errors, disabled, required, children, fieldNames = {}, antd = false} = props;
  const {value: valueKey = 'value'} = fieldNames;
  // console.log('value', form, value);
  const childProps = {onChange, [valueKey]: value, disabled};
  if (antd) {
    childProps.error = error ? 'error' : void 0;
  } else {
    childProps.isInvalid = error;
  }
  return (
    <div className={'flex flex-col py-2.5 w-52'}>
      <span className={'pb-1'}>
        {title} {required ? ' *' : ''}
      </span>
      {React.cloneElement(children, childProps)}
      {errors && (
        <div className={'pt-1'}>
          {errors.map((it, ix) => (
            <div key={ix} className={'pt-1 text-red-500'}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const TextField = CCField()((props) => {
  const {value, onChange, title, error, errors, disabled, required} = props;
  return (
    <div className={'flex flex-col py-2.5 w-52'}>
      <span className={'pb-1'}>
        {title} {required ? ' *' : ''}
      </span>
      <IBotInput
        onChange={onChange}
        value={String(Types.isObject(value) ? JSON.stringify(value) : Types.isEmpty(value) ? '' : value)}
        isInvalid={error}
        disabled={disabled}
      />
      {errors && (
        <div className={'pt-1'}>
          {errors.map((it, ix) => (
            <div key={ix} className={'pt-1 text-red-500'}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

class App extends React.Component<any> {
  form = CCForm.createForm();
  list2 = CCForm.createList();
  list1 = CCForm.createList();
  config: Array<ICCField>;
  formList: Array<ICCField>;

  private uuid = 0;

  state = {
    initialValue: {
      select: 'java',
      radio: 'on',
      sl: [{c: ['123', '32']}],
      job: Array(4)
        .fill({
          bcdef: Math.random(),
          id: 123,
          name: 'c',
        })
        .map((it, ix) => ({...it, name: 'c' + ix, a: ix})),
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
          {required: true, message: '请输入名称'},
          {pattern: /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/, message: '请输入数值 - 正则'},
          (data: CCFormData) => {
            const valid = /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/.test(data.name);
            return valid ? true : '请输入数值 - 方法处理';
          },
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
        form: 'obj',
        title: 'Object',
        inline: false,
        transform: (da) =>
          da && {
            c_id: da.o_id,
            c_name: da.o_name,
          },
        // initialValue: {id: Math.random(), name: Math.random()},
        convertValue: (da) =>
          da && {
            o_id: da.id,
            o_name: da.name,
          },
        label: 'o_name',
      },
      {
        form: 'sex2',
        title: 'Sex 2 - ',
        rules: [/^[1-9]\d*$/, {required: (data, {form}) => data[`${form}.a`] == 3}],
        visible: (data, {form}) => data[`${form}.a`] != 2,
      },
    ];
    console.time('App');
  }

  componentDidMount() {
    console.timeEnd('App');
  }

  count() {
    if (this.form.validate()) {
      console.log('验证>>', this.form.subData({merge: true}));
    } else {
      console.log('<>', this.form.subData());
    }
    // this.setState({data});
  }

  inject() {
    this.form.setOriginData({
      // name: 'Inject Name: ' + Math.random(),
      alias: 'Inject Alias ' + Math.random(),
      sb: ['76656', '654'],
      sl: [{c: ['123', '----324---'], d: ['2', '3']}],
      job: Array(1).fill({
        bcdef: Math.random(),
        id: 123,
        name: 'c',
        // obj: {
        //     id,
        //     name: Math.random()
        // }
      }),
    });
  }

  genUUID() {
    return ++this.uuid;
  }

  addList2() {
    this.list2.add({sex2: 'test', sex: Math.random()}, 0);
  }

  moveList2(from: number, to: number) {
    this.list2.move(from, to);
  }

  addList1() {
    this.list1.add({});
  }

  removeList1() {
    this.list1.remove([1, 2]);
  }

  render() {
    let that = this;
    const {initialValue} = that.state;
    return (
      <div className={'flex w-full justify-center overflow-auto p-5 flex-col'}>
        <CCForm form={that.form} initialValue={initialValue} disabled={false}>
          <div style={styles.form}>
            {that.config.map((config, index) => (
              <TextField key={config.form} {...config} />
            ))}
          </div>
          <div className={'flex gap-4'}>
            <Field
              form={'check_group'}
              title={'多选'}
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
              initialValue={''}
              unionValue={(value) => (value === 'react' ? '你好 React' : '')}
              visible={(formData) => formData.select !== 'vue' && formData.radio === 'on'}>
              <IBotInput />
            </Field>
          </div>
          <div style={styles.sop}>
            <div className={'flex gap-2.5'}>
              <button onClick={() => that.addList1()} style={styles.btn}>
                添加一行
              </button>
              <button onClick={() => that.removeList1()} style={styles.btn}>
                删除 2, 3 行
              </button>
            </div>
            <CCForm.List form={'sl'} initRows={1} formList={that.list1}>
              {({add, remove, key}) => (
                <div key={key} className={'flex gap-3 items-center'}>
                  <div className={'border-dotted border border-sky-500 my-2.5 p-2.5 rounded'}>
                    <CCForm.List form="c" initRows={1}>
                      {({add, remove, key, index}) => (
                        <div style={styles.form} key={key}>
                          <TextField title={'SL 吃吃 - ' + index} initialValue={String(index)} />
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
                  <button style={styles.btn2} onClick={() => add()}>
                    +
                  </button>
                  <button style={styles.btn2} onClick={remove}>
                    -
                  </button>
                </div>
              )}
            </CCForm.List>
          </div>
          <div style={styles.sop}>
            <button onClick={() => that.addList2()} style={styles.btn}>
              最前面插入一行
            </button>
            <CCForm.List form={'job'} formList={that.list2} initRows={1}>
              {({add, remove, index}) => (
                <div style={styles.form}>
                  <div className={'mt-[30px] gap-3 flex'}>
                    <button style={styles.btn2} onClick={() => that.moveList2(index, index - 1)}>
                      ↑
                    </button>
                    <button style={styles.btn2} onClick={() => that.moveList2(index, index + 1)}>
                      ↓
                    </button>
                  </div>
                  {that.formList.map((config) => (
                    <TextField key={config.form} {...config} />
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
            <CCOutlet.View forProps={(props) => ({disabled: props.disabled})}>
              <button style={styles.btn} onClick={() => that.inject()}>
                Inject
              </button>
            </CCOutlet.View>
          </div>
        </CCForm>
      </div>
    );
  }
}

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
