(this["webpackJsonpsteamroom-ui"]=this["webpackJsonpsteamroom-ui"]||[]).push([[0],{10:function(e,t,n){e.exports=n(20)},16:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(7),u=n.n(c),s=n(9),o=n(1),i=n.n(o),l=n(2),f=n(3),p=(n(16),n(8)),m=n(17),d=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="".concat(t,"_steamid"),null==(r=localStorage.getItem(n))||""===r){e.next=4;break}return e.abrupt("return",JSON.parse(r));case 4:return e.next=6,fetch("".concat("https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function","?handle=").concat(t));case 6:return a=e.sent,e.next=9,a.json();case 9:return c=e.sent,localStorage.setItem(n,JSON.stringify(c)),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(l.a)(i.a.mark((function e(t,n){var r,a,c,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r="".concat(t,"_games"),null==(a=localStorage.getItem(r))||""===a){e.next=4;break}return e.abrupt("return",JSON.parse(a));case 4:return c=function(e){return new Promise((function(t){Object(l.a)(i.a.mark((function r(){return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,fetch("".concat("https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function","?steamid=").concat(e)).then((function(e){return e.json()})).then((function(e){t(e)})).catch((function(){alert("Game list fetch failed for ".concat(n)),t(null)}));case 2:case"end":return r.stop()}}),r)})))()}))},e.next=7,c(t);case 7:return(u=e.sent)&&localStorage.setItem(r,JSON.stringify(u)),e.abrupt("return",u);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(e){return new Promise((function(t){Object(l.a)(i.a.mark((function n(){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d(e).then(function(){var n=Object(l.a)(i.a.mark((function n(r){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,h(r,e).then((function(e){t(e)}));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());case 2:case"end":return n.stop()}}),n)})))()}))},r=function(){return new Promise((function(e){Object(l.a)(i.a.mark((function r(){var a,c,u,s;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:a={},c=0,u=i.a.mark((function r(u){var s;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s=t[u],r.next=3,Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(s);case 2:(t=e.sent)&&(a[s]=t);case 4:case"end":return e.stop()}}),e)})))();case 3:++c===t.length&&e(a);case 5:case"end":return r.stop()}}),r)})),s=0;case 4:if(!(s<t.length)){r.next=9;break}return r.delegateYield(u(s),"t0",6);case 6:s++,r.next=4;break;case 9:case"end":return r.stop()}}),r)})))()}))},e.next=4,r();case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(e){return new Promise((function(t,n){Object(l.a)(i.a.mark((function n(){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d(e).then(function(){var e=Object(l.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(n).then((function(e){t(e)})).catch((function(e){return t(null)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return t(null)}));case 2:case"end":return n.stop()}}),n)})))()}))},x=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){return new Promise((function(e){Object(l.a)(i.a.mark((function n(){var r,a,c,u;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r={},a=0,c=i.a.mark((function n(c){var u;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return u=t[c],n.next=3,Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(u);case 2:(t=e.sent)&&(r[u]=t);case 4:case"end":return e.stop()}}),e)})))();case 3:++a===t.length&&e(r);case 5:case"end":return n.stop()}}),n)})),u=0;case 4:if(!(u<t.length)){n.next=9;break}return n.delegateYield(c(u),"t0",6);case 6:u++,n.next=4;break;case 9:case"end":return n.stop()}}),n)})))()}))},e.next=3,n();case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="".concat(t,"_profile"),null==(r=localStorage.getItem(n))||""===r){e.next=4;break}return e.abrupt("return",JSON.parse(r));case 4:return a=function(e){return new Promise((function(t){Object(l.a)(i.a.mark((function n(){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat("https://8ydkm187n9.execute-api.eu-west-1.amazonaws.com/default/get_userSummary_Function","?steamid=").concat(e)).then((function(e){return e.json()})).then((function(e){t(e)})).catch((function(){console.log("User profile fetch failed"),t(null)}));case 2:case"end":return n.stop()}}),n)})))()}))},e.next=7,a(t);case 7:return(c=e.sent)&&localStorage.setItem(n,JSON.stringify(c)),e.abrupt("return",c);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k={display:"block"},O={cursor:"pointer"};var E=function(e){var t=e.handles,n=e.removeUserHandler,c=Object(r.useState)({}),u=Object(f.a)(c,2),s=u[0],o=u[1];return Object(r.useEffect)((function(){g(t).then((function(e){o(e)}))}),[t]),Object.keys(s)?a.a.createElement("div",{style:k},t.map((function(e){var t=s[e];return t?a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:k},a.a.createElement("i",{className:"inputIcon material-icons",style:O,onClick:function(){return function(e){n(e)}(e)}},"remove_circle"),a.a.createElement("input",{key:"user_".concat(t.nickname),className:"inputIcon",value:t.nickname,disabled:!0}))):a.a.createElement(a.a.Fragment,null)}))):null},j={display:"block"},S={display:"inline"},N={cursor:"pointer"};var I=function(e){var t=e.addUserHandler,n=Object(r.useState)(""),c=Object(f.a)(n,2),u=c[0],s=c[1];return a.a.createElement("div",{style:j},a.a.createElement("div",{style:S},a.a.createElement("i",{className:"inputIcon material-icons",style:N,onClick:function(e){t(u),s("")}},"add_circle"),a.a.createElement("input",{className:"inputIcon",placeholder:"Add Steam Username",value:u,onChange:function(e){s(e.target.value)}})))},_={float:"left",marginRight:"20px",marginBottom:"7px"},U={marginRight:"7px",marginBottom:"7px"},J={display:"table",marginBottom:"30px"},C={display:"inline"};var F=function(e){var t=e.game,n="img_".concat(t.appID);return a.a.createElement("div",{style:J},a.a.createElement("img",{key:n,src:t.logoURL,alt:t.name,style:_}),a.a.createElement("div",{style:C},t.users.map((function(e){return a.a.createElement("img",{key:"".concat(n,"_").concat(e.nickname),src:e.avatar.medium,alt:e.nickname,title:e.nickname,style:U,width:"29",height:"29"})}))))};function P(e){var t=e.handles,n=e.libraries,r=e.summaries;if(!n)return console.log("Libraries empty"),null;if(!Object.keys(n).length)return console.log("Libraries empty"),null;if(!r)return console.log("Summaries empty"),null;if(!Object.keys(r).length)return console.log("Summaries empty"),null;if(t.length!==Object.keys(n).length||Object.keys(n).length!==Object.keys(r).length)return null;var c=function(e,t){if(!e||!t)return null;var n=[],r=Object.keys(e);r.forEach((function(t){var r=e[t];n.push.apply(n,Object(p.a)(r))}));var a=m.uniqWith(n,m.isEqual);a.sort((function(e,t){var n=e.name.toUpperCase(),r=t.name.toUpperCase(),a=0;return n>r?a=1:n<r&&(a=-1),a})),r.forEach((function(n){var r=e[n];a.filter((function(e){return r.some((function(t){return e.appID===t.appID}))})).forEach((function(e){var r=a.filter((function(t){return t.appID===e.appID}));1===r.length&&(r[0].owned?r[0].owned++:(r[0].owned=1,r[0].users=[]),r[0].users.push(t[n]))}))}));return a.sort((function(e,t){var n=e.owned,r=t.owned,a=0;return n<r?a=1:n>r&&(a=-1),a})),a.filter((function(e){return e.owned>1}))}(n,r);if(!c||!c.length)return console.log("Games empty"),null;var u=[];return c.forEach((function(e){var t="game_".concat(e.appID);u.push(a.a.createElement(F,{key:t,game:e}))})),u.length?u:null}var D=function(e){var t=e.handles,n=Object(r.useState)({}),c=Object(f.a)(n,2),u=c[0],s=c[1],o=Object(r.useState)({}),i=Object(f.a)(o,2),l=i[0],p=i[1];return Object(r.useEffect)((function(){b(t).then((function(e){s(e)})),g(t).then((function(e){p(e)}))}),[t]),t.length<2?null:a.a.createElement("div",null,a.a.createElement("h4",null,"Matched Games"),a.a.createElement(P,{handles:t,libraries:u,summaries:l}))},B={marginTop:"20px",textAlign:"right"},H={marginBottom:"60px"},R={textAlign:"center"};var z=function(){var e=Object(r.useState)([]),t=Object(f.a)(e,2),n=t[0],c=t[1];Object(r.useEffect)((function(){var e=localStorage.getItem("handles");if(e&&""!==e){var t=JSON.parse(e);t.length&&c(t)}}),[]);var u=function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t){e.next=3;break}return alert("Please enter a Steam username"),e.abrupt("return");case 3:if(n.includes(t)){e.next=8;break}return e.next=6,Object(l.a)(i.a.mark((function e(){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(t);case 2:if(!e.sent){e.next=9;break}r=n.concat(t),localStorage.setItem("handles",JSON.stringify(r)),c(r),e.next=11;break;case 9:return alert("User not found"),e.abrupt("return");case 11:case"end":return e.stop()}}),e)})))();case 6:e.next=10;break;case 8:return alert("User already added"),e.abrupt("return");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(l.a)(i.a.mark((function e(t){var r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t){e.next=3;break}return alert("Username not provided"),e.abrupt("return");case 3:(r=n.indexOf(t))>-1?((a=n.splice(0)).splice(r,1),localStorage.setItem("handles",JSON.stringify(a)),c(a)):alert("User not found");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"section"},a.a.createElement("div",{className:"btns row themeSelector",style:B}),a.a.createElement("div",{className:"header"},a.a.createElement("h2",null,"Steam Room")),a.a.createElement("div",{className:"body"},a.a.createElement("p",{style:Object(s.a)({},R,{},H)},"Compare Steam libraries to help organise online multiplayer sessions with your friends."))),a.a.createElement("div",{className:"section"},a.a.createElement("div",{className:"body"},a.a.createElement(E,{handles:n,removeUserHandler:o}),a.a.createElement(I,{addUserHandler:u}),n.length<2?a.a.createElement(a.a.Fragment,null):a.a.createElement("div",{className:"btn",style:H,onClick:function(){localStorage.clear(),localStorage.setItem("handles",JSON.stringify(n)),window.location.reload(!1)}},"Refresh"))),a.a.createElement("div",{className:"section"},a.a.createElement("div",{className:"body"},a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(D,{handles:n}))))};u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(z,null)),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.6dc41d85.chunk.js.map