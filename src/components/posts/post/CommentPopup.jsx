import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import ReactTimeago from 'react-timeago';
import Style from './Style';



import { useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const CommentPopup = ({ onClose, comments, addComment, profile, username,postId }) => {

  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const classes = Style();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const [list, setList] = useState([]);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    
 
  };

  // 댓글 생성 하기
  const uploadComments = async (postId) => {
    const response = await fetch("http://192.168.123.26:8080/api/insertComments", {
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
     
    });

  };


  const mutation = useMutation(uploadComments, {
    onSuccess: () => {
      // invalidate and refetch
      queryClient.invalidateQueries('comments');
    },
  });




  const handleCommentSubmit = async() => {
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
      
      mutation.mutate(postId);
    
    }
   

  };


  // 댓글 목록 가져오기
  const fetchData = async () => {
      
      try {
        const response = await axios.get(`http://192.168.123.26:8080/api/getCommentsList/${postId}`);
       
        if(response == null){
          response.data = "";
        }
        
        return response.data;
      
      
      } catch (error) {
        throw new Error('Error fetching data');
      }
      
  };
  useQuery("comments", fetchData, {
    onSuccess: (data) => setList(data),
      
  });
  
// 댓글 삭제하기
// 삭제 버튼 누를시
const deleteComment = async (commentId) => {
  try {
    await deleteCommentMutation.mutateAsync(commentId);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};
 const deleteCommentMutation = useMutation(
  async (commentId) => {
    await axios.delete(`http://192.168.123.26:8080/api/deleteComments/${postId}/${email}/${commentId}`);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('comments'); // 쿼리 캐시 무효화
    },
  }
);
//------------------------------------------------------------------------------------------------------
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
          {list.map(item => (
                <div key={item.id} className={classes.comment}>
                  <Avatar src={item.profile} className={classes.comment__icon} />
                  <div className={classes.comment__details}>
                    {item.email === email && (
                      <h5 className={classes.comment__delete} onClick={() => deleteComment(item.id)}>삭제</h5>
                    )}
                    <h3>{item.username}</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{item.boardcomment}</p>
                    <ReactTimeago date={item.createDate} className={classes.comment__time} />
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