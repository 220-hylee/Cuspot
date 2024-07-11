import React, { forwardRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ReactPlayer from "react-player";
import ReactTimeago from "react-timeago";
import Style from "./Style";
import CommentPopup from "./CommentPopup"; // CommentPopup 컴포넌트 가져오기
import Love from "../../../assets/images/love.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";




// 서버와의 통신을 위한 함수들
const fetchLikes = async (postId) => {
  const response = await fetch(`/api/posts/${postId}/likes`);
  const data = await response.json();
  return data.likesCount;
};

// const fetchUserLikeStatus = async (postId, userId) => {
//   const response = await fetch(`/api/posts/${postId}/likes/${userId}`);
//   const data = await response.json();
//   return data.liked;
// };


// const updateLikes = async (postId, newLikesCount, userId, liked) => {
//   await fetch(`/api/posts/${postId}/likes`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ likesCount: newLikesCount, userId, liked }),
//   });
// };


// const fetchLikes = async (postId) => {
//   const response = await axios.get(`http://3.35.205.229:8080/api/getLikes/${postId}`);
//   return response.data.likesCount;
// };


const Post = forwardRef(
  ({ postId, profile, username, timestamp, description, fileType, fileData, userId,like,userEmail}, ref) => {
    const classes = Style();
    // 좋아요 갯수
    const { data: likesCount = like } = useQuery(["likes", postId], () => fetchLikes(postId));
    // 좋아요 상태 Like or Unlike
    const [liked, setLiked] = useState(false);
    const { email } = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    // 댓글
    const [comments, setComments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // toggle에 필요한 옵션
    const [show, setShow] = useState(false); // 수정 삭제 옵션 표시 상태 추가

    // 피드 삭제하기
    // 삭제 버튼 누를시 동작
    const deleteBoard = async  () => {
      try {
        await deleteBoardMutation.mutateAsync();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
    
    const deleteBoardMutation = useMutation(
      async () => {
        await axios.delete(`http://3.35.205.229:8080/api/deleteBoard/${postId}`)
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('board'); // 쿼리 캐시 무효화
        },
      }
    )

       // // 좋아요 상태 가져오기
       useEffect(() => {
        axios.get(`http://3.35.205.229:8080/api/getLiked/${postId}/${email}`)
          .then(response => {
            setLiked(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []); 
        
    const updateLikes = useMutation(
      async ({ postId, newLikesCount, email }) => {
        setLiked(!liked);
        // 좋아요 갯수 업데이트
        await axios.post(`http://3.35.205.229:8080/api/updateLike/${postId}/${newLikesCount}`);
        // 좋아요 삭제하기
        if (liked) {
          await axios.delete(`http://3.35.205.229:8080/api/deleteLike/${postId}/${email}`);
        } else {
          // 좋아요 생성하기
          await axios.post("http://3.35.205.229:8080/api/insertLike", {
            email: email,
            boardid: postId,
          });
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('board');
        },
      }
    );

    const handleLike = () => {
      const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
      updateLikes.mutate({ postId, newLikesCount, email });
    };

    const handleCommentClick = () => {
      setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };

    const addComment = (comment) => {
      setComments([...comments, comment]);
    };

    // 아이콘 누를시 작동
    const toggleOptions = () => {
      setShow(!show);
    };


    const Reactions = () => (
      
      <div className={classes.footer__stats}>
        
        <div>
          <img src={Love} alt="love-icon" />
        </div>
        {/* 좋아요 갯수 */}
        <h4>{likesCount}</h4>
        <section>
          <h4>
            {/* <TextsmsRoundedIcon className="icon-small" /> */}
            {/* {comments.length} Comments */}
          </h4>
        </section>
        <div></div>
      </div>
    );

    return (
      <Paper ref={ref} className={classes.post}>
        <div className={classes.post__header}>
          <Avatar src={profile} />
          <div className={classes.header__info}>
            <h4>{username}</h4>
            <p>
              <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} units="minute" />
            </p>
          </div>
          
          {userEmail === email && (
              show && (
                <div className={classes.post__options}>
                  {/* 수정 옵션 */}
                  {/* <div  onClick={() => {  }}>
                    <h4>수정</h4>
                  </div> */}
                  {/* 삭제 옵션 */}
                  <div onClick={() => {deleteBoard()}}>
                    <h4>삭제</h4>
                  </div>
                </div>
                )
              )}
          <MoreHorizOutlinedIcon onClick={toggleOptions} />
       
        </div>
        <div className={classes.post__body}>
          <div className={classes.body__description}>
            <p>{description}</p>
          </div>
          {fileData && (
            <div className={classes.body__image}>
              {fileType === "image" ? (
                <img src={fileData} alt="post" />
              ) : (
                <ReactPlayer url={fileData} controls={true} />
              )}
            </div>
          )}
        </div>
        <div className={classes.post__footer}>
          <Reactions />
          <div className={classes.footer__actions}>
            <div className={classes.action__icons} onClick={handleLike}>
              <ThumbUpRoundedIcon className={`icon_small ${liked ? "liked" : ""}`} />
              <h4>{liked ? "Unlike" : "Like"}</h4>
            </div>
            <div className={classes.action__icons} onClick={handleCommentClick}>
              <TextsmsRoundedIcon className="icon_small" />
              <h4>Comment</h4>
            </div>
        
          </div>
        </div>
        {isPopupOpen && <CommentPopup comments={comments} addComment={addComment} onClose={handleClosePopup} profile={profile} username={username} postId={postId}/>}
      </Paper>
    );
  }
);
export default Post;


//================원본================================
// import React, { forwardRef, useEffect, useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Paper from "@material-ui/core/Paper";
// import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

// //아이콘 수정(전)
// // import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
// // import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
// // import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";

// //아이콘 수정(후)
// import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
// import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
// import ShareRoundedIcon from "@material-ui/icons/ShareRounded";

// import Like from "../../../assets/images/like.png";
// import Love from "../../../assets/images/love.png";
// import Care from "../../../assets/images/care.png";
// import ReactPlayer from "react-player";
// import ReactTimeago from "react-timeago";
// import Style from "./Style";
// // import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// // import CommentIcon from '@material-ui/icons/Comment';
// // import ShareIcon from '@material-ui/icons/Share';

// const Post = forwardRef(
//   ({ profile, username, timestamp, description, fileType, fileData }, ref) => {
//     const classes = Style();

//     const [likesCount, setLikesCount] = useState(1);
//     const [commentsCount, setCommentsCount] = useState(1);
//     const [sharesCount, setSharesCount] = useState(1);
//     const [likeIconOrder, setLikeIconOrder] = useState(1);
//     const [loveIconOrder, setLoveIconOrder] = useState(1);
//     const [careIconOrder, setCareIconOrder] = useState(1);

//     useEffect(() => {
//       setLikesCount(Math.floor(Math.random() * 1000) + 1);
//       setCommentsCount(Math.floor(Math.random() * 100) + 1);
//       setSharesCount(Math.floor(Math.random() * 10) + 1);
//       setLikeIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
//       setLoveIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
//       setCareIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
//     }, []);

//     const Reactions = () => {
//       return (
//         <div className={classes.footer__stats}>
//           <div>
//             {/* <img src={Like} style={{ order: `${likeIconOrder} ` }} alt="like-icon" /> */}
//             <img
//               src={Love}
//               style={{ order: `${loveIconOrder} ` }}
//               alt="love-icon"
//             />
//             {/* <img src={Care} style={{ order: `${careIconOrder} ` }} alt="care-icon" /> */}
//           </div>
//           <h4>
//             {/* <ThumbUpRoundedIcon className="icon-small" /> */}
//             {likesCount}
//           </h4>
//           <section>
//             <h4>
//               <TextsmsRoundedIcon className="icon-small" />
//               {commentsCount} Comments
//             </h4>
//             <h4>
//               <ShareRoundedIcon className="icon-small" />
//               {sharesCount} Shares
//             </h4>
//           </section>

//           <div></div>
//         </div>
//       );
//     };

//     return (
//       <Paper ref={ref} className={classes.post}>
//         <div className={classes.post__header}>
//           <Avatar src={profile} />
//           <div className={classes.header__info}>
//             <h4>{username}</h4>
//             <p>
//               <ReactTimeago
//                 date={new Date(timestamp?.toDate()).toUTCString()}
//                 units="minute"
//               />
//             </p>
//           </div>
//           <MoreHorizOutlinedIcon />
//         </div>
//         <div className={classes.post__body}>
//           <div className={classes.body__description}>
//             <p>{description}</p>
//           </div>
//           {fileData && (
//             <div className={classes.body__image}>
//               {fileType === "image" ? (
//                 <img src={fileData} alt="post" />
//               ) : (
//                 <ReactPlayer url={fileData} controls={true} />
//               )}
//             </div>
//           )}
//         </div>
//         <div className={classes.post__footer}>
//           <Reactions />
//           <div className={classes.footer__actions}>
//             <div className={classes.action__icons}>
//               {/* <ThumbUpAltOutlinedIcon /> */}
//               <ThumbUpRoundedIcon className="icon-small" />
//               <h4>Like</h4>
//             </div>
//             <div className={classes.action__icons}>
//               {/* <ChatBubbleOutlineOutlinedIcon /> */}
//               <TextsmsRoundedIcon className="icon-small" />
//               <h4>Comment</h4>
//             </div>
//             <div className={classes.action__icons}>
//               {/* <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} /> */}
//               <ShareRoundedIcon
//                 className="icon-small"
//                 style={{ transform: "scaleX(-1)" }}
//               />
//               <h4>Share</h4>
//             </div>
//           </div>
//         </div>
//       </Paper>
//     );
//   }
// );

// export default Post;
