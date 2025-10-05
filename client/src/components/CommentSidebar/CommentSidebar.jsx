import React, { useEffect, useState, useContext, useRef } from "react";
import API from "../../utils/API";
import { AuthContext } from "../../Store/AuthContext";
import "./CommentSidebar.css";

const CommentSidebar = ({ ticket, isAgentView = false, onClose }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await API.get(`/tickets/${ticket._id}/comments`);
        setComments(res.data);
        scrollToBottom();
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [ticket]);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await API.post(`/tickets/${ticket._id}/comments`, {
        message: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const isResolved = ["resolved", "completed"].includes(ticket.status.toLowerCase());

  return (
    <div className="comment-sidebar">
      <div className="sidebar-header">
        <h2>{ticket.title}</h2>
        <p>Assigned To: {ticket.assignedTo?.username || "Unassigned"}</p>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="comments-list">
        {comments.map((c) => {
          const isCurrentUser =
            c.user?._id === user.userId || c.user === user.userId;
          return (
            <div
              key={c._id}
              className={`comment ${isCurrentUser ? "current-user" : "other-user"}`}
            >
              {!isCurrentUser && (
                <div className="sender-name">
                  {c.user?.username || "Agent"} :
                </div>
              )}
              {c.message}
            </div>
          );
        })}
        <div ref={commentsEndRef}></div>
      </div>

      <div className="add-comment">
        <input
          type="text"
          placeholder={isResolved ? "Ticket Resolved. Chat Disabled" : "Type your message..."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isResolved}
        />
        <button onClick={handleAddComment} disabled={isResolved}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSidebar;
