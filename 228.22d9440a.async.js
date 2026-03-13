"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[228],{1178:function(Fe,z,C){C.r(z),C.d(z,{CCItem:function(){return K}});var xe=C(2092),ie=C.n(xe),Qe=C(5477),T=C(5826),ee=C(4814),w=C(9795),X=C(4838),K=(0,T.CCField)()(function(L){var _=L.value,Ue=L.onChange,fe=L.title,_e=L.error,oe=L.errors,Se=L.disabled,me=L.required,H=L.children,D=L.className,De=L.warpClassName,he=L.labelClassName,Te=L.errorClassName,se=L.layout,we=L.visible,y=L.fieldNames,E=y===void 0?{}:y,Re=L.noStyle,le=L.prefix,R=le===void 0?"cc-form":le,J=L.colon,Ve=J===void 0?!0:J,Ae=L.form,ue=L.name,Ee=(0,T.isUndefined)(fe),de=E.value,Q=de===void 0?"value":de,M=(0,w.useMemo)(function(){return w.Children.count(H)},[H]),Oe=function(){for(var Y=arguments.length,b=new Array(Y),B=0;B<Y;B++)b[B]=arguments[B];if(Ue.apply(void 0,b),M&&H&&"props"in H){var ne,O;(ne=(O=H.props).onChange)===null||ne===void 0||ne.call.apply(ne,[O].concat(b))}},te=M===1?(0,w.cloneElement)(H,ie()(ie()(ie()({id:ue!=null?ue:Ae,onChange:Oe},Q,_),"disabled",Se),"status",_e?"error":void 0)):H,ge=(0,X.jsxs)("div",{className:(0,ee.default)("".concat(R,"-item-content"),Ee&&De),children:[te,(0,X.jsx)("div",{className:(0,ee.default)("".concat(R,"-error-warp"),Re&&"no-style",Te),children:oe&&oe.map(function(k,Y){return(0,X.jsx)("div",{className:"".concat(R,"-error"),children:k},"".concat(Y,"-").concat(k))})})]});return(0,X.jsx)("div",{className:(0,ee.default)("".concat(R,"-item-warp"),D,!we&&"".concat(R,"-hidden")),children:Ee?ge:(0,X.jsxs)("div",{className:(0,ee.default)("".concat(R,"-item"),De,se==="horizontal"?"".concat(R,"-horizontal"):se==="vertical"?"".concat(R,"-vertical"):"".concat(R,"-default-layout")),children:[(0,X.jsx)("label",{className:(0,ee.default)("".concat(R,"-item-label"),Ve&&"".concat(R,"-colon"),!(0,T.isNull)(fe)&&me&&"".concat(R,"-required-optional"),he),children:fe}),ge]})})});K.Hide=(0,T.CCField)()(function(){return null})},5826:function(Fe,z,C){C.r(z),C.d(z,{CCField:function(){return ot},CCForm:function(){return $},CCList:function(){return Ce},CCListAction:function(){return ze},CCListView:function(){return $e},CCOutlet:function(){return Le},CCOutletView:function(){return Ke},autoRun:function(){return ye},extractData:function(){return Ye},get:function(){return re},getItemValue:function(){return Ne},getValueFromEvent:function(){return tt},isArray:function(){return b},isBlank:function(){return V},isBoolean:function(){return ge},isEmpty:function(){return O},isEmptyArray:function(){return pe},isEmptyObject:function(){return je},isFunction:function(){return M},isNull:function(){return ne},isNumber:function(){return Oe},isObject:function(){return k},isObservable:function(){return P.bi},isPromise:function(){return Y},isString:function(){return te},isUndefined:function(){return B},normalObservable:function(){return et},observable:function(){return P.LO},parseFieldData:function(){return ke},raw:function(){return P.LZ},shouldUpdate:function(){return qe},unobserve:function(){return P.p_}});var xe=C(7825),ie=C.n(xe),Qe=C(228),T=C.n(Qe),ee=C(335),w=C.n(ee),X=C(7999),K=C.n(X),L=C(6068),_=C.n(L),Ue=C(8305),fe=C.n(Ue),_e=C(5298),oe=C.n(_e),Se=C(7069),me=C.n(Se),H=C(2657),D=C.n(H),De=C(1742),he=C.n(De),Te=C(3136),se=C.n(Te),we=C(2092),y=C.n(we),E=C(9795),Re={visible:!0},le=(0,E.createContext)(null),R=(0,E.createContext)(null),J=(0,E.createContext)(null),Ve=(0,E.createContext)(Re),Ae=C(5558),ue=C.n(Ae),Ee=C(1759),de=C.n(Ee),Q=Object.prototype.toString;function M(s){return typeof s=="function"}function Oe(s){return typeof s=="number"||Q.call(s)==="[object Number]"}function te(s){return typeof s=="string"||Q.call(s)==="[object String]"}function ge(s){return typeof s=="boolean"||Q.call(s)==="[object Boolean]"}function k(s){var d=s&&s.constructor;return de()(s)==="object"&&Q.call(s)==="[object Object]"&&(!M(d)||M(d)&&d instanceof d&&Q.call(d)==="[object Function]")}function Y(s){return de()(s)==="object"&&(Q.call(s)==="[object Promise]"||Promise.resolve(s)===s)}function b(s){return Array.isArray(s)}function B(s){return typeof s=="undefined"}function ne(s){return s===null}function O(s){return B(s)||ne(s)}function V(s){return O(s)||!String(s).trim().length}function je(s){return O(s)||!k(s)||!Object.getOwnPropertyNames(s).length}function pe(s){return O(s)||!b(s)||!s.length}var Ie=function(d){var f={};return{subData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.subData(e)},validate:function(){var e;return(e=d.current)===null||e===void 0?void 0:e.validate()},asyncValidate:function(){var a=K()(T()().mark(function t(){var n;return T()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,(n=d.current)===null||n===void 0?void 0:n.asyncValidate();case 2:return i.abrupt("return",i.sent);case 3:case"end":return i.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}(),validateErrors:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.validateErrors(e)},asyncValidateErrors:function(){var a=K()(T()().mark(function t(n){var r;return T()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",(r=d.current)===null||r===void 0?void 0:r.asyncValidateErrors(n));case 1:case"end":return o.stop()}},t)}));function e(t){return a.apply(this,arguments)}return e}(),resetFields:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.resetFields(e)},setOriginData:function(e){var t=d.current;t?t.setOriginData(e):f.originData=b(e)?e:Object.assign({},f.originData,e)},setFieldData:function(e){var t=d.current;t?t.setFieldData(e):f.fieldData=b(e)?e:Object.assign({},f.fieldData,e)},addData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.addData(e)},setData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.setData(e)},__REF__:{mount:function(e){var t=f,n=t.originData,r=t.fieldData;d.current=e,n&&e.setOriginData(n),r&&e.setFieldData(r),f={}},unmount:function(){d.current=void 0,f={}}}}},Me=function(d){return{add:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.addItem(a,e)},remove:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.removeItem(a)},move:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.moveItem(a,e)},setData:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.setData(a)},getData:function(){var a;return(a=d.current)===null||a===void 0?void 0:a.getData()},getSize:function(){var a;return((a=d.current)===null||a===void 0?void 0:a.getData().length)||0},__REF__:{mount:function(a){return d.current=a},unmount:function(){return d.current=void 0}}}},ut=function(){return Ie((0,E.createRef)())},dt=function(){var d=(0,E.useRef)();return[(0,E.useMemo)(function(){return Ie(d)},[])]},ct=function(){var d=(0,E.useContext)(le),f=d.formInstance,a=(0,E.useRef)(f);return a.current=f,(0,E.useMemo)(function(){return Ie(a)},[])},vt=function(){return Me((0,E.createRef)())},ft=function(){var d=(0,E.useRef)();return[(0,E.useMemo)(function(){return Me(d)},[])]},mt=function(){var d=(0,E.useContext)(R),f=d.listInstance,a=(0,E.useRef)(f);return a.current=f,(0,E.useMemo)(function(){return Me(a)},[])},ht=function(){return(0,E.useContext)(J)},P=C(5297);function ye(s){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,f=null,a=null,e=function(n){a=n,f&&clearTimeout(f),f=setTimeout(function(){f=null,a&&a()},d)};return(0,P.N7)(s,{scheduler:e})}function Pe(s,d){var f=0;return s.indexOf("[")!==-1?s.replace(/(\w)\[+([\w.\s]*)]+/g,function(a,e,t){var n="[".concat(t.replace(/\./g,"_"),"_").concat(++f,"]");return t.indexOf(".")!==-1?(d[n]=t,"".concat(e,".").concat(n)):"".concat(e,".").concat(t)}):s}function Ne(s,d,f){if(O(s)||V(d))return f;if(k(s)||b(s)){var a=s,e={};if(d in s)a=s[d];else{var t=Pe(d,e).split("."),n=w()(t),r;try{for(n.s();!(r=n.n()).done;){var i=r.value;if(a=i in e?a[e[i]]:a[i],!a)break}}catch(o){n.e(o)}finally{n.f()}}return O(a)?f:a}else return s}function re(s,d,f){if(O(s)||V(d))return f;if(k(s)||b(s)){var a=s,e={};if(d in s)a=s[d];else for(var t=Pe(String(d),e).split("."),n=0,r=t.length;n<r;n++){var i=t[n];if(k(a)||b(a)){var o=t.slice(n).join(".");if(o in a){a=o in e?a[e[o]]:a[o];break}}if(a=i in e?a[e[i]]:a[i],!a)break}return B(a)?f:a}else return s}function Ye(s,d){var f=Object.create(null);(d||[]).forEach(function(e){var t=e.name,n=e.transform,r=e.inline,i=r===void 0?!0:r,o=et(s[t]);if(M(n)?o=i&&b(o)?o.map(function(m,h){return n(m,s,h)}):n(o,s):V(n)||(o=i&&b(o)?o.map(function(m){return Ne(m,n)}):Ne(o,n)),t=t.replace(/@\w*/g,""),i)ke(f,t,o);else{var l=t.lastIndexOf(".");if(l!==-1){var u=t.substring(0,l),v=t.substring(l+1),c=Ne(f,u);o=k(o)?o:y()({},v,o),b(c)?o=c.push(o):k(c)&&(o=Object.assign(c,o)),ke(f,u,o)}else k(o)?Object.assign(f,o):f[t]=o}});var a=Object.keys(f);return a.every(function(e){return/^([1-9]\d*|0)$/.test(e)})&&(f.length=a.length,f=Array.from(f).filter(function(e){return!O(e)})),f}function ke(s,d,f){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},e=a.ks,t=e===void 0?{}:e,n=Pe(d,t),r=n.indexOf(".");if(~r){var i=n.split("."),o=i[0],l=i.slice(1).join("."),u=s[o]||(l[0]==="0"?[]:Object.create(null)),v=ke(u,l,f,_()({ks:t},a));u!==s[o]&&(s[o in t?t[o]:o]=v)}else(!b(s)||!O(f))&&(s[d in t?t[d]:d]=f);return s}function et(s){return(0,P.bi)(s)?b(s)?Array.from(s):Object.assign({},s):s}function tt(s,d){return d&&d.target&&de()(d.target)==="object"&&s in d.target?d.target[s]:d}function qe(s,d){if(b(s)&&b(d)){if(!d.length){var f=s;s=d,d=f}return d.some(function(a,e){return a!==s[e]})}else return d!==s}var A=C(4838),We=function(s){return s[s.Field=1]="Field",s[s.List=2]="List",s}({}),ae=function(s){return s[s.DEFAULT=0]="DEFAULT",s[s.SET=1]="SET",s}({});function nt(s){return s.fieldType===We.Field}var $=function(s){he()(f,s);var d=se()(f);function f(a){var e;oe()(this,f),e=d.call(this,a),y()(D()(e),"originData",void 0),y()(D()(e),"fieldStatus",(0,P.LO)({})),y()(D()(e),"changeState",ae.DEFAULT),y()(D()(e),"fields",new Set),y()(D()(e),"fieldsMap",new Map),y()(D()(e),"removeFields",new Set),y()(D()(e),"updateFields",new Set),y()(D()(e),"listFields",new Set),y()(D()(e),"providerValue",{}),y()(D()(e),"timeoutChange",void 0),y()(D()(e),"timeoutErrorChange",void 0),y()(D()(e),"tempFields",void 0),y()(D()(e),"autoRunTime",void 0),y()(D()(e),"errorsMap",new Map);var t=D()(e),n=a.emitter;return t.state={data:(0,P.LO)({}),originData:{}},t.providerValue={formInstance:t,emitter:n},e}return me()(f,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){var t;(t=e.props.form)===null||t===void 0||t.__REF__.mount(e)})}},{key:"componentWillUnmount",value:function(){var e;(e=this.props.form)===null||e===void 0||e.__REF__.unmount(),this.unObserveField()}},{key:"shouldComponentUpdate",value:function(e,t){var n=this,r=e.disabled!==n.props.disabled;return r&&(n.providerValue=_()({},n.providerValue)),r||t.data!==n.state.data||e.children!==n.props.children}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var n=this;return t.data!==n.state.data&&(n.unObserveField(),n.revertField(),n.revertListField()),null}},{key:"componentDidUpdate",value:function(e,t){var n=this;n.changeState=ae.DEFAULT,t.data!==n.state.data&&n.observeField()}},{key:"revertListField",value:function(){var e=w()(this.listFields),t;try{for(e.s();!(t=e.n()).done;){var n=t.value,r=n.initState();n.removeOutData(r.data.length),n.setState(r)}}catch(i){e.e(i)}finally{e.f()}}},{key:"revertField",value:function(){var e=this,t=w()(e.fields),n;try{for(t.s();!(n=t.n()).done;){var r=n.value,i=r.initState(),o=r.getFormName();!V(o)&&!(o in e.state.data)&&e._setFieldValue(o,i.value,{raw:!0}),r.setState(i)}}catch(l){t.e(l)}finally{t.f()}}},{key:"unObserveField",value:function(){var e=w()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var n=t.value;n.unObserveData()}}catch(r){e.e(r)}finally{e.f()}}},{key:"observeField",value:function(){var e=w()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var n=t.value;n.observeData()}}catch(r){e.e(r)}finally{e.f()}}},{key:"fieldAutoRun",value:function(){var e=w()(this.updateFields),t;try{for(e.s();!(t=e.n()).done;){var n=t.value;n.observeData()}}catch(r){e.e(r)}finally{e.f()}this.updateFields.clear()}},{key:"handleChange",value:function(e){var t,n,r=this;(t=(n=r.props).onChange)===null||t===void 0||t.call(n,r.state.originData,e),r.changeState=ae.DEFAULT}},{key:"fieldChange",value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=this,i=n.raw,o=i===void 0?!1:i;V(e)||r.state.data[e]===t||(r._setFieldValue(e,t,{raw:o}),r.formChange(e))}},{key:"deleteField",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=this,r=t.isChange,i=r===void 0?!0:r;O(e)||(delete(0,P.LZ)(n.state.data)[e],delete n.state.originData[e],i&&n.formChange(e))}},{key:"formChange",value:function(e){var t,n=this;clearTimeout(n.timeoutChange);var r=!V(e)&&((t=n.getField(e))===null||t===void 0?void 0:t.props);n.tempFields=n.tempFields||[],r&&n.tempFields.push(r),n.timeoutChange=setTimeout(function(){n.handleChange(n.tempFields),n.tempFields=[]})}},{key:"errorsChange",value:function(e,t){var n=this,r=n.props.onErrorChange;n.errorsMap.set(e,{key:e,messages:t}),r&&(clearTimeout(n.timeoutErrorChange),n.timeoutErrorChange=setTimeout(function(){var i=[];n.errorsMap.forEach(function(o){var l;(l=o.messages)!==null&&l!==void 0&&l.length&&i.push(o)}),r(i)}))}},{key:"_setFieldValue",value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.raw,i=r===void 0?!1:r;if(!V(e)){var o=this.state.data;(i?(0,P.LZ)(o):o)[e]=t,this.state.originData[e]=t}}},{key:"setFieldStatus",value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.raw,i=r===void 0?!1:r;if(!V(e)){var o=t.disabled,l=t.required,u=t.error,v=t.visible;(i?(0,P.LZ)(this.fieldStatus):this.fieldStatus)[e]={disabled:o,visible:v,required:l,validate:O(u)?void 0:!u}}}},{key:"setField",value:function(e){var t=this;if(nt(e)){var n=e.getFormName();V(n)||t.fieldsMap.set(n,e),t.fields.add(e),t._setFieldValue(n,e.value,{raw:!0}),t.setFieldStatus(n,e.getConfig(),{raw:!0}),t.updateFields.add(e),clearTimeout(t.autoRunTime),t.autoRunTime=setTimeout(function(){return t.fieldAutoRun()})}else t.listFields.add(e)}},{key:"renameField",value:function(e,t){this.fieldsMap.set(e,t)}},{key:"getField",value:function(e){return V(e)?null:this.fieldsMap.get(e)}},{key:"unmountField",value:function(e){var t=this;if(nt(e)){var n=e.getFormName();e.unObserveData(),t.fields.delete(e),t.removeFields.add(e),!V(n)&&t.fieldsMap.delete(n)}else t.listFields.delete(e)}},{key:"resetFields",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];console.log("\u203C\uFE0FSADO\u203C\uFE0F",e),this.setData(b(this.originData)?[]:{},{isGet:!0,isChange:!1,resetPaths:e})}},{key:"setOriginData",value:function(e){var t=this;t.originData=e;var n=w()(t.listFields),r;try{for(n.s();!(r=n.n()).done;){var i=r.value,o=i.getConfig(),l=o.name;if(V(l))b(e)&&i.setData(e);else{var u=re(e,String(l));u&&i.setData(u)}}}catch(v){n.e(v)}finally{n.f()}t.setData(e,{isGet:!0,isChange:!1})}},{key:"setFieldData",value:function(e){this.setData(e,{isGet:!0,isChange:!0})}},{key:"setData",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=this;if(!O(e)){var r=t.isGet,i=r===void 0?!1:r,o=t.isChange,l=o===void 0?!1:o,u=t.resetPaths;n.changeState=ae.SET;var v=0,c=function(){setTimeout(function(){v--,v<=0&&(n.changeState=ae.DEFAULT)})},m=w()(n.fields),h;try{for(m.s();!(h=m.n()).done;){var p=h.value,F=p.getConfig(),g=F.name,x=F.convertValue,I=F.alias,j=F.initialValue;if(g&&(!u||(u==null?void 0:u.length)===0||u.includes(g))){for(var U=Symbol(),S=U,q=0,N=[g].concat(ue()(I));q<N.length;q++){var G=N[q],W=re(e,G,u?j:U);W!==U&&(S=W,g=G)}if(u&&p.resetError(),U===S)continue;S=i&&M(x)?p.execGetValue(g,S,e):S,v++,l?p.handleChange(S,c):p.setValue(S,c)}}}catch(Z){m.e(Z)}finally{m.f()}v===0&&(n.changeState=ae.DEFAULT)}}},{key:"addData",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this._setFieldValue(t,e[t])}},{key:"validate",value:function(){return this.validateErrors().length===0}},{key:"asyncValidate",value:function(){var a=K()(T()().mark(function t(){return T()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.asyncValidateErrors();case 2:return r.t0=r.sent.length,r.abrupt("return",r.t0===0);case 4:case"end":return r.stop()}},t,this)}));function e(){return a.apply(this,arguments)}return e}()},{key:"validateErrors",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=new Map;return this._validateErrors(t,function(n,r){return r(n.validateErrors())},e),Array.from(t.values())}},{key:"asyncValidateErrors",value:function(){var a=K()(T()().mark(function t(){var n=this,r,i=arguments;return T()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return r=i.length>0&&i[0]!==void 0?i[0]:[],l.abrupt("return",new Promise(function(u){var v=new Map,c=0,m=0,h=n._validateErrors(v,function(p,F){c++,K()(T()().mark(function g(){return T()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.t0=F,I.next=3,p.asyncValidateErrors();case 3:I.t1=I.sent,(0,I.t0)(I.t1),m++,m===c&&u(Array.from(v.values()));case 7:case"end":return I.stop()}},g)}))()},r);!h&&u([])}));case 2:case"end":return l.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],r=this,i=!1,o=w()(this.fields),l;try{var u=function(){var c=l.value,m=c.getConfig(),h=m.name,p=m.visible,F=m.parentVisible;!V(h)&&p&&F&&(!n.length||n.findIndex(function(g){return String(h).indexOf(String(g))===0})!==-1)&&(i=!0,t(c,function(g){var x=g.error,I=g.errors,j={key:h,messages:I};x&&e.set(h,j),r.errorsMap.set(String(h),j)}))};for(o.s();!(l=o.n()).done;)u()}catch(v){o.e(v)}finally{o.f()}return i}},{key:"subData",value:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=this,r=t.merge,i=r===void 0?!1:r,o=[],l=[],u=n.state,v=u.data,c=u.initialValue,m=w()(n.removeFields),h;try{for(m.s();!(h=m.n()).done;){var p=h.value,F=p.getConfig(),g=F.name;g&&l.push(g)}}catch(ve){m.e(ve)}finally{m.f()}var x=w()(n.fields),I;try{for(x.s();!(I=x.n()).done;){var j=I.value,U=j.getConfig(),S=U.name,q=U.ignore,N=U.visible,G=U.parentVisible;S&&(l.push(S),!q&&G&&N&&o.push(U))}}catch(ve){x.e(ve)}finally{x.f()}var W=Ye(v,o);for(var Z in v)!~l.indexOf(Z)&&!(Z in W)&&(W[Z]=v[Z]);var be=(e=n.originData)!==null&&e!==void 0?e:c;if(i&&be){var ce=w()(n.listFields),st;try{var Ft=function(){var He=st.value,Dt=He.getConfig(),lt=Dt.name,Ze=He.getData(),Vt=He.deleteIndex,Xe=re(W,String(lt));lt&&Xe&&Ze&&k(Ze[0])&&Ze.forEach(function(Et,Je){Vt.includes(Je)||(Xe[Je]=Object.assign({},Et,Xe[Je]))})};for(ce.s();!(st=ce.n()).done;)Ft()}catch(ve){ce.e(ve)}finally{ce.f()}return Object.assign({},be,W)}return W}},{key:"data",get:function(){return this.state.data}},{key:"render",value:function(){var e=this,t=e.props.disabled,n=t===void 0?!1:t,r=e.state,i=r.data,o=r.originData,l=r.initialValue,u=e.providerValue;return u.data=i,u.originData=o,u.initialValue=l,u.disabled=n,u.fieldStatus=e.fieldStatus,(0,A.jsx)(le.Provider,{value:u,children:e.props.children})}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.data,r=e.initialValue;return n&&n!==t.originData?{data:(0,P.LO)(n),originData:n}:r&&r!==t.initialValue?{data:(0,P.LO)({}),originData:{},initialValue:r}:null}}]),f}(E.Component);y()($,"Context",le),y()($,"useForm",dt),y()($,"useFormInstance",ct),y()($,"useList",ft),y()($,"useListInstance",mt),y()($,"createForm",ut),y()($,"createList",vt),y()($,"Outlet",void 0),y()($,"OutletView",void 0),y()($,"List",void 0),y()($,"Field",void 0),y()($,"ListView",void 0),y()($,"ListAction",void 0);var gt=["forwardRef","__Component__","preserve","title","valuePropName","forValue","parentField","deliver"],rt="id",at=!0,pt=!0,it=!0,yt=!1,Ct=!1,Be=function(s){he()(f,s);var d=se()(f);function f(a,e){var t;oe()(this,f),t=d.call(this,a,e),y()(D()(t),"formInstance",void 0),y()(D()(t),"changeFlag",!1),y()(D()(t),"changeForm",!1),y()(D()(t),"isObserveUnion",!1),y()(D()(t),"unmount",!1),y()(D()(t),"observeReactions",[]),y()(D()(t),"providerValue",{}),y()(D()(t),"fieldType",We.Field);var n=D()(t);return n.listenerValueChange=n.listenerValueChange.bind(n),n.onChange=n.onChange.bind(n),n.observeVisible=n.observeVisible.bind(n),n.observeDisabled=n.observeDisabled.bind(n),n.observeRequired=n.observeRequired.bind(n),n.formInstance=Ie({current:e==null?void 0:e.formInstance}),n.state=n.initState(),n.providerValue={fieldInstance:n},t}return me()(f,[{key:"initState",value:function(){var e=this,t=e.props,n=e.context,r=t.initialValue,i=t.convertValue,o=t.defaultValue,l=t.visible,u=t.disabled,v=e.getFormName(t),c={},m=B(r)?o:r;!V(v)&&n&&(n.initialValue&&(c=n.initialValue,m=re(n.initialValue,v,m)),n.data&&v in n.data&&!B(n.data[v])&&(m=n.data[v]));var h=e.getOptions(),p=h.options,F=h.data,g=e.findRequired(F,p),x=g.required,I=g.message,j={value:M(i)?e.execGetValue(v,m,c):m,initialValue:m,visible:O(l)?!0:!!e.execCallback(l,F,p),disabled:O(u)?!1:!!e.execCallback(u,F,p),required:x,requiredMsg:I,_refreshMark:{}};return e.changeFlag=!1,e.changeForm=!1,e.isObserveUnion=!1,j}},{key:"getFormName",value:function(e){var t=e||this.props,n=t.name,r=t.eachConfig,i=t.injectListName;return r&&i?!Oe(n)&&n?"".concat(r.name,".").concat(n):r.name:n}},{key:"getFormAlias",value:function(e){var t=e||this.props,n=t.alias,r=t.eachConfig;return V(n)?[]:(n=b(n)?n:[n],n.map(function(i){return r?i?"".concat(r.name,".").concat(i):r.name:i}))}},{key:"findRequired",value:function(e,t){var n=this,r=n.props.rules;if(!O(r)){r=k(r)?[r]:r;var i=function(u){return k(u)&&!!n.execCallback(u.required,e,t)};if(b(r)){var o=r.find(i);return{required:!!(o!=null&&o.required),message:o==null?void 0:o.message}}else return{required:n.execCallback(r,e,t)===!0}}return{required:!1}}},{key:"execGetValue",value:function(e,t,n){var r=this.props,i=r.convertValue,o=r.eachConfig,l=r.inline;if(!l&&!V(e)){var u=String(e),v=o&&o.name?o.name:u.substring(0,u.lastIndexOf(".")),c=V(v)?n:re(n,v);t=c!=null?c:t}try{return i(t)}catch(m){console.warn("ConvertValue:",m)}}},{key:"observeData",value:function(){var e=this;e.unObserveData(),e.observeReactions.push(ye(e.observeVisible),ye(e.observeDisabled),ye(e.observeRequired)),e.observeUnion()}},{key:"unObserveData",value:function(){this.observeReactions.forEach(function(e){return(0,P.p_)(e)}),this.observeReactions=[]}},{key:"getOptions",value:function(){var e=this,t=e.props.eachConfig||{},n=t.name,r=t.data,i=e.state||{},o=i.value,l=i.disabled,u=i.visible,v=i.error,c=i.required,m=e.context,h=m.data,p=m.originData,F=m.fieldStatus,g={name:n,form:n,val:o,data:p,status:F,selfStatus:{disabled:l,visible:u,required:c,validate:O(v)?void 0:!v},listData:r};return{options:g,data:h,originData:p}}},{key:"observeDisabled",value:function(){var e=this;if(!e.unmount){var t=e.props.disabled,n=e.getOptions(),r=n.options,i=n.data;O(t)||(e.disabled=!!e.execCallback(t,i,r))}}},{key:"observeVisible",value:function(){var e=this;if(!e.unmount){var t=e.props.visible,n=e.getOptions(),r=n.options,i=n.data;O(t)||(e.visible=!!e.execCallback(t,i,r))}}},{key:"observeRequired",value:function(){var e=this;if(!e.unmount){var t=e.getOptions(),n=t.options,r=t.data,i=e.findRequired(r,n),o=i.required,l=i.message;e.required=o,e.requiredMsg=l}}},{key:"observeUnion",value:function(){var e=this;e.isObserveUnion=!1;var t=e.context,n=e.getUnionList();if(!(e.unmount||pe(n))){var r=e.props,i=r.unionValue,o=r.unionValidate,l=t.formInstance,u=e.getFormName();i=M(i)?i:function(){return o?e.value:void 0};var v=function c(m){var h,p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],F=((h=l.getField(m))===null||h===void 0?void 0:h.getUnionList())||[];return F.forEach(function(g){var x=b(g)?g[0]:g;p.indexOf(x)===-1&&(p.push(x),c(x,p))}),p};n.forEach(function(c){var m=b(c)?c:[c,i],h=fe()(m,2),p=h[0],F=h[1],g=v(p,[p]),x=ye(function(){var I=e.getOptions(),j=I.options,U=I.data,S=I.originData,q=e.execCallback(F,U[p],_()(_()({},j),{},{data:S})),N=!1,G=function(){var Z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},be=Z.valid,ce=be===void 0?!1:be;!e.unmount&&p in U&&e.handleChange(q,function(){ce&&o&&e.unionValidateErrors()})};e.isObserveUnion&&(l==null?void 0:l.changeState)!==ae.SET?(N=!0,G({valid:!0})):g.forEach(function(W){return U[W]}),!N&&O(u)&&G()});e.observeReactions.push(x)}),e.isObserveUnion=!0}}},{key:"getUnionList",value:function(){var e=this,t=e.props.union;if(V(t))return null;var n=e.getOptions(),r=n.options;return t=M(t)?t(r):t,V(t)?null:(t=b(t)?t:t.split(","),t)}},{key:"execCallback",value:function(e){try{for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return M(e)?e.apply(void 0,n):e}catch(i){console.warn(i)}}},{key:"getTitle",value:function(){var e=this,t=e.getOptions(),n=t.options,r=t.data;return e.execCallback(e.props.title,r,n)}},{key:"getConfig",value:function(e,t){var n=this;e=e||n.props,t=t||n.state;var r=e,i=r.inline,o=r.transform,l=r.ignore,u=r.convertValue,v=r.parentField,c=t,m=c.disabled,h=c.visible,p=c.error,F=c.required,g=c.initialValue;return{inline:i,name:n.getFormName(e),alias:n.getFormAlias(e),transform:o,visible:h,parentVisible:v.visible,disabled:m,ignore:l,error:p,required:F,convertValue:u,initialValue:g}}},{key:"onChange",value:function(e){var t=this,n=t.props,r=n.normalize,i=n.valuePropName,o=i===void 0?"value":i,l=t.context;e=tt(o,e);for(var u=arguments.length,v=new Array(u>1?u-1:0),c=1;c<u;c++)v[c-1]=arguments[c];t.handleChange(r?r(e,{val:t.state.value,data:l.data,args:v}):e)}},{key:"handleChange",value:function(e,t){var n,r=this;if(r.unmount||e===r.state.value){t==null||t();return}var i=r.context,o=r.props.listener,l=o===void 0?{}:o,u=l.key,v=l.transform;r.changeFlag=!0,r.changeForm=!0,u&&((n=i.emitter)===null||n===void 0||n.emit(u,v?v(e,i.data):e)),r.handleValue(e,t)}},{key:"setValue",value:function(e,t){this.changeForm=!0,this.handleValue(e,t)}},{key:"value",get:function(){return this.state.value}},{key:"handleValue",value:function(e,t){var n=this,r=n.state.value;!n.unmount&&!n.equalsValue(e,r)?n.setState({value:e},t):t==null||t()}},{key:"equalsValue",value:function(e,t){var n=this,r=n.props,i=r.label,o=r.unique,l=o===void 0?rt:o;if(e===t)return!0;var u=function(c,m){if(je(c)||je(m))return!1;var h,p;return l in c||l in m?(h=c[l],p=m[l]):i&&(i in c||i in m)&&(h=c[i],p=m[i]),n.equalsValue(h,p)};return k(e)||k(t)?u(e,t):b(e)||b(t)?pe(e)||pe(t)||e.length!==t.length?!1:e.every(function(v,c){return n.equalsValue(v,t[c])}):String(e)===String(t)}},{key:"disabled",set:function(e){e!==this.state.disabled&&this.setState({disabled:e})}},{key:"required",set:function(e){e!==this.state.required&&this.setState({required:e})}},{key:"requiredMsg",set:function(e){e!==this.state.requiredMsg&&this.setState({requiredMsg:e})}},{key:"visible",set:function(e){var t=this;e!==t.state.visible&&(e||t.setState({error:void 0,errors:void 0}),t.setState({visible:e}))}},{key:"resetError",value:function(){this.setState({error:void 0,errors:void 0})}},{key:"validateErrors",value:function(){return this._validateErrors(this.validate())}},{key:"asyncValidateErrors",value:function(){return this._asyncValidateErrors()}},{key:"unionValidateErrors",value:function(){return this._asyncValidateErrors({isUnionValid:!0})}},{key:"_asyncValidateErrors",value:function(){var a=K()(T()().mark(function t(){var n,r,i,o,l,u,v,c,m,h,p=arguments;return T()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:if(n=p.length>0&&p[0]!==void 0?p[0]:{},r=this,i=n.isUnionValid,o=r.validate({async:!0,isUnionValid:i}),!b(o)){g.next=38;break}l=[],u=!0,v=w()(o),g.prev=8,v.s();case 10:if((c=v.n()).done){g.next=29;break}if(m=c.value,!Y(m)){g.next=26;break}return h=void 0,g.prev=14,g.next=17,m;case 17:h=g.sent,g.next=23;break;case 20:g.prev=20,g.t0=g.catch(14),h=g.t0;case 23:te(h)?l.push(h):h||(u=!1),g.next=27;break;case 26:l.push(m);case 27:g.next=10;break;case 29:g.next=34;break;case 31:g.prev=31,g.t1=g.catch(8),v.e(g.t1);case 34:return g.prev=34,v.f(),g.finish(34);case 37:o=l.length?l:u;case 38:return g.abrupt("return",this._validateErrors(o));case 39:case"end":return g.stop()}},t,this,[[8,31,34,37],[14,20]])}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e){var t=this,n=t.state,r=n.errors,i=n.error,o,l;return ge(e)?(l=!e,o=void 0):(l=!!e.length,o=e),l!==i&&t.setState({error:l}),t.equalsValue(r,o)||t.setState({errors:o,_refreshMark:{}}),{error:l,errors:o}}},{key:"validate",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=this,n=e.async,r=n===void 0?!1:n,i=e.isUnionValid,o=i===void 0?!1:i,l=t.props.rules,u=t.state,v=u.required,c=u.requiredMsg,m=u.value,h=u.visible;if(!h)return!0;var p=o?!1:t.validateEmpty(m);if(v&&p)return V(c)?!1:[c];if(p)return!0;var F=t.getOptions(),g=F.options,x=F.originData,I=function(N){if(M(N))return N(x,_()(_()({},g),{},{isUnionValid:o}));if(!o){if(N&&N instanceof RegExp)return N.test(m);if(k(N)){var G=N.pattern,W=N.message;if(G&&!G.test(m))return W||!1}}return!0};if(b(l)){var j=[],U=!0;return l.forEach(function(q){var N=I(q);te(N)||r&&Y(N)?j.push(N):N||(U=!1)}),j.length?j:U}else if(!o&&k(l)){var S=I(l);return te(S)?[S]:S}return!0}},{key:"validateEmpty",value:function(e){var t=this.props.label,n=function r(i){return r(i)||!!(t&&V(i[t]))};return O(e)?!0:te(e)?V(e):k(e)?n(e):b(e)?pe(e)||k(e[0])&&n(e[0]):O(e)}},{key:"listenerValueChange",value:function(e){var t=this,n=this.context,r=t.props.listener;t.handleValue(r!=null&&r.convertValue?r.convertValue(e,n.data):e)}},{key:"componentDidMount",value:function(){var e,t=this,n=t.context,r=t.props.listener,i=r===void 0?{}:r,o=i.key;o&&((e=n.emitter)===null||e===void 0||e.addListener(o,t.listenerValueChange)),n.formInstance.setField(t)}},{key:"componentWillUnmount",value:function(){var e,t=this;t.unmount=!0;var n=t.context,r=t.props.listener,i=r===void 0?{}:r,o=i.key;o&&((e=n.emitter)===null||e===void 0||e.removeListener(o,t.listenerValueChange)),n.formInstance.unmountField(t)}},{key:"shouldComponentUpdate",value:function(e,t){var n=this,r=n.props,i=n.state;return t.value!==i.value||t.required!==i.required||t.error!==i.error||t.visible!==i.visible||t.disabled!==i.disabled||t._refreshMark!==i._refreshMark||e.name!==r.name||n.getFormName(e)!==n.getFormName(r)||qe(r.shouldUpdate,e.shouldUpdate)}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var n=this,r=this.context,i=r.formInstance,o=n.state,l=o.required,u=o.error,v=o.visible,c=o.disabled,m=n.getFormName(n.props),h=n.getFormName(e);return e.name!==this.props.name&&i.unmountField(this),m!==h&&!V(m)&&i.renameField(m,n),(l!==t.required||u!==t.error||v!==t.visible||c!==t.disabled)&&i.setFieldStatus(m,{required:l,error:u,visible:v,disabled:c}),null}},{key:"componentDidUpdate",value:function(e,t){var n=this,r=this.context,i=r.formInstance,o=n.state,l=o.value,u=o.required,v=o.error,c=o.errors,m=n.getFormName(n.props);if(l!==t.value){var h,p;i.fieldChange(m,l,{raw:!n.changeForm}),n.changeFlag&&((h=(p=n.props).onChange)===null||h===void 0||h.call(p,l))}(l!==t.value&&n.changeFlag||u!==t.required&&!u&&!O(v))&&n.asyncValidateErrors(),e.name!==n.props.name&&i.setField(n),m!==n.getFormName(e)&&i.fieldChange(m,l,{raw:!0}),!V(m)&&c!==t.errors&&i.errorsChange(String(m),c),n.changeFlag=!1,n.changeForm=!1}},{key:"render",value:function(){var e=this,t=e.context,n=e.state,r=n.value,i=n.required,o=n.error,l=n.errors,u=n.disabled,v=n.visible,c=e.props,m=c.forwardRef,h=c.__Component__,p=c.preserve,F=c.title,g=c.valuePropName,x=c.forValue,I=c.parentField,j=c.deliver,U=ie()(c,gt);if(!v&&!p)return null;var S=x?x(r,t.data):r;g&&(U[g]=S);var q=e.providerValue;q.visible=v;var N=(0,A.jsx)(h,_()(_()({},U),{},{title:e.getTitle(),data:t.data,value:S,required:i,disabled:t.disabled||u,visible:v,formInstance:e.formInstance,error:o,errors:l,onChange:e.onChange,ref:m}));return j?(0,A.jsx)(Ve.Provider,{value:q,children:N}):N}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=null;function r(i){var o=e[i];!B(o)&&!M(o)&&o!==t["_".concat(i)]&&(n=n||{},n[i]=o,n["_".concat(i)]=o)}return["value","disabled","visible"].forEach(r),n}}]),f}(E.Component);y()(Be,"contextType",$.Context),y()(Be,"defaultProps",{inline:at,unique:rt,deliver:pt,injectListName:it,preserve:yt,unionValidate:Ct});function ot(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},d=s.defaultValue;return function(f){return function(a){return(0,A.jsx)(J.Consumer,{children:function(t){var n,r=t,i=a.initialValue,o=a.form,l=a.name,u=a.inline,v=u===void 0?at:u,c=a.injectListName,m=c===void 0?it:c;if(l=(n=l)!==null&&n!==void 0?n:o,r&&m){var h=r.data[r.index];i=l?k(h)&&l in h?h[l]:v?i:h:B(h)?i:h}return(0,A.jsx)(Ve.Consumer,{children:function(F){return(0,A.jsx)(Be,_()(_()({defaultValue:d},a),{},{name:l,parentField:F,initialValue:i,eachConfig:r,__Component__:f}))}})}})}}}var ze=function(d){var f=d.children,a=(0,E.useContext)(R);return a?(0,A.jsx)(A.Fragment,{children:f(a)}):null},$e=function(d){var f=d.children,a=d.component,e=d.provider,t=(0,E.useContext)(R);if(!t||!f)return null;var n=t.keys,r=t.name,i=t.remove,o=n.map(function(l,u){var v=V(r)?String(u):"".concat(r,".").concat(u),c=_()(_()({},t),{},{form:v,name:v,index:u,key:l,remove:function(p){return i(p!=null?p:u)}}),m=(0,A.jsx)(J.Provider,{value:c,children:M(f)?f(c):f},l);return e?e(c,m):m});return a?a(t,o):(0,A.jsx)(A.Fragment,{children:o})},Ge=function(s){he()(f,s);var d=se()(f);function f(a,e){var t;oe()(this,f),t=d.call(this,a,e),y()(D()(t),"deleteIndex",[]),y()(D()(t),"uuid",0),y()(D()(t),"fieldType",We.List);var n=D()(t),r=a.formList;return n.genID=n.genID.bind(n),n.addItem=n.addItem.bind(n),n.removeItem=n.removeItem.bind(n),n.moveItem=n.moveItem.bind(n),n.state=n.initState(),r&&r.__REF__&&(r.__REF__.current=n),t}return me()(f,[{key:"initState",value:function(){var e=this,t=e.props,n=e.context;e._initID();var r=t.initRows,i=t.initialValue,o=e.getFormName(t);n&&n.initialValue&&(V(o)?b(n.initialValue)&&(i=n.initialValue):i=re(n.initialValue,o,i));var l=Array(r),u=i;b(i)&&u.length&&(r=u.length,l=u);var v=Array(r).fill(1).map(e.genID);return{keys:v,data:l}}},{key:"_initID",value:function(){this.uuid=1e3}},{key:"genID",value:function(){return"CC".concat(++this.uuid)}},{key:"getFormName",value:function(e){var t=e.name,n=e.eachConfig;return n?t?"".concat(n.name,".").concat(t):n.name:t}},{key:"setData",value:function(e){var t=this,n=t.props.initRows,r=t.state.keys;O(e)||!b(e)?e=[]:e.length===0&&(e=Array(n)),t.removeOutData(e.length),r=r.slice(0,e.length),t.setState({keys:r,data:e})}},{key:"getData",value:function(){return this.state.data}},{key:"addItem",value:function(e,t){var n,r=this,i=r.genID(),o=r.state,l=o.data,u=o.keys;u=Array.from(u),!O(t)&&t<l.length?(u.splice(t,0,i),l.splice(t,0,e),r.removeListData(t,1)):(u.push(i),l.push(e)),r.setState({keys:u,data:l}),(n=r.context)===null||n===void 0||n.formInstance.formChange()}},{key:"removeItem",value:function(e){var t=this,n=t.state,r=n.data,i=n.keys,o=i.length,l=(b(e)?e:[e]).filter(function(v){return v<o});if(l.length){var u;(u=t.deleteIndex).push.apply(u,ue()(l)),t.removeListData(o-l.length,l.length),i=Array.from(i),l.forEach(function(v,c){i.splice(v-c,1),r.splice(v-c,1)}),t.setState({keys:i,data:r})}}},{key:"moveItem",value:function(e,t){var n=this,r=n.state,i=r.data,o=r.keys;if(e!==t&&e>=0&&e<o.length&&t>=0&&t<o.length){var l;o=Array.from(o);var u=o[e],v=i[e];o.splice(e,1),o.splice(t,0,u),i.splice(e,1),i.splice(t,0,v),n.setState({keys:o,data:i}),(l=n.context)===null||l===void 0||l.formInstance.formChange()}}},{key:"removeListData",value:function(e){for(var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=this,r=n.getFormName(n.props),i=n.context,o=i.data,l=i.formInstance,u=e+t,v=[],c=e;c<u;c++)v.push(r?"".concat(r,".").concat(c):String(c));var m=function(F){v.forEach(function(g){F.indexOf(g)===0&&l.deleteField(F)})};for(var h in o)m(h)}},{key:"removeOutData",value:function(e){var t=this,n=t.getFormName(t.props),r=t.context,i=r.data,o=r.formInstance,l=n?Array(e).fill(1).map(function(u,v){return"".concat(n,".").concat(v)}):[];Object.keys(i).forEach(function(u){if(V(n)){var v=Number(u),c=u.substring(0,u.indexOf("."));String(v)===u&&v<e?o.deleteField(u,{isChange:!1}):/^[0-9]+$/.test(c)&&Number(c)>=e&&o.deleteField(u,{isChange:!1})}else u.indexOf(String(n))===0&&l.findIndex(function(m){return u.indexOf(m)!==-1})===-1&&o.deleteField(u,{isChange:!1})})}},{key:"getConfig",value:function(){return{name:this.getFormName(this.props)}}},{key:"componentDidMount",value:function(){var e,t,n=this;(e=n.props.formList)===null||e===void 0||e.__REF__.mount(n),(t=n.context)===null||t===void 0||t.formInstance.setField(n)}},{key:"componentWillUnmount",value:function(){var e,t,n=this;(e=n.props.formList)===null||e===void 0||e.__REF__.unmount(),(t=n.context)===null||t===void 0||t.formInstance.unmountField(n)}},{key:"shouldComponentUpdate",value:function(e,t){var n=this,r=n.props,i=n.state;return e.name!==r.name||t.keys!==i.keys||n.getFormName(e)!==n.getFormName(r)||qe(r.shouldUpdate,e.shouldUpdate)}},{key:"componentDidUpdate",value:function(e,t,n){if(t.keys!==this.state.keys){var r;(r=this.context)===null||r===void 0||r.formInstance.observeField()}}},{key:"render",value:function(){var e=this,t=e.context,n=e.getFormName(e.props),r=e.props.children,i=e.state,o=i.keys,l=i.data;if(!r||!b(o))return null;var u={form:n,name:n,listInstance:e,keys:o,data:l,length:o.length,formData:t.data,add:function(m,h){return e.addItem(m,h)},remove:function(m){return e.removeItem(m)},move:function(m,h){return e.moveItem(m,h)}},v=M(r)?(0,A.jsx)($e,{children:r}):r;return(0,A.jsx)(R.Provider,{value:u,children:v})}}]),f}(E.Component);y()(Ge,"contextType",$.Context),y()(Ge,"defaultProps",{initRows:1});var Ce=function(d){var f,a=(0,E.useContext)(J),e=d.form,t=d.name,n=d.initialValue,r=d.children;t=(f=t)!==null&&f!==void 0?f:e;var i=a;if(i){var o=i.data[i.index];n=t?k(o)&&t in o?o[t]:n:o}return(0,A.jsx)(Ge,_()(_()({},d),{},{name:t,initialValue:n,eachConfig:i,children:r}))};Ce.View=$e,Ce.Action=ze,Ce.useItem=ht;var bt=["children","forProps"];function Le(){return function(s){return(0,E.forwardRef)(function(d,f){return(0,A.jsx)(J.Consumer,{children:function(e){return(0,A.jsx)($.Context.Consumer,{children:function(n){return(0,A.jsx)(s,_()(_()(_()({},d),{},{ref:f},n),{},{eachConfig:e||void 0}))}})}})})}}var Ke=Le()(function(s){var d=s.children,f=s.forProps,a=ie()(s,bt);return(0,E.cloneElement)(d,f?f(a):a)});Le.View=Ke,$.List=Ce,$.ListView=$e,$.Field=ot,$.Outlet=Le,$.OutletView=Ke,$.ListAction=ze},5477:function(Fe,z,C){C.r(z)},1608:function(Fe,z){z.Z=`.cc-form-item-warp {
  display: flex;
  flex-direction: column;
}

.cc-form-item-content {
  flex: 1;
  min-width: 0;
}

.cc-form-item {
  display: flex;
}

.cc-form-default-layout,
.cc-form-vertical {
  flex-direction: column;
  .cc-form-item-label {
    padding-bottom: 0.25rem;
  }
}

.cc-form-horizontal {
  flex-direction: row;
  .cc-form-item-label {
    height: 2rem;
  }

  .cc-form-colon::after {
    margin-inline-start: 0.125rem;
    margin-inline-end: 0.5rem;
    content: ':';
    position: relative;
    margin-block: 0;
  }

  .cc-form-item-warp {
    margin-bottom: 0;
  }

  .cc-form-error-warp {
    min-height: 1.375rem;
  }
}

.cc-form-hidden {
  display: none !important;
}

.cc-form-layout-col {
  .cc-form-default-layout {
    flex-direction: row;
    .cc-form-item-label {
      height: 2rem;
    }

    .cc-form-colon::after {
      margin-inline-start: 0.125rem;
      margin-inline-end: 0.5rem;
      content: ':';
      position: relative;
      margin-block: 0;
    }

    .cc-form-item-warp {
      margin-bottom: 0;
    }

    .cc-form-error-warp {
      min-height: 1.375rem;
    }
  }
}

@keyframes fadeInDown {
  0% {
    transform: translate3d(0, -20%, 0);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

.cc-form-error-warp {
  min-height: 1.25rem;
  padding: 0.125rem 0;

  .cc-form-error {
    color: #ff4d4f;
    font-size: 0.75rem;
    animation: fadeInDown 0.3s;
  }
  &.no-style {
    position: absolute;
    min-height: 0;
  }
}

.cc-form-item-label {
  font-size: 14px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.cc-form-required-optional {
  &::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
}
`},189:function(Fe,z){z.Z=`import './index.css';

import { CCField, isNull, isUndefined, ICCField } from '@guc/react-form';
import cls from 'clsx';
import type { ReactElement, FC } from 'react';
import { Children, cloneElement, useMemo } from 'react';

interface IChildProps {
  onChange?: any;
  disabled?: boolean;
  status?: string;
  id?: string | number;
}

export interface IItemProps {
  children?: ReactElement<IChildProps> | ReactElement<IChildProps>[];
  className?: string;
  warpClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  layout?: 'horizontal' | 'vertical';
  fieldNames?: {
    value?: string;
  };
  noStyle?: boolean;
  prefix?: string;
  colon?: boolean;
}

export const CCItem = CCField<IItemProps>()((props) => {
  const {
    value,
    onChange,
    title,
    error,
    errors,
    disabled,
    required,
    children,
    className,
    warpClassName,
    labelClassName,
    errorClassName,
    layout,
    visible,
    fieldNames = {},
    noStyle,
    prefix = 'cc-form',
    colon = true,
    form,
    name,
  } = props;
  const isNotTitle = isUndefined(title);
  const { value: valueKey = 'value' } = fieldNames;

  const childCount = useMemo(() => {
    return Children.count(children);
  }, [children]);

  const handleChange = (...args: any[]) => {
    // @ts-ignore
    onChange(...args);
    if (childCount && children && 'props' in children) {
      children.props.onChange?.(...args);
    }
  };

  const element =
    childCount === 1
      ? cloneElement(children as ReactElement<IChildProps>, {
          id: name ?? form,
          onChange: handleChange,
          [valueKey]: value,
          disabled,
          status: error ? 'error' : void 0,
        })
      : children;

  const content = (
    <div className={cls(\`\${prefix}-item-content\`, isNotTitle && warpClassName)}>
      {element}
      <div className={cls(\`\${prefix}-error-warp\`, noStyle && 'no-style', errorClassName)}>
        {errors &&
          errors.map((it, ix) => (
            <div key={\`\${ix}-\${it}\`} className={\`\${prefix}-error\`}>
              {it}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className={cls(\`\${prefix}-item-warp\`, className, !visible && \`\${prefix}-hidden\`)}>
      {!isNotTitle ? (
        <div
          className={cls(
            \`\${prefix}-item\`,
            warpClassName,
            layout === 'horizontal'
              ? \`\${prefix}-horizontal\`
              : layout === 'vertical'
                ? \`\${prefix}-vertical\`
                : \`\${prefix}-default-layout\`,
          )}>
          <label
            className={cls(
              \`\${prefix}-item-label\`,
              colon && \`\${prefix}-colon\`,
              !isNull(title) && required && \`\${prefix}-required-optional\`,
              labelClassName,
            )}>
            {title}
          </label>
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}) as FC<IItemProps & ICCField> & { Hide: FC<ICCField> };

CCItem.Hide = CCField()(() => null);
`}}]);
