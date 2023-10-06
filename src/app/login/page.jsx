"use client";

import {useState} from 'react';
import axios from 'axios';
import NavBar from '../components/NavMenu';
export default function Login() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:3001/login"
    })
    .then((res) => {
      console.log(res);
      if (res == "Nu exista utilizatorul") {

      } else {
        window.location.replace('http://localhost:3000');
      }
    })
    .catch(err => console.log(err));
  };


  return (
    <div>
      <NavBar />
      <div className="auth-div">
        <h1>Login</h1>
        <input 
          type="text"
          name="username"
          placeholder="username" 
          onChange={e => setLoginUsername(e.target.value)}
        ></input>
        
        <input 
          type="password" 
          name="password" 
          placeholder="password"
          onChange={e => setLoginPassword(e.target.value)}
        ></input>

        <button className="red-button" onClick={login}>Login</button>
      </div>

    </div>
  );
}