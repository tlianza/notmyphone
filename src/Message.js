import React from "react";
import TimeAgo from 'react-timeago';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Message extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        console.log("Div clicked");
        this.setState({ show: true });
    }

    render() {
        //   var imgAttr = { src: "data:image/jpeg;base64, " + icon, alt: name, className: "card-img"};
        //   //{icon && <img {...imgAttr} />}
        return (
            <>
                <div className="d-flex col">
                    <div className="card text-white flex-fill" onClick={this.handleShow} data-toggle="modal" data-target="#exampleModalCenter">
                        <div className="card-text">
                            <h5>{this.props.title}</h5>
                            {this.props.body}
                        </div>
                        <div className="card-footer">
                            <small className="text-muted"><TimeAgo date={this.props.arrivalTime} /></small>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.props.body}</p>
                        <span className="text-muted">From {this.props.name} <TimeAgo date={this.props.arrivalTime} /></span>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Message;
