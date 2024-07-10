import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import ReactTimeago from 'react-timeago';
import Style from './Style';



import { useSelector } from 'react-redux';
import axios from 'axios';

const CommentPopup = ({ onClose, comments, addComment, profile, username,postId }) => {

  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const classes = Style();
  const [comment, setComment] = useState('');
  const [list, setList] = useState([]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    
 
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        user: {
          icon: photoURL, // 여기에 사용자 아이콘 경로를 추가하세요
          name: displayName, // 여기에 사용자 이름을 추가하세요
        },
        timestamp: new Date(),
      };
      addComment(newComment);
      setComment('');   
    }
     // Spring boot 댓글 생성
     fetch("http://3.35.205.229:8080/api/insertComments", {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        boardid:postId,
        email: email,
        username: displayName,
        boardcomment: comment,
        profile: photoURL,
        createDate: new Date(),
      }),
  })
  
  };
// 댓글 목록 가져오기
  useEffect(() => {
  axios.get('http://3.35.205.229:8080/api/getCommentsList')
    .then(response => {
      setList(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
  return ReactDOM.createPortal(
    <div className={classes.popup__overlay}>
      <div className={classes.popup__content}>
        <div className={classes.popup__header}>
          <CloseIcon onClick={onClose} className={classes.popup__closeIcon} />
        </div>
        <div className={classes.popup__body}>
          {/* {comments.map((c, index) => (
            <div key={index} className={classes.comment}>
              <Avatar src={photoURL} className={classes.comment__icon} />
              <div className={classes.comment__details}>
                <h4>{displayName}</h4>
                <p style={{ whiteSpace: 'pre-wrap' }}>{c.text}</p>
                <ReactTimeago date={c.timestamp} className={classes.comment__time} />
              </div>
            </div>
          ))}  */}
          {/*  스프링부트 댓글 목록 */}
           
          {list
              .filter(list => list.boardid.id === postId)
              .map(list => (
                <div key={list.boardid} className={classes.comment}>
                  <Avatar src={list.profile} className={classes.comment__icon} />
                  <div className={classes.comment__details}>
                    <h4>{list.username}</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{list.boardcomment}</p>
                    <ReactTimeago date={list.createDate} className={classes.comment__time} />
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