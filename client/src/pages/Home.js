import React from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listofPosts, setListofPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3010/Posts")
      .then((res) => {
        setListofPosts(res.data);
      })
  }, [])

  return (
    <div>
      <header className="App-header">
        <h1>Posts</h1>
      </header>
      <main>
        {listofPosts.map((val, key) => {
          return (
            <div className="post-card"
            key={key}
            onClick={(()=>{
              navigate(`/post/${val.id}`)
            })}>
              <h2 className="post-title">{val.title}</h2>
              <p className="post-text">{val.postText}</p>
              <p className="post-author">by <i>{val.username}</i></p>
            </div>
          );
        })}
      </main>
    </div>
  )
}

export default Home
