"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[168],{4365:function(pe,W,y){y.r(W),y.d(W,{Field:function(){return Z},HideField:function(){return Ie}});var Oe=y(2092),re=y.n(Oe),He=y(7335),T=y(5826),J=y(4814),w=y(9795),H=y(4838),Z=(0,T.CCField)()(function(b){var Ne=b.value,ke=b.onChange,oe=b.title,se=b.error,ye=b.errors,le=b.disabled,$e=b.required,F=b.children,Le=b.className,ne=b.warpClassName,xe=b.labelClassName,ue=b.errorClassName,Ce=b.layout,C=b.visible,I=b.fieldNames,Ue=I===void 0?{}:I,de=b.noStyle,Q=b.prefix,A=Q===void 0?"cc-form":Q,ce=b.colon,Se=ce===void 0?!0:ce,ve=(0,T.isUndefined)(oe),be=Ue.value,fe=be===void 0?"value":be,G=(0,w.useMemo)(function(){return w.Children.count(F)},[F]),j=function(){for(var N=arguments.length,Y=new Array(N),D=0;D<N;D++)Y[D]=arguments[D];if(ke.apply(void 0,Y),G&&F&&"props"in F){var q,me;(q=(me=F.props).onChange)===null||q===void 0||q.call.apply(q,[me].concat(Y))}},_e=G===1?(0,w.cloneElement)(F,re()(re()(re()({onChange:j},fe,Ne),"disabled",le),"status",se?"error":void 0)):F,X=(0,H.jsxs)("div",{className:(0,J.default)("cc-form-item-content",ve&&ne),children:[_e,(0,H.jsx)("div",{className:(0,J.default)("".concat(A,"-error-warp"),de&&"no-style",ue),children:ye&&ye.map(function(ae,N){return(0,H.jsx)("div",{className:"".concat(A,"-error"),children:ae},"".concat(N,"-").concat(ae))})})]});return(0,H.jsx)("div",{className:(0,J.default)("".concat(A,"-item-warp"),Le,!C&&"".concat(A,"-hidden")),children:ve?X:(0,H.jsxs)("div",{className:(0,J.default)("".concat(A,"-item"),ne,Ce==="horizontal"?"".concat(A,"-horizontal"):Ce==="vertical"?"".concat(A,"-vertical"):"".concat(A,"-default-layout")),children:[(0,H.jsx)("label",{className:(0,J.default)("".concat(A,"-item-label"),Se&&"".concat(A,"-colon"),!(0,T.isNull)(oe)&&$e&&"".concat(A,"-required-optional"),xe),children:oe}),X]})})}),Ie=(0,T.CCField)()(function(){return null})},5826:function(pe,W,y){y.r(W),y.d(W,{CCField:function(){return rt},CCForm:function(){return $},CCList:function(){return qe},CCListAction:function(){return nt},CCListView:function(){return Ee},CCOutlet:function(){return We},CCOutletView:function(){return at},autoRun:function(){return ge},extractData:function(){return Ze},get:function(){return ee},getItemValue:function(){return De},getValueFromEvent:function(){return Je},isArray:function(){return D},isBlank:function(){return E},isBoolean:function(){return ae},isEmpty:function(){return k},isEmptyArray:function(){return he},isEmptyObject:function(){return Te},isFunction:function(){return j},isNull:function(){return me},isNumber:function(){return _e},isObject:function(){return N},isObservable:function(){return M.bi},isPromise:function(){return Y},isString:function(){return X},isUndefined:function(){return q},normalObservable:function(){return Xe},observable:function(){return M.LO},parseFieldData:function(){return Ve},raw:function(){return M.LZ},shouldUpdate:function(){return Ae},unobserve:function(){return M.p_}});var Oe=y(7825),re=y.n(Oe),He=y(228),T=y.n(He),J=y(335),w=y.n(J),H=y(7999),Z=y.n(H),Ie=y(6068),b=y.n(Ie),Ne=y(8305),ke=y.n(Ne),oe=y(5298),se=y.n(oe),ye=y(7069),le=y.n(ye),$e=y(2657),F=y.n($e),Le=y(1742),ne=y.n(Le),xe=y(3136),ue=y.n(xe),Ce=y(2092),C=y.n(Ce),I=y(9795),Ue={visible:!0},de=(0,I.createContext)(null),Q=(0,I.createContext)(null),A=(0,I.createContext)(null),ce=(0,I.createContext)(Ue),Se=y(5558),ve=y.n(Se),be=y(1759),fe=y.n(be),G=Object.prototype.toString;function j(s){return typeof s=="function"}function _e(s){return typeof s=="number"||G.call(s)==="[object Number]"}function X(s){return typeof s=="string"||G.call(s)==="[object String]"}function ae(s){return typeof s=="boolean"||G.call(s)==="[object Boolean]"}function N(s){var d=s&&s.constructor;return fe()(s)==="object"&&G.call(s)==="[object Object]"&&(!j(d)||j(d)&&d instanceof d&&G.call(d)==="[object Function]")}function Y(s){return fe()(s)==="object"&&(G.call(s)==="[object Promise]"||Promise.resolve(s)===s)}function D(s){return Array.isArray(s)}function q(s){return typeof s=="undefined"}function me(s){return s===null}function k(s){return q(s)||me(s)}function E(s){return k(s)||!String(s).trim().length}function Te(s){return k(s)||!N(s)||!Object.getOwnPropertyNames(s).length}function he(s){return k(s)||!D(s)||!s.length}var Fe=function(d){var f={};return{subData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.subData(e)},validate:function(){var e;return(e=d.current)===null||e===void 0?void 0:e.validate()},asyncValidate:function(){var a=Z()(T()().mark(function t(){var r;return T()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,(r=d.current)===null||r===void 0?void 0:r.asyncValidate();case 2:return i.abrupt("return",i.sent);case 3:case"end":return i.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}(),validateErrors:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.validateErrors(e)},asyncValidateErrors:function(){var a=Z()(T()().mark(function t(r){var n;return T()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",(n=d.current)===null||n===void 0?void 0:n.asyncValidateErrors(r));case 1:case"end":return o.stop()}},t)}));function e(t){return a.apply(this,arguments)}return e}(),resetFields:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.resetFields(e)},setOriginData:function(e){var t=d.current;t?t.setOriginData(e):f.originData=D(e)?e:Object.assign({},f.originData,e)},setFieldData:function(e){var t=d.current;t?t.setFieldData(e):f.fieldData=D(e)?e:Object.assign({},f.fieldData,e)},addData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.addData(e)},setData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.setData(e)},__REF__:{mount:function(e){var t=f,r=t.originData,n=t.fieldData;d.current=e,r&&e.setOriginData(r),n&&e.setFieldData(n),f={}},unmount:function(){d.current=void 0,f={}}}}},we=function(d){return{add:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.addItem(a,e)},remove:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.removeItem(a)},move:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.moveItem(a,e)},setData:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.setData(a)},getData:function(){var a;return(a=d.current)===null||a===void 0?void 0:a.getData()},getSize:function(){var a;return((a=d.current)===null||a===void 0?void 0:a.getData().length)||0},__REF__:{mount:function(a){return d.current=a},unmount:function(){return d.current=void 0}}}},ot=function(){return Fe((0,I.createRef)())},st=function(){var d=(0,I.useRef)();return[(0,I.useMemo)(function(){return Fe(d)},[])]},lt=function(){var d=(0,I.useContext)(de),f=d.formInstance,a=(0,I.useRef)(f);return a.current=f,(0,I.useMemo)(function(){return Fe(a)},[])},ut=function(){return we((0,I.createRef)())},dt=function(){var d=(0,I.useRef)();return[(0,I.useMemo)(function(){return we(d)},[])]},ct=function(){var d=(0,I.useContext)(Q),f=d.listInstance,a=(0,I.useRef)(f);return a.current=f,(0,I.useMemo)(function(){return we(a)},[])},M=y(5297);function ge(s){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,f=null,a=null,e=function(r){a=r,f&&clearTimeout(f),f=setTimeout(function(){f=null,a&&a()},d)};return(0,M.N7)(s,{scheduler:e})}function Re(s,d){var f=0;return s.indexOf("[")!==-1?s.replace(/(\w)\[+([\w.\s]*)]+/g,function(a,e,t){var r="[".concat(t.replace(/\./g,"_"),"_").concat(++f,"]");return t.indexOf(".")!==-1?(d[r]=t,"".concat(e,".").concat(r)):"".concat(e,".").concat(t)}):s}function De(s,d,f){if(k(s)||E(d))return f;if(N(s)||D(s)){var a=s,e={};if(d in s)a=s[d];else{var t=Re(d,e).split("."),r=w()(t),n;try{for(r.s();!(n=r.n()).done;){var i=n.value;if(a=i in e?a[e[i]]:a[i],!a)break}}catch(o){r.e(o)}finally{r.f()}}return k(a)?f:a}else return s}function ee(s,d,f){if(k(s)||E(d))return f;if(N(s)||D(s)){var a=s,e={};if(d in s)a=s[d];else for(var t=Re(String(d),e).split("."),r=0,n=t.length;r<n;r++){var i=t[r];if(N(a)||D(a)){var o=t.slice(r).join(".");if(o in a){a=o in e?a[e[o]]:a[o];break}}if(a=i in e?a[e[i]]:a[i],!a)break}return q(a)?f:a}else return s}function Ze(s,d){var f=Object.create(null);(d||[]).forEach(function(e){var t=e.form,r=e.transform,n=e.inline,i=n===void 0?!0:n,o=Xe(s[t]);if(j(r)?o=i&&D(o)?o.map(function(m,g){return r(m,s,g)}):r(o,s):E(r)||(o=i&&D(o)?o.map(function(m){return De(m,r)}):De(o,r)),t=t.replace(/@\w*/g,""),i)Ve(f,t,o);else{var l=t.lastIndexOf(".");if(l!==-1){var u=t.substring(0,l),v=t.substring(l+1),c=De(f,u);o=N(o)?o:C()({},v,o),D(c)?o=c.push(o):N(c)&&(o=Object.assign(c,o)),Ve(f,u,o)}else N(o)?Object.assign(f,o):f[t]=o}});var a=Object.keys(f);return a.every(function(e){return/^([1-9]\d*|0)$/.test(e)})&&(f.length=a.length,f=Array.from(f).filter(function(e){return!k(e)})),f}function Ve(s,d,f){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},e=a.ks,t=e===void 0?{}:e,r=Re(d,t),n=r.indexOf(".");if(~n){var i=r.split("."),o=i[0],l=i.slice(1).join("."),u=s[o]||(l[0]==="0"?[]:Object.create(null)),v=Ve(u,l,f,b()({ks:t},a));u!==s[o]&&(s[o in t?t[o]:o]=v)}else(!D(s)||!k(f))&&(s[d in t?t[d]:d]=f);return s}function Xe(s){return(0,M.bi)(s)?D(s)?Array.from(s):Object.assign({},s):s}function Je(s,d){return d&&d.target&&fe()(d.target)==="object"&&s in d.target?d.target[s]:d}function Ae(s,d){if(D(s)&&D(d)){if(!d.length){var f=s;s=d,d=f}return d.some(function(a,e){return a!==s[e]})}else return d!==s}var R=y(4838),je=function(s){return s[s.Field=1]="Field",s[s.List=2]="List",s}({}),te=function(s){return s[s.DEFAULT=0]="DEFAULT",s[s.SET=1]="SET",s}({});function Qe(s){return s.fieldType===je.Field}var $=function(s){ne()(f,s);var d=ue()(f);function f(a){var e;se()(this,f),e=d.call(this,a),C()(F()(e),"originData",void 0),C()(F()(e),"fieldStatus",(0,M.LO)({})),C()(F()(e),"changeState",te.DEFAULT),C()(F()(e),"fields",new Set),C()(F()(e),"fieldsMap",new Map),C()(F()(e),"removeFields",new Set),C()(F()(e),"updateFields",new Set),C()(F()(e),"listFields",new Set),C()(F()(e),"providerValue",{}),C()(F()(e),"timeoutChange",void 0),C()(F()(e),"timeoutErrorChange",void 0),C()(F()(e),"tempFields",void 0),C()(F()(e),"autoRunTime",void 0),C()(F()(e),"errorsMap",new Map);var t=F()(e),r=a.emitter;return t.state={data:(0,M.LO)({}),originData:{}},t.providerValue={formInstance:t,emitter:r},e}return le()(f,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){var t;(t=e.props.form)===null||t===void 0||t.__REF__.mount(e)})}},{key:"componentWillUnmount",value:function(){var e;(e=this.props.form)===null||e===void 0||e.__REF__.unmount(),this.unObserveField()}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=e.disabled!==r.props.disabled;return n&&(r.providerValue=b()({},r.providerValue)),n||t.data!==r.state.data||e.children!==r.props.children}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var r=this;return t.data!==r.state.data&&(r.unObserveField(),r.revertField(),r.revertListField()),null}},{key:"componentDidUpdate",value:function(e,t){var r=this;r.changeState=te.DEFAULT,t.data!==r.state.data&&r.observeField()}},{key:"revertListField",value:function(){var e=w()(this.listFields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value,n=r.initState();r.removeOutData(n.data.length),r.setState(n)}}catch(i){e.e(i)}finally{e.f()}}},{key:"revertField",value:function(){var e=this,t=w()(e.fields),r;try{for(t.s();!(r=t.n()).done;){var n=r.value,i=n.initState(),o=n.getFormName();!E(o)&&!(o in e.state.data)&&e._setFieldValue(o,i.value,{raw:!0}),n.setState(i)}}catch(l){t.e(l)}finally{t.f()}}},{key:"unObserveField",value:function(){var e=w()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.unObserveData()}}catch(n){e.e(n)}finally{e.f()}}},{key:"observeField",value:function(){var e=w()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.observeData()}}catch(n){e.e(n)}finally{e.f()}}},{key:"fieldAutoRun",value:function(){var e=w()(this.updateFields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.observeData()}}catch(n){e.e(n)}finally{e.f()}this.updateFields.clear()}},{key:"handleChange",value:function(e){var t,r,n=this;(t=(r=n.props).onChange)===null||t===void 0||t.call(r,n.state.originData,e),n.changeState=te.DEFAULT}},{key:"fieldChange",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=this,i=r.raw,o=i===void 0?!1:i;E(e)||n.state.data[e]===t||(n._setFieldValue(e,t,{raw:o}),n.formChange(e))}},{key:"deleteField",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this,n=t.isChange,i=n===void 0?!0:n;k(e)||(delete(0,M.LZ)(r.state.data)[e],delete r.state.originData[e],i&&r.formChange(e))}},{key:"formChange",value:function(e){var t,r=this;clearTimeout(r.timeoutChange);var n=!E(e)&&((t=r.getField(e))===null||t===void 0?void 0:t.props);r.tempFields=r.tempFields||[],n&&r.tempFields.push(n),r.timeoutChange=setTimeout(function(){r.handleChange(r.tempFields),r.tempFields=[]})}},{key:"errorsChange",value:function(e,t){var r=this,n=r.props.onErrorChange;r.errorsMap.set(e,{key:e,messages:t}),n&&(clearTimeout(r.timeoutErrorChange),r.timeoutErrorChange=setTimeout(function(){var i=[];r.errorsMap.forEach(function(o){var l;(l=o.messages)!==null&&l!==void 0&&l.length&&i.push(o)}),n(i)}))}},{key:"_setFieldValue",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=r.raw,i=n===void 0?!1:n;if(!E(e)){var o=this.state.data;(i?(0,M.LZ)(o):o)[e]=t,this.state.originData[e]=t}}},{key:"setFieldStatus",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=r.raw,i=n===void 0?!1:n;if(!E(e)){var o=t.disabled,l=t.required,u=t.error,v=t.visible;(i?(0,M.LZ)(this.fieldStatus):this.fieldStatus)[e]={disabled:o,visible:v,required:l,validate:k(u)?void 0:!u}}}},{key:"setField",value:function(e){var t=this;if(Qe(e)){var r=e.getFormName();E(r)||t.fieldsMap.set(r,e),t.fields.add(e),t._setFieldValue(r,e.value,{raw:!0}),t.setFieldStatus(r,e.getConfig(),{raw:!0}),t.updateFields.add(e),clearTimeout(t.autoRunTime),t.autoRunTime=setTimeout(function(){return t.fieldAutoRun()})}else t.listFields.add(e)}},{key:"renameField",value:function(e,t){this.fieldsMap.set(e,t)}},{key:"getField",value:function(e){return E(e)?null:this.fieldsMap.get(e)}},{key:"unmountField",value:function(e){var t=this;if(Qe(e)){var r=e.getFormName();e.unObserveData(),t.fields.delete(e),t.removeFields.add(e),!E(r)&&t.fieldsMap.delete(r)}else t.listFields.delete(e)}},{key:"resetFields",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];console.log("\u203C\uFE0FSADO\u203C\uFE0F",e),this.setData(D(this.originData)?[]:{},{isGet:!0,isChange:!1,resetPaths:e})}},{key:"setOriginData",value:function(e){var t=this;t.originData=e;var r=w()(t.listFields),n;try{for(r.s();!(n=r.n()).done;){var i=n.value,o=i.getConfig(),l=o.form;if(E(l))D(e)&&i.setData(e);else{var u=ee(e,String(l));u&&i.setData(u)}}}catch(v){r.e(v)}finally{r.f()}t.setData(e,{isGet:!0,isChange:!1})}},{key:"setFieldData",value:function(e){this.setData(e,{isGet:!0,isChange:!0})}},{key:"setData",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this;if(!k(e)){var n=t.isGet,i=n===void 0?!1:n,o=t.isChange,l=o===void 0?!1:o,u=t.resetPaths;r.changeState=te.SET;var v=0,c=function(){setTimeout(function(){v--,v<=0&&(r.changeState=te.DEFAULT)})},m=w()(r.fields),g;try{for(m.s();!(g=m.n()).done;){var p=g.value,V=p.getConfig(),h=V.form,_=V.convertValue,L=V.alias,S=V.initialValue;if(h&&(!u||(u==null?void 0:u.length)===0||u.includes(h))){for(var U=Symbol(),x=U,P=0,O=[h].concat(ve()(L));P<O.length;P++){var B=O[P],K=ee(e,B,u?S:U);K!==U&&(x=K,h=B)}if(u&&p.resetError(),U===x)continue;x=i&&j(_)?p.execGetValue(h,x,e):x,v++,l?p.handleChange(x,c):p.setValue(x,c)}}}catch(z){m.e(z)}finally{m.f()}v===0&&(r.changeState=te.DEFAULT)}}},{key:"addData",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this._setFieldValue(t,e[t])}},{key:"validate",value:function(){return this.validateErrors().length===0}},{key:"asyncValidate",value:function(){var a=Z()(T()().mark(function t(){return T()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.asyncValidateErrors();case 2:return n.t0=n.sent.length,n.abrupt("return",n.t0===0);case 4:case"end":return n.stop()}},t,this)}));function e(){return a.apply(this,arguments)}return e}()},{key:"validateErrors",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=new Map;return this._validateErrors(t,function(r,n){return n(r.validateErrors())},e),Array.from(t.values())}},{key:"asyncValidateErrors",value:function(){var a=Z()(T()().mark(function t(){var r=this,n,i=arguments;return T()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return n=i.length>0&&i[0]!==void 0?i[0]:[],l.abrupt("return",new Promise(function(u){var v=new Map,c=0,m=0,g=r._validateErrors(v,function(p,V){c++,Z()(T()().mark(function h(){return T()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return L.t0=V,L.next=3,p.asyncValidateErrors();case 3:L.t1=L.sent,(0,L.t0)(L.t1),m++,m===c&&u(Array.from(v.values()));case 7:case"end":return L.stop()}},h)}))()},n);!g&&u([])}));case 2:case"end":return l.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],n=this,i=!1,o=w()(this.fields),l;try{var u=function(){var c=l.value,m=c.getConfig();!E(m.form)&&m.visible&&m.parentVisible&&(!r.length||r.findIndex(function(g){return String(m.form).indexOf(String(g))===0})!==-1)&&(i=!0,t(c,function(g){var p=g.error,V=g.errors,h={key:m.form,messages:V};p&&e.set(m.form,h),n.errorsMap.set(String(m.form),h)}))};for(o.s();!(l=o.n()).done;)u()}catch(v){o.e(v)}finally{o.f()}return i}},{key:"subData",value:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=this,n=t.merge,i=n===void 0?!1:n,o=[],l=[],u=r.state,v=u.data,c=u.initialValue,m=w()(r.removeFields),g;try{for(m.s();!(g=m.n()).done;){var p=g.value,V=p.getConfig();V.form&&l.push(V.form)}}catch(z){m.e(z)}finally{m.f()}var h=w()(r.fields),_;try{for(h.s();!(_=h.n()).done;){var L=_.value,S=L.getConfig();S.form&&(l.push(S.form),!S.ignore&&S.parentVisible&&S.visible&&o.push(S))}}catch(z){h.e(z)}finally{h.f()}var U=Ze(v,o);for(var x in v)!~l.indexOf(x)&&!(x in U)&&(U[x]=v[x]);var P=(e=r.originData)!==null&&e!==void 0?e:c;if(i&&P){var O=w()(r.listFields),B;try{var K=function(){var ie=B.value,Be=ie.getConfig(),it=Be.form,ze=ie.getData(),pt=ie.deleteIndex,Ge=ee(U,String(it));it&&Ge&&ze&&N(ze[0])&&ze.forEach(function(yt,Ke){pt.includes(Ke)||(Ge[Ke]=Object.assign({},yt,Ge[Ke]))})};for(O.s();!(B=O.n()).done;)K()}catch(z){O.e(z)}finally{O.f()}return Object.assign({},P,U)}return U}},{key:"data",get:function(){return this.state.data}},{key:"render",value:function(){var e=this,t=e.props.disabled,r=t===void 0?!1:t,n=e.state,i=n.data,o=n.originData,l=n.initialValue,u=e.providerValue;return u.data=i,u.originData=o,u.initialValue=l,u.disabled=r,u.fieldStatus=e.fieldStatus,(0,R.jsx)(de.Provider,{value:u,children:e.props.children})}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=e.data,n=e.initialValue;return r&&r!==t.originData?{data:(0,M.LO)(r),originData:r}:n&&n!==t.initialValue?{data:(0,M.LO)({}),originData:{},initialValue:n}:null}}]),f}(I.Component);C()($,"Context",de),C()($,"useForm",st),C()($,"useFormInstance",lt),C()($,"useList",dt),C()($,"useListInstance",ct),C()($,"createForm",ot),C()($,"createList",ut),C()($,"Outlet",void 0),C()($,"OutletView",void 0),C()($,"List",void 0),C()($,"Field",void 0),C()($,"ListView",void 0),C()($,"ListAction",void 0);var vt=["forwardRef","__Component__","preserve","title","valuePropName","forValue","parentField","deliver"],Ye="id",et=!0,ft=!0,tt=!0,mt=!1,ht=!1,Me=function(s){ne()(f,s);var d=ue()(f);function f(a,e){var t;se()(this,f),t=d.call(this,a,e),C()(F()(t),"formInstance",void 0),C()(F()(t),"changeFlag",!1),C()(F()(t),"changeForm",!1),C()(F()(t),"isObserveUnion",!1),C()(F()(t),"unmount",!1),C()(F()(t),"observeReactions",[]),C()(F()(t),"providerValue",{}),C()(F()(t),"fieldType",je.Field);var r=F()(t);return r.listenerValueChange=r.listenerValueChange.bind(r),r.onChange=r.onChange.bind(r),r.observeVisible=r.observeVisible.bind(r),r.observeDisabled=r.observeDisabled.bind(r),r.observeRequired=r.observeRequired.bind(r),r.formInstance=Fe({current:e==null?void 0:e.formInstance}),r.state=r.initState(),r.providerValue={fieldInstance:r},t}return le()(f,[{key:"initState",value:function(){var e=this,t=e.props,r=e.context,n=t.initialValue,i=t.convertValue,o=t.defaultValue,l=t.visible,u=t.disabled,v=e.getFormName(t),c={},m=q(n)?o:n;!E(v)&&r&&(r.initialValue&&(c=r.initialValue,m=ee(r.initialValue,v,m)),r.data&&v in r.data&&!q(r.data[v])&&(m=r.data[v]));var g=e.getOptions(),p=g.options,V=g.data,h=e.findRequired(V,p),_=h.required,L=h.message,S={value:j(i)?e.execGetValue(v,m,c):m,initialValue:m,visible:k(l)?!0:!!e.execCallback(l,V,p),disabled:k(u)?!1:!!e.execCallback(u,V,p),required:_,requiredMsg:L,_refreshMark:{}};return e.changeFlag=!1,e.changeForm=!1,e.isObserveUnion=!1,S}},{key:"getFormName",value:function(e){var t=e||this.props,r=t.form,n=t.eachConfig,i=t.injectListName;return n&&i?typeof r!="number"&&r?"".concat(n.form,".").concat(r):n.form:r}},{key:"getFormAlias",value:function(e){var t=e||this.props,r=t.alias,n=t.eachConfig;return E(r)?[]:(r=D(r)?r:[r],r.map(function(i){return n?i?"".concat(n.form,".").concat(i):n.form:i}))}},{key:"findRequired",value:function(e,t){var r=this,n=r.props.rules;if(!k(n)){n=N(n)?[n]:n;var i=function(u){return N(u)&&!!r.execCallback(u.required,e,t)};if(D(n)){var o=n.find(i);return{required:!!(o!=null&&o.required),message:o==null?void 0:o.message}}else return{required:r.execCallback(n,e,t)===!0}}return{required:!1}}},{key:"execGetValue",value:function(e,t,r){var n=this.props,i=n.convertValue,o=n.eachConfig,l=n.inline;if(!l&&!E(e)){var u=String(e),v=o&&o.form?o.form:u.substring(0,u.lastIndexOf(".")),c=E(v)?r:ee(r,v);t=c!=null?c:t}try{return i(t)}catch(m){console.warn("ConvertValue:",m)}}},{key:"observeData",value:function(){var e=this;e.unObserveData(),e.observeReactions.push(ge(e.observeVisible),ge(e.observeDisabled),ge(e.observeRequired)),e.observeUnion()}},{key:"unObserveData",value:function(){this.observeReactions.forEach(function(e){return(0,M.p_)(e)}),this.observeReactions=[]}},{key:"getOptions",value:function(){var e=this,t=e.props.eachConfig||{},r=t.form,n=t.data,i=e.state||{},o=i.value,l=i.disabled,u=i.visible,v=i.error,c=i.required,m=e.context,g=m.data,p=m.originData,V=m.fieldStatus,h={form:r,val:o,data:p,status:V,selfStatus:{disabled:l,visible:u,required:c,validate:k(v)?void 0:!v},listData:n};return{options:h,data:g,originData:p}}},{key:"observeDisabled",value:function(){var e=this;if(!e.unmount){var t=e.props.disabled,r=e.getOptions(),n=r.options,i=r.data;k(t)||(e.disabled=!!e.execCallback(t,i,n))}}},{key:"observeVisible",value:function(){var e=this;if(!e.unmount){var t=e.props.visible,r=e.getOptions(),n=r.options,i=r.data;k(t)||(e.visible=!!e.execCallback(t,i,n))}}},{key:"observeRequired",value:function(){var e=this;if(!e.unmount){var t=e.getOptions(),r=t.options,n=t.data,i=e.findRequired(n,r),o=i.required,l=i.message;e.required=o,e.requiredMsg=l}}},{key:"observeUnion",value:function(){var e=this;e.isObserveUnion=!1;var t=e.context,r=e.getUnionList();if(!(e.unmount||he(r))){var n=e.props,i=n.unionValue,o=n.unionValidate,l=t.formInstance,u=e.getFormName();i=j(i)?i:function(){return o?e.value:void 0};var v=function c(m){var g,p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],V=((g=l.getField(m))===null||g===void 0?void 0:g.getUnionList())||[];return V.forEach(function(h){var _=D(h)?h[0]:h;p.indexOf(_)===-1&&(p.push(_),c(_,p))}),p};r.forEach(function(c){var m=D(c)?c:[c,i],g=ke()(m,2),p=g[0],V=g[1],h=v(p,[p]),_=ge(function(){var L=e.getOptions(),S=L.options,U=L.data,x=L.originData,P=e.execCallback(V,U[p],b()(b()({},S),{},{data:x})),O=!1,B=function(){var z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},ie=z.valid,Be=ie===void 0?!1:ie;!e.unmount&&p in U&&e.handleChange(P,function(){Be&&o&&e.unionValidateErrors()})};e.isObserveUnion&&(l==null?void 0:l.changeState)!==te.SET?(O=!0,B({valid:!0})):h.forEach(function(K){return U[K]}),!O&&k(u)&&B()});e.observeReactions.push(_)}),e.isObserveUnion=!0}}},{key:"getUnionList",value:function(){var e=this,t=e.props.union;if(E(t))return null;var r=e.getOptions(),n=r.options;return t=j(t)?t(n):t,E(t)?null:(t=D(t)?t:t.split(","),t)}},{key:"execCallback",value:function(e){try{for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return j(e)?e.apply(void 0,r):e}catch(i){console.warn(i)}}},{key:"getTitle",value:function(){var e=this,t=e.getOptions(),r=t.options,n=t.data;return e.execCallback(e.props.title,n,r)}},{key:"getConfig",value:function(e,t){var r=this;e=e||r.props,t=t||r.state;var n=e,i=n.inline,o=n.transform,l=n.ignore,u=n.convertValue,v=n.parentField,c=t,m=c.disabled,g=c.visible,p=c.error,V=c.required,h=c.initialValue;return{inline:i,form:r.getFormName(e),alias:r.getFormAlias(e),transform:o,visible:g,parentVisible:v.visible,disabled:m,ignore:l,error:p,required:V,convertValue:u,initialValue:h}}},{key:"onChange",value:function(e){var t=this,r=t.props,n=r.normalize,i=r.valuePropName,o=i===void 0?"value":i,l=t.context;e=Je(o,e);for(var u=arguments.length,v=new Array(u>1?u-1:0),c=1;c<u;c++)v[c-1]=arguments[c];t.handleChange(n?n(e,{val:t.state.value,data:l.data,args:v}):e)}},{key:"handleChange",value:function(e,t){var r,n=this;if(n.unmount||e===n.state.value){t==null||t();return}var i=n.context,o=n.props.listener,l=o===void 0?{}:o,u=l.key,v=l.transform;n.changeFlag=!0,n.changeForm=!0,u&&((r=i.emitter)===null||r===void 0||r.emit(u,v?v(e,i.data):e)),n.handleValue(e,t)}},{key:"setValue",value:function(e,t){this.changeForm=!0,this.handleValue(e,t)}},{key:"value",get:function(){return this.state.value}},{key:"handleValue",value:function(e,t){var r=this,n=r.state.value;!r.unmount&&!r.equalsValue(e,n)?r.setState({value:e},t):t==null||t()}},{key:"equalsValue",value:function(e,t){var r=this,n=r.props,i=n.label,o=n.unique,l=o===void 0?Ye:o;if(e===t)return!0;var u=function(c,m){if(Te(c)||Te(m))return!1;var g,p;return l in c||l in m?(g=c[l],p=m[l]):i&&(i in c||i in m)&&(g=c[i],p=m[i]),r.equalsValue(g,p)};return N(e)||N(t)?u(e,t):D(e)||D(t)?he(e)||he(t)||e.length!==t.length?!1:e.every(function(v,c){return r.equalsValue(v,t[c])}):String(e)===String(t)}},{key:"disabled",set:function(e){e!==this.state.disabled&&this.setState({disabled:e})}},{key:"required",set:function(e){e!==this.state.required&&this.setState({required:e})}},{key:"requiredMsg",set:function(e){e!==this.state.requiredMsg&&this.setState({requiredMsg:e})}},{key:"visible",set:function(e){var t=this;e!==t.state.visible&&(e||t.setState({error:void 0,errors:void 0}),t.setState({visible:e}))}},{key:"resetError",value:function(){this.setState({error:void 0,errors:void 0})}},{key:"validateErrors",value:function(){return this._validateErrors(this.validate())}},{key:"asyncValidateErrors",value:function(){return this._asyncValidateErrors()}},{key:"unionValidateErrors",value:function(){return this._asyncValidateErrors({isUnionValid:!0})}},{key:"_asyncValidateErrors",value:function(){var a=Z()(T()().mark(function t(){var r,n,i,o,l,u,v,c,m,g,p=arguments;return T()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(r=p.length>0&&p[0]!==void 0?p[0]:{},n=this,i=r.isUnionValid,o=n.validate({async:!0,isUnionValid:i}),!D(o)){h.next=38;break}l=[],u=!0,v=w()(o),h.prev=8,v.s();case 10:if((c=v.n()).done){h.next=29;break}if(m=c.value,!Y(m)){h.next=26;break}return g=void 0,h.prev=14,h.next=17,m;case 17:g=h.sent,h.next=23;break;case 20:h.prev=20,h.t0=h.catch(14),g=h.t0;case 23:X(g)?l.push(g):g||(u=!1),h.next=27;break;case 26:l.push(m);case 27:h.next=10;break;case 29:h.next=34;break;case 31:h.prev=31,h.t1=h.catch(8),v.e(h.t1);case 34:return h.prev=34,v.f(),h.finish(34);case 37:o=l.length?l:u;case 38:return h.abrupt("return",this._validateErrors(o));case 39:case"end":return h.stop()}},t,this,[[8,31,34,37],[14,20]])}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e){var t=this,r=t.state,n=r.errors,i=r.error,o,l;return ae(e)?(l=!e,o=void 0):(l=!!e.length,o=e),l!==i&&t.setState({error:l}),t.equalsValue(n,o)||t.setState({errors:o,_refreshMark:{}}),{error:l,errors:o}}},{key:"validate",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=this,r=e.async,n=r===void 0?!1:r,i=e.isUnionValid,o=i===void 0?!1:i,l=t.props.rules,u=t.state,v=u.required,c=u.requiredMsg,m=u.value,g=u.visible;if(!g)return!0;var p=o?!1:t.validateEmpty(m);if(v&&p)return E(c)?!1:[c];if(p)return!0;var V=t.getOptions(),h=V.options,_=V.originData,L=function(O){if(j(O))return O(_,b()(b()({},h),{},{isUnionValid:o}));if(!o){if(O&&O instanceof RegExp)return O.test(m);if(N(O)){var B=O.pattern,K=O.message;if(B&&!B.test(m))return K||!1}}return!0};if(D(l)){var S=[],U=!0;return l.forEach(function(P){var O=L(P);X(O)||n&&Y(O)?S.push(O):O||(U=!1)}),S.length?S:U}else if(!o&&N(l)){var x=L(l);return X(x)?[x]:x}return!0}},{key:"validateEmpty",value:function(e){var t=this.props.label,r=function n(i){return n(i)||!!(t&&E(i[t]))};return k(e)?!0:X(e)?E(e):N(e)?r(e):D(e)?he(e)||N(e[0])&&r(e[0]):k(e)}},{key:"listenerValueChange",value:function(e){var t=this,r=this.context,n=t.props.listener;t.handleValue(n!=null&&n.convertValue?n.convertValue(e,r.data):e)}},{key:"componentDidMount",value:function(){var e,t=this,r=t.context,n=t.props.listener,i=n===void 0?{}:n,o=i.key;o&&((e=r.emitter)===null||e===void 0||e.addListener(o,t.listenerValueChange)),r.formInstance.setField(t)}},{key:"componentWillUnmount",value:function(){var e,t=this;t.unmount=!0;var r=t.context,n=t.props.listener,i=n===void 0?{}:n,o=i.key;o&&((e=r.emitter)===null||e===void 0||e.removeListener(o,t.listenerValueChange)),r.formInstance.unmountField(t)}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=r.props,i=r.state;return t.value!==i.value||t.required!==i.required||t.error!==i.error||t.visible!==i.visible||t.disabled!==i.disabled||t._refreshMark!==i._refreshMark||e.form!==n.form||r.getFormName(e)!==r.getFormName(n)||Ae(n.shouldUpdate,e.shouldUpdate)}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var r=this,n=this.context,i=n.formInstance,o=r.state,l=o.required,u=o.error,v=o.visible,c=o.disabled,m=r.getFormName(r.props),g=r.getFormName(e);return e.form!==this.props.form&&i.unmountField(this),m!==g&&!E(m)&&i.renameField(m,r),(l!==t.required||u!==t.error||v!==t.visible||c!==t.disabled)&&i.setFieldStatus(m,{required:l,error:u,visible:v,disabled:c}),null}},{key:"componentDidUpdate",value:function(e,t){var r=this,n=this.context,i=n.formInstance,o=r.state,l=o.value,u=o.required,v=o.error,c=o.errors,m=r.getFormName(r.props);if(l!==t.value){var g,p;i.fieldChange(m,l,{raw:!r.changeForm}),r.changeFlag&&((g=(p=r.props).onChange)===null||g===void 0||g.call(p,l))}(l!==t.value&&r.changeFlag||u!==t.required&&!u&&!k(v))&&r.asyncValidateErrors(),e.form!==r.props.form&&i.setField(r),m!==r.getFormName(e)&&i.fieldChange(m,l,{raw:!0}),!E(m)&&c!==t.errors&&i.errorsChange(String(m),c),r.changeFlag=!1,r.changeForm=!1}},{key:"render",value:function(){var e=this,t=e.context,r=e.state,n=r.value,i=r.required,o=r.error,l=r.errors,u=r.disabled,v=r.visible,c=e.props,m=c.forwardRef,g=c.__Component__,p=c.preserve,V=c.title,h=c.valuePropName,_=c.forValue,L=c.parentField,S=c.deliver,U=re()(c,vt);if(!v&&!p)return null;var x=_?_(n,t.data):n;h&&(U[h]=x);var P=e.providerValue;P.visible=v;var O=(0,R.jsx)(g,b()(b()({},U),{},{title:e.getTitle(),data:t.data,value:x,required:i,disabled:t.disabled||u,visible:v,formInstance:e.formInstance,error:o,errors:l,onChange:e.onChange,ref:m}));return S?(0,R.jsx)(ce.Provider,{value:P,children:O}):O}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=null;function n(i){var o=e[i];!q(o)&&!j(o)&&o!==t["_".concat(i)]&&(r=r||{},r[i]=o,r["_".concat(i)]=o)}return["value","disabled","visible"].forEach(n),r}}]),f}(I.Component);C()(Me,"contextType",$.Context),C()(Me,"defaultProps",{inline:et,unique:Ye,deliver:ft,injectListName:tt,preserve:mt,unionValidate:ht});function rt(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},d=s.defaultValue;return function(f){return function(a){return(0,R.jsx)(A.Consumer,{children:function(t){var r=t,n=a.initialValue,i=a.form,o=a.inline,l=o===void 0?et:o,u=a.injectListName,v=u===void 0?tt:u;if(r&&v){var c=r.data[r.index];n=i?N(c)&&i in c?c[i]:l?n:c:q(c)?n:c}return(0,R.jsx)(ce.Consumer,{children:function(g){return(0,R.jsx)(Me,b()(b()({defaultValue:d},a),{},{parentField:g,initialValue:n,eachConfig:r,__Component__:f}))}})}})}}}var Ee=function(d){var f=d.children,a=d.component,e=d.provider,t=(0,I.useContext)(Q);if(!t||!f)return null;var r=t.keys,n=t.form,i=t.listInstance,o=r.map(function(l,u){var v=b()(b()({},t),{},{form:E(n)?String(u):"".concat(n,".").concat(u),index:u,key:l,remove:i.removeItem.bind(i,u),add:i.addItem.bind(i),move:i.moveItem.bind(i)}),c=(0,R.jsx)(A.Provider,{value:v,children:f(v)},l);return e?e(v,c):c});return a?a(t,o):(0,R.jsx)(R.Fragment,{children:o})},Pe=function(s){ne()(f,s);var d=ue()(f);function f(a,e){var t;se()(this,f),t=d.call(this,a,e),C()(F()(t),"deleteIndex",[]),C()(F()(t),"uuid",0),C()(F()(t),"fieldType",je.List);var r=F()(t),n=a.formList;return r.genID=r.genID.bind(r),r.addItem=r.addItem.bind(r),r.removeItem=r.removeItem.bind(r),r.moveItem=r.moveItem.bind(r),r.state=r.initState(),n&&n.__REF__&&(n.__REF__.current=r),t}return le()(f,[{key:"initState",value:function(){var e=this,t=e.props,r=e.context;e._initID();var n=t.initRows,i=t.initialValue,o=e.getFormName(t);r&&r.initialValue&&(E(o)?D(r.initialValue)&&(i=r.initialValue):i=ee(r.initialValue,o,i));var l=Array(n),u=i;D(i)&&u.length&&(n=u.length,l=u);var v=Array(n).fill(1).map(e.genID);return{keys:v,data:l}}},{key:"_initID",value:function(){this.uuid=1e3}},{key:"genID",value:function(){return"CC".concat(++this.uuid)}},{key:"getFormName",value:function(e){var t=e.form,r=e.eachConfig;return r?t?"".concat(r.form,".").concat(t):r.form:t}},{key:"setData",value:function(e){var t=this,r=t.props.initRows,n=t.state.keys;k(e)||!D(e)?e=[]:e.length===0&&(e=Array(r)),t.removeOutData(e.length),n=n.slice(0,e.length),t.setState({keys:n,data:e})}},{key:"getData",value:function(){return this.state.data}},{key:"addItem",value:function(e,t){var r,n=this,i=n.genID(),o=n.state,l=o.data,u=o.keys;u=Array.from(u),!k(t)&&t<l.length?(u.splice(t,0,i),l.splice(t,0,e),n.removeListData(t,1)):(u.push(i),l.push(e)),n.setState({keys:u,data:l}),(r=n.context)===null||r===void 0||r.formInstance.formChange()}},{key:"removeItem",value:function(e){var t=this,r=t.state,n=r.data,i=r.keys,o=i.length,l=(D(e)?e:[e]).filter(function(v){return v<o});if(l.length){var u;(u=t.deleteIndex).push.apply(u,ve()(l)),t.removeListData(o-l.length,l.length),i=Array.from(i),l.forEach(function(v,c){i.splice(v-c,1),n.splice(v-c,1)}),t.setState({keys:i,data:n})}}},{key:"moveItem",value:function(e,t){var r=this,n=r.state,i=n.data,o=n.keys;if(e!==t&&e>=0&&e<o.length&&t>=0&&t<o.length){var l;o=Array.from(o);var u=o[e],v=i[e];o.splice(e,1),o.splice(t,0,u),i.splice(e,1),i.splice(t,0,v),r.setState({keys:o,data:i}),(l=r.context)===null||l===void 0||l.formInstance.formChange()}}},{key:"removeListData",value:function(e){for(var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=this,n=r.getFormName(r.props),i=r.context,o=i.data,l=i.formInstance,u=e+t,v=[],c=e;c<u;c++)v.push(n?"".concat(n,".").concat(c):String(c));var m=function(V){v.forEach(function(h){V.indexOf(h)===0&&l.deleteField(V)})};for(var g in o)m(g)}},{key:"removeOutData",value:function(e){var t=this,r=t.getFormName(t.props),n=t.context,i=n.data,o=n.formInstance,l=r?Array(e).fill(1).map(function(u,v){return"".concat(r,".").concat(v)}):[];Object.keys(i).forEach(function(u){if(E(r)){var v=Number(u),c=u.substring(0,u.indexOf("."));String(v)===u&&v<e?o.deleteField(u,{isChange:!1}):/^[0-9]+$/.test(c)&&Number(c)>=e&&o.deleteField(u,{isChange:!1})}else u.indexOf(String(r))===0&&l.findIndex(function(m){return u.indexOf(m)!==-1})===-1&&o.deleteField(u,{isChange:!1})})}},{key:"getConfig",value:function(){return{form:this.getFormName(this.props)}}},{key:"componentDidMount",value:function(){var e,t,r=this;(e=r.props.formList)===null||e===void 0||e.__REF__.mount(r),(t=r.context)===null||t===void 0||t.formInstance.setField(r)}},{key:"componentWillUnmount",value:function(){var e,t,r=this;(e=r.props.formList)===null||e===void 0||e.__REF__.unmount(),(t=r.context)===null||t===void 0||t.formInstance.unmountField(r)}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=r.props,i=r.state;return e.form!==n.form||t.keys!==i.keys||r.getFormName(e)!==r.getFormName(n)||Ae(n.shouldUpdate,e.shouldUpdate)}},{key:"componentDidUpdate",value:function(e,t,r){if(t.keys!==this.state.keys){var n;(n=this.context)===null||n===void 0||n.formInstance.observeField()}}},{key:"render",value:function(){var e=this,t=e.context,r=e.getFormName(e.props),n=e.props.children,i=e.state,o=i.keys,l=i.data;if(!n||!D(o))return null;var u={form:r,listInstance:e,keys:o,data:l,length:o.length,formData:t.data},v=j(n)?(0,R.jsx)(Ee,{children:n}):n;return(0,R.jsx)(Q.Provider,{value:u,children:v})}}]),f}(I.Component);C()(Pe,"contextType",$.Context),C()(Pe,"defaultProps",{initRows:1});var qe=function(d){var f=(0,I.useContext)(A),a=d.form,e=d.initialValue,t=d.children,r=f;if(r){var n=r.data[r.index];e=a?N(n)&&a in n?n[a]:e:n}return(0,R.jsx)(Pe,b()(b()({},d),{},{initialValue:e,eachConfig:r,children:t}))};qe.View=Ee;var nt=function(d){var f=d.children,a=(0,I.useContext)(Q);if(!a)return null;var e=a.listInstance,t=b()(b()({},a),{},{remove:e.removeItem,add:e.addItem,move:e.moveItem});return(0,R.jsx)(R.Fragment,{children:f(t)})},gt=["children","forProps"];function We(){return function(s){return(0,I.forwardRef)(function(d,f){return(0,R.jsx)(A.Consumer,{children:function(e){return(0,R.jsx)($.Context.Consumer,{children:function(r){return(0,R.jsx)(s,b()(b()(b()({},d),{},{ref:f},r),{},{eachConfig:e||void 0}))}})}})})}}var at=We()(function(s){var d=s.children,f=s.forProps,a=re()(s,gt);return(0,I.cloneElement)(d,f?f(a):a)});$.List=qe,$.ListView=Ee,$.Field=rt,$.Outlet=We,$.OutletView=at,$.ListAction=nt},7335:function(pe,W,y){y.r(W)},3398:function(pe,W){W.Z=`.cc-form-item-warp {
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
    padding-bottom: 0.5rem;
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
`},4868:function(pe,W){W.Z=`import './index.css';

import { CCField, isNull, isUndefined } from '@guc/react-form';
import cls from 'clsx';
import type { ReactElement } from 'react';
import { Children, cloneElement, useMemo } from 'react';

interface IChildProps {
  onChange?: any;
  disabled?: boolean;
  status?: string;
}

export interface IFieldProps {
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

export const Field = CCField<IFieldProps>()((props) => {
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
          onChange: handleChange,
          [valueKey]: value,
          disabled,
          status: error ? 'error' : void 0,
        })
      : children;

  const content = (
    <div className={cls('cc-form-item-content', isNotTitle && warpClassName)}>
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
});

export const HideField = CCField()(() => {
  return null;
});
`}}]);
