import React, { Component } from 'react'
import Message from './Message'
import "./App.css";

const AUTH_KEY = '';
const EVENT_URL = 'wss://stream.pushbullet.com/websocket/'+AUTH_KEY;


class Chat extends Component {
  state = {
    messages: [],
  }

  ws = new WebSocket(EVENT_URL)

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
        ws: new WebSocket(EVENT_URL),
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
          href="https://www.pushbullet.com/authorize?client_id=yV56z5euFLaZM8byC87MWhq3k9WKmprK&redirect_uri=https%3A%2F%2Fpiclock.lianza.workers.dev%2Fauth&response_type=code&scope=everything"
          rel="noopener noreferrer"
        >
          Pushbullet Login
        </a>
      <Chat />
    </div>
  );
}


export default App;
