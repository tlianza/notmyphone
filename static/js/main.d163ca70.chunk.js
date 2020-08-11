(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(60)},39:function(e,t,a){},57:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(18),c=a.n(s),i=(a(39),a(40),a(13)),r=a(14),l=a(16),u=a(15),m=a(17),h=a(32),d=a(23),p=a(27),f=a.n(p),v=a(24),g=a(22),b=function(e){function t(e,a){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e,a))).handleShow=n.handleShow.bind(Object(d.a)(n)),n.handleClose=n.handleClose.bind(Object(d.a)(n)),n.state={show:!1},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){console.log("Div clicked"),this.setState({show:!0})}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"d-flex col"},o.a.createElement("div",{className:"card text-white flex-fill",onClick:this.handleShow,"data-toggle":"modal","data-target":"#exampleModalCenter"},o.a.createElement("div",{className:"card-text"},o.a.createElement("h5",null,this.props.title),this.props.message),o.a.createElement("div",{className:"card-footer"},o.a.createElement("small",{className:"text-muted"},o.a.createElement(f.a,{date:this.props.arrivalTime}))))),o.a.createElement(g.a,{show:this.state.show,onHide:this.handleClose},o.a.createElement(g.a.Header,{closeButton:!0},o.a.createElement(g.a.Title,null,this.props.title)),o.a.createElement(g.a.Body,null,o.a.createElement("p",null,this.props.message),o.a.createElement("span",{className:"text-muted"},"From ",this.props.name," ",o.a.createElement(f.a,{date:this.props.arrivalTime}))),o.a.createElement(g.a.Footer,null,o.a.createElement(v.a,{variant:"primary",onClick:this.handleClose},"Close"))))}}]),t}(o.a.Component),w=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={messages:[]},a.dismissMessage=function(e){console.log("Asked to dismiss something.");for(var t=a.state.messages,n=t.length;n--;){var o=t[n];o.notification_id===e.notification_id&&o.notification_tag===e.notification_tag&&t.splice(n,1)}a.setState(function(e){return{messages:t}})},a.addMessage=function(e){if(a.state.messages.length>=a.props.limit){var t=a.state.messages.shift();console.log("Shifted a message out: "),console.log(t)}a.setState(function(t){return{messages:[e].concat(Object(h.a)(t.messages))}})},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.websocket.onmessage=function(t){var a=JSON.parse(t.data);"push"===a.type&&(console.log("Event is a push..."),console.log(a),"dismissal"!==a.push.type?(a.push.arrivalTime=new Date,e.addMessage(a.push)):e.dismissMessage(a.push))}}},{key:"render",value:function(){return o.a.createElement("div",{className:"notifications container-fluid"},o.a.createElement("div",{className:"row"},this.state.messages.map(function(e,t){return o.a.createElement(b,{key:t,message:e.body,title:e.title,name:e.application_name,icon:e.icon,arrivalTime:e.arrivalTime})})))}}]),t}(n.Component),k=a(30),E=a.n(k),O=a(65),y=a(9),j=(a(57),"https://www.pushbullet.com/authorize?client_id=".concat("yV56z5euFLaZM8byC87MWhq3k9WKmprK","&redirect_uri=").concat(encodeURIComponent("https://notmyphone.com/auth"),"&response_type=code&scope=everything"));O.a({dsn:"https://d2ff761a0ad0419eb41f284c3daea915@sentry.io/1489499"});var C=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"clock"},o.a.createElement(E.a,{format:"hh:mm a",ticking:!0}))}}]),t}(n.Component),S=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handleClick",value:function(){window.location.reload()}},{key:"render",value:function(){return o.a.createElement(v.a,{variant:"light",size:"sm",onClick:this.handleClick},"\u21bb")}}]),t}(n.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"handleClick",value:function(){window.location.href=j}},{key:"render",value:function(){return o.a.createElement(v.a,{variant:"light",size:"sm",onClick:this.handleClick},"Login")}}]),t}(n.Component),x=function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).ws=new WebSocket(a.getEventURL());var n=new WebSocket(a.getEventURL());return n.addEventListener("error",function(e){console.log("WebSocket error: ",e),y.a(e)}),a.state={ws:n,connected:!1},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"getEventURL",value:function(){var e=new URLSearchParams(window.location.search).get("auth");return null!==e&&0!==e.length||(e=t.getCookie("auth")),null!==e&&0!==e.length||(y.c("No auth found in either param or cookie."),console.log("No auth found in either param or cookie.")),"wss://stream.pushbullet.com/websocket/"+e}},{key:"componentDidMount",value:function(){var e=this;this.ws.onopen=function(){console.log("connected"),e.setState({ws:e.ws,connected:!0})},this.ws.onclose=function(){console.log("websocket disconnected");var t=new WebSocket(e.getEventURL());t.addEventListener("error",function(e){console.log("WebSocket error: ",e),y.a(e)}),e.setState({ws:t,connected:!1})}}},{key:"render",value:function(){return o.a.createElement("div",{className:"App container-fluid"},o.a.createElement(C,null),o.a.createElement(w,{limit:5,websocket:this.state.ws}),o.a.createElement("div",{id:"button-tray",className:"fixed-bottom"},o.a.createElement("div",{className:"float-left"},this.state.connected?null:o.a.createElement(N,null)),o.a.createElement("div",{className:"float-right"},o.a.createElement(S,null))))}}],[{key:"getCookie",value:function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var o=a[n];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,1,2]]]);
//# sourceMappingURL=main.d163ca70.chunk.js.map