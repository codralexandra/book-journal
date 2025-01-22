import React, {useEffect} from "react";
import NavbarComponent from "../navbar-component/Nav";
import ChatComponent from "../chat-component/chat";

import "../assets/style.css";

const Chat = (props) => {
  useEffect(() => {
        document.title = "Global Chatroom";
      }, []);
  return (
    <div id="chatPage">
      <NavbarComponent />
      <ChatComponent />
    </div>
  );
};

export default Chat;
