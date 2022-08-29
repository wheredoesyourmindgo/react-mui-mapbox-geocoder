var e=require("react"),t=require("react-autosuggest"),n=require("autosuggest-highlight/match"),a=require("autosuggest-highlight/parse"),r=require("@mui/material"),u=require("@mui/icons-material/Search"),o=require("@mui/icons-material/Cancel"),l=require("use-debounce");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=/*#__PURE__*/i(e),c=/*#__PURE__*/i(t),f=/*#__PURE__*/i(n),d=/*#__PURE__*/i(a),p=/*#__PURE__*/i(u),g=/*#__PURE__*/i(o);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function h(e){return null!=e}var v=function(t){var n=t.show,a=void 0!==n&&n,u=e.useState(a),o=u[0],i=u[1],c=l.useDebouncedCallback(function(){return i(!0)},250);return e.useEffect(function(){a?c():(c.flush(),i(!1))},[c,a]),/*#__PURE__*/s.default.createElement(r.Fade,{in:o},/*#__PURE__*/s.default.createElement(r.LinearProgress,{style:{position:"absolute",width:"100%"}}))},b=["ref","inputClasses"],x=function(e){var t=m({},e);/*#__PURE__*/return s.default.createElement(r.InputBase,m({type:"search",fullWidth:!0,startAdornment:/*#__PURE__*/s.default.createElement(r.InputAdornment,{position:"start"},/*#__PURE__*/s.default.createElement(p.default,{color:"action"}))},t))},E=function(e){var t=m({},e);/*#__PURE__*/return s.default.createElement(r.TextField,m({type:"search",fullWidth:!0,InputProps:{startAdornment:/*#__PURE__*/s.default.createElement(r.InputAdornment,{position:"start"},/*#__PURE__*/s.default.createElement(p.default,{color:"action"}))}},t))};module.exports=function(t){var n=t.endpoint,a=void 0===n?"https://api.mapbox.com":n,u=t.inputPlaceholder,o=void 0===u?"Search":u,l=t.showLoader,i=void 0===l||l,p=t.source,y=void 0===p?"mapbox.places":p,C=t.onSuggest,k=void 0===C?function(){}:C,S=t.focusOnMount,P=void 0!==S&&S,I=t.showInputContainer,w=void 0===I||I,q=t.inputValue,j=void 0===q?"":q,B=t.proximity,O=t.country,T=t.bbox,_=t.types,R=t.limit,F=t.autocomplete,D=t.language,A=t.suggestionsPaperProps,W=t.onSelect,G=t.accessToken,L=t.onInputFocus,V=t.onInputBlur,z=t.inputClasses,H=t.inputProps,M=t.textFieldProps,U=t.inputPaperProps,N=e.useState([]),J=N[0],K=N[1],Q=e.useState(!1),X=Q[0],Y=Q[1],Z=e.useState(new Date),$=Z[0],ee=Z[1],te=e.useState(j),ne=te[0],ae=te[1],re=e.useState(!1),ue=re[0],oe=re[1],le=e.useRef(null),ie=function(t){var n=e.useRef();return e.useEffect(function(){n.current=t},[t]),n.current}(ne),se=e.useCallback(function(){var e=(le.current||{}).input,t=void 0===e?null:e;t&&t.focus()},[]);e.useEffect(function(){ae(j)},[j]),e.useEffect(function(){P&&se()},[P,se]),e.useEffect(function(){k&&k(J)},[J,k]);var ce=e.useCallback(function(){ae(""),se()},[se]),fe=r.useTheme(),de=e.useCallback(function(e){var t=e.ref,n=e.inputClasses,a=function(e,t){if(null==e)return{};var n,a,r={},u=Object.keys(e);for(a=0;a<u.length;a++)t.indexOf(n=u[a])>=0||(r[n]=e[n]);return r}(e,b),u=m({},null!=U?U:{}),o=/*#__PURE__*/s.default.createElement(x,m({classes:n,inputRef:t},a,H));return M&&(o=/*#__PURE__*/s.default.createElement(E,m({classes:n,inputRef:t},a,M))),w?/*#__PURE__*/s.default.createElement(s.default.Fragment,null,/*#__PURE__*/s.default.createElement(v,{show:X&&i}),/*#__PURE__*/s.default.createElement(r.Paper,m({square:!1,elevation:1,sx:{paddingTop:1,paddingBottom:1,paddingRight:1,paddingLeft:2,backgroundColor:ue?fe.palette.background.paper:r.alpha(fe.palette.background.paper,.9),overflow:"hidden","&:hover,&:active":{backgroundColor:fe.palette.background.paper},minHeight:"64px",display:"flex",flexDirection:"column",justifyContent:"center"}},u),/*#__PURE__*/s.default.createElement(r.Box,{display:"flex",flexDirection:"row",alignItems:"center"},/*#__PURE__*/s.default.createElement(r.Box,{flex:"auto",sx:{flexShrink:0,flexGrow:1}},o),/*#__PURE__*/s.default.createElement(r.Fade,{in:ne.length>0,unmountOnExit:!0,mountOnEnter:!0},/*#__PURE__*/s.default.createElement(r.Box,{flex:"auto",sx:{flexGrow:0,flexShrink:1}},/*#__PURE__*/s.default.createElement(r.IconButton,{"aria-label":"Clear Search Input",onClick:ce,size:"large"},/*#__PURE__*/s.default.createElement(g.default,null))))))):o},[H,M,w,X,i,ue,U,ne.length,ce,fe]),pe=e.useCallback(function(e){oe(!0),L&&L(e)},[L]),ge=e.useCallback(function(e){oe(!1),V&&V(e)},[V]),me=e.useCallback(function(e){var t=e.children;/*#__PURE__*/return s.default.createElement(r.Paper,m({},e.containerProps,{square:!1,elevation:4},A),t)},[A]),he=e.useCallback(function(e,t,n){!e&&t&&t.features&&$<=n&&(ee(n),K(t.features.map(function(e){return{feature:e,label:e.place_name}}).filter(function(e){return e.label})),Y(!1))},[$]),ve=e.useCallback(function(e){var t=e.value;Y(!0),ie===t?Y(!1):""===t?(K([]),Y(!1)):function(e,t,n,a,r,u,o,l,i,s,c,f){try{var d,p,g,v,b=new Date;Promise.resolve(function(x,E){try{var y=(d=e+"/geocoding/v5/"+t+"/"+a+".json",p=m({},h(n)&&{access_token:n},h(u)&&{proximity:u&&2===Object.keys(u).length?u.longitude+","+u.latitude:null},h(l)&&{bbox:l&&l.length>0?l.join(","):null},h(i)&&{types:i},h(o)&&{country:o},h(s)&&{limit:s},h(c)&&{autocomplete:c},h(f)&&{language:f}),g=d+"?"+(C=p,Object.keys(C).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(C[e])}).join("&")),Promise.resolve(fetch(g)).then(function(e){return v=e,Promise.resolve(v.json()).then(function(e){return r(null,e,b),{err:null,res:v,searchTime:b}})}))}catch(e){return E(e)}var C;return y&&y.then?y.then(void 0,E):y}(0,function(e){return r(e,null,b),{err:e,res:null,searchTime:b}}))}catch(e){return Promise.reject(e)}}(a,y,G,t,he,B,O,T,_,R,F,D)},[T,O,a,R,D,F,y,B,ie,he,_,G]),be=e.useCallback(function(e,t){return W&&W(t.suggestion.feature),!1},[W]),xe=e.useCallback(function(){K([])},[]),Ee=e.useCallback(function(e,t){ae(t.newValue)},[]),ye=e.useCallback(function(e,t){var n=t.isHighlighted,a=f.default(e.label,t.query),u=d.default(e.label,a);/*#__PURE__*/return s.default.createElement(r.MenuItem,{selected:n,component:"div"},/*#__PURE__*/s.default.createElement(r.Typography,{noWrap:!0,variant:"subtitle1"},u.map(function(e,t){/*#__PURE__*/return s.default.createElement(r.Typography,{key:t,component:"span",variant:"inherit",sx:{fontWeight:e.highlight?500:300}},e.text)})))},[]),Ce=e.useCallback(function(e){return e.label},[]);return G?/*#__PURE__*/s.default.createElement(r.Box,{sx:{"& .react-autosuggest__container":{flexGrow:1,position:"relative"},"& .react-autosuggest__suggestions-container--open":{position:"absolute",zIndex:1,marginTop:1,left:0,right:0},"& .react-autosuggest__suggestions-list":{margin:0,padding:0,listStyleType:"none"},"& .react-autosuggest__suggestion":{display:"block",marginBottom:0}}},/*#__PURE__*/s.default.createElement(c.default,{ref:le,renderInputComponent:de,suggestions:J,onSuggestionsFetchRequested:ve,onSuggestionsClearRequested:xe,onSuggestionSelected:be,renderSuggestionsContainer:me,getSuggestionValue:Ce,renderSuggestion:ye,inputProps:{placeholder:o,value:ne,onChange:Ee,onFocus:pe,onBlur:ge,className:z}})):null};
//# sourceMappingURL=index.js.map
