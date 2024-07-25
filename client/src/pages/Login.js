import React, { useState } from 'react';
import Axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate                = useNavigate();

  const login = () => {
    const data = {
      username: username,
      password: password,
    };

    Axios.post("http://localhost:3010/auth/login", data)
      .then((res) => {
        if(res.data.error){
            setSuccessMessage(res.data.error);
            setTimeout(() => setSuccessMessage(''), 3000);
        }
        else{
        setSuccessMessage("Logged In!");
        setTimeout(() => setSuccessMessage(''), 3000);
        localStorage.setItem("accessToken", res.data)
        navigate("/");
        }
      })
      .catch((error) => {
        setSuccessMessage(error.message);  // Convert error object to string
        setTimeout(() => setSuccessMessage(''), 3000);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          placeholder="Enter Username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Enter Password"
        />

        <div className="button-container">
          <button onClick={login} type="button">Login</button>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
