import React, { Component } from 'react'
import Message from "./Message";
const ROOT_EVENT_URL = 'wss://stream.pushbullet.com/websocket/';

class Notifications extends Component {
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

            //if the push is a dismissal, use it to pull messages off the queue
            if (message.push.type === "dismissal") {
                this.dismissMessage(message.push);
                return;
            }


            message.push.arrivalTime = new Date();
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

    dismissMessage = message => {
        console.log("Asked to dismiss something.");
        var currMessages = this.state.messages;
        for( var i = currMessages.length; i--;) {
            let msg = currMessages[i];
            if ( msg.notification_id === message.notification_id && msg.notification_tag === message.notification_tag) {
                currMessages.splice(i, 1);
            }
        }
        this.setState(state => ({messages: currMessages}));
    }

    addMessage = message => {
        if (this.state.messages.length >= this.props.limit) {
            let deleted = this.state.messages.shift();
            console.log("Shifted a message out: ");
            console.log(deleted);
        }

        this.setState(state => ({messages: [message, ...state.messages]}))
    }

    render() {
        return (
            <div className="notifications container-fluid">
                <div className="row">
                    {this.state.messages.map((message, index) =>
                        <Message
                            key={index}
                            message={message.body}
                            title={message.title}
                            name={message.application_name}
                            icon={message.icon}
                            arrivalTime={message.arrivalTime}
                        />,
                    )}
                </div>
            </div>
        )
    }
}

export default Notifications;