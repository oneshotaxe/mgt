(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{367:function(e,t,n){(function(n){var o,r,c;r=[],void 0===(c="function"==typeof(o=function(){"use strict";function t(a,b,e){var t=new XMLHttpRequest;t.open("GET",a),t.responseType="blob",t.onload=function(){g(t.response,b,e)},t.onerror=function(){console.error("could not download file")},t.send()}function o(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function r(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(e){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var c="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,a=c.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=c.saveAs||("object"!=typeof window||window!==c?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,e){var i=c.URL||c.webkitURL,n=document.createElement("a");g=g||b.name||"download",n.download=g,n.rel="noopener","string"==typeof b?(n.href=b,n.origin===location.origin?r(n):o(n.href)?t(b,g,e):r(n,n.target="_blank")):(n.href=i.createObjectURL(b),setTimeout((function(){i.revokeObjectURL(n.href)}),4e4),setTimeout((function(){r(n)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,g,n){if(g=g||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(a,b){return void 0===b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\ufeff",a],{type:a.type}):a}(e,n),g);else if(o(e))t(e,g,n);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){r(i)}))}}:function(b,e,n,g){if((g=g||open("","_blank"))&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return t(b,e,n);var o="application/octet-stream"===b.type,i=/constructor/i.test(c.HTMLElement)||c.safari,r=/CriOS\/[\d]+/.test(navigator.userAgent);if((r||o&&i||a)&&"undefined"!=typeof FileReader){var l=new FileReader;l.onloadend=function(){var a=l.result;a=r?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},l.readAsDataURL(b)}else{var d=c.URL||c.webkitURL,f=d.createObjectURL(b);g?g.location=f:location.href=f,g=null,setTimeout((function(){d.revokeObjectURL(f)}),4e4)}});c.saveAs=g.saveAs=g,e.exports=g})?o.apply(t,r):o)||(e.exports=c)}).call(this,n(53))},512:function(e,t,n){"use strict";n.r(t);n(49);var o=n(9),r=n(367),c=n.n(r),l={data:function(){return{title:"Скачать копию",dialog:!0}},watch:{dialog:function(e){e||this.$router.push("/")}},methods:{fn:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return data={},t.next=3,e.$axios.post("/buses/read");case 3:return n=t.sent,data.buses=n.data,t.next=7,e.$axios.post("/drivers/read");case 7:return n=t.sent,data.drivers=n.data,t.next=11,e.$axios.post("/routes/read");case 11:return n=t.sent,data.routes=n.data,t.next=15,e.$axios.post("/ways/read");case 15:return n=t.sent,data.ways=n.data,o=JSON.stringify(data),t.next=20,c.a.saveAs(new Blob([o]),"backup.json");case 20:e.$router.push("/");case 21:case"end":return t.stop()}}),t)})))()}}},d=n(40),f=n(94),v=n.n(f),w=n(460),m=n(456),h=n(215),y=n(520),x=n(508),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{width:"300"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[e._v(e._s(e.title))]),n("v-card-actions",[n("v-spacer"),n("v-btn",{on:{click:e.fn}},[e._v("Скачать")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VBtn:w.a,VCard:m.a,VCardActions:h.a,VCardTitle:h.c,VDialog:y.a,VSpacer:x.a})}}]);