---
nav:
  title: 组件
  order: 1
title: CCList
order: 3
group: 组件总览
---

# CCList

### 代码演示

<code src="./basic.tsx"></code>


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




