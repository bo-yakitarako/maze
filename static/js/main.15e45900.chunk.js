(this.webpackJsonpmaze=this.webpackJsonpmaze||[]).push([[0],{92:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(13),c=n.n(a),i=n(19),o=n(9),s=n(7),l=n(133),u=i.d,b=n(8),j=n(17),f=n(20),O=n(38),d=[[0,-1],[1,0],[0,1],[-1,0]],m=function(e,t){for(var n=t[Math.floor(Math.random()*t.length)],r=h(e,n);r.length>0;){var a=r[Math.floor(Math.random()*r.length)],c=a.pre,i=a.next;e[c[1]][c[0]]=e[i[1]][i[0]]=!0,t=[].concat(Object(f.a)(t),[i]),r=h(e,i)}return t.filter((function(t){return 0!==h(e,t).length}))},h=function(e,t){var n=Object(b.a)(t,2),r=n[0],a=n[1];return d.filter((function(t){var n=Object(b.a)(t,2),c=n[0],i=n[1];return p(e,[r+c,a+i],[r,a])})).map((function(e){var t=Object(b.a)(e,2),n=t[0],c=t[1];return{pre:[r+n,a+c],next:[r+2*n,a+2*c]}}))},p=function(e,t,n){return!t.some((function(t){return t<=0||t>=e.length-1}))&&[].concat(d,[[0,0]]).every((function(r){var a=Object(b.a)(r,2),c=a[0],i=a[1],o=t[0]+c,s=t[1]+i;return o===n[0]&&s===n[1]||!e[s][o]}))},v=function e(t,n){for(var r=Object(f.a)(n),a=x(t,r);1===a.length;)r=[].concat(Object(f.a)(r),[a[0]]),a=x(t,r);var c={reach:r,longest:r};return a.reduce((function(n,a){var c=[].concat(Object(f.a)(r),[a]),i=e(t,c);return{reach:0===Object(b.a)(i.reach[i.reach.length-1],2)[1]?i.reach:n.reach,longest:n.longest.length<i.longest.length?i.longest:n.longest}}),c)},x=function(e,t){var n=Object(f.a)(t).reverse(),r=Object(b.a)(n,2),a=Object(b.a)(r[0],2),c=a[0],i=a[1],o=Object(b.a)(r[1],2),s=o[0],l=o[1];return d.map((function(e){var t=Object(b.a)(e,2),n=t[0],r=t[1];return[c+n,i+r]})).filter((function(t){var n=Object(b.a)(t,2),r=n[0],a=n[1];return a>=0&&e[a][r]&&!(r===s&&a===l)}))},g=n(41),w=function(e){switch(e){case"up":return[0,-1];case"down":return[0,1];case"left":return[-1,0];case"right":return[1,0];default:return[0,0]}},y=localStorage.mode||"reach",z=1*localStorage.size||20,S=JSON.parse(localStorage.bestTime||"{}");Object.keys(S).includes("reach")||(S={reach:S,longest:{}});var k,T,A,C,L,M,D,P,E,I,N,U,R,F,W,J,Y,B,q,G,H,K,Q,V,X,Z,$,_,ee,te={mode:y,mazeSize:z,mazeArray:Object(f.a)(Array(z+3)).map((function(){return Object(f.a)(Array(z+3)).map((function(){return!0}))})),answer:[[1,1]],playerLocation:[1,z+2],start:!1,pause:!0,timer:{time:0,startUnixtime:(new Date).getTime(),pausedUnixtime:0,pauseInterval:0,intervalNumber:0},showAnswer:!1,bestTime:S},ne=Object(O.c)({name:"maze",initialState:te,reducers:{setMode:function(e,t){var n=t.payload;return localStorage.mode=n,Object(j.a)(Object(j.a)({},e),{},{mode:n})},setMazeSize:function(e,t){var n=t.payload;return localStorage.size=n,Object(j.a)(Object(j.a)({},e),{},{mazeSize:n})},generateMaze:function(e){var t=function(e,t){var n=e+3,r=Object(f.a)(Array(n)).map((function(){return Object(f.a)(Array(n)).map((function(){return!1}))}));r[n-1][1]=r[n-2][1]=!0;for(var a=[[1,n-2]];a.length>0;)a=m(r,a);return"reach"===t&&(r[0][n-2]=!0),r}(e.mazeSize,e.mode),n=function(e){var t=[[1,e.length-1],[1,e.length-2]];return v(e,t)}(t)[e.mode];return e.timer.intervalNumber>0&&clearInterval(e.timer.intervalNumber),Object(j.a)(Object(j.a)({},e),{},{mazeArray:t,answer:n,playerLocation:[1,e.mazeSize+2],start:!1,pause:!1,timer:Object(j.a)(Object(j.a)({},e.timer),{},{time:0,intervalNumber:0,pauseInterval:0,pausedUnixtime:0}),showAnswer:!1})},move:function(e,t){!function(e,t){var n=e.mazeArray,r=e.answer,a=e.playerLocation,c=e.start;if(!e.pause){var i=Object(b.a)(a,2),o=i[0],s=i[1],l=w(t),u=Object(b.a)(l,2),f=o+u[0],O=s+u[1];if(1!==o||s!==n.length-1||c||(e.start=!0,e.timer.startUnixtime=(new Date).getTime()),!(f<0||f>n.length-1||O<0||O>n.length-1)&&n[O][f]){e.playerLocation=[f,O];var d=Object(b.a)(r[r.length-1],2),m=d[0],h=d[1];if(f===m&&O===h){e.pause=!0,clearInterval(e.timer.intervalNumber),e.timer.intervalNumber=0;var p=e.bestTime[e.mode][e.mazeSize];("undefined"===typeof p||e.timer.time<p)&&(e.bestTime=Object(j.a)(Object(j.a)({},e.bestTime),{},Object(g.a)({},e.mode,Object(j.a)(Object(j.a)({},e.bestTime[e.mode]),{},Object(g.a)({},e.mazeSize,e.timer.time)))),localStorage.bestTime=JSON.stringify(e.bestTime))}}}}(e,t.payload)},pauseMaze:function(e){e.pause||(e.pause=!0,clearInterval(e.timer.intervalNumber),e.timer.intervalNumber=0,e.timer.pausedUnixtime=(new Date).getTime())},restartMaze:function(e){var t=e.playerLocation,n=e.answer,r=Object(b.a)(n[n.length-1],2),a=r[0],c=r[1];if(t[0]!==a||t[1]!==c){e.pause=!1;var i=e.timer.pausedUnixtime;e.timer.pauseInterval+=(new Date).getTime()-i,e.timer.pausedUnixtime=0}},tick:function(e){var t=e.timer,n=t.pauseInterval,r=t.startUnixtime,a=(new Date).getTime()-r-n;e.timer.time=a},setIntevalNumber:function(e,t){var n=t.payload;e.timer.intervalNumber=n},displayAnswer:function(e){return Object(j.a)(Object(j.a)({},e),{},{showAnswer:!0,pause:!0})}}}),re=Object(O.a)({middleware:Object(f.a)(Object(O.d)()),reducer:ne.reducer}),ae=n(62),ce=1440,ie=1170,oe=768,se=450,le=360,ue=Object(ae.a)({huge:"".concat(ce,"px"),large:"".concat(ie,"px"),medium:"".concat(oe,"px"),small:"".concat(se,"px"),tiny:"".concat(le,"px")}),be=function(){var e=Object(r.useState)(window.innerWidth),t=Object(b.a)(e,2),n=t[0],a=t[1],c=Object(r.useRef)(null);Object(r.useEffect)((function(){return window.addEventListener("resize",i),function(){window.removeEventListener("resize",i)}}),[]);var i=function(){c.current&&clearTimeout(c.current),c.current=window.setTimeout((function(){a(window.innerWidth)}),300)};return{windowWidth:n,isPc:function(){return n>oe},isTablet:function(){return se<n&&n<oe},isSp:function(){return n<se},isSpSmall:function(){return n<le}}},je=function(e){return Object(i.d)(e,i.b)},fe=function(e,t){var n=Oe(t);return Math.floor(n/e)},Oe=function(e){return e<se?.9*e:e<oe?.75*e:600},de=function(e,t,n,r,a,c,i){var o=Object(b.a)(r,2),s=o[0],l=o[1];if(null!==e){var u=fe(t.length,a),j=e.getContext("2d"),f=function(e,t){j.fillRect(e*u,t*u,u,u)};if(c){j.fillStyle="black",j.fillRect(0,0,e.width,e.height),j.fillStyle="white";var O=function(e){j.fillStyle=1===s&&l===e?"cyan":"white",f(1,e)};return O(t.length-1),void O(t.length-2)}j.fillStyle="black",j.fillRect(0,0,e.width,e.height),j.fillStyle="white",t.forEach((function(e,t){e.forEach((function(e,n){e&&f(n,t)}))}));var d=Object(b.a)(n[n.length-1],2),m=d[0],h=d[1];i?(j.fillStyle="#d4fccc",n.slice(0,n.length-1).forEach((function(e){var t=Object(b.a)(e,2),n=t[0],r=t[1];return f(n,r)})),j.fillStyle="#ff5c5c",f(m,h)):(j.fillStyle="#ff5c5c",f(m,h),j.fillStyle="cyan",f(s,l))}},me=n(54),he=n.n(me),pe=n(66),ve=ne.actions,xe=ve.tick,ge=ve.setIntevalNumber,we=Object(O.b)("startTick",function(){var e=Object(pe.a)(he.a.mark((function e(t,n){var r,a,c,i,o,s,l,u,j,f,O,d,m,h,p;return he.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.dispatch,a=n.getState,c=a(),i=c.answer,o=c.timer,s=c.playerLocation,l=c.pause,u=c.showAnswer,j=Object(b.a)(i[i.length-1],2),f=j[0],O=j[1],d=Object(b.a)(s,2),m=d[0],h=d[1],!(l||o.intervalNumber>0||m===f&&h===O||u)){e.next=6;break}return e.abrupt("return");case 6:p=window.setInterval((function(){r(xe())}),30),r(ge(p));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),ye=ne.actions.move,ze=function(){var e=Object(i.c)(),t=Object(r.useState)(null),n=Object(b.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(0),s=Object(b.a)(o,2),l=s[0],u=s[1];return Object(r.useEffect)((function(){var t=setInterval((function(){u((function(e){return null!==a?e+50:e})),null===a||l<150||e(ye(a))}),50);return function(){clearInterval(t)}}),[a,l]),{go:Object(r.useCallback)((function(t){e(ye(t)),e(we()),c(t),u(0)}),[]),stop:Object(r.useCallback)((function(){c(null)}),[])}},Se={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"},ke=n(130),Te=n(135),Ae=n(125),Ce=n(126),Le=n(127),Me=n(136),De=n(128),Pe=n(129),Ee=n(132),Ie=n(131),Ne=n(4),Ue=function(e){var t=e.open,n=e.handleThisDialog,a=e.handleSettingDialog,c=Object(r.useCallback)((function(){n(!1),a(!0)}),[]);return Object(Ne.jsxs)(Te.a,{open:t,onClose:c,children:[Object(Ne.jsx)(Ae.a,{children:"\u30e2\u30fc\u30c9\u3092\u8aac\u660e\u3059\u308b\u3088"}),Object(Ne.jsxs)(Ce.a,{children:[Object(Ne.jsxs)(Le.a,{children:[Object(Ne.jsx)(Re,{children:"\u5230\u9054\u30e2\u30fc\u30c9"}),Object(Ne.jsx)("br",{}),Object(Ne.jsx)("span",{children:"\u30b4\u30fc\u30eb\u304c\u53f3\u4e0a\u306b\u56fa\u5b9a\u3055\u308c\u3066\u3044\u308b\u3088\u3002\u8131\u51fa\u7684\u306a\u611f\u3058\u3060\u306d"})]}),Object(Ne.jsxs)(Le.a,{children:[Object(Ne.jsx)(Re,{children:"\u6700\u9577\u30e2\u30fc\u30c9"}),Object(Ne.jsx)("br",{}),Object(Ne.jsx)("span",{children:"\u30b4\u30fc\u30eb\u306e\u7f6e\u3044\u3066\u3042\u308b\u4f4d\u7f6e\u304c\u3001\u30b9\u30bf\u30fc\u30c8\u304b\u3089\u6700\u3082\u9060\u3044\u5730\u70b9\u306b\u306a\u3063\u3066\u3044\u308b\u3088\u3002\u306a\u304c\u3044\u3088\u30fc"})]})]}),Object(Ne.jsx)(De.a,{children:Object(Ne.jsx)(Pe.a,{onClick:c,color:"primary",children:"\u9589\u3058\u308b"})})]})},Re=s.b.span(k||(k=Object(o.a)(["\n  font-size: 20px;\n  font-weight: 700;\n"]))),Fe=ne.actions,We=Fe.setMode,Je=Fe.setMazeSize,Ye=Fe.generateMaze,Be=Fe.pauseMaze,qe=Fe.restartMaze,Ge=Fe.displayAnswer,He={reach:"\u5230\u9054\u30e2\u30fc\u30c9",longest:"\u6700\u9577\u30e2\u30fc\u30c9"},Ke=function(){var e=Object(i.c)(),t=u((function(e){var t=e.mode,n=e.mazeSize,r=e.start,a=e.bestTime,c=e.showAnswer;return{mode:t,modes:Object.keys(a),mazeSize:n,start:r,showAnswer:c}})),n=t.mode,a=t.modes,c=t.mazeSize,o=t.start,s=t.showAnswer,l=Object(r.useState)(n),j=Object(b.a)(l,2),f=j[0],O=j[1],d=Object(r.useState)(c),m=Object(b.a)(d,2),h=m[0],p=m[1],v=Object(r.useState)(!1),x=Object(b.a)(v,2),g=x[0],w=x[1],y=Object(r.useState)(!1),z=Object(b.a)(y,2),S=z[0],k=z[1],T=Object(r.useCallback)((function(){w(!0),o&&e(Be())}),[o]),A=Object(r.useCallback)((function(){w(!1),o&&(e(qe()),e(we()))}),[o]),C=Object(r.useCallback)((function(){w(!1),k(!0)}),[]),L=Object(r.useCallback)((function(e){var t=e.target.value;O(t)}),[]),M=Object(r.useCallback)((function(e){var t=parseInt(e.target.value,10);p(t)}),[]),D=Object(r.useCallback)((function(){e(We(f)),e(Je(h)),e(Ye()),w(!1)}),[f,h]),P=Object(r.useCallback)((function(){e(Ge()),w(!1)}),[]);return Object(Ne.jsxs)(Qe,{children:[Object(Ne.jsx)(ke.a,{color:"primary",onClick:T,children:Object(Ne.jsx)(Ie.a,{})}),Object(Ne.jsxs)(Te.a,{open:g,onClose:A,children:[Object(Ne.jsx)(Ae.a,{children:"\u8ff7\u8def\u3060\u3088"}),Object(Ne.jsxs)(Ce.a,{children:[Object(Ne.jsx)(Le.a,{children:"PC\u306e\u5834\u5408\u306f\u5341\u5b57\u30ad\u30fc\u3067\u3001\u30b9\u30de\u30db\u306e\u5834\u5408\u306f\u753b\u9762\u4e0b\u90e8\u306e\u30b3\u30f3\u30c8\u30ed\u30fc\u30e9\u30fc\u3067\u64cd\u4f5c\u3067\u304d\u308b\u3088\u3002\u305f\u3076\u3093\u306d"}),Object(Ne.jsx)(Le.a,{children:"\u8ff7\u8def\u3092\u4f5c\u308a\u76f4\u3057\u305f\u308a\u3001\u8ff7\u8def\u306e\u5927\u304d\u3055\u3092\u5909\u3048\u305f\u3044\u5834\u5408\u306f\u597d\u304d\u306a\u30b5\u30a4\u30ba\u3092\u9078\u3093\u3067\u300c\u518d\u751f\u6210\u300d\u3092\u62bc\u305d\u3046\u306d"}),Object(Ne.jsx)(Le.a,{color:"primary",children:Object(Ne.jsx)(Ve,{onClick:C,children:"\u30e2\u30fc\u30c9\u306b\u3064\u3044\u3066"})}),Object(Ne.jsxs)(Xe,{children:[Object(Ne.jsx)(Ze,{select:!0,label:"\u30e2\u30fc\u30c9",value:f,variant:"outlined",onChange:L,children:a.map((function(e){return Object(Ne.jsx)(Me.a,{value:"".concat(e),children:He[e]},e)}))}),Object(Ne.jsx)(Ze,{select:!0,label:"\u8ff7\u8def\u306e\u5927\u304d\u3055",value:"".concat(h),variant:"outlined",onChange:M,children:[10,20,30,40,50].map((function(e){return Object(Ne.jsx)(Me.a,{value:"".concat(e),children:e},e)}))})]})]}),Object(Ne.jsxs)(De.a,{children:[!s&&Object(Ne.jsx)(Pe.a,{onClick:P,color:"primary",children:"\u7b54\u3048\u3092\u898b\u308b"}),Object(Ne.jsx)(Pe.a,{onClick:D,color:"primary",children:"\u518d\u751f\u6210"}),Object(Ne.jsx)(Pe.a,{onClick:A,color:"primary",children:"\u9589\u3058\u308b"})]})]}),Object(Ne.jsx)(Ue,{open:S,handleThisDialog:k,handleSettingDialog:w})]})},Qe=s.b.div(T||(T=Object(o.a)(["\n  position: absolute;\n  right: 8px;\n  bottom: -60px;\n"]))),Ve=s.b.span(A||(A=Object(o.a)(["\n  &:hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]))),Xe=s.b.div(C||(C=Object(o.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20px;\n"]))),Ze=Object(s.b)(Ee.a)(L||(L=Object(o.a)(["\n  width: 200px;\n  margin-bottom: 16px;\n"]))),$e=function(){var e=u((function(e){return e.mazeArray.length})),t=Object(r.useRef)(null),n=function(e,t){return fe(e,t)*e}(e,be().windowWidth);return function(e){var t=Object(i.c)(),n=je((function(e){return{mazeArray:e.mazeArray,answer:e.answer,playerLocation:e.playerLocation,start:e.start,pause:e.pause,showAnswer:e.showAnswer}})),a=n.mazeArray,c=n.answer,o=n.playerLocation,s=n.start,l=n.pause,u=n.showAnswer,b=be().windowWidth;Object(r.useEffect)((function(){t(ne.actions.generateMaze())}),[]),Object(r.useEffect)((function(){var t=c[c.length-1],n=o[0]===t[0]&&o[1]===t[1];de(e,a,c,o,b,!n&&!u&&(!s||l),u)}),[e,a,o,b,s,l,u])}(t.current),function(){var e=ze(),t=e.go,n=e.stop;Object(r.useEffect)((function(){return document.addEventListener("keydown",a),document.addEventListener("keyup",c),function(){document.removeEventListener("keydown",a),document.removeEventListener("keyup",c)}}),[]);var a=function(e){var n=e.key;Object.keys(Se).includes(n)&&(e.preventDefault(),t(Se[n]))},c=function(e){Object.keys(Se).includes(e.key)&&(e.preventDefault(),n())}}(),Object(Ne.jsxs)(_e,{children:[Object(Ne.jsx)("canvas",{ref:t,width:n,height:n}),Object(Ne.jsx)(Ke,{})]})},_e=s.b.div(M||(M=Object(o.a)(["\n  position: relative;\n"]))),et=function(){var e=ze(),t=e.go,n=e.stop,r=function(e){return function(n){n.preventDefault(),t(e)}};return Object(Ne.jsxs)(tt,{children:[Object(Ne.jsx)(nt,{children:Object(Ne.jsx)("div",{onPointerDown:r("up"),onPointerLeave:n,onPointerUp:n,children:Object(Ne.jsx)(rt,{})})}),Object(Ne.jsxs)(ct,{children:[Object(Ne.jsx)("div",{onPointerDown:r("left"),onPointerLeave:n,onPointerUp:n,children:Object(Ne.jsx)(it,{})}),Object(Ne.jsx)("div",{onPointerDown:r("down"),onPointerLeave:n,onPointerUp:n,children:Object(Ne.jsx)(at,{})}),Object(Ne.jsx)("div",{onPointerDown:r("right"),onPointerLeave:n,onPointerUp:n,children:Object(Ne.jsx)(ot,{})})]})]})},tt=s.b.div(D||(D=Object(o.a)(["\n  width: 100%;\n  margin-top: 15px;\n  ","\n"])),ue.greaterThan("medium")(P||(P=Object(o.a)(["\n    display: none;\n  "])))),nt=s.b.div(E||(E=Object(o.a)(["\n  display: flex;\n  justify-content: center;\n"]))),rt=s.b.div(I||(I=Object(o.a)(["\n  width: 70px;\n  height: 90px;\n  background-color: ",";\n  clip-path: polygon(\n    100% 50%,\n    70% 40%,\n    70% 100%,\n    30% 100%,\n    30% 40%,\n    0 50%,\n    50% 0\n  );\n  ","\n"])),"#d2e3f5",ue.lessThan("tiny")(N||(N=Object(o.a)(["\n    width: 55px;\n    height: 70px;\n  "])))),at=Object(s.b)(rt)(U||(U=Object(o.a)(["\n  transform: rotate(180deg);\n"]))),ct=s.b.div(R||(R=Object(o.a)(["\n  display: flex;\n  width: 270px;\n  height: 90px;\n  justify-content: space-between;\n  margin: 10px auto 0 auto;\n  ","\n"])),ue.lessThan("tiny")(F||(F=Object(o.a)(["\n    width: 200px;\n    height: 70px;\n  "])))),it=Object(s.b)(rt)(W||(W=Object(o.a)(["\n  transform: rotate(-90deg);\n"]))),ot=Object(s.b)(rt)(J||(J=Object(o.a)(["\n  transform: rotate(90deg);\n"]))),st=n(72),lt=function(e){var t=e.label,n=e.time,a=e.best,c=e.difference,i=Object(r.useMemo)((function(){return ut(Math.abs(n))}),[n]),o=Object(r.useMemo)((function(){return c?n<=0?"initial":"error":a?"primary":"initial"}),[n,a,c]),s=Object(r.useMemo)((function(){return c&&0!==n?n<0?"-":"+":""}),[n,c]);return Object(Ne.jsxs)(bt,{normal:!a&&!c,children:[Object(Ne.jsx)(jt,{children:t}),Object(Ne.jsx)(ft,{minus:n<0?"true":"false",color:o,children:"".concat(s).concat(i)})]})},ut=function(e){var t=e%1e3,n=Math.floor(t/10),r=(e-t)/1e3,a=Math.floor(r/60);if(a>99)return"99:59:99";var c=r-60*a,i=function(e){return"00".concat(e).slice(-2)};return"".concat(i(a),":").concat(i(c),":").concat(i(n))},bt=s.b.div(Y||(Y=Object(o.a)(["\n  margin: ",";\n"])),(function(e){return e.normal?"0 20px":"0"})),jt=Object(s.b)(st.a)(B||(B=Object(o.a)(["\n  color: #757575;\n  font-size: 15px;\n  transform: translateY(12px);\n  ","\n  ","\n  ","\n"])),ue.lessThan("medium")(q||(q=Object(o.a)(["\n    font-size: 14px;\n    transform: translateY(10px);\n  "]))),ue.lessThan("small")(G||(G=Object(o.a)(["\n    font-size: 12px;\n    transform: translateY(9px);\n  "]))),ue.lessThan("tiny")(H||(H=Object(o.a)(["\n    font-size: 10px;\n  "])))),ft=Object(s.b)(st.a)(K||(K=Object(o.a)(["\n  font-size: 30px;\n  ","\n  ","\n  ","\n  ","\n"])),(function(e){return"true"===e.minus&&"color: #0f9960;"}),ue.lessThan("medium")(Q||(Q=Object(o.a)(["\n    font-size: 26px;\n  "]))),ue.lessThan("small")(V||(V=Object(o.a)(["\n    font-size: 22px;\n  "]))),ue.lessThan("tiny")(X||(X=Object(o.a)(["\n    font-size: 18px;\n  "])))),Ot=function(){var e=je((function(e){var t=e.mode,n=e.timer,r=e.bestTime,a=e.mazeSize,c=r[t][a];return{time:n.time,best:c||n.time,difference:c?n.time-c:0}})),t=e.time,n=e.best,r=e.difference;return Object(Ne.jsxs)(dt,{children:[Object(Ne.jsx)(lt,{label:"\u30d9\u30b9\u30c8",time:n,best:!0}),Object(Ne.jsx)(lt,{label:"\u30bf\u30a4\u30e0",time:t}),Object(Ne.jsx)(lt,{label:"\u30d9\u30b9\u30c8\u5dee",time:r,difference:!0})]})},dt=s.b.div(Z||(Z=Object(o.a)(["\n  display: flex;\n  justify-content: center;\n  width: 450px;\n  ","\n"])),ue.lessThan("medium")($||($=Object(o.a)(["\n    width: 80%;\n  "])))),mt=function(){return Object(Ne.jsx)(l.b,{injectFirst:!0,children:Object(Ne.jsxs)(ht,{children:[Object(Ne.jsx)(Ot,{}),Object(Ne.jsx)($e,{}),Object(Ne.jsx)(et,{})]})})},ht=s.b.div(_||(_=Object(o.a)(["\n  position: relative;\n  display: flex;\n  width: 100%;\n  height: 95vh;\n  top: 0;\n  left: 0;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));c.a.render(Object(Ne.jsx)(i.a,{store:re,children:Object(Ne.jsx)(mt,{})}),document.getElementById("root")),ee&&ee instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(e){var t=e.getCLS,n=e.getFID,r=e.getFCP,a=e.getLCP,c=e.getTTFB;t(ee),n(ee),r(ee),a(ee),c(ee)}))}},[[92,1,2]]]);
//# sourceMappingURL=main.15e45900.chunk.js.map