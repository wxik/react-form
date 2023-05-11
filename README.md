# react-form

React、React Native Configurable forms

[![NPM](https://img.shields.io/npm/v/@wxik/react-form.svg)](https://www.npmjs.com/package/@wxik/react-form)

------

## Install

```
# yarn
yarn add @wxik/react-form

# npm
npm i @wxik/react-form

#
pnpm i @wxik/react-form
```

## API

```typescript jsx
import {CCField, CCForm, CCList} from '@wxik/react-form';
```

### CCForm

- `function subData({merge?: boolean}): CCFormData` 获取表单可提交数据
- `function validate(): boolean` 验证表单
- `function setOriginData(data: CCFormData | any[])` 初始化表单数据, 不触发`onChange`
- `function setFieldData(data: CCFormData | any[])` 初始化表单数据, 触发`onChange`
- `function addData(data: CCFormData)` 添加字段数据(字段可不存在)并触发`onChange`
- `function setData(data: CCFormData | any[], options: {isChange?: boolean; isGet?: boolean})` 设置表单数据, 默认不触发`onChange`不调用`getValue`

| key          | explain  | type                   | default |
|:-------------|----------|:-----------------------|:--------|
| data         | 表单采用共享数据 | CCFormData             | -       |
| initialValue | 初始化数据    | CCFormData             | -       |
| onChange     | 值改变回调    | function(data, fields) | _       |
| emitter      | 发布与订阅辅助  | ICCEmitter             | -       |
| disabled     | 设置表单字段禁用 | boolean                | false   |



### CCField

- `function setValue(value: any, callback: function)` 设置字段值, 触发`onChange`

| key           | explain                                                      | type                                                               | default |
|:--------------|:-------------------------------------------------------------|:-------------------------------------------------------------------|:--------|
| form          | 字段名, 支持`.`分割                                                 | string \| number                                                   | -       |
| alias         | alias field name                                             | string \| string[]                                                 | -       |
| title         | 字段标题                                                         | string \| (form: string) => string                                 | -       |
| label         | Object Type, 验证空值字段名                                         | string                                                             | _       |
| unique        | Object Type, 唯一标识字段名                                         | string                                                             | id      |
| inline        | Object Type, 是否内联数据<br/> {a: 1, b: {b1: 1}} => {a: 1, b1: 1} | boolean                                                            | true    |
| ignore        | 是否忽略此字段                                                      | boolean                                                            | false   |
| field         | 提交取值处理数据                                                     | string \| (data, formData) => any                                  | -       |
| value         | 受控字段值                                                        | any                                                                | -       |
| onChange      | 值改变回调                                                        | function(value)                                                    | -       |
| visible       | 可见性规则                                                        | boolean \| (formData, options) => boolean                          | -       |
| disabled      | 禁用规则                                                         | boolean \| (formData, options) => boolean                          | -       |
| union         | 联动规则                                                         | string \| string[] \| ((options) => string \| string[])            | -       |
| unionValue    | 联动值控制规                                                       | (value: any, data: {val: any; data: Object; form?: string}) => any | -       |
| getValue      | 处理值转换到表单内的格式                                                 | (value: any) => any                                                | -       |
| rules         | 验证规则                                                         | boolean \| Array<CCRulesType> \| CCRulesType                       | -       |
| initialValue  | 初始值                                                          | any                                                                | -       |
| defaultValue  | 默认值                                                          | any                                                                | -       |
| normalize     | 触发 onChange 时进行值转换后存入表单                                      | (value, prevValue, prevData) => any                                | -       |
| valuePropName | value 进入子组件后的别名                                              | string                                                             | -       |
| forValue      | 转换 value 给组件                                                 | (value: any, formData: CCFormData) => any                          | -       |
| listener      | 对应表单的发布与订阅<br/> 在值改变时触发<br/> 同时监听字段改变触发值改变                   | ICCFieldListener                                                   | -       |

### CCList

- `function addItem(value?: any)` add new row
- `function removeItem(index: number)` remove row
- `function setData(data: any[])` set new data

| key          | explain | type   | default |
|:-------------|:--------|:-------|:--------|
| form         | 字段名     | string | -       |
| initRows     | 初始化行数   | number | 0       |
| initialValue | 初始值     | any[]  | -       |


### CCOutlet
- 拿到表单对应数据

### CCOutlet.View
| key      | explain | type         | default |
|:---------|:--------|:-------------|:--------|
| children | 子节点     | ReactElement | -       |


## Example

### [Complete example](example)

```typescript jsx

import {CCField, CCForm, CCList} from '@wxik/react-form';

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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      initialValue: {
        sl: [{c: ['123', '32']}, {c: ['1', '2']}],
        job: Array(1)
          .fill({
            bcdef: Math.random(),
            id: 123,
            name: 'c',
          })
          .map((it, ix) => ({...it, name: 'c' + ix, a: ix})),
      },
    };
    this.config = [
      {
        form: `name`,
        alias: 'alias',
        title: 'T - name ',
        initialValue: 'T - Name',
        onChange: (v) => console.log(v),
        rules: [
          {required: true, message: 'Please input name'},
          {pattern: /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/, message: 'Please input - RegExp'},
          (data) => {
            const valid = /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/.test(data.name);
            return valid ? true : 'Please input - Function';
          },
        ],
      },
    ];
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
        disabled: (data, {form}) => data[`${form}.a`] == 2,
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
        getValue: (da) =>
          da && {
            o_id: da.id,
            o_name: da.name,
          },
      },
      {
        form: 'sex2',
        title: 'Sex 2 - ',
        rules: [/^[1-9]\d*$/, {required: (data, {form}) => data[`${form}.a`] == 3}],
        visible: (data, {form}) => data[`${form}.a`] != 2,
      },
    ];
  }

  componentDidMount() {
    this.setState({data: this.state.data});
  }

  count() {
    const form = this.formRef.current;

    if (form.validate()) {
      console.log('valid sucess >>', form.subData({merge: true}));
    } else {
      console.log('<>', form.subData());
    }
  }

  addList() {
    this.listRef?.addItem({});
  }

  render() {
    const {count, step, data, initialValue} = this.state;
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          overflow: 'auto',
          padding: 20,
        }}>
        <div style={{flex: 1, display: 'flex'}}>
          <div>
            <CCForm ref={this.formRef} initialValue={initialValue}>
              {this.config.map((config, index) => (
                <div style={styles.form} key={index}>
                  <Field key={config.form} {...config} normalize={e => e.target.value}>
                    <input/>
                  </Field>
                  <button onClick={() => this.addList()}>++++++({index})</button>
                </div>
              ))}
              <CCFormList form={'sl'} initRows={1}>
                {({add, remove, key}) => (
                  <div style={{border: '1px solid red', margin: '10px'}} key={key}>
                    <CCFormList form="c" initRows={1}>
                      {({add, remove, key, index}) => (
                        <div style={styles.form} key={key} data-key={key}>
                          <Field title={'SL CC - ' + index} form={index} normalize={e => e.target.value}>
                            <input/>
                          </Field>
                          <button style={{padding: 10}} onClick={() => add()}>
                            ++++++
                          </button>
                          <button style={{padding: 10}} onClick={remove}>
                            ------
                          </button>
                        </div>
                      )}
                    </CCFormList>
                    <button style={{padding: 10}} onClick={() => add()}>
                      ++++++
                    </button>
                    <button style={{padding: 10}} onClick={remove}>
                      ------
                    </button>
                  </div>
                )}
              </CCFormList>
              <CCFormList form={'job'} ref={(rf) => (this.listRef = rf)} initRows={1}>
                {({add, remove, index}) => (
                  <div style={styles.form}>
                    {this.formList.map((config) => (
                      <Field
                        key={config.form}
                        {...config}
                        normalize={e => e.target.value}
                        getValue={String(Types.isObject(value) ? JSON.stringify(value) : Types.isEmpty(value) ? '' : value)}
                      >
                        <input/>
                      </Field>
                    ))}
                    <button style={{padding: 10}} onClick={() => add()}>
                      ++++{index}
                    </button>
                    <button style={{padding: 10}} onClick={remove}>
                      ----
                    </button>
                  </div>
                )}
              </CCFormList>
            </CCForm>
            <div style={styles.button}>
              <button style={{padding: 10}} onClick={() => this.count()}>
                Submit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
  },
};

export default App;

```
