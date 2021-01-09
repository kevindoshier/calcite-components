import{r as t,c as e,h as i,H as a,g as s}from"./p-6e5b355a.js";import{n as r,g as n,e as o}from"./p-fbd3d700.js";import{g as c}from"./p-e75286c4.js";import{g as l}from"./p-a4e6e35b.js";const h=class{constructor(i){t(this,i),this.calciteTabRegister=e(this,"calciteTabRegister",7),this.active=!1,this.guid="calcite-tab-title-"+l()}render(){const t=this.el.id||this.guid;return i(a,{"aria-expanded":this.active.toString(),"aria-labelledby":this.labeledBy,id:t,role:"tabpanel"},i("section",null,i("slot",null)))}componentDidLoad(){this.calciteTabRegister.emit()}disconnectedCallback(){var t;null===(t=document.body)||void 0===t||t.dispatchEvent(new CustomEvent("calciteTabUnregister",{detail:this.el}))}tabChangeHandler(t){t.target.closest("calcite-tabs")===this.el.closest("calcite-tabs")&&(this.tab?this.active=this.tab===t.detail.tab:this.getTabIndex().then((e=>{this.active=e===t.detail.tab})))}async getTabIndex(){return Array.prototype.indexOf.call(r(this.el.parentElement.children).filter((t=>t.matches("calcite-tab"))),this.el)}async updateAriaInfo(t=[],e=[]){this.labeledBy=e[t.indexOf(this.el.id)]||null}get el(){return s(this)}};h.style="@-webkit-keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([active]) section{display:block}:host{display:none;z-index:1}:host([active]){display:block}section{height:100%;width:100%;display:none}";const f=class{constructor(i){t(this,i),this.calciteTabChange=e(this,"calciteTabChange",7),this.layout="inline",this.position="below",this.animationActiveDuration=.3,this.handleContainerScroll=()=>{this.activeIndicatorEl.style.transitionDuration="0s",this.updateOffsetPosition()}}async selectedTabChanged(){localStorage&&this.storageId&&null!=this.selectedTab&&localStorage.setItem("calcite-tab-nav-"+this.storageId,JSON.stringify(this.selectedTab)),this.calciteTabChange.emit({tab:this.selectedTab}),this.selectedTabEl=await this.getTabTitleById(this.selectedTab)}selectedTabElChanged(){this.updateOffsetPosition(),this.updateActiveWidth(),this.activeIndicatorEl.style.transitionDuration=this.animationActiveDuration+"s"}componentWillLoad(){const t="calcite-tab-nav-"+this.storageId;if(localStorage&&this.storageId&&localStorage.getItem(t)){const e=JSON.parse(localStorage.getItem(t));this.selectedTab=e,this.calciteTabChange.emit({tab:this.selectedTab})}}componentWillRender(){var t,e;this.layout=null===(t=this.el.closest("calcite-tabs"))||void 0===t?void 0:t.layout,this.position=null===(e=this.el.closest("calcite-tabs"))||void 0===e?void 0:e.position}componentDidRender(){this.tabTitles.length&&this.tabTitles.every((t=>!t.active))&&!this.selectedTab&&this.tabTitles[0].getTabIdentifier().then((t=>{this.calciteTabChange.emit({tab:t})}))}render(){const t=n(this.el),e=this.indicatorWidth+"px",s=this.indicatorOffset+"px";return i(a,{role:"tablist"},i("div",{class:"tab-nav",onScroll:this.handleContainerScroll,ref:t=>this.tabNavEl=t},i("div",{class:"tab-nav-active-indicator-container",ref:t=>this.activeIndicatorContainerEl=t},i("div",{class:"tab-nav-active-indicator",ref:t=>this.activeIndicatorEl=t,style:"rtl"!==t?{width:e,left:s}:{width:e,right:s}})),i("slot",null)))}resizeHandler(){this.activeIndicatorEl.style.transitionDuration="0s",this.updateActiveWidth(),this.updateOffsetPosition()}focusPreviousTabHandler(t){const e=this.getIndexOfTabTitle(t.target,this.enabledTabTitles);(this.enabledTabTitles[e-1]||this.enabledTabTitles[this.enabledTabTitles.length-1]).focus(),t.stopPropagation(),t.preventDefault()}focusNextTabHandler(t){const e=this.getIndexOfTabTitle(t.target,this.enabledTabTitles);(this.enabledTabTitles[e+1]||this.enabledTabTitles[0]).focus(),t.stopPropagation(),t.preventDefault()}activateTabHandler(t){this.selectedTab=t.detail.tab?t.detail.tab:this.getIndexOfTabTitle(t.target),t.stopPropagation(),t.preventDefault()}updateTabTitles(t){t.target.active&&(this.selectedTab=t.detail)}globalTabChangeHandler(t){this.syncId&&t.target!==this.el&&t.target.syncId===this.syncId&&this.selectedTab!==t.detail.tab&&(this.selectedTab=t.detail.tab)}updateOffsetPosition(){var t,e,i,a,s;const r=n(this.el),o=null===(t=this.activeIndicatorContainerEl)||void 0===t?void 0:t.offsetWidth,c=null===(e=this.selectedTabEl)||void 0===e?void 0:e.offsetLeft,l=null===(i=this.selectedTabEl)||void 0===i?void 0:i.offsetWidth;this.indicatorOffset="rtl"!==r?c-(null===(a=this.tabNavEl)||void 0===a?void 0:a.scrollLeft):o-(c+l)+(null===(s=this.tabNavEl)||void 0===s?void 0:s.scrollLeft)}updateActiveWidth(){var t;this.indicatorWidth=null===(t=this.selectedTabEl)||void 0===t?void 0:t.offsetWidth}getIndexOfTabTitle(t,e=this.tabTitles){return e.indexOf(t)}async getTabTitleById(t){return Promise.all(this.tabTitles.map((t=>t.getTabIdentifier()))).then((e=>this.tabTitles[e.indexOf(t)]))}get tabTitles(){return o(this.el,"calcite-tab-title")}get enabledTabTitles(){return o(this.el,"calcite-tab-title:not([disabled])")}get el(){return s(this)}static get watchers(){return{selectedTab:["selectedTabChanged"],selectedTabEl:["selectedTabElChanged"]}}};f.style="@-webkit-keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{z-index:2;position:relative;display:-ms-flexbox;display:flex}.tab-nav{display:-ms-flexbox;display:flex;width:100%;overflow:auto;-ms-flex-pack:start;justify-content:flex-start;-webkit-overflow-scrolling:touch;padding:4px;margin:-4px}:host([layout=center]) .tab-nav{-ms-flex-pack:center;justify-content:center}.tab-nav-active-indicator-container{width:100%;left:0;right:0;bottom:0;height:3px;position:absolute;overflow:hidden}.tab-nav-active-indicator{position:absolute;bottom:0;background:var(--calcite-ui-blue-1);display:block;height:3px;-webkit-transition:all ease-out;transition:all ease-out}:host([position=below]) .tab-nav-active-indicator{bottom:unset;top:0}:host([position=below]) .tab-nav-active-indicator-container{bottom:unset;top:0}";const d=class{constructor(i){t(this,i),this.calciteTabsActivate=e(this,"calciteTabsActivate",7),this.calciteTabsFocusNext=e(this,"calciteTabsFocusNext",7),this.calciteTabsFocusPrevious=e(this,"calciteTabsFocusPrevious",7),this.calciteTabTitleRegister=e(this,"calciteTabTitleRegister",7),this.active=!1,this.disabled=!1,this.hasText=!1,this.guid="calcite-tab-title-"+l()}connectedCallback(){this.setupTextContentObserver(),this.parentTabNavEl=this.el.closest("calcite-tab-nav")}disconnectedCallback(){var t;this.observer.disconnect(),null===(t=document.body)||void 0===t||t.dispatchEvent(new CustomEvent("calciteTabTitleUnregister",{detail:this.el}))}componentWillLoad(){this.updateHasText(),this.tab&&this.active&&this.emitActiveTab()}componentWillRender(){var t,e;this.layout=null===(t=this.el.closest("calcite-tabs"))||void 0===t?void 0:t.layout,this.position=null===(e=this.el.closest("calcite-tabs"))||void 0===e?void 0:e.position}render(){const t=n(this.el),e=this.el.id||this.guid,s=this.disabled?"span":"a",r=i("calcite-icon",{class:"calcite-tab-title--icon icon-start",dir:t,flipRtl:"start"===this.iconFlipRtl||"both"===this.iconFlipRtl,icon:this.iconStart,scale:"s"}),o=i("calcite-icon",{class:"calcite-tab-title--icon icon-end",dir:t,flipRtl:"end"===this.iconFlipRtl||"both"===this.iconFlipRtl,icon:this.iconEnd,scale:"s"});return i(a,{"aria-controls":this.controls,"aria-expanded":this.active.toString(),dir:t,hasText:this.hasText,id:e,role:"tab",tabindex:this.disabled?"-1":"0"},i(s,null,this.iconStart?r:null,i("slot",null),this.iconEnd?o:null))}async componentDidLoad(){this.calciteTabTitleRegister.emit(await this.getTabIdentifier())}tabChangeHandler(t){this.parentTabNavEl===t.target&&(this.tab?this.active=this.tab===t.detail.tab:this.getTabIndex().then((e=>{this.active=e===t.detail.tab})))}onClick(){this.emitActiveTab()}keyDownHandler(t){switch(c(t.key)){case" ":case"Enter":this.emitActiveTab(),t.preventDefault();break;case"ArrowRight":"ltr"===n(this.el)?this.calciteTabsFocusNext.emit():this.calciteTabsFocusPrevious.emit();break;case"ArrowLeft":"ltr"===n(this.el)?this.calciteTabsFocusPrevious.emit():this.calciteTabsFocusNext.emit()}}async getTabIndex(){return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"),this.el)}async getTabIdentifier(){return this.tab?this.tab:this.getTabIndex()}async updateAriaInfo(t=[],e=[]){this.controls=t[e.indexOf(this.el.id)]||null}updateHasText(){this.hasText=this.el.textContent.trim().length>0}setupTextContentObserver(){this.observer=new MutationObserver((()=>{this.updateHasText()})),this.observer.observe(this.el,{childList:!0,subtree:!0})}emitActiveTab(){this.disabled||this.calciteTabsActivate.emit({tab:this.tab})}get el(){return s(this)}};d.style="@-webkit-keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{-ms-flex:0 1 auto;flex:0 1 auto;outline:none;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host-context([dir=rtl]){margin-right:0;margin-left:1.25rem}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([layout=center]){-ms-flex-preferred-size:200px;flex-basis:200px;text-align:center;margin:0 1.25rem}:host([position=below]) a{border-bottom:0;border-top:3px solid transparent}:host a{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) a{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{text-decoration:none;color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-color:transparent}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}a,span{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:0.875rem;line-height:1.5;padding:0.75rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;-webkit-appearance:none;cursor:pointer;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;color:var(--calcite-ui-text-3);width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}span{cursor:default}.calcite-tab-title--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;line-height:inherit;-ms-flex-item-align:center;align-self:center}.calcite-tab-title--icon svg{-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([hastext]) .calcite-tab-title--icon.icon-start{margin-right:0.5rem}:host([hastext][dir=rtl]) .calcite-tab-title--icon.icon-start{margin-right:0;margin-left:0.5rem}:host([hastext]) .calcite-tab-title--icon.icon-end{margin-left:0.5rem}:host([hastext][dir=rtl]) .calcite-tab-title--icon.icon-end{margin-left:0;margin-right:0.5rem}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-right:0.5rem}:host([icon-start][icon-end][dir=rtl]) .calcite-tab-title--icon:first-child{margin-right:0;margin-left:0.5rem}";const b=class{constructor(e){t(this,e),this.layout="inline",this.position="above",this.titles=[],this.tabs=[]}render(){return i(a,null,i("slot",{name:"tab-nav"}),i("section",null,i("slot",null)))}calciteTabTitleRegister(t){this.titles=[...this.titles,t.target],this.registryHandler(),t.stopPropagation()}calciteTabTitleUnregister(t){this.titles=this.titles.filter((e=>e!==t.detail)),this.registryHandler(),t.stopPropagation()}calciteTabRegister(t){this.tabs=[...this.tabs,t.target],this.registryHandler(),t.stopPropagation()}calciteTabUnregister(t){this.tabs=this.tabs.filter((e=>e!==t.detail)),this.registryHandler(),t.stopPropagation()}async registryHandler(){let t,e;if(this.tabs.some((t=>t.tab))||this.titles.some((t=>t.tab)))t=this.tabs.sort(((t,e)=>t.tab.localeCompare(e.tab))).map((t=>t.id)),e=this.titles.sort(((t,e)=>t.tab.localeCompare(e.tab))).map((t=>t.id));else{const i=await Promise.all(this.tabs.map((t=>t.getTabIndex()))),a=await Promise.all(this.titles.map((t=>t.getTabIndex())));t=i.reduce(((t,e,i)=>(t[e]=this.tabs[i].id,t)),[]),e=a.reduce(((t,e,i)=>(t[e]=this.titles[i].id,t)),[])}this.tabs.forEach((i=>i.updateAriaInfo(t,e))),this.titles.forEach((i=>i.updateAriaInfo(t,e)))}get el(){return s(this)}};b.style="@-webkit-keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes calcite-fade-in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host([position=below]){-ms-flex-direction:column-reverse;flex-direction:column-reverse}section{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;overflow:hidden;border-top:1px solid var(--calcite-ui-border-1)}:host([position=below]) section{-ms-flex-direction:column-reverse;flex-direction:column-reverse;border-top:0;border-bottom:1px solid var(--calcite-ui-border-1)}";export{h as calcite_tab,f as calcite_tab_nav,d as calcite_tab_title,b as calcite_tabs}