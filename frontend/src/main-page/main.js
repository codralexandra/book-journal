import React, {useEffect} from "react";
import NavbarComponent from '../navbar-component/Nav.js';

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
