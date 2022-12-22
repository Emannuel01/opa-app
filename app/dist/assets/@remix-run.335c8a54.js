/**
 * @remix-run/router v1.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}var p;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(p||(p={}));const S="popstate";function Q(e){e===void 0&&(e={});function t(n,a){let{pathname:s,search:i,hash:l}=n.location;return x("",{pathname:s,search:i,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(n,a){return typeof a=="string"?a:W(a)}return b(t,r,null,e)}function C(){return Math.random().toString(36).substr(2,8)}function R(e){return{usr:e.state,key:e.key}}function x(e,t,r,n){return r===void 0&&(r=null),P({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?I(t):t,{state:r,key:t&&t.key||n||C()})}function W(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function I(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function b(e,t,r,n){n===void 0&&(n={});let{window:a=document.defaultView,v5Compat:s=!1}=n,i=a.history,l=p.Pop,o=null;function d(){l=p.Pop,o&&o({action:l,location:f.location})}function c(u,y){l=p.Push;let h=x(f.location,u,y);r&&r(h,u);let w=R(h),g=f.createHref(h);try{i.pushState(w,"",g)}catch{a.location.assign(g)}s&&o&&o({action:l,location:h})}function m(u,y){l=p.Replace;let h=x(f.location,u,y);r&&r(h,u);let w=R(h),g=f.createHref(h);i.replaceState(w,"",g),s&&o&&o({action:l,location:h})}let f={get action(){return l},get location(){return e(a,i)},listen(u){if(o)throw new Error("A history only accepts one active listener");return a.addEventListener(S,d),o=u,()=>{a.removeEventListener(S,d),o=null}},createHref(u){return t(a,u)},push:c,replace:m,go(u){return i.go(u)}};return f}var $;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})($||($={}));function X(e,t,r){r===void 0&&(r="/");let n=typeof t=="string"?I(t):t,a=q(n.pathname||"/",r);if(a==null)return null;let s=O(e);H(s);let i=null;for(let l=0;i==null&&l<s.length;++l)i=z(s[l],a);return i}function O(e,t,r,n){return t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n=""),e.forEach((a,s)=>{let i={relativePath:a.path||"",caseSensitive:a.caseSensitive===!0,childrenIndex:s,route:a};i.relativePath.startsWith("/")&&(E(i.relativePath.startsWith(n),'Absolute route path "'+i.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),i.relativePath=i.relativePath.slice(n.length));let l=v([n,i.relativePath]),o=r.concat(i);a.children&&a.children.length>0&&(E(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+l+'".')),O(a.children,t,o,l)),!(a.path==null&&!a.index)&&t.push({path:l,score:T(l,a.index),routesMeta:o})}),t}function H(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:_(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const L=/^:\w+$/,U=3,V=2,A=1,k=10,M=-2,B=e=>e==="*";function T(e,t){let r=e.split("/"),n=r.length;return r.some(B)&&(n+=M),t&&(n+=V),r.filter(a=>!B(a)).reduce((a,s)=>a+(L.test(s)?U:s===""?A:k),n)}function _(e,t){return e.length===t.length&&e.slice(0,-1).every((n,a)=>n===t[a])?e[e.length-1]-t[t.length-1]:0}function z(e,t){let{routesMeta:r}=e,n={},a="/",s=[];for(let i=0;i<r.length;++i){let l=r[i],o=i===r.length-1,d=a==="/"?t:t.slice(a.length)||"/",c=D({path:l.relativePath,caseSensitive:l.caseSensitive,end:o},d);if(!c)return null;Object.assign(n,c.params);let m=l.route;s.push({params:n,pathname:v([a,c.pathname]),pathnameBase:F(v([a,c.pathnameBase])),route:m}),c.pathnameBase!=="/"&&(a=v([a,c.pathnameBase]))}return s}function D(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=G(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let s=a[0],i=s.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:n.reduce((d,c,m)=>{if(c==="*"){let f=l[m]||"";i=s.slice(0,s.length-f.length).replace(/(.)\/+$/,"$1")}return d[c]=K(l[m]||"",c),d},{}),pathname:s,pathnameBase:i,pattern:e}}function G(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),j(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(i,l)=>(n.push(l),"([^\\/]+)"));return e.endsWith("*")?(n.push("*"),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function K(e,t){try{return decodeURIComponent(e)}catch(r){return j(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+r+").")),e}}function q(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function E(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function j(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}const v=e=>e.join("/").replace(/\/\/+/g,"/"),F=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/");class J{constructor(t,r,n){this.status=t,this.statusText=r||"",this.data=n}}function Y(e){return e instanceof J}export{p as A,Y as a,Q as c,E as i,v as j,X as m,I as p,q as s};