import React, { Component } from 'react'
import Message from './Message'
import "./App.css"


const ROOT_EVENT_URL = 'wss://stream.pushbullet.com/websocket/';
const PUSHBULLET_CLIENT_ID = "yV56z5euFLaZM8byC87MWhq3k9WKmprK";
const ROOT_URL = 'https://notmyphone.com/';
const REDIRECT_URL = `https://www.pushbullet.com/authorize?client_id=${PUSHBULLET_CLIENT_ID}&redirect_uri=${encodeURIComponent(ROOT_URL)}%2Fauth&response_type=code&scope=everything`

class Chat extends Component {
  state = {
    messages: [],
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
      console.log('disconnected')
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

function App() {
  return (
    <div className="App">
        <a
          href={REDIRECT_URL}
          rel="noopener noreferrer"
        >
          Pushbullet Login
        </a>
      <Chat />
    </div>
  );
}


export default App;
