import React, { Component } from 'react'
import Message from './Message'
import FlipClock from 'flipclock';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import $ from 'jquery'; 
import "./App.css"

const ROOT_EVENT_URL = 'wss://stream.pushbullet.com/websocket/';
const PUSHBULLET_CLIENT_ID = "yV56z5euFLaZM8byC87MWhq3k9WKmprK";
const ROOT_URL = 'https://notmyphone.com/';
const REDIRECT_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${encodeURIComponent(ROOT_URL+'auth')}&response_type=code&scope=everything`;

class Chat extends Component {
  state = {
    messages: [],
  };

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
    }

    this.ws.onmessage = evt => {
      // on receiving a message, see if it's a real push and if so add it to 
      // the list of messages
      const message = JSON.parse(evt.data);
      if (message.type !== "push") { return; } //only respond to pushes
      console.log("Event is a push...")
      console.log(message);
      this.addMessage(message.push)
    }

    this.ws.onclose = () => {
      console.log('websocket disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(this.getEventURL()),
      })
    }
  }

  addMessage = message => 
    this.setState(state => ({ messages: [message, ...state.messages] }))

  

  render() {
    return (
      <div>
        {this.state.messages.map((message, index) =>
          <Message
            key={index}
            message={message.body}
            name={message.application_name}
            icon={message.icon}
          />,
        )}
      </div>
    )
  }
}

class Clock extends Component {

  componentDidMount() {
    this.$el = $(this.el);
    const clock = new FlipClock(this.el, {
       face: 'TwelveHourClock',
       showSeconds: false
    });
    clock.start();
  }

  componentWillUnmount() {
    //this.$el.somePlugin('destroy');
  }

  render() {
    return (
      <div>
        <div className="clock" ref={el => this.el = el}></div>
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
        <Button variant="light" size="sm" onClick={this.handleClick}>Reload</Button>
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
      <Container>
    <div className="App">

        <Clock />
        <Chat />
        <LoginButton />&nbsp;
        <RefreshButton />

    </div>
      </Container>
  );
}

export default App;
