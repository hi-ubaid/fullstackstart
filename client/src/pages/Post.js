import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './Post.css';

function Post() {
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  let { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3010/Posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });

    Axios.get(`http://localhost:3010/Comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const addComment = () => {
    Axios.post(`http://localhost:3010/Comments`, {
      commentBody: newComment,
      PostId: id
    }).then((res) => {
      const commentToAdd = { commentBody: newComment };
      setComments([...comments, commentToAdd]);
      setNewComment("");
    });
  };

  return (
    <div className="post-page-container">
      <div className="post-container">
        <h1 className="post-title">{postObject.title}</h1>
        <p className="post-text">{postObject.postText}</p>
        <span className="post-author">Posted by: {postObject.username}</span>
      </div>
      <div className="comments-container">
        <h2>Comments</h2>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Post a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Post</button>
        </div>
        <div className="comments-list">
          {comments.map((comment, key) => (
            <div key={key} className="comment">
              {comment.commentBody}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
