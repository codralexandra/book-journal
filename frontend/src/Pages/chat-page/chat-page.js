import React, {useEffect} from "react";
import NavbarComponent from "../../Components/navbar-component/Nav";
import ChatComponent from "../../Components/chat-component/Chat";

import "../../assets/style.css";

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
