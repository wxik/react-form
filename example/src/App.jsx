/**
 *
 * @author wxik
 * @sine 2020-04-16 10:14
 */
import React from 'react';
import IBotInput from '@ibot/ibot/lib/input';
import {CCField, CCForm, CCFormList} from '@wxik/react-form';
import {Types} from '@wxik/core';
import '@ibot/ibot/lib/root/index.css';
import '@ibot/ibot/lib/input/index.css';

const TextField = CCField()((props) => {
  const {value, onChange, title, error, disabled, required} = props;
  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: 10, width: 300}}>
      <span style={{paddingBottom: 4}}>
        {title} {required ? ' *' : ''}
      </span>
      <IBotInput
        onChange={onChange}
        value={String(Types.isObject(value) ? JSON.stringify(value) : Types.isEmpty(value) ? '' : value)}
        isInvalid={error}
        disabled={disabled}
      />
    </div>
  );
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      initialValue: {
        abcde: null,
        sl: [{c: ['123', '32']}],
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
          {required: true},
          (data) => {
            return /^[1-9]\d*(\.\d+)?$|0(\.\d*[1-9]\d*)?$/.test(data.name);
          },
        ],
      },
    ];
    Array(0)
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
        // initialValue: {id: Math.random(), name: Math.random()},
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
    // console.log(this.state.data)
    this.setState({data: this.state.data});
  }

  count() {
    const form = this.formRef.current;

    if (form.validate()) {
      console.log('验证>>', form.subData({merge: true}));
    } else {
      console.log('<>', form.subData());
    }
    // this.setState({data});
  }

  inject() {
    const form = this.formRef.current;

    const id = Math.random();
    form.setOriginData({
      hidden: true,
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
    this.listRef?.addItem({});
    // let {list} = this.state;
    // list = [...list, {}];
    // const config = this.getConfig(list);
    // this.setState({list, config});
  }

  removeList() {
    // const {list} = this.state;
  }

  render() {
    const {count, step, data, initialValue} = this.state;
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
              {this.config.map((config, index) => (
                <div style={styles.form} key={index}>
                  <TextField key={config.form} {...config} />
                  <button onClick={() => this.addList()}>++++++({index})</button>
                </div>
              ))}
              <CCFormList form={'sl'} initRows={1}>
                {() => (
                  <CCFormList form="c" initRows={1}>
                    {({add, remove, key, index}) => (
                      <div style={styles.form} key={key} data-key={key}>
                        <TextField title={'SL 吃吃 - ' + index} form={index} />
                        <button style={{padding: 10}} onClick={add}>
                          ++++++
                        </button>
                        <button style={{padding: 10}} onClick={remove}>
                          ------
                        </button>
                      </div>
                    )}
                  </CCFormList>
                )}
              </CCFormList>
              <CCFormList form={'sb'} initRows={1}>
                {({add, remove, key, index}) => (
                  <div style={styles.form} key={key} data-key={key}>
                    <TextField title={'吃吃 - ' + index} form={index} />
                    <button style={{padding: 10}} onClick={add}>
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
                    <button style={{padding: 10}} onClick={add}>
                      ++++{index}
                    </button>
                    <button style={{padding: 10}} onClick={remove}>
                      ----
                    </button>
                  </div>
                )}
              </CCFormList>
              <TextField form={'abcde'} title={'测试看看'} initialValue={'a'} />
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
