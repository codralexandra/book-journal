import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import Home from './home-page/home';
import Register from './register-page/register';
import Login from './login-page/login';
import Main from './main-page/main';
import './App.css';
import { useEffect, useState} from 'react';

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
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/home" element={<Main email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
