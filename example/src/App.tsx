/**
 *
 * @author wxik
 * @sine 2020-04-16 10:14
 */
import '@ibot/ibot/lib/root/index.css';
import '@ibot/ibot/lib/input/index.css';
import '@ibot/ibot/lib/select/index.css';
import '@ibot/ibot/lib/radio/index.css';

// @ts-ignore
import IBotInput from '@ibot/ibot/lib/input';
// @ts-ignore
import {RadioGroup as IRadioGroup} from '@ibot/ibot/lib/radio';
// @ts-ignore
import ISelect from '@ibot/ibot/lib/select';
import {Types} from '@wxik/core';
import type {CCFormData, CCFormList, ICCField} from '@wxik/react-form';
import {CCField, CCForm, CCList} from '@wxik/react-form';
import type {ReactElement} from 'react';
import React from 'react';

interface IField {
  children: ReactElement;
}

const Field = CCField<IField>()((props) => {
  const {value, onChange, title, error, errors, disabled, required, children} = props;
  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: '10px 0', width: 300}}>
      <span style={{paddingBottom: 4}}>
        {title} {required ? ' *' : ''}
      </span>
      {React.cloneElement(children, {onChange, value, disabled, isInvalid: error})}
      {errors && (
        <div style={{paddingTop: 4}}>
          {errors.map((it, ix) => (
            <div key={ix} style={{paddingTop: 4, color: 'red'}}>
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
    <div style={{display: 'flex', flexDirection: 'column', padding: '10px 0', width: 300}}>
      <span style={{paddingBottom: 4}}>
        {title} {required ? ' *' : ''}
      </span>
      <IBotInput
        onChange={onChange}
        value={String(Types.isObject(value) ? JSON.stringify(value) : Types.isEmpty(value) ? '' : value)}
        isInvalid={error}
        disabled={disabled}
      />
      {errors && (
        <div style={{paddingTop: 4}}>
          {errors.map((it, ix) => (
            <div key={ix} style={{paddingTop: 4, color: 'red'}}>
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

class App extends React.Component<any> {
  formRef;
  listRef;
  listRef2;
  config: Array<ICCField>;
  formList: Array<ICCField>;

  state = {
    initialValue: {
      abcde: null,
      select: 'java',
      radio: 'on',
      sl: [{c: ['123', '32']}],
      job: Array(1)
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
    this.formRef = React.createRef<CCForm>();
    this.listRef = React.createRef<CCFormList>();
    this.listRef2 = React.createRef<CCFormList>();
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
    Array(1)
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
        initialValue: 'a1',
        rules: true,
      },
      {
        form: `b`,
        title: 'Name 2 - ',
        initialValue: '2',
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
        field: (da) =>
          da && {
            c_id: da.o_id,
            c_name: da.o_name,
          },
        // initialValue: {id: Math.random(), name: Math.random()},
        getValue: (da) =>
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
  }

  count() {
    const form = this.formRef.current!;

    if (form.validate()) {
      console.log('验证>>', form.subData({merge: true}));
    } else {
      console.log('<>', form.subData());
    }
    // this.setState({data});
  }

  inject() {
    const form = this.formRef.current!;

    form.setOriginData({
      // name: 'Inject Name: ' + Math.random(),
      alias: 'Inject Alias ' + Math.random(),
      abcde: '测试时间: ' + Math.random(),
      sb: ['76656', '654'],
      sl: [{c: ['123', '----324---'], d: ['2', '3']}],
      job: Array(2).fill({
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

  addList() {
    this.listRef.current?.addItem({});
  }

  addList2() {
    this.listRef2.current?.addItem({});
  }

  render() {
    const {initialValue} = this.state;
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          // alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          padding: 20,
        }}>
        <div style={{flex: 1, display: 'flex'}}>
          <div>
            <CCForm ref={this.formRef} initialValue={initialValue}>
              <div style={styles.form}>
                {this.config.map((config, index) => (
                  <TextField key={config.form} {...config} />
                ))}
              </div>
              <TextField form={'abcde'} title={'测试看看'} initialValue={'a'} />
              <div style={styles.form}>
                <Field form={'radio'} title={'是否选择科目'} normalize={(data) => data?.value}>
                  <IRadioGroup
                    optionList={[
                      {label: '隐藏', value: 'off'},
                      {label: '开启', value: 'on'},
                    ]}
                  />
                </Field>
                <Field form={'select'} title={'科目'} visible={(formData) => formData.radio === 'on'}>
                  <ISelect
                    placeholder="请选择"
                    optionList={[
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
                <button onClick={() => this.addList2()} style={styles.btn}>
                  Add
                </button>
                <CCList form={'sl'} initRows={1} ref={this.listRef2}>
                  {({add, remove, key}) => (
                    <div style={styles.sop} key={key}>
                      <CCList form="c" initRows={1}>
                        {({add, remove, key, index}) => (
                          <div style={styles.form} key={key} data-key={key}>
                            <TextField title={'SL 吃吃 - ' + index} form={index} />
                            <button style={{padding: 10}} onClick={() => add()}>
                              ++++++
                            </button>
                            <button style={{padding: 10}} onClick={remove}>
                              ------
                            </button>
                          </div>
                        )}
                      </CCList>
                      <button style={{padding: 10}} onClick={() => add()}>
                        ++++++
                      </button>
                      <button style={{padding: 10}} onClick={remove}>
                        ------
                      </button>
                    </div>
                  )}
                </CCList>
              </div>
              <div style={styles.sop}>
                <button onClick={() => this.addList()} style={styles.btn}>
                  Add
                </button>
                <CCList form={'job'} ref={this.listRef} initRows={1}>
                  {({add, remove, index}) => (
                    <div style={styles.form}>
                      {this.formList.map((config) => (
                        <TextField key={config.form} {...config} />
                      ))}
                      <button style={{padding: 10}} onClick={() => add()}>
                        ++++{index}
                      </button>
                      <button style={{padding: 10}} onClick={remove}>
                        ----
                      </button>
                    </div>
                  )}
                </CCList>
              </div>
            </CCForm>
            <div style={styles.button}>
              <button style={{padding: 10}} onClick={() => this.count()}>
                Submit
              </button>
              <button style={{padding: 10}} onClick={() => this.inject()}>
                Inject
              </button>
            </div>
          </div>
          <div></div>
        </div>
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
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
  },

  btn: {
    width: '100%',
    padding: '8px 24px',
    border: '1px solid gray',
  },

  sop: {
    border: '1px solid red',
    padding: '10px',
    margin: '16px 0',
  },
};

export default App;
