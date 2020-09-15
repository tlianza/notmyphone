import React, { Component } from 'react'
import Notifications from './Notifications'
import Clock from 'react-live-clock';
import Button from 'react-bootstrap/Button';
import * as Sentry from '@sentry/browser';
import "./App.css"

const PUSHBULLET_CLIENT_ID = "yV56z5euFLaZM8byC87MWhq3k9WKmprK";
const ROOT_URL = 'https://notmyphone.com/';
const REDIRECT_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${encodeURIComponent(ROOT_URL+'auth')}&response_type=code&scope=everything`;
const ROOT_EVENT_URL = 'wss://stream.pushbullet.com/websocket/';
const NOTIFICATON_LIMIT = 5;

Sentry.init({dsn: "https://d2ff761a0ad0419eb41f284c3daea915@sentry.io/1489499"});

class MyClock extends Component {
  render() {
    return (
        <div className="clock">
          <Clock format={'hh:mm a'} ticking={true}  />
        </div>
    )
  }
}

class RefreshButton extends Component {
  handleClick() {
    window.location.reload();
  }

  render() {
    return (
        <Button variant="light" size="sm" onClick={this.handleClick}>&#8635;</Button>
    )
  }
}

class LoginButton extends Component {
  handleClick() {
    window.location.href = REDIRECT_URL;
  }

  render() {
    return (
        <Button variant="light" size="sm" onClick={this.handleClick}>Login</Button>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    let ws = new WebSocket(this.getEventURL());
    this.state = {
      ws: ws,
      connected: false
    };
  }

  static getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getAndCacheAuthKey() {
    const urlParams = new URLSearchParams(window.location.search);
    let auth = urlParams.get('auth');

    if ((auth === null || auth.length === 0)) {
      auth = App.getCookie('auth');
    } else {
      let date = new Date();
      date.setDate(date.getDate() + 1); //one day cache in case they need to reload
      document.cookie = "auth="+auth+"; expires="+date.toGMTString();
      console.debug("Setting cookie as a backup for the URL");
    }

    if ((auth === null || auth.length === 0)) {
      Sentry.captureMessage("No auth found in either param or cookie.");
      console.log("No auth found in either param or cookie.");
      return null;
    }
    return auth;
  }

  // Picks up the event url via auth in the cookie (or querystring if testing locally)
  getEventURL() {
    return ROOT_EVENT_URL + this.getAndCacheAuthKey();
  }

  reconnectTimeout = 250;

  componentDidMount() {
    if (null != this.getAndCacheAuthKey()) {
      this.connect();
    } else {
      console.log("Not attempting to connect, since there's no auth.");
    }
  }

  connect = () => {
    console.debug("Attempting to connect websocket...");

    // This is hacktackular, but since we already have a websocket from the constructor (probably)
    // which probably has an event handler attached to it, make sure we don't lose that.
    const { ws } = this.state;
    if (this.wsIsConnected()){
      this.ws = ws; //existing, connected, constructor-created WS
    } else {
      //if there is an existing ws, throw it away but keep its onmessage event
      let onmessageFunc = null;
      if (ws){
        onmessageFunc = ws.onmessage;
      }
      this.ws = new WebSocket(this.getEventURL());
      this.ws.onmessage = onmessageFunc;
    }

    let that = this; // cache the this
    var connectInterval;

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
      this.setState({
        ws: this.ws,
        connected: true
      });
      that.reconnectTimeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    }

    // websocket onerror event listener
    this.ws.onerror = err => {
      console.error(
          "Socket encountered error: ",
          err.message,
          "Closing socket"
      );
      Sentry.captureEvent(err);
      that.ws.close();
    };

    this.ws.onclose = e => {
      let nextCheckMs = Math.min(10000, that.reconnectTimeout);
      console.log(
          `Socket is closed. Reconnect will be attempted in ${nextCheckMs} ms.`,
          e.reason
      );
      this.setState({
        ws: this.ws,
        connected: false
      });
      that.reconnectTimeout = that.reconnectTimeout + that.reconnectTimeout; //increment retry interval
      connectInterval = setTimeout(this.check, nextCheckMs); //call check function after timeout
    }
  }

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    console.debug("Checking ws state...");
    if(!this.wsIsConnected()) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  wsIsConnected = () => {
    const { ws } = this.state;
    return (ws && ws.readyState !== WebSocket.CLOSED);
  };

  render() {
    return (
        <div className="App container-fluid">
          <MyClock/>
          <Notifications limit={NOTIFICATON_LIMIT} websocket={this.state.ws}/>
          <div id="button-tray" className="fixed-bottom">
            <div className="float-left">
            {
              this.state.connected
                  ? null
                  : <LoginButton />
            }
            </div>
            <div className="float-right">
              <RefreshButton/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
