import{r as t,h as a,H as e,g as r}from"./p-6e5b355a.js";import{f as s,g as o}from"./p-fbd3d700.js";const i=class{constructor(a){t(this,a),this.appearance="outline",this.color="light",this.disabled=!1,this.icon="plus",this.loading=!1,this.scale="m",this.textEnabled=!1}async setFocus(){s(this.buttonEl)}render(){const{appearance:t,color:r,disabled:s,el:i,loading:c,scale:n,theme:l,textEnabled:b,icon:f,label:d,text:p}=this,m=d||!b&&p,h=o(i);return a(e,null,a("calcite-button",{appearance:t,"aria-label":d,class:"button",color:r,dir:h,disabled:s,iconStart:f,loading:c,ref:t=>{this.buttonEl=t},round:!0,scale:n,theme:l,title:m,width:"auto"},this.textEnabled?this.text:null))}get el(){return r(this)}};i.style="@-webkit-keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:transparent}calcite-button{-webkit-box-shadow:var(--calcite-shadow-2);box-shadow:var(--calcite-shadow-2)}calcite-button:hover{-webkit-box-shadow:var(--calcite-shadow-2-hover);box-shadow:var(--calcite-shadow-2-hover)}calcite-button:active{-webkit-box-shadow:var(--calcite-shadow-2-press);box-shadow:var(--calcite-shadow-2-press)}";export{i as calcite_fab}