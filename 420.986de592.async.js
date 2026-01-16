"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[420],{7940:function(pe,q,p){p.r(q),p.d(q,{Field:function(){return j},HideField:function(){return Le}});var le=p(9783),J=p.n(le),Ze=p(9427),Q=p(8317),Y=p(512),A=p(7294),G=p(5893),j=(0,Q.CCField)()(function(N){var Ue=N.value,U=N.onChange,ue=N.title,Te=N.error,ye=N.errors,de=N.disabled,Se=N.required,W=N.children,Re=N.className,F=N.warpClassName,Ae=N.labelClassName,ce=N.errorClassName,Ce=N.layout,ve=N.visible,be=N.fieldNames,y=be===void 0?{}:be,O=N.noStyle,Fe=N.prefix,M=Fe===void 0?"cc-form":Fe,ee=N.colon,ae=ee===void 0?!0:ee,fe=Q.CCTypes.isUndefined(ue),De=y.value,Ve=De===void 0?"value":De,Ee=(0,A.useMemo)(function(){return A.Children.count(W)},[W]),me=function(){for(var z=arguments.length,ie=new Array(z),$=0;$<z;$++)ie[$]=arguments[$];if(U.apply(void 0,ie),Ee&&W&&"props"in W){var Z,b;(Z=(b=W.props).onChange)===null||Z===void 0||Z.call.apply(Z,[b].concat(ie))}},H=Ee===1?(0,A.cloneElement)(W,J()(J()(J()({onChange:me},Ve,Ue),"disabled",de),"status",Te?"error":void 0)):W,_=(0,G.jsxs)("div",{className:(0,Y.default)("cc-form-item-content",fe&&F),children:[H,(0,G.jsx)("div",{className:(0,Y.default)("".concat(M,"-error-warp"),O&&"no-style",ce),children:ye&&ye.map(function(he,z){return(0,G.jsx)("div",{className:"".concat(M,"-error"),children:he},"".concat(z,"-").concat(he))})})]});return(0,G.jsx)("div",{className:(0,Y.default)("".concat(M,"-item-warp"),Re,!ve&&"".concat(M,"-hidden")),children:fe?_:(0,G.jsxs)("div",{className:(0,Y.default)("".concat(M,"-item"),F,Ce==="horizontal"?"".concat(M,"-horizontal"):Ce==="vertical"?"".concat(M,"-vertical"):"".concat(M,"-default-layout")),children:[(0,G.jsx)("label",{className:(0,Y.default)("".concat(M,"-item-label"),ae&&"".concat(M,"-colon"),!Q.CCTypes.isNull(ue)&&Se&&"".concat(M,"-required-optional"),Ae),children:ue}),_]})})}),Le=(0,Q.CCField)()(function(){return null})},8317:function(pe,q,p){p.r(q),p.d(q,{CCField:function(){return at},CCForm:function(){return L},CCList:function(){return We},CCListAction:function(){return it},CCListView:function(){return xe},CCOutlet:function(){return Be},CCOutletView:function(){return ot},CCTools:function(){return J},CCTypes:function(){return le}});var le={};p.r(le),p.d(le,{isArray:function(){return b},isBlank:function(){return V},isBoolean:function(){return ie},isEmpty:function(){return x},isEmptyArray:function(){return ge},isEmptyObject:function(){return Oe},isFunction:function(){return _},isNull:function(){return Xe},isNumber:function(){return he},isObject:function(){return $},isPromise:function(){return Z},isString:function(){return z},isUndefined:function(){return te}});var J={};p.r(J),p.d(J,{extractData:function(){return Je},get:function(){return re},getItemValue:function(){return ke},getValueFromEvent:function(){return Ye},normalObservable:function(){return Qe},parseFieldData:function(){return $e},shouldUpdate:function(){return Me}});var Ze=p(3769),Q=p.n(Ze),Y=p(5009),A=p.n(Y),G=p(4599),j=p.n(G),Le=p(9289),N=p.n(Le),Ue=p(7857),U=p.n(Ue),ue=p(5574),Te=p.n(ue),ye=p(2444),de=p.n(ye),Se=p(2004),W=p.n(Se),Re=p(5098),F=p.n(Re),Ae=p(1996),ce=p.n(Ae),Ce=p(6037),ve=p.n(Ce),be=p(9783),y=p.n(be),O=p(7294),Fe={visible:!0},M=(0,O.createContext)(null),ee=(0,O.createContext)(null),ae=(0,O.createContext)(null),fe=(0,O.createContext)(Fe),De=p(9632),Ve=p.n(De),Ee=p(2677),me=p.n(Ee),H=Object.prototype.toString;function _(s){return typeof s=="function"}function he(s){return typeof s=="number"||H.call(s)==="[object Number]"}function z(s){return typeof s=="string"||H.call(s)==="[object String]"}function ie(s){return typeof s=="boolean"||H.call(s)==="[object Boolean]"}function $(s){var d=s&&s.constructor;return me()(s)==="object"&&H.call(s)==="[object Object]"&&(!_(d)||_(d)&&d instanceof d&&H.call(d)==="[object Function]")}function Z(s){return me()(s)==="object"&&(H.call(s)==="[object Promise]"||Promise.resolve(s)===s)}function b(s){return Array.isArray(s)}function te(s){return typeof s=="undefined"}function Xe(s){return s===null}function x(s){return te(s)||Xe(s)}function V(s){return x(s)||!String(s).trim().length}function Oe(s){return x(s)||!$(s)||!Object.getOwnPropertyNames(s).length}function ge(s){return x(s)||!b(s)||!s.length}var Ie=function(d){var f={};return{subData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.subData(e)},validate:function(){var e;return(e=d.current)===null||e===void 0?void 0:e.validate()},asyncValidate:function(){var a=N()(A()().mark(function t(){var r;return A()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,(r=d.current)===null||r===void 0?void 0:r.asyncValidate();case 2:return i.abrupt("return",i.sent);case 3:case"end":return i.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}(),validateErrors:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.validateErrors(e)},asyncValidateErrors:function(){var a=N()(A()().mark(function t(r){var n;return A()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",(n=d.current)===null||n===void 0?void 0:n.asyncValidateErrors(r));case 1:case"end":return o.stop()}},t)}));function e(t){return a.apply(this,arguments)}return e}(),resetFields:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.resetFields(e)},setOriginData:function(e){var t=d.current;t?t.setOriginData(e):f.originData=b(e)?e:Object.assign({},f.originData,e)},setFieldData:function(e){var t=d.current;t?t.setFieldData(e):f.fieldData=b(e)?e:Object.assign({},f.fieldData,e)},addData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.addData(e)},setData:function(e){var t;return(t=d.current)===null||t===void 0?void 0:t.setData(e)},__REF__:{mount:function(e){var t=f,r=t.originData,n=t.fieldData;d.current=e,r&&e.setOriginData(r),n&&e.setFieldData(n),f={}},unmount:function(){d.current=void 0,f={}}}}},we=function(d){return{add:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.addItem(a,e)},remove:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.removeItem(a)},move:function(a,e){var t;return(t=d.current)===null||t===void 0?void 0:t.moveItem(a,e)},setData:function(a){var e;return(e=d.current)===null||e===void 0?void 0:e.setData(a)},getData:function(){var a;return(a=d.current)===null||a===void 0?void 0:a.getData()},getSize:function(){var a;return((a=d.current)===null||a===void 0?void 0:a.getData().length)||0},__REF__:{mount:function(a){return d.current=a},unmount:function(){return d.current=void 0}}}},lt=function(){return Ie((0,O.createRef)())},ut=function(){var d=(0,O.useRef)();return[(0,O.useMemo)(function(){return Ie(d)},[])]},dt=function(){var d=(0,O.useContext)(M),f=d.formInstance,a=(0,O.useRef)(f);return a.current=f,(0,O.useMemo)(function(){return Ie(a)},[])},ct=function(){return we((0,O.createRef)())},vt=function(){var d=(0,O.useRef)();return[(0,O.useMemo)(function(){return we(d)},[])]},ft=function(){var d=(0,O.useContext)(ee),f=d.listInstance,a=(0,O.useRef)(f);return a.current=f,(0,O.useMemo)(function(){return we(a)},[])},K=p(865);function Ne(s){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,f=null,a=null,e=function(r){a=r,f&&clearTimeout(f),f=setTimeout(function(){f=null,a&&a()},d)};return(0,K.N7)(s,{scheduler:e})}function je(s,d){var f=0;return s.indexOf("[")!==-1?s.replace(/(\w)\[+([\w.\s]*)]+/g,function(a,e,t){var r="[".concat(t.replace(/\./g,"_"),"_").concat(++f,"]");return t.indexOf(".")!==-1?(d[r]=t,"".concat(e,".").concat(r)):"".concat(e,".").concat(t)}):s}function ke(s,d,f){if(x(s)||V(d))return f;if($(s)||b(s)){var a=s,e={};if(d in s)a=s[d];else{var t=je(d,e).split("."),r=j()(t),n;try{for(r.s();!(n=r.n()).done;){var i=n.value;if(a=i in e?a[e[i]]:a[i],!a)break}}catch(o){r.e(o)}finally{r.f()}}return x(a)?f:a}else return s}function re(s,d,f){if(x(s)||V(d))return f;if($(s)||b(s)){var a=s,e={};if(d in s)a=s[d];else for(var t=je(String(d),e).split("."),r=0,n=t.length;r<n;r++){var i=t[r];if($(a)||b(a)){var o=t.slice(r).join(".");if(o in a){a=o in e?a[e[o]]:a[o];break}}if(a=i in e?a[e[i]]:a[i],!a)break}return te(a)?f:a}else return s}function Je(s,d){var f=Object.create(null);(d||[]).forEach(function(e){var t=e.form,r=e.transform,n=e.inline,i=n===void 0?!0:n,o=Qe(s[t]);if(_(r)?o=i&&b(o)?o.map(function(m,h){return r(m,s,h)}):r(o,s):V(r)||(o=i&&b(o)?o.map(function(m){return ke(m,r)}):ke(o,r)),t=t.replace(/@\w*/g,""),i)$e(f,t,o);else{var l=t.lastIndexOf(".");if(l!==-1){var u=t.substr(0,l),v=t.substr(l+1),c=ke(f,u);o=$(o)?o:y()({},v,o),b(c)?o=c.push(o):$(c)&&(o=Object.assign(c,o)),$e(f,u,o)}else $(o)?Object.assign(f,o):f[t]=o}});var a=Object.keys(f);return a.every(function(e){return/^([1-9]\d*|0)$/.test(e)})&&(f.length=a.length,f=Array.from(f).filter(function(e){return!x(e)})),f}function $e(s,d,f){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},e=a.ks,t=e===void 0?{}:e,r=je(d,t),n=r.indexOf(".");if(~n){var i=r.split("."),o=i[0],l=i.slice(1).join("."),u=s[o]||(l[0]==="0"?[]:Object.create(null)),v=$e(u,l,f,U()({ks:t},a));u!==s[o]&&(s[o in t?t[o]:o]=v)}else(!b(s)||!x(f))&&(s[d in t?t[d]:d]=f);return s}function Qe(s){return(0,K.bi)(s)?b(s)?Array.from(s):Object.assign({},s):s}function Ye(s,d){return d&&d.target&&me()(d.target)==="object"&&s in d.target?d.target[s]:d}function Me(s,d){if(b(s)&&b(d)){if(!d.length){var f=s;s=d,d=f}return d.some(function(a,e){return a!==s[e]})}else return d!==s}var R=p(5893),_e=function(s){return s[s.Field=1]="Field",s[s.List=2]="List",s}({}),ne=function(s){return s[s.DEFAULT=0]="DEFAULT",s[s.SET=1]="SET",s}({});function et(s){return s.fieldType===_e.Field}var L=function(s){ce()(f,s);var d=ve()(f);function f(a){var e;de()(this,f),e=d.call(this,a),y()(F()(e),"originData",void 0),y()(F()(e),"fieldStatus",K.LO({})),y()(F()(e),"changeState",ne.DEFAULT),y()(F()(e),"fields",new Set),y()(F()(e),"fieldsMap",new Map),y()(F()(e),"removeFields",new Set),y()(F()(e),"updateFields",new Set),y()(F()(e),"listFields",new Set),y()(F()(e),"providerValue",{}),y()(F()(e),"timeoutChange",void 0),y()(F()(e),"timeoutErrorChange",void 0),y()(F()(e),"tempFields",void 0),y()(F()(e),"autoRunTime",void 0),y()(F()(e),"errorsMap",new Map);var t=F()(e),r=a.emitter;return t.state={data:K.LO({}),originData:{}},t.providerValue={formInstance:t,emitter:r},e}return W()(f,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){var t;(t=e.props.form)===null||t===void 0||t.__REF__.mount(e)})}},{key:"componentWillUnmount",value:function(){var e;(e=this.props.form)===null||e===void 0||e.__REF__.unmount(),this.unObserveField()}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=e.disabled!==r.props.disabled;return n&&(r.providerValue=U()({},r.providerValue)),n||t.data!==r.state.data||e.children!==r.props.children}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var r=this;return t.data!==r.state.data&&(r.unObserveField(),r.revertField(),r.revertListField()),null}},{key:"componentDidUpdate",value:function(e,t){var r=this;r.changeState=ne.DEFAULT,t.data!==r.state.data&&r.observeField()}},{key:"revertListField",value:function(){var e=j()(this.listFields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value,n=r.initState();r.removeOutData(n.data.length),r.setState(n)}}catch(i){e.e(i)}finally{e.f()}}},{key:"revertField",value:function(){var e=this,t=j()(e.fields),r;try{for(t.s();!(r=t.n()).done;){var n=r.value,i=n.initState(),o=n.getFormName();!V(o)&&!(o in e.state.data)&&e._setFieldValue(o,i.value,{raw:!0}),n.setState(i)}}catch(l){t.e(l)}finally{t.f()}}},{key:"unObserveField",value:function(){var e=j()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.unObserveData()}}catch(n){e.e(n)}finally{e.f()}}},{key:"observeField",value:function(){var e=j()(this.fields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.observeData()}}catch(n){e.e(n)}finally{e.f()}}},{key:"fieldAutoRun",value:function(){var e=j()(this.updateFields),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;r.observeData()}}catch(n){e.e(n)}finally{e.f()}this.updateFields.clear()}},{key:"handleChange",value:function(e){var t,r,n=this;(t=(r=n.props).onChange)===null||t===void 0||t.call(r,n.state.originData,e),n.changeState=ne.DEFAULT}},{key:"fieldChange",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=this,i=r.raw,o=i===void 0?!1:i;V(e)||n.state.data[e]===t||(n._setFieldValue(e,t,{raw:o}),n.formChange(e))}},{key:"deleteField",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this,n=t.isChange,i=n===void 0?!0:n;x(e)||(delete K.LZ(r.state.data)[e],delete r.state.originData[e],i&&r.formChange(e))}},{key:"formChange",value:function(e){var t,r=this;clearTimeout(r.timeoutChange);var n=!V(e)&&((t=r.getField(e))===null||t===void 0?void 0:t.props);r.tempFields=r.tempFields||[],n&&r.tempFields.push(n),r.timeoutChange=setTimeout(function(){r.handleChange(r.tempFields),r.tempFields=[]})}},{key:"errorsChange",value:function(e,t){var r=this,n=r.props.onErrorChange;r.errorsMap.set(e,{key:e,messages:t}),n&&(clearTimeout(r.timeoutErrorChange),r.timeoutErrorChange=setTimeout(function(){var i=[];r.errorsMap.forEach(function(o){var l;(l=o.messages)!==null&&l!==void 0&&l.length&&i.push(o)}),n(i)}))}},{key:"_setFieldValue",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=r.raw,i=n===void 0?!1:n;if(!V(e)){var o=this.state.data;(i?K.LZ(o):o)[e]=t,this.state.originData[e]=t}}},{key:"setFieldStatus",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=r.raw,i=n===void 0?!1:n;if(!V(e)){var o=t.disabled,l=t.required,u=t.error,v=t.visible;(i?K.LZ(this.fieldStatus):this.fieldStatus)[e]={disabled:o,visible:v,required:l,validate:x(u)?void 0:!u}}}},{key:"setField",value:function(e){var t=this;if(et(e)){var r=e.getFormName();V(r)||t.fieldsMap.set(r,e),t.fields.add(e),t._setFieldValue(r,e.value,{raw:!0}),t.setFieldStatus(r,e.getConfig(),{raw:!0}),t.updateFields.add(e),clearTimeout(t.autoRunTime),t.autoRunTime=setTimeout(function(){return t.fieldAutoRun()})}else t.listFields.add(e)}},{key:"renameField",value:function(e,t){this.fieldsMap.set(e,t)}},{key:"getField",value:function(e){return V(e)?null:this.fieldsMap.get(e)}},{key:"unmountField",value:function(e){var t=this;if(et(e)){var r=e.getFormName();e.unObserveData(),t.fields.delete(e),t.removeFields.add(e),!V(r)&&t.fieldsMap.delete(r)}else t.listFields.delete(e)}},{key:"resetFields",value:function(e){console.log("\u{1F91F} Code",b(this.originData)?[]:{},e),this.setOriginData(b(this.originData)?[]:{})}},{key:"setOriginData",value:function(e){var t=this;t.originData=e;var r=j()(t.listFields),n;try{for(r.s();!(n=r.n()).done;){var i=n.value,o=i.getConfig(),l=o.form;if(V(l))b(e)&&i.setData(e);else{var u=re(e,String(l));u&&i.setData(u)}}}catch(v){r.e(v)}finally{r.f()}t.setData(e,{isGet:!0,isChange:!1})}},{key:"setFieldData",value:function(e){this.setData(e,{isGet:!0,isChange:!0})}},{key:"setData",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this;if(!x(e)){var n=t.isGet,i=n===void 0?!1:n,o=t.isChange,l=o===void 0?!1:o;r.changeState=ne.SET;var u=0,v=function(){setTimeout(function(){u--,u<=0&&(r.changeState=ne.DEFAULT)})},c=j()(r.fields),m;try{for(c.s();!(m=c.n()).done;){var h=m.value,C=h.getConfig(),D=C.form,g=C.convertValue,S=C.alias;if(D){for(var I=Symbol(),k=I,T=0,w=[D].concat(Ve()(S));T<w.length;T++){var P=w[T],E=re(e,P,I);E!==I&&(k=E,D=P)}if(I===k)continue;k=i&&_(g)?h.execGetValue(D,k,e):k,u++,l?h.handleChange(k,v):h.setValue(k,v)}}}catch(B){c.e(B)}finally{c.f()}u===0&&(r.changeState=ne.DEFAULT)}}},{key:"addData",value:function(e){for(var t in e)e.hasOwnProperty(t)&&this._setFieldValue(t,e[t])}},{key:"validate",value:function(){return this.validateErrors().length===0}},{key:"asyncValidate",value:function(){var a=N()(A()().mark(function t(){return A()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.asyncValidateErrors();case 2:return n.t0=n.sent.length,n.abrupt("return",n.t0===0);case 4:case"end":return n.stop()}},t,this)}));function e(){return a.apply(this,arguments)}return e}()},{key:"validateErrors",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=new Map;return this._validateErrors(t,function(r,n){return n(r.validateErrors())},e),Array.from(t.values())}},{key:"asyncValidateErrors",value:function(){var a=N()(A()().mark(function t(){var r=this,n,i=arguments;return A()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return n=i.length>0&&i[0]!==void 0?i[0]:[],l.abrupt("return",new Promise(function(u){var v=new Map,c=0,m=0,h=r._validateErrors(v,function(C,D){c++,N()(A()().mark(function g(){return A()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.t0=D,I.next=3,C.asyncValidateErrors();case 3:I.t1=I.sent,(0,I.t0)(I.t1),m++,m===c&&u(Array.from(v.values()));case 7:case"end":return I.stop()}},g)}))()},n);!h&&u([])}));case 2:case"end":return l.stop()}},t)}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],n=this,i=!1,o=j()(this.fields),l;try{var u=function(){var c=l.value,m=c.getConfig();!V(m.form)&&m.visible&&m.parentVisible&&(!r.length||r.findIndex(function(h){return String(m.form).indexOf(String(h))===0})!==-1)&&(i=!0,t(c,function(h){var C=h.error,D=h.errors,g={key:m.form,messages:D};C&&e.set(m.form,g),n.errorsMap.set(String(m.form),g)}))};for(o.s();!(l=o.n()).done;)u()}catch(v){o.e(v)}finally{o.f()}return i}},{key:"subData",value:function(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=this,n=t.merge,i=n===void 0?!1:n,o=[],l=[],u=r.state,v=u.data,c=u.initialValue,m=j()(r.removeFields),h;try{for(m.s();!(h=m.n()).done;){var C=h.value,D=C.getConfig();D.form&&l.push(D.form)}}catch(X){m.e(X)}finally{m.f()}var g=j()(r.fields),S;try{for(g.s();!(S=g.n()).done;){var I=S.value,k=I.getConfig();k.form&&(l.push(k.form),!k.ignore&&k.parentVisible&&k.visible&&o.push(k))}}catch(X){g.e(X)}finally{g.f()}var T=Je(v,o);for(var w in v)!~l.indexOf(w)&&!(w in T)&&(T[w]=v[w]);var P=(e=r.originData)!==null&&e!==void 0?e:c;if(i&&P){var E=j()(r.listFields),B;try{var oe=function(){var se=B.value,ze=se.getConfig(),st=ze.form,Ke=se.getData(),Ct=se.deleteIndex,Ge=re(T,String(st));st&&Ge&&Ke&&$(Ke[0])&&Ke.forEach(function(bt,He){Ct.includes(He)||(Ge[He]=Object.assign({},bt,Ge[He]))})};for(E.s();!(B=E.n()).done;)oe()}catch(X){E.e(X)}finally{E.f()}return Object.assign({},P,T)}return T}},{key:"data",get:function(){return this.state.data}},{key:"render",value:function(){var e=this,t=e.props.disabled,r=t===void 0?!1:t,n=e.state,i=n.data,o=n.originData,l=n.initialValue,u=e.providerValue;return u.data=i,u.originData=o,u.initialValue=l,u.disabled=r,u.fieldStatus=e.fieldStatus,(0,R.jsx)(M.Provider,{value:u,children:e.props.children})}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=e.data,n=e.initialValue;return r&&r!==t.originData?{data:K.LO(r),originData:r}:n&&n!==t.initialValue?{data:K.LO({}),originData:{},initialValue:n}:null}}]),f}(O.Component);y()(L,"Context",M),y()(L,"useForm",ut),y()(L,"useFormInstance",dt),y()(L,"useList",vt),y()(L,"useListInstance",ft),y()(L,"createForm",lt),y()(L,"createList",ct),y()(L,"Outlet",void 0),y()(L,"OutletView",void 0),y()(L,"List",void 0),y()(L,"Field",void 0),y()(L,"ListView",void 0),y()(L,"ListAction",void 0);var mt=["forwardRef","__Component__","preserve","title","valuePropName","forValue","parentField","deliver"],tt="id",rt=!0,ht=!0,nt=!0,gt=!1,pt=!1,Pe=function(s){ce()(f,s);var d=ve()(f);function f(a,e){var t;de()(this,f),t=d.call(this,a,e),y()(F()(t),"formInstance",void 0),y()(F()(t),"changeFlag",!1),y()(F()(t),"changeForm",!1),y()(F()(t),"isObserveUnion",!1),y()(F()(t),"unmount",!1),y()(F()(t),"observeReactions",[]),y()(F()(t),"providerValue",{}),y()(F()(t),"fieldType",_e.Field);var r=F()(t);return r.listenerValueChange=r.listenerValueChange.bind(r),r.onChange=r.onChange.bind(r),r.observeVisible=r.observeVisible.bind(r),r.observeDisabled=r.observeDisabled.bind(r),r.observeRequired=r.observeRequired.bind(r),r.formInstance=Ie({current:e==null?void 0:e.formInstance}),r.state=r.initState(),r.providerValue={fieldInstance:r},t}return W()(f,[{key:"initState",value:function(){var e=this,t=e.props,r=e.context,n=t.initialValue,i=t.convertValue,o=t.defaultValue,l=t.visible,u=t.disabled,v=e.getFormName(t),c={},m=te(n)?o:n;!V(v)&&r&&(r.initialValue&&(c=r.initialValue,m=re(r.initialValue,v,m)),r.data&&v in r.data&&!te(r.data[v])&&(m=r.data[v]));var h=e.getOptions(),C=h.options,D=h.data,g=e.findRequired(D,C),S=g.required,I=g.message,k={value:_(i)?e.execGetValue(v,m,c):m,initialValue:m,visible:x(l)?!0:!!e.execCallback(l,D,C),disabled:x(u)?!1:!!e.execCallback(u,D,C),required:S,requiredMsg:I,_refreshMark:{}};return e.changeFlag=!1,e.changeForm=!1,e.isObserveUnion=!1,k}},{key:"getFormName",value:function(e){var t=e||this.props,r=t.form,n=t.eachConfig,i=t.injectListName;return n&&i?typeof r!="number"&&r?"".concat(n.form,".").concat(r):n.form:r}},{key:"getFormAlias",value:function(e){var t=e||this.props,r=t.alias,n=t.eachConfig;return V(r)?[]:(r=b(r)?r:[r],r.map(function(i){return n?i?"".concat(n.form,".").concat(i):n.form:i}))}},{key:"findRequired",value:function(e,t){var r=this,n=r.props.rules;if(!x(n)){n=$(n)?[n]:n;var i=function(u){return $(u)&&!!r.execCallback(u.required,e,t)};if(b(n)){var o=n.find(i);return{required:!!(o!=null&&o.required),message:o==null?void 0:o.message}}else return{required:r.execCallback(n,e,t)===!0}}return{required:!1}}},{key:"execGetValue",value:function(e,t,r){var n=this.props,i=n.convertValue,o=n.eachConfig,l=n.inline;if(!l&&!V(e)){var u=String(e),v=o&&o.form?o.form:u.substring(0,u.lastIndexOf(".")),c=V(v)?r:re(r,v);t=c!=null?c:t}try{return i(t)}catch(m){console.warn("ConvertValue:",m)}}},{key:"observeData",value:function(){var e=this;e.unObserveData(),e.observeReactions.push(Ne(e.observeVisible),Ne(e.observeDisabled),Ne(e.observeRequired)),e.observeUnion()}},{key:"unObserveData",value:function(){this.observeReactions.forEach(function(e){return K.p_(e)}),this.observeReactions=[]}},{key:"getOptions",value:function(){var e=this,t=e.props.eachConfig||{},r=t.form,n=t.data,i=e.state||{},o=i.value,l=i.disabled,u=i.visible,v=i.error,c=i.required,m=e.context,h=m.data,C=m.originData,D=m.fieldStatus,g={form:r,val:o,data:C,status:D,selfStatus:{disabled:l,visible:u,required:c,validate:x(v)?void 0:!v},listData:n};return{options:g,data:h,originData:C}}},{key:"observeDisabled",value:function(){var e=this;if(!e.unmount){var t=e.props.disabled,r=e.getOptions(),n=r.options,i=r.data;x(t)||(e.disabled=!!e.execCallback(t,i,n))}}},{key:"observeVisible",value:function(){var e=this;if(!e.unmount){var t=e.props.visible,r=e.getOptions(),n=r.options,i=r.data;x(t)||(e.visible=!!e.execCallback(t,i,n))}}},{key:"observeRequired",value:function(){var e=this;if(!e.unmount){var t=e.getOptions(),r=t.options,n=t.data,i=e.findRequired(n,r),o=i.required,l=i.message;e.required=o,e.requiredMsg=l}}},{key:"observeUnion",value:function(){var e=this;e.isObserveUnion=!1;var t=e.context,r=e.getUnionList();if(!(e.unmount||ge(r))){var n=e.props,i=n.unionValue,o=n.unionValidate,l=t.formInstance,u=e.getFormName();i=_(i)?i:function(){return o?e.value:void 0};var v=function c(m){var h,C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],D=((h=l.getField(m))===null||h===void 0?void 0:h.getUnionList())||[];return D.forEach(function(g){var S=b(g)?g[0]:g;C.indexOf(S)===-1&&(C.push(S),c(S,C))}),C};r.forEach(function(c){var m=b(c)?c:[c,i],h=Te()(m,2),C=h[0],D=h[1],g=v(C,[C]),S=Ne(function(){var I=e.getOptions(),k=I.options,T=I.data,w=I.originData,P=e.execCallback(D,T[C],U()(U()({},k),{},{data:w})),E=!1,B=function(){var X=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},se=X.valid,ze=se===void 0?!1:se;!e.unmount&&C in T&&e.handleChange(P,function(){ze&&o&&e.unionValidateErrors()})};e.isObserveUnion&&(l==null?void 0:l.changeState)!==ne.SET?(E=!0,B({valid:!0})):g.forEach(function(oe){return T[oe]}),!E&&x(u)&&B()});e.observeReactions.push(S)}),e.isObserveUnion=!0}}},{key:"getUnionList",value:function(){var e=this,t=e.props.union;if(V(t))return null;var r=e.getOptions(),n=r.options;return t=_(t)?t(n):t,V(t)?null:(t=b(t)?t:t.split(","),t)}},{key:"execCallback",value:function(e){try{for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return _(e)?e.apply(void 0,r):e}catch(i){console.warn(i)}}},{key:"getTitle",value:function(){var e=this,t=e.getOptions(),r=t.options,n=t.data;return e.execCallback(e.props.title,n,r)}},{key:"getConfig",value:function(e,t){var r=this;e=e||r.props,t=t||r.state;var n=e,i=n.inline,o=n.transform,l=n.ignore,u=n.convertValue,v=n.parentField,c=t,m=c.disabled,h=c.visible,C=c.error,D=c.required;return{inline:i,form:r.getFormName(e),alias:r.getFormAlias(e),transform:o,visible:h,parentVisible:v.visible,disabled:m,ignore:l,error:C,required:D,convertValue:u}}},{key:"onChange",value:function(e){var t=this,r=t.props,n=r.normalize,i=r.valuePropName,o=i===void 0?"value":i,l=t.context;e=Ye(o,e);for(var u=arguments.length,v=new Array(u>1?u-1:0),c=1;c<u;c++)v[c-1]=arguments[c];t.handleChange(n?n(e,{val:t.state.value,data:l.data,args:v}):e)}},{key:"handleChange",value:function(e,t){var r,n=this;if(n.unmount||e===n.state.value){t==null||t();return}var i=n.context,o=n.props.listener,l=o===void 0?{}:o,u=l.key,v=l.transform;n.changeFlag=!0,n.changeForm=!0,u&&((r=i.emitter)===null||r===void 0||r.emit(u,v?v(e,i.data):e)),n.handleValue(e,t)}},{key:"setValue",value:function(e,t){this.changeForm=!0,this.handleValue(e,t)}},{key:"value",get:function(){return this.state.value}},{key:"handleValue",value:function(e,t){var r=this,n=r.state.value;!r.unmount&&!r.equalsValue(e,n)?r.setState({value:e},t):t==null||t()}},{key:"equalsValue",value:function(e,t){var r=this,n=r.props,i=n.label,o=n.unique,l=o===void 0?tt:o;if(e===t)return!0;var u=function(c,m){if(Oe(c)||Oe(m))return!1;var h,C;return l in c||l in m?(h=c[l],C=m[l]):i&&(i in c||i in m)&&(h=c[i],C=m[i]),r.equalsValue(h,C)};return $(e)||$(t)?u(e,t):b(e)||b(t)?ge(e)||ge(t)||e.length!==t.length?!1:e.every(function(v,c){return r.equalsValue(v,t[c])}):String(e)===String(t)}},{key:"disabled",set:function(e){e!==this.state.disabled&&this.setState({disabled:e})}},{key:"required",set:function(e){e!==this.state.required&&this.setState({required:e})}},{key:"requiredMsg",set:function(e){e!==this.state.requiredMsg&&this.setState({requiredMsg:e})}},{key:"visible",set:function(e){var t=this;e!==t.state.visible&&(e||t.setState({error:void 0,errors:void 0}),t.setState({visible:e}))}},{key:"validateErrors",value:function(){return this._validateErrors(this.validate())}},{key:"asyncValidateErrors",value:function(){return this._asyncValidateErrors()}},{key:"unionValidateErrors",value:function(){return this._asyncValidateErrors({isUnionValid:!0})}},{key:"_asyncValidateErrors",value:function(){var a=N()(A()().mark(function t(){var r,n,i,o,l,u,v,c,m,h,C=arguments;return A()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:if(r=C.length>0&&C[0]!==void 0?C[0]:{},n=this,i=r.isUnionValid,o=n.validate({async:!0,isUnionValid:i}),!b(o)){g.next=38;break}l=[],u=!0,v=j()(o),g.prev=8,v.s();case 10:if((c=v.n()).done){g.next=29;break}if(m=c.value,!Z(m)){g.next=26;break}return h=void 0,g.prev=14,g.next=17,m;case 17:h=g.sent,g.next=23;break;case 20:g.prev=20,g.t0=g.catch(14),h=g.t0;case 23:z(h)?l.push(h):h||(u=!1),g.next=27;break;case 26:l.push(m);case 27:g.next=10;break;case 29:g.next=34;break;case 31:g.prev=31,g.t1=g.catch(8),v.e(g.t1);case 34:return g.prev=34,v.f(),g.finish(34);case 37:o=l.length?l:u;case 38:return g.abrupt("return",this._validateErrors(o));case 39:case"end":return g.stop()}},t,this,[[8,31,34,37],[14,20]])}));function e(){return a.apply(this,arguments)}return e}()},{key:"_validateErrors",value:function(e){var t=this,r=t.state,n=r.errors,i=r.error,o,l;return ie(e)?(l=!e,o=void 0):(l=!!e.length,o=e),l!==i&&t.setState({error:l}),t.equalsValue(n,o)||t.setState({errors:o,_refreshMark:{}}),{error:l,errors:o}}},{key:"validate",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=this,r=e.async,n=r===void 0?!1:r,i=e.isUnionValid,o=i===void 0?!1:i,l=t.props.rules,u=t.state,v=u.required,c=u.requiredMsg,m=u.value,h=u.visible;if(!h)return!0;var C=o?!1:t.validateEmpty(m);if(v&&C)return V(c)?!1:[c];if(C)return!0;var D=t.getOptions(),g=D.options,S=D.originData,I=function(E){if(_(E))return E(S,U()(U()({},g),{},{isUnionValid:o}));if(!o){if(E&&E instanceof RegExp)return E.test(m);if($(E)){var B=E.pattern,oe=E.message;if(B&&!B.test(m))return oe||!1}}return!0};if(b(l)){var k=[],T=!0;return l.forEach(function(P){var E=I(P);z(E)||n&&Z(E)?k.push(E):E||(T=!1)}),k.length?k:T}else if(!o&&$(l)){var w=I(l);return z(w)?[w]:w}return!0}},{key:"validateEmpty",value:function(e){var t=this.props.label,r=function(i){return Oe(i)||!!(t&&V(i[t]))};return x(e)?!0:z(e)?V(e):$(e)?r(e):b(e)?ge(e)||$(e[0])&&r(e[0]):x(e)}},{key:"listenerValueChange",value:function(e){var t=this,r=this.context,n=t.props.listener;t.handleValue(n!=null&&n.convertValue?n.convertValue(e,r.data):e)}},{key:"componentDidMount",value:function(){var e,t=this,r=t.context,n=t.props.listener,i=n===void 0?{}:n,o=i.key;o&&((e=r.emitter)===null||e===void 0||e.addListener(o,t.listenerValueChange)),r.formInstance.setField(t)}},{key:"componentWillUnmount",value:function(){var e,t=this;t.unmount=!0;var r=t.context,n=t.props.listener,i=n===void 0?{}:n,o=i.key;o&&((e=r.emitter)===null||e===void 0||e.removeListener(o,t.listenerValueChange)),r.formInstance.unmountField(t)}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=r.props,i=r.state;return t.value!==i.value||t.required!==i.required||t.error!==i.error||t.visible!==i.visible||t.disabled!==i.disabled||t._refreshMark!==i._refreshMark||e.form!==n.form||r.getFormName(e)!==r.getFormName(n)||Me(n.shouldUpdate,e.shouldUpdate)}},{key:"getSnapshotBeforeUpdate",value:function(e,t){var r=this,n=this.context,i=n.formInstance,o=r.state,l=o.required,u=o.error,v=o.visible,c=o.disabled,m=r.getFormName(r.props),h=r.getFormName(e);return e.form!==this.props.form&&i.unmountField(this),m!==h&&!V(m)&&i.renameField(m,r),(l!==t.required||u!==t.error||v!==t.visible||c!==t.disabled)&&i.setFieldStatus(m,{required:l,error:u,visible:v,disabled:c}),null}},{key:"componentDidUpdate",value:function(e,t){var r=this,n=this.context,i=n.formInstance,o=r.state,l=o.value,u=o.required,v=o.error,c=o.errors,m=r.getFormName(r.props);if(l!==t.value){var h,C;i.fieldChange(m,l,{raw:!r.changeForm}),r.changeFlag&&((h=(C=r.props).onChange)===null||h===void 0||h.call(C,l))}(l!==t.value&&r.changeFlag||u!==t.required&&!u&&!x(v))&&r.asyncValidateErrors(),e.form!==r.props.form&&i.setField(r),m!==r.getFormName(e)&&i.fieldChange(m,l,{raw:!0}),!V(m)&&c!==t.errors&&i.errorsChange(String(m),c),r.changeFlag=!1,r.changeForm=!1}},{key:"render",value:function(){var e=this,t=e.context,r=e.state,n=r.value,i=r.required,o=r.error,l=r.errors,u=r.disabled,v=r.visible,c=e.props,m=c.forwardRef,h=c.__Component__,C=c.preserve,D=c.title,g=c.valuePropName,S=c.forValue,I=c.parentField,k=c.deliver,T=Q()(c,mt);if(!v&&!C)return null;var w=S?S(n,t.data):n;g&&(T[g]=w);var P=e.providerValue;P.visible=v;var E=(0,R.jsx)(h,U()(U()({},T),{},{title:e.getTitle(),data:t.data,value:w,required:i,disabled:t.disabled||u,visible:v,formInstance:e.formInstance,error:o,errors:l,onChange:e.onChange,ref:m}));return k?(0,R.jsx)(fe.Provider,{value:P,children:E}):E}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=null;function n(i){var o=e[i];!te(o)&&!_(o)&&o!==t["_".concat(i)]&&(r=r||{},r[i]=o,r["_".concat(i)]=o)}return["value","disabled","visible"].forEach(n),r}}]),f}(O.Component);y()(Pe,"contextType",L.Context),y()(Pe,"defaultProps",{inline:rt,unique:tt,deliver:ht,injectListName:nt,preserve:gt,unionValidate:pt});function at(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},d=s.defaultValue;return function(f){return function(a){return(0,R.jsx)(ae.Consumer,{children:function(t){var r=t,n=a.initialValue,i=a.form,o=a.inline,l=o===void 0?rt:o,u=a.injectListName,v=u===void 0?nt:u;if(r&&v){var c=r.data[r.index];n=i?$(c)&&i in c?c[i]:l?n:c:te(c)?n:c}return(0,R.jsx)(fe.Consumer,{children:function(h){return(0,R.jsx)(Pe,U()(U()({defaultValue:d},a),{},{parentField:h,initialValue:n,eachConfig:r,__Component__:f}))}})}})}}}var xe=function(d){var f=d.children,a=d.component,e=d.provider,t=(0,O.useContext)(ee);if(!t||!f)return null;var r=t.keys,n=t.form,i=t.listInstance,o=r.map(function(l,u){var v=U()(U()({},t),{},{form:V(n)?String(u):"".concat(n,".").concat(u),index:u,key:l,remove:i.removeItem.bind(i,u),add:i.addItem.bind(i),move:i.moveItem.bind(i)}),c=(0,R.jsx)(ae.Provider,{value:v,children:f(v)},l);return e?e(v,c):c});return a?a(t,o):(0,R.jsx)(R.Fragment,{children:o})},qe=function(s){ce()(f,s);var d=ve()(f);function f(a,e){var t;de()(this,f),t=d.call(this,a,e),y()(F()(t),"deleteIndex",[]),y()(F()(t),"uuid",0),y()(F()(t),"fieldType",_e.List);var r=F()(t),n=a.formList;return r.genID=r.genID.bind(r),r.addItem=r.addItem.bind(r),r.removeItem=r.removeItem.bind(r),r.moveItem=r.moveItem.bind(r),r.state=r.initState(),n&&n.__REF__&&(n.__REF__.current=r),t}return W()(f,[{key:"initState",value:function(){var e=this,t=e.props,r=e.context;e._initID();var n=t.initRows,i=t.initialValue,o=e.getFormName(t);r&&r.initialValue&&(V(o)?b(r.initialValue)&&(i=r.initialValue):i=re(r.initialValue,o,i));var l=Array(n),u=i;b(i)&&u.length&&(n=u.length,l=u);var v=Array(n).fill(1).map(e.genID);return{keys:v,data:l}}},{key:"_initID",value:function(){this.uuid=1e3}},{key:"genID",value:function(){return"CC".concat(++this.uuid)}},{key:"getFormName",value:function(e){var t=e.form,r=e.eachConfig;return r?t?"".concat(r.form,".").concat(t):r.form:t}},{key:"setData",value:function(e){var t=this,r=t.props.initRows,n=t.state.keys;x(e)||!b(e)?e=[]:e.length===0&&(e=Array(r)),t.removeOutData(e.length),n=n.slice(0,e.length),t.setState({keys:n,data:e})}},{key:"getData",value:function(){return this.state.data}},{key:"addItem",value:function(e,t){var r,n=this,i=n.genID(),o=n.state,l=o.data,u=o.keys;u=Array.from(u),!x(t)&&t<l.length?(u.splice(t,0,i),l.splice(t,0,e),n.removeListData(t,1)):(u.push(i),l.push(e)),n.setState({keys:u,data:l}),(r=n.context)===null||r===void 0||r.formInstance.formChange()}},{key:"removeItem",value:function(e){var t=this,r=t.state,n=r.data,i=r.keys,o=i.length,l=(b(e)?e:[e]).filter(function(v){return v<o});if(l.length){var u;(u=t.deleteIndex).push.apply(u,Ve()(l)),t.removeListData(o-l.length,l.length),i=Array.from(i),l.forEach(function(v,c){i.splice(v-c,1),n.splice(v-c,1)}),t.setState({keys:i,data:n})}}},{key:"moveItem",value:function(e,t){var r=this,n=r.state,i=n.data,o=n.keys;if(e!==t&&e>=0&&e<o.length&&t>=0&&t<o.length){var l;o=Array.from(o);var u=o[e],v=i[e];o.splice(e,1),o.splice(t,0,u),i.splice(e,1),i.splice(t,0,v),r.setState({keys:o,data:i}),(l=r.context)===null||l===void 0||l.formInstance.formChange()}}},{key:"removeListData",value:function(e){for(var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=this,n=r.getFormName(r.props),i=r.context,o=i.data,l=i.formInstance,u=e+t,v=[],c=e;c<u;c++)v.push(n?"".concat(n,".").concat(c):String(c));var m=function(D){v.forEach(function(g){D.indexOf(g)===0&&l.deleteField(D)})};for(var h in o)m(h)}},{key:"removeOutData",value:function(e){var t=this,r=t.getFormName(t.props),n=t.context,i=n.data,o=n.formInstance,l=r?Array(e).fill(1).map(function(u,v){return"".concat(r,".").concat(v)}):[];Object.keys(i).forEach(function(u){if(V(r)){var v=Number(u),c=u.substr(0,u.indexOf("."));String(v)===u&&v<e?o.deleteField(u,{isChange:!1}):/^[0-9]+$/.test(c)&&Number(c)>=e&&o.deleteField(u,{isChange:!1})}else u.indexOf(String(r))===0&&l.findIndex(function(m){return u.indexOf(m)!==-1})===-1&&o.deleteField(u,{isChange:!1})})}},{key:"getConfig",value:function(){return{form:this.getFormName(this.props)}}},{key:"componentDidMount",value:function(){var e,t,r=this;(e=r.props.formList)===null||e===void 0||e.__REF__.mount(r),(t=r.context)===null||t===void 0||t.formInstance.setField(r)}},{key:"componentWillUnmount",value:function(){var e,t,r=this;(e=r.props.formList)===null||e===void 0||e.__REF__.unmount(),(t=r.context)===null||t===void 0||t.formInstance.unmountField(r)}},{key:"shouldComponentUpdate",value:function(e,t){var r=this,n=r.props,i=r.state;return e.form!==n.form||t.keys!==i.keys||r.getFormName(e)!==r.getFormName(n)||Me(n.shouldUpdate,e.shouldUpdate)}},{key:"componentDidUpdate",value:function(e,t,r){if(t.keys!==this.state.keys){var n;(n=this.context)===null||n===void 0||n.formInstance.observeField()}}},{key:"render",value:function(){var e=this,t=e.context,r=e.getFormName(e.props),n=e.props.children,i=e.state,o=i.keys,l=i.data;if(!n||!b(o))return null;var u={form:r,listInstance:e,keys:o,data:l,length:o.length,formData:t.data},v=_(n)?(0,R.jsx)(xe,{children:n}):n;return(0,R.jsx)(ee.Provider,{value:u,children:v})}}]),f}(O.Component);y()(qe,"contextType",L.Context),y()(qe,"defaultProps",{initRows:1});var We=function(d){var f=(0,O.useContext)(ae),a=d.form,e=d.initialValue,t=d.children,r=f;if(r){var n=r.data[r.index];e=a?$(n)&&a in n?n[a]:e:n}return(0,R.jsx)(qe,U()(U()({},d),{},{initialValue:e,eachConfig:r,children:t}))};We.View=xe;var it=function(d){var f=d.children,a=(0,O.useContext)(ee);if(!a)return null;var e=a.listInstance,t=U()(U()({},a),{},{remove:e.removeItem,add:e.addItem,move:e.moveItem});return(0,R.jsx)(R.Fragment,{children:f(t)})},yt=["children","forProps"];function Be(){return function(s){return(0,O.forwardRef)(function(d,f){return(0,R.jsx)(ae.Consumer,{children:function(e){return(0,R.jsx)(L.Context.Consumer,{children:function(r){return(0,R.jsx)(s,U()(U()(U()({},d),{},{ref:f},r),{},{eachConfig:e||void 0}))}})}})})}}var ot=Be()(function(s){var d=s.children,f=s.forProps,a=Q()(s,yt);return(0,O.cloneElement)(d,f?f(a):a)});L.List=We,L.ListView=xe,L.Field=at,L.Outlet=Be,L.OutletView=ot,L.ListAction=it},9427:function(pe,q,p){p.r(q)},1545:function(pe,q){q.Z=`.cc-form-item-warp {
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
    padding: 0 0.5rem 0 0;
    height: 2rem;
  }

  .cc-form-colon::after {
    margin-inline-start: 0.125rem;
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
      padding: 0 0.5rem 0 0;
      height: 2rem;
    }

    .cc-form-colon::after {
      margin-inline-start: 0.125rem;
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
`},5411:function(pe,q){q.Z=`import './index.css';

import { CCField, CCTypes } from '@guc/react-form';
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
  const isNotTitle = CCTypes.isUndefined(title);
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
              !CCTypes.isNull(title) && required && \`\${prefix}-required-optional\`,
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
