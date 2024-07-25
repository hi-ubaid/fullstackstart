import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import './Navbar.css';
import Post from '../pages/Post';
import Registration from '../pages/Registration';
import Login from '../pages/Login';

function Navbar() {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" style={{textDecoration:"none", color:"white"}}>My Blog</Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/createpost" className="nav-link">Create a Post</Link>
            {!localStorage.getItem("accessToken") && (
              <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registration" className="nav-link">Registration</Link>
              </>
            )}
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
    </div>
  );
}

export default Navbar;
