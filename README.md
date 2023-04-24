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

## Example
### [Complete example](example)

```typescript jsx

const TextField = CCField()((props) => {
  const {value, onChange, title, error, errors, disabled, required} = props;
  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: 10, width: 300}}>
      <span style={{paddingBottom: 4}}>
        {title} {required ? ' *' : ''}
      </span>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={String(Types.isObject(value) ? JSON.stringify(value) : Types.isEmpty(value) ? '' : value)}
        disabled={disabled}
        style={error ? {border: '1px solid red'} : void 0}
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
})


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

  inject() {
    const form = this.formRef.current;

    const id = Math.random();
    form.setOriginData({
      hidden: true,
      alias: 'Inject Alias ' + Math.random(),
      sb: ['76656', '654'],
      sl: [{c: ['123', '----324---'], d: ['2', '3']}],
      job: Array(2).fill({
        bcdef: Math.random(),
        id: 123,
        name: 'c',
      }),
    });
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
                  <TextField key={config.form} {...config} />
                  <button onClick={() => this.addList()}>++++++({index})</button>
                </div>
              ))}
              <CCFormList form={'sl'} initRows={1}>
                {({add, remove, key}) => (
                  <div style={{border: '1px solid red', margin: '10px'}} key={key}>
                    <CCFormList form="c" initRows={1}>
                      {({add, remove, key, index}) => (
                        <div style={styles.form} key={key} data-key={key}>
                          <TextField title={'SL CC - ' + index} form={index} />
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
              </CCFormList>
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
