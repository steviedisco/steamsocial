(this["webpackJsonpsteamroom-ui"]=this["webpackJsonpsteamroom-ui"]||[]).push([[0],{14:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(6),o=n.n(c),u=(n(14),n(7)),i=n(1),s=n.n(i),l=n(2),f=n(8),p={float:"left",marginRight:"20px"},m={display:"table",marginBottom:"20px"},h={display:"inline"},d={display:"table-row"};var v=function(e){var t=e.game,n="img_".concat(t.appID);return a.a.createElement("div",{style:m},a.a.createElement("div",{style:h},a.a.createElement("h5",{style:d},t.name),a.a.createElement("h5",{style:d},"x",t.owned)),a.a.createElement("img",{key:n,src:t.logoURL,alt:t.name,style:p}))},w=n(16),g=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="".concat(t,"_steamid"),null==(r=localStorage.getItem(n))||""===r){e.next=4;break}return e.abrupt("return",JSON.parse(r));case 4:return e.next=6,fetch("".concat("https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function","?handle=").concat(t));case 6:return a=e.sent,e.next=9,a.json();case 9:return c=e.sent,localStorage.setItem(n,JSON.stringify(c)),e.abrupt("return",c);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(t,"_games"),r=function(e){return new Promise((function(t){Object(l.a)(s.a.mark((function n(){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat("https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function","?steamid=").concat(e)).then((function(e){return e.json()})).then((function(e){t(e)})).catch((function(e){console.log("Game list fetch failed"),t(null)}));case 2:case"end":return n.stop()}}),n)})))()}))},e.next=4,r(t);case 4:return(a=e.sent)&&localStorage.setItem(n,JSON.stringify(a)),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function y(e){var t=e.libraries;if(!t)return console.log("Libraries empty"),null;if(!Object.keys(t).length)return console.log("Libraries empty"),null;var n=function(e){if(!e)return null;var t=[],n=Object.keys(e);n.forEach((function(n){var r=e[n];t.push.apply(t,Object(f.a)(r))}));var r=w.uniqWith(t,w.isEqual);r.sort((function(e,t){var n=e.name.toUpperCase(),r=t.name.toUpperCase(),a=0;return n>r?a=1:n<r&&(a=-1),a})),n.forEach((function(t){var n=e[t];r.filter((function(e){return n.some((function(t){return e.appID===t.appID}))})).forEach((function(e){var t=r.filter((function(t){return t.appID===e.appID}));1===t.length&&(t[0].owned?t[0].owned++:t[0].owned=1)}))}));r.sort((function(e,t){var n=e.owned,r=t.owned,a=0;return n<r?a=1:n>r&&(a=-1),a}));r.filter((function(e){return e.owned>1}));return r}(t);if(!n||!n.length)return console.log("Games empty"),null;var r=[];return n.forEach((function(e){var t="game_".concat(e.appID);r.push(a.a.createElement(v,{key:t,game:e}))})),r.length?r:null}var E=function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(e){return new Promise((function(t){Object(l.a)(s.a.mark((function n(){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g(e).then(function(){var e=Object(l.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(n).then((function(e){t(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return n.stop()}}),n)})))()}))},r=function(){return new Promise((function(e){for(var r={},a=0,c=function(c){var o=t[c];Object(l.a)(s.a.mark((function c(){var u;return s.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,n(o);case 2:(u=c.sent)&&(r[o]=u),++a===t.length&&e(r);case 6:case"end":return c.stop()}}),c)})))()},o=0;o<t.length;o++)c(o)}))},e.next=4,r();case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var O=function(){var e=Object(r.useState)({}),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){x(["steviedisco","delphboy","chipbarm","StealthBanana","andreas3115"]).then((function(e){c(e)}))}),[]),a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"section"},a.a.createElement(y,{libraries:n})))},k={marginBottom:"20px"};var j=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"section"},a.a.createElement("div",{className:"header"},a.a.createElement("h1",null,"Steam Room")),a.a.createElement("pre",null,a.a.createElement("code",{className:"prettyprint prettyprinted"},"Compare Steam libraries to help organise online multiplayer sessions with your friends."))),a.a.createElement("div",{className:"btn",style:k,onClick:function(){localStorage.clear(),window.location.reload(!1)}},"Clear cache")),a.a.createElement(O,null))};o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(j,null)),document.getElementById("root"))},9:function(e,t,n){e.exports=n(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.792898de.chunk.js.map