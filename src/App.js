import React, { Component } from 'react'
import Notifications from './Notifications'
import Clock from 'react-live-clock';
import Button from 'react-bootstrap/Button';
import "./App.css"

const PUSHBULLET_CLIENT_ID = "yV56z5euFLaZM8byC87MWhq3k9WKmprK";
const ROOT_URL = 'https://notmyphone.com/';
const REDIRECT_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${encodeURIComponent(ROOT_URL+'auth')}&response_type=code&scope=everything`;
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

function App() {
  return (
    <div className="App container-fluid">
        <MyClock />
        <Notifications limit={NOTIFICATON_LIMIT} />
        <div id="button-tray" className="fixed-bottom">
          <LoginButton />&nbsp;
          <RefreshButton />
        </div>
    </div>
  );
}

export default App;
