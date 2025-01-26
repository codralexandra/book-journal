import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import "./chat.css";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [username] = useState(localStorage.getItem("username"));

  useEffect(() => {
    if (!username) return;

    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      ws.send(JSON.stringify({ type: "join", username }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "userList") {
        setConnectedUsers(data.users);
      } else if (data.type === "message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { username: data.username, message: data.message, type: "received" },
        ]);
      }
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "leave", username }));
        localStorage.removeItem("isConnected");
      }
      ws.close();
    };
  }, [username]);

  const sendMessage = () => {
    if (message && socket) {
      socket.send(JSON.stringify({ type: "chat", message, username }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { username, message, type: "sent" },
      ]);
      setMessage("");
    }
  };

  return (
    <Container fluid className="chat-container">
      <Row className="chat-main">
        <Col md={9} className="chat-body">
          <div className="messages-area">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "sent"
                    ? "message-container sent"
                    : "message-container received"
                }
              >
                <div
                  className={
                    msg.type === "sent" ? "message sent" : "message received"
                  }
                >
                  {msg.message}
                </div>
                {msg.type === "received" && (
                  <div className="sender-info">@{msg.username}</div>
                )}
              </div>
            ))}
          </div>
        </Col>
        <Col md={3} className="chat-sidebar">
          <h6>Connected Users</h6>
          <ListGroup>
            {connectedUsers.map((user, index) => (
              <ListGroup.Item key={index}>{user}</ListGroup.Item>
            ))}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form>
        </Col>
        <Col md={4}>
          <Button className="send-button" onClick={sendMessage}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatComponent;
