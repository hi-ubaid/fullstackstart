import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import './Navbar.css';
import Post from '../pages/Post';

function Navbar() {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <div className="navbar-brand">My Blog</div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/createpost" className="nav-link">Create a Post</Link>
          </div>
        </nav>
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Navbar;
