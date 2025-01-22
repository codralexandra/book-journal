import React from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

import "./chat.css";

const ChatComponent = () => {
  return (
    <Container fluid className="chat-container">
      <Row className="chat-main">
        <Col md={9} className="chat-body">
          <div className="messages-area">
            <div className="message received">
              <span>User1: test</span>
            </div>
            <div className="message sent">
              <span>test</span>
            </div>
          </div>
        </Col>
        <Col md={3} className="chat-sidebar">
          <h6>Connected Users</h6>
          <ListGroup>
            <ListGroup.Item>example_user</ListGroup.Item>
            {/* fill the connected users from backend */}
          </ListGroup>
        </Col>
      </Row>
      <Row className="chat-footer">
        <Col md={8}>
        <Form inline={true}>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              className="message-input"
            />
          </Form>
        </Col>
        <Col md={4}>
          <Button variant="primary" className="send-button">
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatComponent;
