var e=require("react"),t=require("lodash.omitby"),n=require("lodash.isnil"),a=require("react-autosuggest"),r=require("autosuggest-highlight/match"),u=require("autosuggest-highlight/parse"),o=require("@material-ui/core"),l=require("@material-ui/icons/Search"),i=require("@material-ui/icons/Cancel"),s=require("clsx"),c=require("use-debounce"),f=require("color-alpha");function d(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var g=d(e),p=d(t),m=d(n),h=d(a),b=d(r),v=d(u),C=d(l),k=d(i),y=d(s),E=d(f);function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function x(e,t){if(null==e)return{};var n,a,r={},u=Object.keys(e);for(a=0;a<u.length;a++)t.indexOf(n=u[a])>=0||(r[n]=e[n]);return r}var w=function(t){var n=t.show,a=void 0!==n&&n,r=e.useState(a),u=r[0],l=r[1];e.useEffect(function(){a?i():(i.flush(),l(!1))},[a]);var i=c.useDebouncedCallback(function(){return l(!0)},100);return g.default.createElement(o.Fade,{in:u},g.default.createElement(o.LinearProgress,{style:{position:"absolute",width:"100%"}}))},q=["ref","inputClasses"],P=["className"],I=o.makeStyles(function(e){return o.createStyles({container:{flexGrow:1,position:"relative"},suggestionsContainerOpen:{position:"absolute",zIndex:1,marginTop:e.spacing(1),left:0,right:0},suggestion:{display:"block",marginBottom:0},suggestionsList:{margin:0,padding:0,listStyleType:"none"},inputContainer:{paddingTop:e.spacing(1),paddingBottom:e.spacing(1),paddingRight:e.spacing(1),paddingLeft:e.spacing(2),backgroundColor:E.default(e.palette.background.paper,.9),overflow:"hidden","&:hover,&:active,&.inputContainerFocused":{backgroundColor:e.palette.background.paper},minHeight:"64px",display:"flex",flexDirection:"column",justifyContent:"center"},grow:{flexGrow:1},shrink:{flexShrink:1},noGrow:{flexGrow:0},noShrink:{flexShrink:0}})});module.exports=function(t){var n=t.endpoint,a=void 0===n?"https://api.mapbox.com":n,r=t.inputPlaceholder,u=void 0===r?"Search":r,l=t.showLoader,i=void 0===l||l,s=t.source,c=void 0===s?"mapbox.places":s,f=t.onSuggest,d=void 0===f?function(){}:f,E=t.focusOnMount,O=void 0!==E&&E,j=t.showInputContainer,F=void 0===j||j,T=t.inputValue,G=void 0===T?"":T,R=t.proximity,L=t.country,N=t.bbox,B=t.types,D=t.limit,U=t.autocomplete,W=t.language,V=t.suggestionsPaperProps,A=t.onSelect,H=t.accessToken,M=t.onInputFocus,_=t.onInputBlur,z=t.inputClasses,J=t.inputTextFieldProps,K=t.disableUnderline,Q=t.inputPaperProps,X=e.useState([]),Y=X[0],Z=X[1],$=e.useState(!1),ee=$[0],te=$[1],ne=e.useState(new Date),ae=ne[0],re=ne[1],ue=e.useState(G),oe=ue[0],le=ue[1],ie=e.useState(!1),se=ie[0],ce=ie[1],fe=I(),de=e.useRef(null),ge=function(t){var n=e.useRef();return e.useEffect(function(){n.current=t},[t]),n.current}(oe),pe=e.useCallback(function(){var e=(de.current||{}).input,t=void 0===e?null:e;t&&t.focus()},[]);e.useEffect(function(){le(G)},[G]),e.useEffect(function(){O&&pe()},[O,pe]),e.useEffect(function(){d&&d(Y)},[Y,d]);var me=e.useCallback(function(){le(""),pe()},[pe]),he=e.useCallback(function(e){var t=e.ref,n=e.inputClasses,a=x(e,q),r=null!=Q?Q:{},u=r.className,l=x(r,P),s=g.default.createElement(o.TextField,S({fullWidth:!0,InputProps:S({disableUnderline:K,inputRef:t,startAdornment:g.default.createElement(o.InputAdornment,{position:"start"},g.default.createElement(C.default,{color:"action"})),classes:n},a)},J));return F?g.default.createElement(g.default.Fragment,null,g.default.createElement(w,{show:ee&&i}),g.default.createElement(o.Paper,S({square:!1,elevation:1,className:y.default([fe.inputContainer,{inputContainerFocused:se},u])},l),g.default.createElement(o.Grid,{container:!0,alignItems:"center",spacing:1,wrap:"nowrap"},g.default.createElement(o.Grid,{item:!0,xs:!0,className:y.default(fe.grow,fe.noShrink)},s),g.default.createElement(o.Fade,{in:oe.length>0,unmountOnExit:!0,mountOnEnter:!0},g.default.createElement(o.Grid,{item:!0,xs:!0,className:y.default(fe.shrink,fe.noGrow)},g.default.createElement(o.IconButton,{"aria-label":"Clear Search Input",onClick:me},g.default.createElement(k.default,null))))))):g.default.createElement(g.default.Fragment,null,s)},[K,J,F,ee,i,fe,se,Q,oe.length,me]),be=e.useCallback(function(e){ce(!0),M&&M(e)},[M]),ve=e.useCallback(function(e){ce(!1),_&&_(e)},[_]),Ce=e.useCallback(function(e){var t=e.children;return g.default.createElement(o.Paper,S({},e.containerProps,{square:!1,elevation:4},V),t)},[V]),ke=e.useCallback(function(e,t,n){!e&&t&&t.features&&ae<=n&&(re(n),Z(t.features.map(function(e){return{feature:e,label:e.place_name}}).filter(function(e){return e.label})),te(!1))},[ae]),ye=e.useCallback(function(e){var t=e.value;te(!0),ge===t?te(!1):""===t?(Z([]),te(!1)):function(e,t,n,a,r,u,o,l,i,s,c,f){try{var d,g,h,b,v=new Date;Promise.resolve(function(C,k){try{var y=(d=e+"/geocoding/v5/"+t+"/"+a+".json",g=p.default({access_token:n,proximity:u&&2===Object.keys(u).length?u.longitude+","+u.latitude:null,bbox:l&&l.length>0?l.join(","):null,types:i,country:o,limit:s,autocomplete:c,language:f},m.default),h=d+"?"+(E=g,Object.keys(E).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(E[e])}).join("&")),Promise.resolve(fetch(h)).then(function(e){return b=e,Promise.resolve(b.json()).then(function(e){return r(null,e,v),{err:null,res:b,searchTime:v}})}))}catch(e){return k(e)}var E;return y&&y.then?y.then(void 0,k):y}(0,function(e){return r(e,null,v),{err:e,res:null,searchTime:v}}))}catch(e){return Promise.reject(e)}}(a,c,H,t,ke,R,L,N,B,D,U,W)},[N,L,a,D,W,U,c,R,ge,ke,B,H]),Ee=e.useCallback(function(e,t){return A&&A(t.suggestion.feature),!1},[A]),Se=e.useCallback(function(){Z([])},[]),xe=e.useCallback(function(e,t){le(t.newValue)},[]),we=e.useCallback(function(e,t){var n=t.isHighlighted,a=b.default(e.label,t.query),r=v.default(e.label,a);return g.default.createElement(o.MenuItem,{selected:n,component:"div"},g.default.createElement(o.Typography,{noWrap:!0,variant:"subtitle1"},r.map(function(e,t){return e.highlight?g.default.createElement("span",{key:String(t),style:{fontWeight:500}},e.text):g.default.createElement("strong",{key:String(t),style:{fontWeight:300}},e.text)})))},[]),qe=e.useCallback(function(e){return e.label},[]);return H?g.default.createElement(h.default,{ref:de,theme:{container:fe.container,suggestionsContainerOpen:fe.suggestionsContainerOpen,suggestionsList:fe.suggestionsList,suggestion:fe.suggestion},renderInputComponent:he,suggestions:Y,onSuggestionsFetchRequested:ye,onSuggestionsClearRequested:Se,onSuggestionSelected:Ee,renderSuggestionsContainer:Ce,getSuggestionValue:qe,renderSuggestion:we,inputProps:{placeholder:u,value:oe,onChange:xe,onFocus:be,onBlur:ve,className:z}}):null};
//# sourceMappingURL=index.js.map
