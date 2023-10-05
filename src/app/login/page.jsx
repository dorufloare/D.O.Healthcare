"use client";

import {useState} from 'react';
import axios from 'axios';
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
    }).then(res => console.log(res)).catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Logare</h1>
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

      <button onClick={login}>Logheaza-te</button>
    </div>
  );
}