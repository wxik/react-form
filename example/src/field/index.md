---
nav:
  title: 组件
  order: 1
title: CCField
order: 2
group: 组件总览
---

# CCField

### 代码演示

```tsx | pure
import {CCField} from '@guc/react-form';

interface IProps {
    name?: string;
}

export const Item = CCField<IProps>()((props)=> {
  const {name, value} = props;
  return <div>CCField: {name} - {value}</div>
});
```


### API

| key            | explain                                                      | type                                                                                          | default | version |
|:---------------|:-------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:--------|:--------|
| name           | 字段名, 支持`.`分割                                                 | string \| number                                                                              | -       | >=0.5.5 |
| ~~form~~           | 同 name, 已不推荐使用                                               | string \| number                                                                              | -       | < 0.6.0 |
| alias          | alias field name                                             | string \| string[]                                                                            | -       |
| title          | 字段标题                                                         | string \| <br/>(<br/>`formData`: CCFormData,<br/> `options`: CCOptions<br/>) => string                       | -       | -       |
| label          | Object Type, 验证空值字段名                                         | string                                                                                        | _       | -       |
| unique         | Object Type, 唯一标识字段名                                         | string                                                                                        | id      | -       |
| inline         | Object Type, 是否内联数据<br/> {a: 1, b: {b1: 1}} => {a: 1, b1: 1} | boolean                                                                                       | true    | -       |
| ignore         | 是否忽略此字段                                                      | boolean                                                                                       | false   | -       |
| transform      | 提交取值处理数据                                                     | string \| (`data`, `formData`) => any                                                         | -       | -       |
| value          | 受控字段值                                                        | any                                                                                           | -       | -       |
| onChange       | 值改变回调                                                        | function(value)                                                                               | -       | -       |
| visible        | 可见性规则                                                        | boolean \| <br/>(<br/>`formData`: CCFormData, <br/>`options`: CCOptions<br/>) => boolean                     | -       | -       |
| disabled       | 禁用规则                                                         | boolean \| <br/>(<br/>`formData`: CCFormData, <br/>`options`: CCOptions<br/>) => boolean                     | -       | -       |
| union          | 联动规则                                                         | string \| string[] \| ((`options`: CCOptions) => string \| string[])                                   | -       | -       |
| unionValue     | 联动值控制规                                                       | (<br/>`value`: any,<br/> `options`: CCOptions<br/>) => any   | -       | -       |
| convertValue   | 处理值转换到表单内的格式                                                 | (`value`: any) => any                                                                         | -       | -       |
| rules          | 验证规则                                                         | boolean \| CCRulesType[] \| CCRulesType                                                       | -       | -       |
| initialValue   | 初始值                                                          | any                                                                                           | -       | -       |
| defaultValue   | 默认值                                                          | any                                                                                           | -       | -       |
| normalize      | 触发 onChange 时进行值转换后存入表单                                      | (<br/>`value`: any, <br/>`data`: {`val`: any; `data`: CCFormData; `args`: any[]}<br/>) => any | -       | -       |
| valuePropName  | value 进入子组件后的别名                                              | string                                                                                        | -       | -       |
| forValue       | 转换 value 给组件                                                 | (`value`: any, `formData`: CCFormData) => any                                                 | -       | -       |
| listener       | 对应表单的发布与订阅<br/> 在值改变时触发<br/> 同时监听字段改变触发值改变                   | ICCFieldListener                                                                              | -       | -       |
| shouldUpdate   | 自定义字段更新逻辑                                                    | any \| any[]                                                                                  | -       | -       |-       |
| injectListName | 自动拼接集合传递的 formName                                           | boolean                                                                                       | true    | -       |
| preserve       | 是否保护子节点在隐藏是不销毁, 并接受 visible 值                                | boolean                                                                                       | false   | -       |
| deliver        | 注入当前节点信息给下级                                                  | boolean                                                                                       | true    | -       |

