import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import ReactTimeago from 'react-timeago';
import Style from './Style';

const CommentPopup = ({ onClose, comments, addComment, profile, username }) => {
  const classes = Style();
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        user: {
          icon: "/path/to/user/icon.jpg", // 여기에 사용자 아이콘 경로를 추가하세요
          name: "User Name", // 여기에 사용자 이름을 추가하세요
        },
        timestamp: new Date(),
      };
      addComment(newComment);
      setComment('');
    }
  };

  return ReactDOM.createPortal(
    <div className={classes.popup__overlay}>
      <div className={classes.popup__content}>
        <div className={classes.popup__header}>
          <CloseIcon onClick={onClose} className={classes.popup__closeIcon} />
        </div>
        <div className={classes.popup__body}>
          {comments.map((c, index) => (
            <div key={index} className={classes.comment}>
              <Avatar src={profile} className={classes.comment__icon} />
              <div className={classes.comment__details}>
                <h4>{username}</h4>
                <p style={{ whiteSpace: 'pre-wrap' }}>{c.text}</p>
                <ReactTimeago date={c.timestamp} className={classes.comment__time} />
              </div>
            </div>
          ))}
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
            className={classes.comment__input}
          />
          <button onClick={handleCommentSubmit} className={classes.comment__submit}>
            댓글 달기
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('popup-root')
  );
};

export default CommentPopup;