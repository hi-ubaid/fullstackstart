import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import './Navbar.css';
import Post from '../pages/Post';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import { AuthContext } from '../helpers/AuthContext';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Navbar() {
  const [authState, setAuthState] = useState({
    username: "",
    id:       "",
    status:   false,
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id:       "",
      status:   false,
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3010/auth/auth", {
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then((res)=>{
      if(res.data.error){
        setAuthState({
          ...authState, status:false
        });
      }else{
        setAuthState({
          username: res.data.username,
          id:       res.data.id,
          status:   true,
        });
      }
    })
    if(localStorage.getItem("accessToken")){
      setAuthState(true);
    }
  },[])

  return (
    <div>
      <AuthContext.Provider value={{authState, setAuthState }}>
        <Router>
          <nav className="navbar">
            <div className="navbar-brand">
              <Link to="/" style={{textDecoration:"none", color:"white"}}>My Blog</Link>
            </div>
            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/createpost" className="nav-link">Create a Post</Link>
              {!authState.status ? (
                <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/registration" className="nav-link">Registration</Link>
                </>
              ) : (
                <>
                  <button className="nav-link" onClick={logout}>Logout</button>
                </>
              )
              }

              <h1>{authState.username}</h1>
            </div>
          </nav>
          <div className="routes-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/post/:id" element={<Post/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default Navbar;
