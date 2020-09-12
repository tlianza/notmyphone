(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,n){e.exports=n(60)},39:function(e,t,n){},57:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s=n(18),c=n.n(s),i=(n(39),n(40),n(19)),r=n(13),l=n(14),u=n(16),h=n(15),m=n(17),d=n(32),p=n(27),f=n.n(p),g=n(24),b=n(23),v=function(e){function t(e,n){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e,n))).handleShow=a.handleShow.bind(Object(i.a)(a)),a.handleClose=a.handleClose.bind(Object(i.a)(a)),a.state={show:!1},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"handleShow",value:function(){console.log("Div clicked"),this.setState({show:!0})}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"d-flex col"},o.a.createElement("div",{className:"card text-white flex-fill",onClick:this.handleShow,"data-toggle":"modal","data-target":"#exampleModalCenter"},o.a.createElement("div",{className:"card-text"},o.a.createElement("h5",null,this.props.title),this.props.body),o.a.createElement("div",{className:"card-footer"},o.a.createElement("small",{className:"text-muted"},o.a.createElement(f.a,{date:this.props.arrivalTime}))))),o.a.createElement(b.a,{show:this.state.show,onHide:this.handleClose},o.a.createElement(b.a.Header,{closeButton:!0},o.a.createElement(b.a.Title,null,this.props.title)),o.a.createElement(b.a.Body,null,o.a.createElement("p",null,this.props.body),o.a.createElement("span",{className:"text-muted"},"From ",this.props.name," ",o.a.createElement(f.a,{date:this.props.arrivalTime}))),o.a.createElement(b.a.Footer,null,o.a.createElement(g.a,{variant:"primary",onClick:this.handleClose},"Close"))))}}]),t}(o.a.Component),w=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={messages:[]},n.dismissMessage=function(e){console.log("Asked to dismiss something.");for(var t=n.state.messages,a=t.length;a--;){var o=t[a];o.notification_id===e.notification_id&&o.notification_tag===e.notification_tag&&t.splice(a,1)}n.setState(function(e){return{messages:t}})},n.addMessage=function(e){if(n.state.messages.length>=n.props.limit){var t=n.state.messages.shift();console.log("Shifted a message out: "),console.log(t)}n.setState(function(t){return{messages:[e].concat(Object(d.a)(t.messages))}})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.websocket.onmessage=function(t){var n=JSON.parse(t.data);if("push"===n.type)if(console.log("Event is a push..."),console.log(n),"dismissal"!==n.push.type){if(!n.push.body&&(!n.push.notifications||0===n.push.notifications.length))return console.log("Event was not renderable. Ignoring."),void console.log(n.notifications);n.push.notifications&&(n.push.body||(n.push.body=n.push.notifications[0].body),n.push.title||(n.push.title=n.push.notifications[0].title),n.push.icon||(n.push.icon=n.push.notifications[0].image_url)),n.push.arrivalTime=new Date,e.addMessage(n.push)}else e.dismissMessage(n.push)}}},{key:"render",value:function(){return o.a.createElement("div",{className:"notifications container-fluid"},o.a.createElement("div",{className:"row"},this.state.messages.map(function(e,t){return o.a.createElement(v,{key:t,body:e.body,title:e.title,name:e.application_name,icon:e.icon,arrivalTime:e.arrivalTime})})))}}]),t}(a.Component),k=n(30),y=n.n(k),E=n(65),O=n(9),j=(n(57),"https://www.pushbullet.com/authorize?client_id=".concat("yV56z5euFLaZM8byC87MWhq3k9WKmprK","&redirect_uri=").concat(encodeURIComponent("https://notmyphone.com/auth"),"&response_type=code&scope=everything"));E.a({dsn:"https://d2ff761a0ad0419eb41f284c3daea915@sentry.io/1489499"});var C=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"clock"},o.a.createElement(y.a,{format:"hh:mm a",ticking:!0}))}}]),t}(a.Component),S=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"handleClick",value:function(){window.location.reload()}},{key:"render",value:function(){return o.a.createElement(g.a,{variant:"light",size:"sm",onClick:this.handleClick},"\u21bb")}}]),t}(a.Component),N=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"handleClick",value:function(){window.location.href=j}},{key:"render",value:function(){return o.a.createElement(g.a,{variant:"light",size:"sm",onClick:this.handleClick},"Login")}}]),t}(a.Component),T=function(e){function t(e){var n;Object(r.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e))).reconnectTimeout=250,n.connect=function(){console.debug("Attempting to connect websocket...");var e=n.state.ws;if(n.wsIsConnected())n.ws=e;else{var t=null;e&&(t=e.onmessage),n.ws=new WebSocket(n.getEventURL()),n.ws.onmessage=t}var a,o=Object(i.a)(n);n.ws.onopen=function(){console.log("connected"),n.setState({ws:n.ws,connected:!0}),o.reconnectTimeout=250,clearTimeout(a)},n.ws.onerror=function(e){console.error("Socket encountered error: ",e.message,"Closing socket"),O.a(e),o.ws.close()},n.ws.onclose=function(e){var t=Math.min(1e4,o.reconnectTimeout);console.log("Socket is closed. Reconnect will be attempted in ".concat(t," ms."),e.reason),n.setState({ws:n.ws,connected:!1}),o.reconnectTimeout=o.reconnectTimeout+o.reconnectTimeout,a=setTimeout(n.check,t)}},n.check=function(){console.debug("Checking ws state..."),n.wsIsConnected()||n.connect()},n.wsIsConnected=function(){var e=n.state.ws;return e&&e.readyState!==WebSocket.CLOSED};var a=new WebSocket(n.getEventURL());return n.state={ws:a,connected:!1},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"getEventURL",value:function(){var e=new URLSearchParams(window.location.search).get("auth");return null!==e&&0!==e.length||(e=t.getCookie("auth")),null!==e&&0!==e.length||(O.c("No auth found in either param or cookie."),console.log("No auth found in either param or cookie.")),"wss://stream.pushbullet.com/websocket/"+e}},{key:"componentDidMount",value:function(){this.connect()}},{key:"render",value:function(){return o.a.createElement("div",{className:"App container-fluid"},o.a.createElement(C,null),o.a.createElement(w,{limit:5,websocket:this.state.ws}),o.a.createElement("div",{id:"button-tray",className:"fixed-bottom"},o.a.createElement("div",{className:"float-left"},this.state.connected?null:o.a.createElement(N,null)),o.a.createElement("div",{className:"float-right"},o.a.createElement(S,null))))}}],[{key:"getCookie",value:function(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var o=n[a];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,1,2]]]);
//# sourceMappingURL=main.a0cdbbf5.chunk.js.map