---
nav:
  title: 组件
  order: 1
title: CCList
order: 1
group: 基础
---

# CCList

### 代码演示

```tsx
/**
 * defaultShowCode: true
 */
import {CCList, CCForm} from '@wxik/react-form';

export default () => {
  return (
    <CCForm>
      <CCList initialValue={['init row']}>
        {({add, remove, index, data}) => (
          <div className={'flex gap-2.5'} style={{marginBottom: 10}}>
            <button onClick={()=> add(Math.random())}>Add Row</button>
            <button onClick={remove}>Delete Row</button>
            <div>Row Data: {data[index]}</div>
          </div>
        )}
      </CCList>
    </CCForm>
  )
};
```


### API

| key          | explain | type           | default |
|:-------------|:--------|:---------------|:--------|
| form         | 字段名     | string         | -       |
| formList     | 代理对象    | CCListInstance | -       |
| initRows     | 初始化行数   | number         | 1       |
| initialValue | 初始值     | any[]          | -       |


##### CCListInstance

| key     | explain  | type                                            | version |
|:--------|----------|:------------------------------------------------|:--------|
| add     | 添加一行数据   | (`value`?: any, `insertIndex`?: number) => void | -       |
| remove  | 删除一、多行数据 | (`index`: number                                | -       |
| move    | 移动行数据    | (`from`: number, `to`: number) => void          | -       |
| setData | 设置列表数据   | (`data`: any[]) => void                         | -       |
| getData | 获取列表数据   | () => any[]                                     | -       |
| getSize | 获取行数     | () => number                                    | -       |




