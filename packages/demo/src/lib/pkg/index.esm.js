import e,{useRef as t,useEffect as n,useState as r,useCallback as o}from"react";import i from"react-autosuggest";import a from"autosuggest-highlight/match";import u from"autosuggest-highlight/parse";import{Fade as l,LinearProgress as c,useTheme as s,Paper as p,alpha as g,Grid as m,IconButton as f,MenuItem as d,Typography as h,Box as v,InputBase as b,InputAdornment as x}from"@mui/material";import y from"@mui/icons-material/Search";import E from"@mui/icons-material/Cancel";import{useDebouncedCallback as C}from"use-debounce";function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function w(e){return null!=e}var S=function(t){var o=t.show,i=void 0!==o&&o,a=r(i),u=a[0],s=a[1],p=C(function(){return s(!0)},250);return n(function(){i?p():(p.flush(),s(!1))},[p,i]),e.createElement(l,{in:u},e.createElement(c,{style:{position:"absolute",width:"100%"}}))},P=["ref","inputClasses"],j=function(t){var n=k({},t);return e.createElement(b,k({type:"search",fullWidth:!0,startAdornment:e.createElement(x,{position:"start"},e.createElement(y,{color:"action"}))},n))};export default function(c){var b=c.endpoint,x=void 0===b?"https://api.mapbox.com":b,y=c.inputPlaceholder,C=void 0===y?"Search":y,O=c.showLoader,_=void 0===O||O,I=c.source,R=void 0===I?"mapbox.places":I,T=c.onSuggest,q=void 0===T?function(){}:T,B=c.focusOnMount,F=void 0!==B&&B,D=c.showInputContainer,G=void 0===D||D,V=c.inputValue,W=void 0===V?"":V,z=c.proximity,H=c.country,L=c.bbox,U=c.types,A=c.limit,M=c.autocomplete,N=c.language,J=c.suggestionsPaperProps,K=c.onSelect,Q=c.accessToken,X=c.onInputFocus,Y=c.onInputBlur,Z=c.inputClasses,$=c.inputProps,ee=c.inputPaperProps,te=r([]),ne=te[0],re=te[1],oe=r(!1),ie=oe[0],ae=oe[1],ue=r(new Date),le=ue[0],ce=ue[1],se=r(W),pe=se[0],ge=se[1],me=r(!1),fe=me[0],de=me[1],he=t(null),ve=function(e){var r=t();return n(function(){r.current=e},[e]),r.current}(pe),be=o(function(){var e=(he.current||{}).input,t=void 0===e?null:e;t&&t.focus()},[]);n(function(){ge(W)},[W]),n(function(){F&&be()},[F,be]),n(function(){q&&q(ne)},[ne,q]);var xe=o(function(){ge(""),be()},[be]),ye=s(),Ee=o(function(t){var n=t.ref,r=t.inputClasses,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}(t,P),i=k({},null!=ee?ee:{}),a=e.createElement(j,k({classes:r,inputRef:n},o,$));return G?e.createElement(e.Fragment,null,e.createElement(S,{show:ie&&_}),e.createElement(p,k({square:!1,elevation:1,sx:{paddingTop:1,paddingBottom:1,paddingRight:1,paddingLeft:2,backgroundColor:fe?ye.palette.background.paper:g(ye.palette.background.paper,.9),overflow:"hidden","&:hover,&:active":{backgroundColor:ye.palette.background.paper},minHeight:"64px",display:"flex",flexDirection:"column",justifyContent:"center"}},i),e.createElement(m,{container:!0,alignItems:"center",spacing:1,wrap:"nowrap"},e.createElement(m,{item:!0,xs:!0,sx:{flexShrink:0,flexGrow:1}},a),e.createElement(l,{in:pe.length>0,unmountOnExit:!0,mountOnEnter:!0},e.createElement(m,{item:!0,xs:!0,sx:{flexGrow:0,flexShrink:1}},e.createElement(f,{"aria-label":"Clear Search Input",onClick:xe,size:"large"},e.createElement(E,null))))))):a},[$,G,ie,_,fe,ee,pe.length,xe,ye]),Ce=o(function(e){de(!0),X&&X(e)},[X]),ke=o(function(e){de(!1),Y&&Y(e)},[Y]),we=o(function(t){var n=t.children;return e.createElement(p,k({},t.containerProps,{square:!1,elevation:4},J),n)},[J]),Se=o(function(e,t,n){!e&&t&&t.features&&le<=n&&(ce(n),re(t.features.map(function(e){return{feature:e,label:e.place_name}}).filter(function(e){return e.label})),ae(!1))},[le]),Pe=o(function(e){var t=e.value;ae(!0),ve===t?ae(!1):""===t?(re([]),ae(!1)):function(e,t,n,r,o,i,a,u,l,c,s,p){try{var g,m,f,d,h=new Date;Promise.resolve(function(v,b){try{var x=(g=e+"/geocoding/v5/"+t+"/"+r+".json",m=k({},w(n)&&{access_token:n},w(i)&&{proximity:i&&2===Object.keys(i).length?i.longitude+","+i.latitude:null},w(u)&&{bbox:u&&u.length>0?u.join(","):null},w(l)&&{types:l},w(a)&&{country:a},w(c)&&{limit:c},w(s)&&{autocomplete:s},w(p)&&{language:p}),f=g+"?"+(y=m,Object.keys(y).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(y[e])}).join("&")),Promise.resolve(fetch(f)).then(function(e){return d=e,Promise.resolve(d.json()).then(function(e){return o(null,e,h),{err:null,res:d,searchTime:h}})}))}catch(e){return b(e)}var y;return x&&x.then?x.then(void 0,b):x}(0,function(e){return o(e,null,h),{err:e,res:null,searchTime:h}}))}catch(e){return Promise.reject(e)}}(x,R,Q,t,Se,z,H,L,U,A,M,N)},[L,H,x,A,N,M,R,z,ve,Se,U,Q]),je=o(function(e,t){return K&&K(t.suggestion.feature),!1},[K]),Oe=o(function(){re([])},[]),_e=o(function(e,t){ge(t.newValue)},[]),Ie=o(function(t,n){var r=n.isHighlighted,o=a(t.label,n.query),i=u(t.label,o);return e.createElement(d,{selected:r,component:"div"},e.createElement(h,{noWrap:!0,variant:"subtitle1"},i.map(function(t,n){return e.createElement(h,{key:n,component:"span",variant:"inherit",sx:{fontWeight:t.highlight?500:300}},t.text)})))},[]),Re=o(function(e){return e.label},[]);return Q?e.createElement(v,{sx:{"& .react-autosuggest__container":{flexGrow:1,position:"relative"},"& .react-autosuggest__suggestions-container--open":{position:"absolute",zIndex:1,marginTop:1,left:0,right:0},"& .react-autosuggest__suggestions-list":{margin:0,padding:0,listStyleType:"none"},"& .react-autosuggest__suggestion":{display:"block",marginBottom:0}}},e.createElement(i,{ref:he,renderInputComponent:Ee,suggestions:ne,onSuggestionsFetchRequested:Pe,onSuggestionsClearRequested:Oe,onSuggestionSelected:je,renderSuggestionsContainer:we,getSuggestionValue:Re,renderSuggestion:Ie,inputProps:{placeholder:C,value:pe,onChange:_e,onFocus:Ce,onBlur:ke,className:Z}})):null}
//# sourceMappingURL=index.esm.js.map
