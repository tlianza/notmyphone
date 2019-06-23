import React, { Component } from 'react'
import Notifications from './Notifications'
import Clock from 'react-live-clock';
import Button from 'react-bootstrap/Button';
import "./App.css"

const PUSHBULLET_CLIENT_ID = "yV56z5euFLaZM8byC87MWhq3k9WKmprK";
const ROOT_URL = 'https://notmyphone.com/';
const REDIRECT_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${encodeURIComponent(ROOT_URL+'auth')}&response_type=code&scope=everything`;
const ROOT_EVENT_URL = 'wss://stream.pushbullet.com/websocket/';
const NOTIFICATON_LIMIT = 5;

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
    this.state = {
      ws: new WebSocket(this.getEventURL()),
      connected: false
    };
  }

  // Picks up the event url via auth in the cookie (or querystring if testing locally)
  getEventURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const auth = urlParams.get('auth');
    return ROOT_EVENT_URL + auth;
  }

  ws = new WebSocket(this.getEventURL())

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      this.setState({
        ws: this.ws,
        connected: true
      })
    }

    this.ws.onclose = () => {
      console.log('websocket disconnected');
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(this.getEventURL()),
        connected: false
      })
    }
  }

  render() {
    return (
        <div className="App container-fluid">
          <MyClock/>
          <Notifications limit={NOTIFICATON_LIMIT} websocket={this.state.ws}/>
          <div id="button-tray" className="fixed-bottom">
            {
              this.state.connected
                  ? null
                  : <LoginButton />
            }
            &nbsp;
            <RefreshButton/>
          </div>
        </div>
    );
  }
}

export default App;