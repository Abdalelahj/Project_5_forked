import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../redux/reducers/sliceComments";
import "./comments.css";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const posts = useSelector((reducer) => {
    return reducer.posts.posts;
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const postId = localStorage.getItem("postId") || null;
  const post = posts.filter((elem, ind) => {
    return elem.post_id == postId;
  });

  const dispatch = useDispatch();
  const comments = useSelector((reducers) => {
    return reducers.comments.comments;
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${postId}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setComments(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comments]);

  const handleComment = (e) => {
    axios
      .post(
        `http://localhost:5000/comments/${postId}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditComment = (commentId) => {
    axios
      .put(
        `http://localhost:5000/comments/${commentId}`,
        {
          comment: editingText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setEditingCommentId(null);
        setEditingText("");
        const updatedComments = comments.map((comment) =>
          comment.comment_id === commentId
            ? { ...comment, comment: res.data.updatedComment.comment }
            : comment
        );
        dispatch(setComments(updatedComments));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const filteredComments = comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        dispatch(setComments(filteredComments));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = (commentId) => {
    setMenuOpen(menuOpen === commentId ? null : commentId);
  };

  return (
    <div>
      <div>
        {post[0]?.profile_image ? (
          <img src={post[0]?.profile_image} className="profPic" alt="Profile" />
        ) : null}
        <div className="innerPost">
          <h3>{post[0]?.user_name}</h3>
          <p>{post[0]?.body}</p>
        </div>
      </div>
      {comments?.map((comment) => (
        <div key={comment.comment_id} className="comment-container">
          <p>{comment.comment}</p>
          <div className="menu-container">
            <button
              className="menu-button"
              onClick={() => toggleMenu(comment.comment_id)}
            >
              •••
            </button>
            {menuOpen === comment.comment_id && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    setEditingCommentId(comment.comment_id);
                    setEditingText(comment.comment);
                    setMenuOpen(null);
                  }}
                >
                  تعديل
                </button>
                <button
                  onClick={() => {
                    handleDeleteComment(comment.comment_id);
                    setMenuOpen(null);
                  }}
                >
                  حذف
                </button>
              </div>
            )}
          </div>
          {editingCommentId === comment.comment_id && (
            <div className="edit-container">
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                placeholder="Edit your comment"
              />
              <button onClick={() => handleEditComment(comment.comment_id)}>
                حفظ
              </button>
              <button onClick={() => setEditingCommentId(null)}>إلغاء</button>
            </div>
          )}
        </div>
      ))}
      <div>
        <input
          placeholder="Add Comment"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  );
};

export default Comments;
