import React, {useEffect} from "react";
import NavbarComponent from "../../Components/navbar-component/Nav";

const Home = () => {
  useEffect(() => {
      document.title = "Welcome to ShelfTalk - Main";
    }, []);
  return (
    <div id="chatPage">
      <NavbarComponent />

      <div>Welcome!</div>
    </div>
  );
};

export default Home;
