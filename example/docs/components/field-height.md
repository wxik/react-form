---
nav:
  title: 组件
  order: 1
title: CCField
order: 1
group: 进阶
---

# CCForm

```jsx
/**
 * title: 基础用法
 */
import {CCForm} from '@wxik/react-form';

export default () => {
  const [] = CCForm.useForm();
  return (
    <div>
      <CCForm>
        <div></div>
      </CCForm>
    </div>
  );
};
```
