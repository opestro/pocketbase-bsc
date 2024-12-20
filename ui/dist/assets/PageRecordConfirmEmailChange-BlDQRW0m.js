import{S as I,i as J,s as M,F as z,c as L,m as S,t as h,a as v,d as j,J as A,L as G,n as _,E as N,G as R,v as b,M as W,g as Y,p as B,f as D,h as m,z as y,j as C,k as p,l as T,o as g,q as P,u as K,I as E,H as O,A as F}from"./index-CdB6q2vK.js";function Q(i){let e,t,n,s,l,o,f,a,r,u,k,$,d=i[3]&&H(i);return o=new D({props:{class:"form-field required",name:"password",$$slots:{default:[V,({uniqueId:c})=>({8:c}),({uniqueId:c})=>c?256:0]},$$scope:{ctx:i}}}),{c(){e=m("form"),t=m("div"),n=m("h5"),s=y(`Type your password to confirm changing your email address\r
                    `),d&&d.c(),l=C(),L(o.$$.fragment),f=C(),a=m("button"),r=m("span"),r.textContent="Confirm new email",p(t,"class","content txt-center m-b-base"),p(r,"class","txt"),p(a,"type","submit"),p(a,"class","btn btn-lg btn-block"),a.disabled=i[1],T(a,"btn-loading",i[1])},m(c,w){_(c,e,w),g(e,t),g(t,n),g(n,s),d&&d.m(n,null),g(e,l),S(o,e,null),g(e,f),g(e,a),g(a,r),u=!0,k||($=P(e,"submit",K(i[4])),k=!0)},p(c,w){c[3]?d?d.p(c,w):(d=H(c),d.c(),d.m(n,null)):d&&(d.d(1),d=null);const q={};w&769&&(q.$$scope={dirty:w,ctx:c}),o.$set(q),(!u||w&2)&&(a.disabled=c[1]),(!u||w&2)&&T(a,"btn-loading",c[1])},i(c){u||(h(o.$$.fragment,c),u=!0)},o(c){v(o.$$.fragment,c),u=!1},d(c){c&&b(e),d&&d.d(),j(o),k=!1,$()}}}function U(i){let e,t,n,s,l;return{c(){e=m("div"),e.innerHTML='<div class="icon"><i class="ri-checkbox-circle-line"></i></div> <div class="content txt-bold"><p>Successfully changed the user email address.</p> <p>You can now sign in with your new email address.</p></div>',t=C(),n=m("button"),n.textContent="Close",p(e,"class","alert alert-success"),p(n,"type","button"),p(n,"class","btn btn-transparent btn-block")},m(o,f){_(o,e,f),_(o,t,f),_(o,n,f),s||(l=P(n,"click",i[6]),s=!0)},p:E,i:E,o:E,d(o){o&&(b(e),b(t),b(n)),s=!1,l()}}}function H(i){let e,t,n;return{c(){e=y("to "),t=m("strong"),n=y(i[3]),p(t,"class","txt-nowrap")},m(s,l){_(s,e,l),_(s,t,l),g(t,n)},p(s,l){l&8&&O(n,s[3])},d(s){s&&(b(e),b(t))}}}function V(i){let e,t,n,s,l,o,f,a;return{c(){e=m("label"),t=y("Password"),s=C(),l=m("input"),p(e,"for",n=i[8]),p(l,"type","password"),p(l,"id",o=i[8]),l.required=!0,l.autofocus=!0},m(r,u){_(r,e,u),g(e,t),_(r,s,u),_(r,l,u),F(l,i[0]),l.focus(),f||(a=P(l,"input",i[7]),f=!0)},p(r,u){u&256&&n!==(n=r[8])&&p(e,"for",n),u&256&&o!==(o=r[8])&&p(l,"id",o),u&1&&l.value!==r[0]&&F(l,r[0])},d(r){r&&(b(e),b(s),b(l)),f=!1,a()}}}function X(i){let e,t,n,s;const l=[U,Q],o=[];function f(a,r){return a[2]?0:1}return e=f(i),t=o[e]=l[e](i),{c(){t.c(),n=G()},m(a,r){o[e].m(a,r),_(a,n,r),s=!0},p(a,r){let u=e;e=f(a),e===u?o[e].p(a,r):(N(),v(o[u],1,1,()=>{o[u]=null}),R(),t=o[e],t?t.p(a,r):(t=o[e]=l[e](a),t.c()),h(t,1),t.m(n.parentNode,n))},i(a){s||(h(t),s=!0)},o(a){v(t),s=!1},d(a){a&&b(n),o[e].d(a)}}}function Z(i){let e,t;return e=new z({props:{nobranding:!0,$$slots:{default:[X]},$$scope:{ctx:i}}}),{c(){L(e.$$.fragment)},m(n,s){S(e,n,s),t=!0},p(n,[s]){const l={};s&527&&(l.$$scope={dirty:s,ctx:n}),e.$set(l)},i(n){t||(h(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){j(e,n)}}}function x(i,e,t){let n,{params:s}=e,l="",o=!1,f=!1;async function a(){if(o)return;t(1,o=!0);const k=new W("https://bsc-pocketbase.mtdjari.com");try{const $=Y(s==null?void 0:s.token);await k.collection($.collectionId).confirmEmailChange(s==null?void 0:s.token,l),t(2,f=!0)}catch($){B.error($)}t(1,o=!1)}const r=()=>window.close();function u(){l=this.value,t(0,l)}return i.$$set=k=>{"params"in k&&t(5,s=k.params)},i.$$.update=()=>{i.$$.dirty&32&&t(3,n=A.getJWTPayload(s==null?void 0:s.token).newEmail||"")},[l,o,f,n,a,s,r,u]}class te extends I{constructor(e){super(),J(this,e,x,Z,M,{params:5})}}export{te as default};
