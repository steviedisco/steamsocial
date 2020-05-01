(this["webpackJsonpsteamroom-ui"]=this["webpackJsonpsteamroom-ui"]||[]).push([[0],{14:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(6),u=n.n(c),o=(n(14),n(7)),i=n(1),s=n.n(i),l=n(2),p=n(8),f={float:"left",marginRight:"20px"},m={display:"table",marginBottom:"20px"},h={display:"inline"},d={display:"table-row"};var v=function(e){var t=e.game.appID,n=e.game.name,r=e.game.logoURL,c=e.game.owned;return a.a.createElement("div",{style:m},a.a.createElement("div",{style:h},a.a.createElement("h5",{style:d},n),a.a.createElement("h5",{style:d},"x",c)),a.a.createElement("img",{key:t,src:r,alt:n,style:f}))},g=n(16),w=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="".concat(t,"_steamid"),null==(r=localStorage.getItem(n))||""===r){e.next=4;break}return e.abrupt("return",JSON.parse(r));case 4:return e.next=6,fetch("".concat("https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function","?handle=").concat(t));case 6:return a=e.sent,e.next=9,a.json();case 9:return c=e.sent,localStorage.setItem(n,JSON.stringify(c)),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="".concat(t,"_games"),null==(r=localStorage.getItem(n))||""===r){e.next=4;break}return e.abrupt("return",JSON.parse(r));case 4:return e.next=6,fetch("".concat("https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function","?steamid=").concat(t));case 6:return a=e.sent,e.next=9,a.json();case 9:return(c=e.sent)&&localStorage.setItem(n,JSON.stringify(c)),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function E(e){var t=e.libraries;if(!t||!Object.keys(t).length)return null;var n=function(e){if(!e)return null;var t=[],n=Object.keys(e);n.forEach((function(n){var r=e[n];t.push.apply(t,Object(p.a)(r))}));var r=g.uniqWith(t,g.isEqual);r.sort((function(e,t){var n=e.name.toUpperCase(),r=t.name.toUpperCase(),a=0;return n>r?a=1:n<r&&(a=-1),a})),n.forEach((function(t){var n=e[t];r.filter((function(e){return n.some((function(t){return e.appID===t.appID}))})).forEach((function(e){var t=r.filter((function(t){return t.appID===e.appID}));1===t.length&&(t[0].owned?t[0].owned++:t[0].owned=1)}))}));return r.sort((function(e,t){var n=e.owned,r=t.owned,a=0;return n<r?a=1:n>r&&(a=-1),a})),r.filter((function(e){return e.owned>1}))}(t);if(!n||!n.length)return null;var r=[];return n.forEach((function(e){r.push(a.a.createElement(v,{game:e}))})),r.length?r:null}var y=function(){var e=Object(r.useState)({}),t=Object(o.a)(e,2),n=t[0],c=t[1],u=function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=Object(l.a)(s.a.mark((function e(){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},r=new Promise((function(e,r){t.forEach(function(){var t=Object(l.a)(s.a.mark((function t(r,a,c){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w(r).then(function(){var t=Object(l.a)(s.a.mark((function t(r){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b(r).then((function(t){t&&(n[r]=t),a===c.length-1&&e()}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}())})),e.abrupt("return",r.then((function(){return n})));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=3,n().then((function(e){c(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){u(["steviedisco","delphboy","chipbarm","StealthBanana","andreas3115"])}),[]),a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"section"},n&&Object.keys(n).length?a.a.createElement(E,{libraries:n}):a.a.createElement(a.a.Fragment,null)))},x={marginBottom:"20px"};var O=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"section"},a.a.createElement("div",{className:"header"},a.a.createElement("h1",null,"Steam Room")),a.a.createElement("pre",null,a.a.createElement("code",{className:"prettyprint prettyprinted"},"Compare Steam libraries to help organise online multiplayer sessions with your friends."))),a.a.createElement("div",{className:"btn",style:x,onClick:function(e){localStorage.clear(),window.location.reload(!1)}},"Clear cache")),a.a.createElement(y,null))};u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(O,null)),document.getElementById("root"))},9:function(e,t,n){e.exports=n(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.f7e412ef.chunk.js.map