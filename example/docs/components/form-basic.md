---
nav:
  title: 组件
  order: 1
title: CCForm
group:
  title: 基础
---

# CCForm

### 代码演示

<code src="./basic/hooks.tsx" des></code>
<code src="./basic/clazz.tsx"></code>

### API

| key          | explain                                                 | type                   | default |
| :----------- | ------------------------------------------------------- | :--------------------- | :------ |
| data         | 表单共享传入数据, 采用对象引用                          | CCFormData             | -       |
| initialValue | 初始化数据                                              | CCFormData             | -       |
| disabled     | 设置表单组件禁用, 透传给 CCField, 但 CCField 可自行控制 | boolean                | -       |
| onChange     | 值改变回调                                              | function(data, fields) | \_      |
| emitter      | 发布与订阅辅助                                          | ICCEmitter             | -       |

##### CCFormInstance

| key            | explain                                   | type                                                                                                         | version |
|:---------------|-------------------------------------------|:-------------------------------------------------------------------------------------------------------------|:--------|
| subData        | 获取表单 submitData                           | (`options`?: {`merge`?: boolean}) => CCFormData                                                              | -       |
| validate       | 验证表单                                      | () => boolean                                                                                                | -       |
| validateErrors | 验证表单                                      | (`paths`?: CCNamePath[]) => CCValidateError[]                                                                | -       |
| setOriginData  | 初始化表单数据, 不触发`onChange`                    | (`data`: CCFormData \| any[]) => void                                                                        | -       |
| setFieldData   | 设置表单数据, 触发`onChange`和`convertValue`但不触发联动 | (`data`: CCFormData \| any[]) => void                                                                        | -       |
| addData        | 添加字段数据(字段可不存在), 触发联动, 字段不会主动接收值           | (`data`: CCFormData) => void                                                                                 | -       |
| setData        | 设置表单数据, 默认不调用字段`convertValue`和`onChange`  | (<br/>`data`: CCFormData \| any[], <br/>`options`?: {`isChange`?: boolean; `isGet`?: boolean})<br/>) => void | -       |

### Hooks

##### CCForm.useForm

```
type CCForm.useForm = (): [CCFormInstance]
```

创建 CCForm 实例，用于管理所有数据状态。

##### Form.useFormInstance

```
type Form.useFormInstance = (): CCFormInstance
```

获取当前上下文正在使用的 CCForm 实例，常见于封装子组件消费无需透传 CCForm 实例：

```typescript
const Sub = () => {
  const form = CCForm.useFormInstance();

  return <button onClick={() => form.validate()} />;
};

export default () => {
  const [form] = CCForm.useForm();

  return (
    <CCForm form={form}>
      <Sub />
    </CCForm>
  );
};
```

##### CCForm.useList
```
type CCForm.useList = (): [CCListInstance]
```
创建 CCList 实例，用于管理表单列表数据状态。

##### Form.useListInstance
```
type Form.useListInstance = (): CCListInstance
```
获取当前上下文正在使用的 CCList 实例，常见于封装子组件消费无需透传 CCList 实例：

```typescript
const Sub = () => {
  const list = CCForm.useListInstance();

  return <button onClick={() => list.add()} />;
};

export default () => {
  const [list] = CCForm.useList();

  return (
    <CCForm>
      <CCList formList={list}>{() => <Sub />}</CCList>
    </CCForm>
  );
};
```

### 实例

##### CCForm.createForm
```
type CCForm.createForm = (): CCFormInstance
```

##### CCForm.createList
```
type CCForm.createList = (): CCListInstance
```
