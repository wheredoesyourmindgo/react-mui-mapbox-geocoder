import e,{useRef as n,useEffect as t,useState as r,useCallback as o}from"react";import i from"lodash.omitby";import a from"lodash.isnil";import u from"react-autosuggest";import s from"autosuggest-highlight/match";import l from"autosuggest-highlight/parse";import{Fade as c,LinearProgress as p,makeStyles as g,createStyles as m,TextField as f,InputAdornment as d,Paper as h,Grid as v,IconButton as b,MenuItem as y,Typography as x}from"@material-ui/core";import C from"@material-ui/icons/Search";import E from"@material-ui/icons/Cancel";import k from"clsx";import w from"react-debounce-render";import S from"color-alpha";function P(){return(P=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function O(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n.indexOf(t=i[r])>=0||(o[t]=e[t]);return o}var j=w(function(n){var t=n.show;return e.createElement(c,{in:void 0!==t&&t},e.createElement(p,{style:{position:"absolute",width:"100%"}}))},100),I=g(function(e){return m({container:{flexGrow:1,position:"relative"},suggestionsContainerOpen:{position:"absolute",zIndex:1,marginTop:e.spacing(1),left:0,right:0},suggestion:{display:"block",marginBottom:0},suggestionsList:{margin:0,padding:0,listStyleType:"none"},inputContainer:{paddingTop:e.spacing(1),paddingBottom:e.spacing(1),paddingRight:e.spacing(1),paddingLeft:e.spacing(2),backgroundColor:S(e.palette.background.paper,.9),overflow:"hidden","&:hover,&:active,&.inputContainerFocused":{backgroundColor:e.palette.background.paper},minHeight:"64px",display:"flex",flexDirection:"column",justifyContent:"center"},grow:{flexGrow:1},shrink:{flexShrink:1},noGrow:{flexGrow:0},noShrink:{flexShrink:0}})});export default function(p){var g=p.endpoint,m=void 0===g?"https://api.mapbox.com":g,w=p.inputPlaceholder,S=void 0===w?"Search":w,F=p.showLoader,T=void 0===F||F,N=p.source,R=void 0===N?"mapbox.places":N,q=p.onSuggest,G=void 0===q?function(){}:q,L=p.focusOnMount,B=void 0!==L&&L,U=p.showInputContainer,W=void 0===U||U,D=p.inputValue,V=void 0===D?"":D,H=p.proximity,_=p.country,z=p.bbox,A=p.types,M=p.limit,J=p.autocomplete,K=p.language,Q=p.suggestionsPaperProps,X=p.onSelect,Y=p.accessToken,Z=p.onInputFocus,$=p.onInputBlur,ee=p.inputClasses,ne=p.inputTextFieldProps,te=p.disableUnderline,re=p.inputPaperProps,oe=r([]),ie=oe[0],ae=oe[1],ue=r(!1),se=ue[0],le=ue[1],ce=r(new Date),pe=ce[0],ge=ce[1],me=r(V),fe=me[0],de=me[1],he=r(!1),ve=he[0],be=he[1],ye=I(),xe=n(null),Ce=function(e){var r=n();return t(function(){r.current=e},[e]),r.current}(fe),Ee=o(function(){var e=(xe.current||{}).input,n=void 0===e?null:e;n&&n.focus()},[]);t(function(){de(V)},[V]),t(function(){B&&Ee()},[B,Ee]),t(function(){G&&G(ie)},[ie,G]);var ke=o(function(){de(""),Ee()},[Ee]),we=o(function(n){var t=n.ref,r=n.inputClasses,o=O(n,["ref","inputClasses"]),i=null!=re?re:{},a=i.className,u=O(i,["className"]),s=e.createElement(f,P({fullWidth:!0,InputProps:P({disableUnderline:te,inputRef:t,startAdornment:e.createElement(d,{position:"start"},e.createElement(C,{color:"action"})),classes:r},o)},ne));return W?e.createElement(e.Fragment,null,e.createElement(j,{show:se&&T}),e.createElement(h,P({square:!1,elevation:1,className:k([ye.inputContainer,{inputContainerFocused:ve},a])},u),e.createElement(v,{container:!0,alignItems:"center",spacing:1,wrap:"nowrap"},e.createElement(v,{item:!0,xs:!0,className:k(ye.grow,ye.noShrink)},s),e.createElement(c,{in:fe.length>0,unmountOnExit:!0,mountOnEnter:!0},e.createElement(v,{item:!0,xs:!0,className:k(ye.shrink,ye.noGrow)},e.createElement(b,{"aria-label":"Clear Search Input",onClick:ke},e.createElement(E,null))))))):e.createElement(e.Fragment,null,s)},[te,ne,W,se,T,ye,ve,re,fe.length,ke]),Se=o(function(e){be(!0),Z&&Z(e)},[Z]),Pe=o(function(e){be(!1),$&&$(e)},[$]),Oe=o(function(n){var t=n.children;return e.createElement(h,P({},n.containerProps,{square:!1,elevation:4},Q),t)},[Q]),je=o(function(e,n,t){!e&&n&&n.features&&pe<=t&&(ge(t),ae(n.features.map(function(e){return{feature:e,label:e.place_name}}).filter(function(e){return e.label})),le(!1))},[pe]),Ie=o(function(e){var n=e.value;le(!0),Ce===n?le(!1):""===n?(ae([]),le(!1)):function(e,n,t,r,o,u,s,l,c,p,g,m){try{var f,d,h,v,b=new Date;Promise.resolve(function(y,x){try{var C=(f=e+"/geocoding/v5/"+n+"/"+r+".json",d=i({access_token:t,proximity:u&&2===Object.keys(u).length?u.longitude+","+u.latitude:null,bbox:l&&l.length>0?l.join(","):null,types:c,country:s,limit:p,autocomplete:g,language:m},a),h=f+"?"+(E=d,Object.keys(E).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(E[e])}).join("&")),Promise.resolve(fetch(h)).then(function(e){return v=e,Promise.resolve(v.json()).then(function(e){return o(null,e,b),{err:null,res:v,searchTime:b}})}))}catch(e){return x(e)}var E;return C&&C.then?C.then(void 0,x):C}(0,function(e){return o(e,null,b),{err:e,res:null,searchTime:b}}))}catch(e){return Promise.reject(e)}}(m,R,Y,n,je,H,_,z,A,M,J,K)},[z,_,m,M,K,J,R,H,Ce,je,A,Y]),Fe=o(function(e,n){return X&&X(n.suggestion.feature),!1},[X]),Te=o(function(){ae([])},[]),Ne=o(function(e,n){de(n.newValue)},[]),Re=o(function(n,t){var r=t.isHighlighted,o=s(n.label,t.query),i=l(n.label,o);return e.createElement(y,{selected:r,component:"div"},e.createElement(x,{noWrap:!0,variant:"subtitle1"},i.map(function(n,t){return n.highlight?e.createElement("span",{key:String(t),style:{fontWeight:500}},n.text):e.createElement("strong",{key:String(t),style:{fontWeight:300}},n.text)})))},[]),qe=o(function(e){return e.label},[]);return Y?e.createElement(u,{ref:xe,theme:{container:ye.container,suggestionsContainerOpen:ye.suggestionsContainerOpen,suggestionsList:ye.suggestionsList,suggestion:ye.suggestion},renderInputComponent:we,suggestions:ie,onSuggestionsFetchRequested:Ie,onSuggestionsClearRequested:Te,onSuggestionSelected:Fe,renderSuggestionsContainer:Oe,getSuggestionValue:qe,renderSuggestion:Re,inputProps:{placeholder:S,value:fe,onChange:Ne,onFocus:Se,onBlur:Pe,className:ee}}):null}
//# sourceMappingURL=index.esm.js.map
