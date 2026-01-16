"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[448],{5652:function(r,a,e){var t;e.r(a),e.d(a,{demos:function(){return _}});var s=e(5009),d=e.n(s),m=e(9289),I=e.n(m),o=e(7294),i=e(8317),p=e(4088),v=e(2493),l=e(7940),x=e(512),u=e(9427),_={"src-list-demo-basic":{component:o.memo(o.lazy(function(){return e.e(433).then(e.bind(e,8979))})),asset:{type:"BLOCK",id:"src-list-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(8452).Z},"@guc/react-form":{type:"NPM",value:"0.5.3"},antd:{type:"NPM",value:"6.2.0"},react:{type:"NPM",value:"19.2.3"},undefined:{type:"NPM"},"../components/Field.tsx":{type:"FILE",value:e(5411).Z},clsx:{type:"NPM",value:"2.1.1"},"./index.css":{type:"FILE",value:e(1545).Z}},entry:"index.tsx",description:"\u52A8\u6001\u8868\u5355\u6570\u636E\u57DF\u63A7\u5236\u5C55\u793A\uFF0C\u5305\u542B\u5E03\u5C40\u3001\u521D\u59CB\u5316\u3001\u9A8C\u8BC1\u3001\u63D0\u4EA4\u3002",title:"\u57FA\u7840\u4F7F\u7528"},context:{"../components/Field.tsx":l,"./index.css":u,"@guc/react-form":i,antd:p,react:t||(t=e.t(o,2)),"@heroicons/react/24/outline":v,"/home/runner/work/react-form/react-form/example/src/components/Field/index.tsx":l,clsx:x,"/home/runner/work/react-form/react-form/example/src/components/Field/index.css":u},renderOpts:{compile:function(){var f=I()(d()().mark(function C(){var c,M=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(335).then(e.bind(e,7335));case 2:return n.abrupt("return",(c=n.sent).default.apply(c,M));case 3:case"end":return n.stop()}},C)}));function E(){return f.apply(this,arguments)}return E}()}}}},4674:function(r,a,e){e.r(a),e.d(a,{texts:function(){return t}});const t=[{value:"key",paraId:0,tocIndex:3},{value:"explain",paraId:0,tocIndex:3},{value:"type",paraId:0,tocIndex:3},{value:"default",paraId:0,tocIndex:3},{value:"form",paraId:0,tocIndex:3},{value:"\u5B57\u6BB5\u540D",paraId:0,tocIndex:3},{value:"string",paraId:0,tocIndex:3},{value:"-",paraId:0,tocIndex:3},{value:"formList",paraId:0,tocIndex:3},{value:"\u4EE3\u7406\u5BF9\u8C61",paraId:0,tocIndex:3},{value:"CCListInstance",paraId:0,tocIndex:3},{value:"-",paraId:0,tocIndex:3},{value:"initRows",paraId:0,tocIndex:3},{value:"\u521D\u59CB\u5316\u884C\u6570",paraId:0,tocIndex:3},{value:"number",paraId:0,tocIndex:3},{value:"1",paraId:0,tocIndex:3},{value:"initialValue",paraId:0,tocIndex:3},{value:"\u521D\u59CB\u503C",paraId:0,tocIndex:3},{value:"any[]",paraId:0,tocIndex:3},{value:"-",paraId:0,tocIndex:3},{value:"key",paraId:1,tocIndex:4},{value:"explain",paraId:1,tocIndex:4},{value:"type",paraId:1,tocIndex:4},{value:"version",paraId:1,tocIndex:4},{value:"add",paraId:1,tocIndex:4},{value:"\u6DFB\u52A0\u4E00\u884C\u6570\u636E",paraId:1,tocIndex:4},{value:"(",paraId:1,tocIndex:4},{value:"value",paraId:1,tocIndex:4},{value:"?: any, ",paraId:1,tocIndex:4},{value:"insertIndex",paraId:1,tocIndex:4},{value:"?: number) => void",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4},{value:"remove",paraId:1,tocIndex:4},{value:"\u5220\u9664\u4E00\u3001\u591A\u884C\u6570\u636E",paraId:1,tocIndex:4},{value:"(",paraId:1,tocIndex:4},{value:"index",paraId:1,tocIndex:4},{value:": number",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4},{value:"move",paraId:1,tocIndex:4},{value:"\u79FB\u52A8\u884C\u6570\u636E",paraId:1,tocIndex:4},{value:"(",paraId:1,tocIndex:4},{value:"from",paraId:1,tocIndex:4},{value:": number, ",paraId:1,tocIndex:4},{value:"to",paraId:1,tocIndex:4},{value:": number) => void",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4},{value:"setData",paraId:1,tocIndex:4},{value:"\u8BBE\u7F6E\u5217\u8868\u6570\u636E",paraId:1,tocIndex:4},{value:"(",paraId:1,tocIndex:4},{value:"data",paraId:1,tocIndex:4},{value:": any[]) => void",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4},{value:"getData",paraId:1,tocIndex:4},{value:"\u83B7\u53D6\u5217\u8868\u6570\u636E",paraId:1,tocIndex:4},{value:"() => any[]",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4},{value:"getSize",paraId:1,tocIndex:4},{value:"\u83B7\u53D6\u884C\u6570",paraId:1,tocIndex:4},{value:"() => number",paraId:1,tocIndex:4},{value:"-",paraId:1,tocIndex:4}]},8452:function(r,a){a.Z=`import { CCForm, CCList } from '@guc/react-form';
import { Button, Input } from 'antd';
import React, { useMemo } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Field } from '../components/Field';

export default () => {
  const [form] = CCForm.useForm();

  const handleOk = () => {
    if (form.validate()) {
      console.log('validate success: ', form.subData());
    } else {
      console.log('form data:', form.subData());
    }
  };

  const initialValue = useMemo(
    () => [
      { attrName: 'color', attrValue: 'red' },
      { attrName: 'size', attrValue: 'small' },
    ],
    [],
  );
  console.log('\u{1F91F} Code', initialValue);

  return (
    <CCForm form={form}>
      <div className={'flex flex-col items-baseline'}>
        <CCList initialValue={initialValue}>
          {({ add, remove, index }) => (
            <div className={'flex gap-x-6 flex-wrap'}>
              <Field form={'attrName'} title={'Attribute name'} rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </Field>
              <Field
                form={'attrValue'}
                title={'Attribute value'}
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input className={'w-60'} />
              </Field>
              <div className={'flex items-center gap-2'}>
                <Button
                  onClick={() => add(void 0, index + 1)}
                  icon={<PlusIcon className="size-4" />}
                  shape="circle"
                  type="dashed"
                />
                <Button onClick={() => remove()} icon={<MinusIcon className="size-4" />} shape="circle" type="dashed" />
              </div>
            </div>
          )}
        </CCList>

        <Button type={'primary'} onClick={handleOk} className={'mt-2'}>
          Submit
        </Button>
      </div>
    </CCForm>
  );
};
`}}]);
