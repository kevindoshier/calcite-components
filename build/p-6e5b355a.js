const e="calcite";let t,n,l,o=!1,s=!1,c=!1,r=!1,i=!1;const a="undefined"!=typeof window?window:{},f=a.CSS,u=a.document||{head:{}},d={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},h=(()=>(u.head.attachShadow+"").indexOf("[native")>-1)(),$=e=>Promise.resolve(e),p=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),m=(e,t,n)=>{n&&n.map((([n,l,o])=>{const s=w(e,n),c=b(t,o),r=y(n);d.ael(s,l,c,r),(t.o=t.o||[]).push((()=>d.rel(s,l,c,r)))}))},b=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(l){je(l)}},w=(e,t)=>4&t?u:8&t?a:16&t?u.body:e,y=e=>0!=(2&e),g="http://www.w3.org/1999/xlink",v=new WeakMap,j=e=>"sc-"+e.h,k={},O=e=>"object"==(e=typeof e)||"function"===e,C=(e,t,...n)=>{let l=null,o=null,s=null,c=!1,r=!1,i=[];const a=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?a(l):null!=l&&"boolean"!=typeof l&&((c="function"!=typeof e&&!O(l))&&(l+=""),c&&r?i[i.length-1].$+=l:i.push(c?R(null,l):l),r=c)};if(a(n),t){t.key&&(o=t.key),t.name&&(s=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,i,_);const f=R(e,null);return f.p=t,i.length>0&&(f.m=i),f.g=o,f.v=s,f},R=(e,t)=>({t:0,j:e,$:t,k:null,m:null,p:null,g:null,v:null}),S={},_={forEach:(e,t)=>e.map(x).forEach(t),map:(e,t)=>e.map(x).map(t).map(M)},x=e=>({vattrs:e.p,vchildren:e.m,vkey:e.g,vname:e.v,vtag:e.j,vtext:e.$}),M=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),C(e.vtag,t,...e.vchildren||[])}const t=R(e.vtag,e.vtext);return t.p=e.vattrs,t.m=e.vchildren,t.g=e.vkey,t.v=e.vname,t},E=(e,t,n,l,o,s)=>{if(n!==l){let r=ve(e,t),i=t.toLowerCase();if("class"===t){const t=e.classList,o=N(n),s=N(l);t.remove(...o.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!o.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(r||"o"!==t[0]||"n"!==t[1]){const a=O(l);if((r||a&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{let o=null==l?"":l;"list"===t?r=!1:null!=n&&e[t]==o||(e[t]=o)}}catch(c){}let f=!1;i!==(i=i.replace(/^xlink\:?/,""))&&(t=i,f=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(f?e.removeAttributeNS(g,t):e.removeAttribute(t)):(!r||4&s||o)&&!a&&(l=!0===l?"":l,f?e.setAttributeNS(g,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):ve(a,i)?i.slice(2):i[2]+t.slice(3),n&&d.rel(e,t,n,!1),l&&d.ael(e,t,l,!1)}},L=/\s/,N=e=>e?e.split(L):[],P=(e,t,n,l)=>{const o=11===t.k.nodeType&&t.k.host?t.k.host:t.k,s=e&&e.p||k,c=t.p||k;for(l in s)l in c||E(o,l,s[l],void 0,n,t.t);for(l in c)E(o,l,s[l],c[l],n,t.t)},T=(e,s,i,a)=>{let f,d,h,$=s.m[i],p=0;if(o||(c=!0,"slot"===$.j&&(t&&a.classList.add(t+"-s"),$.t|=$.m?2:1)),null!==$.$)f=$.k=u.createTextNode($.$);else if(1&$.t)f=$.k=u.createTextNode("");else{if(r||(r="svg"===$.j),f=$.k=u.createElementNS(r?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&$.t?"slot-fb":$.j),r&&"foreignObject"===$.j&&(r=!1),P(null,$,r),null!=t&&f["s-si"]!==t&&f.classList.add(f["s-si"]=t),$.m)for(p=0;p<$.m.length;++p)d=T(e,$,p,f),d&&f.appendChild(d);"svg"===$.j?r=!1:"foreignObject"===f.tagName&&(r=!0)}return f["s-hn"]=l,3&$.t&&(f["s-sr"]=!0,f["s-cr"]=n,f["s-sn"]=$.v||"",h=e&&e.m&&e.m[i],h&&h.j===$.j&&e.k&&U(e.k,!1)),f},U=(e,t)=>{d.t|=1;const n=e.childNodes;for(let o=n.length-1;o>=0;o--){const e=n[o];e["s-hn"]!==l&&e["s-ol"]&&(H(e).insertBefore(e,F(e)),e["s-ol"].remove(),e["s-ol"]=void 0,c=!0),t&&U(e,t)}d.t&=-2},W=(e,t,n,o,s,c)=>{let r,i=e["s-cr"]&&e["s-cr"].parentNode||e;for(i.shadowRoot&&i.tagName===l&&(i=i.shadowRoot);s<=c;++s)o[s]&&(r=T(null,n,s,e),r&&(o[s].k=r,i.insertBefore(r,F(t))))},A=(e,t,n,l,o)=>{for(;t<=n;++t)(l=e[t])&&(o=l.k,I(l),s=!0,o["s-ol"]?o["s-ol"].remove():U(o,!0),o.remove())},D=(e,t)=>e.j===t.j&&("slot"===e.j?e.v===t.v:e.g===t.g),F=e=>e&&e["s-ol"]||e,H=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,q=(e,t)=>{const n=t.k=e.k,l=e.m,o=t.m,s=t.j,c=t.$;let i;null===c?(r="svg"===s||"foreignObject"!==s&&r,"slot"===s||P(e,t,r),null!==l&&null!==o?((e,t,n,l)=>{let o,s,c=0,r=0,i=0,a=0,f=t.length-1,u=t[0],d=t[f],h=l.length-1,$=l[0],p=l[h];for(;c<=f&&r<=h;)if(null==u)u=t[++c];else if(null==d)d=t[--f];else if(null==$)$=l[++r];else if(null==p)p=l[--h];else if(D(u,$))q(u,$),u=t[++c],$=l[++r];else if(D(d,p))q(d,p),d=t[--f],p=l[--h];else if(D(u,p))"slot"!==u.j&&"slot"!==p.j||U(u.k.parentNode,!1),q(u,p),e.insertBefore(u.k,d.k.nextSibling),u=t[++c],p=l[--h];else if(D(d,$))"slot"!==u.j&&"slot"!==p.j||U(d.k.parentNode,!1),q(d,$),e.insertBefore(d.k,u.k),d=t[--f],$=l[++r];else{for(i=-1,a=c;a<=f;++a)if(t[a]&&null!==t[a].g&&t[a].g===$.g){i=a;break}i>=0?(s=t[i],s.j!==$.j?o=T(t&&t[r],n,i,e):(q(s,$),t[i]=void 0,o=s.k),$=l[++r]):(o=T(t&&t[r],n,r,e),$=l[++r]),o&&H(u.k).insertBefore(o,F(u.k))}c>f?W(e,null==l[h+1]?null:l[h+1].k,n,l,r,h):r>h&&A(t,c,f)})(n,l,t,o):null!==o?(null!==e.$&&(n.textContent=""),W(n,null,t,o,0,o.length-1)):null!==l&&A(l,0,l.length-1),r&&"svg"===s&&(r=!1)):(i=n["s-cr"])?i.parentNode.textContent=c:e.$!==c&&(n.data=c)},V=e=>{let t,n,l,o,s,c,r=e.childNodes;for(n=0,l=r.length;n<l;n++)if(t=r[n],1===t.nodeType){if(t["s-sr"])for(s=t["s-sn"],t.hidden=!1,o=0;o<l;o++)if(r[o]["s-hn"]!==t["s-hn"])if(c=r[o].nodeType,""!==s){if(1===c&&s===r[o].getAttribute("slot")){t.hidden=!0;break}}else if(1===c||3===c&&""!==r[o].textContent.trim()){t.hidden=!0;break}V(t)}},z=[],B=e=>{let t,n,l,o,c,r,i=0,a=e.childNodes,f=a.length;for(;i<f;i++){if(t=a[i],t["s-sr"]&&(n=t["s-cr"]))for(l=n.parentNode.childNodes,o=t["s-sn"],r=l.length-1;r>=0;r--)n=l[r],n["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||(G(n,o)?(c=z.find((e=>e.O===n)),s=!0,n["s-sn"]=n["s-sn"]||o,c?c.C=t:z.push({C:t,O:n}),n["s-sr"]&&z.map((e=>{G(e.O,n["s-sn"])&&(c=z.find((e=>e.O===n)),c&&!e.C&&(e.C=c.C))}))):z.some((e=>e.O===n))||z.push({O:n}));1===t.nodeType&&B(t)}},G=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,I=e=>{e.p&&e.p.ref&&e.p.ref(null),e.m&&e.m.map(I)},J=e=>we(e).R,K=(e,t,n)=>{const l=J(e);return{emit:e=>Q(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},Q=(e,t,n)=>{const l=d.ce(t,n);return e.dispatchEvent(l),l},X=(e,t)=>{t&&!e.S&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.S=t)))},Y=(e,t)=>{if(e.t|=16,!(4&e.t))return X(e,e._),Le((()=>Z(e,t)));e.t|=512},Z=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>se(n,e,t))),e.u=null),l=se(n,"componentWillLoad")),l=ce(l,(()=>se(n,"componentWillRender"))),ce(l,(()=>ee(e,n,t)))},ee=async(e,r,i)=>{const a=e.R,f=a["s-rc"];i&&(e=>{const t=e.M,n=e.R,l=t.t,o=((e,t)=>{let n=j(t),l=Ce.get(n);if(e=11===e.nodeType?e:u,l)if("string"==typeof l){let t,o=v.get(e=e.head||e);o||v.set(e,o=new Set),o.has(n)||(t=u.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(h&&n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"),2&l&&n.classList.add(o+"-s"))})(e);((e,r)=>{const i=e.R,a=e.M,f=e.L||R(null,null),$=(e=>e&&e.j===S)(r)?r:C(null,null,r);if(l=i.tagName,a.N&&($.p=$.p||{},a.N.map((([e,t])=>$.p[t]=i[e]))),$.j=null,$.t|=4,e.L=$,$.k=f.k=i.shadowRoot||i,t=i["s-sc"],n=i["s-cr"],o=h&&0!=(1&a.t),s=!1,q(f,$),d.t|=1,c){let e,t,n,l,o,s;B($.k);let c=0;for(;c<z.length;c++)e=z[c],t=e.O,t["s-ol"]||(n=u.createTextNode(""),n["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=n,t));for(c=0;c<z.length;c++)if(e=z[c],t=e.O,e.C){for(l=e.C.parentNode,o=e.C.nextSibling,n=t["s-ol"];n=n.previousSibling;)if(s=n["s-nr"],s&&s["s-sn"]===t["s-sn"]&&l===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&l!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),l.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}s&&V($.k),d.t&=-2,z.length=0})(e,te(e,r)),f&&(f.map((e=>e())),a["s-rc"]=void 0);{const t=a["s-p"],n=()=>ne(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},te=(e,t)=>{try{t=t.render(),e.t&=-17,e.t|=2}catch(n){je(n,e.R)}return t},ne=e=>{const t=e.R,n=e.i,l=e._;se(n,"componentDidRender"),64&e.t?se(n,"componentDidUpdate"):(e.t|=64,re(t),se(n,"componentDidLoad"),e.P(t),l||oe()),e.T(t),e.S&&(e.S(),e.S=void 0),512&e.t&&Ee((()=>Y(e,!1))),e.t&=-517},le=e=>{{const t=we(e),n=t.R.isConnected;return n&&2==(18&t.t)&&Y(t,!1),n}},oe=()=>{re(u.documentElement),Ee((()=>Q(a,"appload",{detail:{namespace:"calcite"}})))},se=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(l){je(l)}},ce=(e,t)=>e&&e.then?e.then(t):t(),re=e=>e.setAttribute("calcite-hydrated",""),ie=(e,t,n)=>{if(t.U){e.watchers&&(t.W=e.watchers);const l=Object.entries(t.U),o=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(o,e,{get(){return((e,t)=>we(this).A.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=we(e),s=o.R,c=o.A.get(t),r=o.t,i=o.i;if(n=((e,t)=>null==e||O(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.U[t][0]),!(8&r&&void 0!==c||n===c)&&(o.A.set(t,n),i)){if(l.W&&128&r){const e=l.W[t];e&&e.map((e=>{try{i[e](n,c,t)}catch(l){je(l,s)}}))}2==(18&r)&&Y(o,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(o,e,{value(...t){const n=we(this);return n.D.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;o.attributeChangedCallback=function(e,t,l){d.jmp((()=>{const t=n.get(e);this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const o=l[1]||e;return n.set(o,e),512&l[0]&&t.N.push([e,o]),o}))}}return e},ae=e=>{se(e,"connectedCallback")},fe=e=>{e.__appendChild=e.appendChild,e.appendChild=function(e){const t=e["s-sn"]=de(e),n=he(this.childNodes,t);if(n){const l=$e(n,t),o=l[l.length-1];return o.parentNode.insertBefore(e,o.nextSibling)}return this.__appendChild(e)}},ue=(e,t)=>{class n extends Array{item(e){return this[e]}}if(8&t.t){const t=e.__lookupGetter__("childNodes");Object.defineProperty(e,"children",{get(){return this.childNodes.map((e=>1===e.nodeType))}}),Object.defineProperty(e,"childElementCount",{get:()=>e.children.length}),Object.defineProperty(e,"childNodes",{get(){const e=t.call(this);if(0==(1&d.t)&&2&we(this).t){const t=new n;for(let n=0;n<e.length;n++){const l=e[n]["s-nr"];l&&t.push(l)}return t}return n.from(e)}})}},de=e=>e["s-sn"]||1===e.nodeType&&e.getAttribute("slot")||"",he=(e,t)=>{let n,l=0;for(;l<e.length;l++){if(n=e[l],n["s-sr"]&&n["s-sn"]===t)return n;if(n=he(n.childNodes,t),n)return n}return null},$e=(e,t)=>{const n=[e];for(;(e=e.nextSibling)&&e["s-sn"]===t;)n.push(e);return n},pe=(e,t={})=>{const n=[],l=t.exclude||[],o=a.customElements,s=u.head,c=s.querySelector("meta[charset]"),r=u.createElement("style"),i=[];let f,$=!0;Object.assign(d,t),d.l=new URL(t.resourcesUrl||"./",u.baseURI).href,e.map((e=>e[1].map((t=>{const s={t:t[0],h:t[1],U:t[2],F:t[3]};s.U=t[2],s.F=t[3],s.N=[],s.W={},!h&&1&s.t&&(s.t|=8);const c=s.h,r=class extends HTMLElement{constructor(e){super(e),ge(e=this,s),1&s.t&&(h?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e)),ue(e,s)}connectedCallback(){f&&(clearTimeout(f),f=null),$?i.push(this):d.jmp((()=>(e=>{if(0==(1&d.t)){const t=we(e),n=t.M,l=()=>{};if(1&t.t)m(e,t,n.F),ae(t.i);else{t.t|=1,12&n.t&&(e=>{const t=e["s-cr"]=u.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){X(t,t._=n);break}}n.U&&Object.entries(n.U).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=Oe(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(n.W=o.watchers,ie(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(r){je(r)}t.t&=-9,t.t|=128,e(),ae(t.i)}if(o.style){let e=o.style;const t=j(n);if(!Ce.has(t)){const l=()=>{};8&n.t&&(e=await __sc_import_calcite("./p-5dca96a3.js").then((n=>n.scopeCss(e,t,!1)))),((e,t,n)=>{let l=Ce.get(e);p&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,Ce.set(e,l)})(t,e,!!(1&n.t)),l()}}}const s=t._,c=()=>Y(t,!0);s&&s["s-rc"]?s["s-rc"].push(c):c()})(0,t,n)}l()}})(this)))}disconnectedCallback(){d.jmp((()=>(()=>{if(0==(1&d.t)){const e=we(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),se(t,"disconnectedCallback")}})()))}componentOnReady(){return we(this).H}};fe(r.prototype),s.q=e[0],l.includes(c)||o.get(c)||(n.push(c),o.define(c,ie(r,s,1)))})))),r.innerHTML=n+"{visibility:hidden}[calcite-hydrated]{visibility:inherit}",r.setAttribute("data-styles",""),s.insertBefore(r,c?c.nextSibling:s.firstChild),$=!1,i.length?i.map((e=>e.connectedCallback())):d.jmp((()=>f=setTimeout(oe,30)))},me=e=>{const t=new URL(e,d.l);return t.origin!==a.location.origin?t.href:t.pathname},be=new WeakMap,we=e=>be.get(e),ye=(e,t)=>be.set(t.i=e,t),ge=(e,t)=>{const n={t:0,R:e,M:t,A:new Map};return n.D=new Promise((e=>n.T=e)),n.H=new Promise((e=>n.P=e)),e["s-p"]=[],e["s-rc"]=[],m(e,n,t.F),be.set(e,n)},ve=(e,t)=>t in e,je=(e,t)=>(0,console.error)(e,t),ke=new Map,Oe=e=>{const t=e.h.replace(/-/g,"_"),n=e.q,l=ke.get(n);return l?l[t]:__sc_import_calcite(`./${n}.entry.js`).then((e=>(ke.set(n,e),e[t])),je)},Ce=new Map,Re=[],Se=[],_e=(e,t)=>n=>{e.push(n),i||(i=!0,t&&4&d.t?Ee(Me):d.raf(Me))},xe=e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){je(t)}e.length=0},Me=()=>{xe(Re),xe(Se),(i=Re.length>0)&&d.raf(Me)},Ee=e=>$().then(e),Le=_e(Se,!0);export{f as C,S as H,e as N,$ as a,pe as b,K as c,u as d,me as e,le as f,J as g,C as h,d as p,ye as r,a as w}