import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';

import Home from './Pages/home-page/home';
import Register from './Pages/register-page/register';
import Main from './Pages/main-page/main';
import Chat from './Pages/chat-page/chat-page';
import MyBooks from './Pages/my-books-page/my-books';

import './App.css';

import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");

  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} 
          />
          <Route path="/register" element={<Register setRegistered={setRegistered}/>} />
          <Route path="/home" element={<Main email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/my-books" element={<MyBooks />}/>
          <Route path="/chat" element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
