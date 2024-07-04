import React, { forwardRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
//아이콘 수정(전)
// import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
// import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
//아이콘 수정(후)
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import TextsmsRoundedIcon from '@material-ui/icons/TextsmsRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import Like from "../../../assets/images/like.png";
import Love from "../../../assets/images/love.png";
import Care from "../../../assets/images/care.png";
import ReactPlayer from "react-player";
import ReactTimeago from "react-timeago";
import Style from "./Style";
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import CommentIcon from '@material-ui/icons/Comment';
// import ShareIcon from '@material-ui/icons/Share';
import CommentPopup from "./CommentPopup"; // CommentPopup 컴포넌트 가져오기
import Love from "../../../assets/images/love.png";

// 서버와의 통신을 위한 함수들
const fetchLikes = async (postId) => {
  const response = await fetch(`/api/posts/${postId}/likes`);
  const data = await response.json();
  return data.likesCount;
};

const fetchUserLikeStatus = async (postId, userId) => {
  const response = await fetch(`/api/posts/${postId}/likes/${userId}`);
  const data = await response.json();
  return data.liked;
};

const updateLikes = async (postId, newLikesCount, userId, liked) => {
  await fetch(`/api/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likesCount: newLikesCount, userId, liked }),
  });
};

const Post = forwardRef(
  ({ postId, profile, username, timestamp, description, fileType, fileData, userId }, ref) => {
    const classes = Style();
    const [likesCount, setLikesCount] = useState(1);
    const [commentsCount, setCommentsCount] = useState(1);

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [sharesCount, setSharesCount] = useState(1);
    const [likeIconOrder, setLikeIconOrder] = useState(1);
    const [loveIconOrder, setLoveIconOrder] = useState(1);
    const [careIconOrder, setCareIconOrder] = useState(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
      setLikesCount(Math.floor(Math.random() * 1000) + 1);
      setCommentsCount(Math.floor(Math.random() * 100) + 1);
      setSharesCount(Math.floor(Math.random() * 10) + 1);
      setLikeIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
      setLoveIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
      setCareIconOrder(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
    }, []);
    const Reactions = () => {
      return (
        <div className={classes.footer__stats}>
          <div>
            <img src={Like} style={{ order: `${likeIconOrder} ` }} alt="like-icon" />
            <img src={Love} style={{ order: `${loveIconOrder} ` }} alt="love-icon" />
            <img src={Care} style={{ order: `${careIconOrder} ` }} alt="care-icon" />
          </div>
          <div>
    </div>
        </div>
      );
    };
      const loadLikes = async () => {
        const initialLikesCount = await fetchLikes(postId);
        const userLiked = await fetchUserLikeStatus(postId, userId);
        setLikesCount(initialLikesCount);
        setLiked(userLiked);
      };
      loadLikes();
    }, [postId, userId]);

    const handleLike = async () => {
      const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
      setLikesCount(newLikesCount);
      setLiked(!liked);
      await updateLikes(postId, newLikesCount, userId, !liked);
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

    const Reactions = () => (
      <div className={classes.footer__stats}>
        <div>
          <img src={Love} alt="love-icon" />
        </div>
        <h4>{likesCount}</h4>
        <section>
          <h4>
            <TextsmsRoundedIcon className="icon-small" />
            {comments.length} Comments
          </h4>
          <h4>
            <ShareRoundedIcon className="icon-small" />
            {sharesCount} Shares
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
          <MoreHorizOutlinedIcon />
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
            <div className={classes.action__icons}>
              {/* <ThumbUpAltOutlinedIcon /> */}
              <ThumbUpRoundedIcon className="icon-small"/>
              <h4>Like</h4>
            <div className={classes.action__icons} onClick={handleLike}>
              <ThumbUpRoundedIcon className={`icon-small ${liked ? "liked" : ""}`} />
              <h4>{liked ? "Unlike" : "Like"}</h4>
            </div>
            <div className={classes.action__icons}>
              {/* <ChatBubbleOutlineOutlinedIcon /> */}
              <TextsmsRoundedIcon className="icon-small"/>
              <h4>Comment</h4>
            </div>
            <div className={classes.action__icons}>
              {/* <ReplyOutlinedIcon style={{ transform: "scaleX(-1)" }} /> */}
              <ShareRoundedIcon className="icon-small" style={{ transform: "scaleX(-1)" }} />
              <h4>Share</h4>
            </div>
          </div>
        </div>
        {isPopupOpen && <CommentPopup comments={comments} addComment={addComment} onClose={handleClosePopup} profile={profile} username={username}/>}
      </Paper>
    );
  }
);
export default Post;
