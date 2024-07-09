import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import Post from "./post/Post";
import db from "../../firebase";
import axios from 'axios';
import { useSelector } from "react-redux";
const Posts = () => {
  const classes = Style();
  // 이메일 정보 가져오기
  const { email } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  // 게시판 정보 담기
  const[board,setBoard] = useState([]);
  // 좋아요 상태 
  const[likeState,setLikeState] = useState([]);


  // 봄동에서 피드 데이터 가져오기
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snap) => setPosts(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  //   return unsubscribe;
  // }, []);

  useEffect(() => {

  },[]);
//------------------------------------------------------------
  //스프링 부트에서 데이터 가져오기
  // 전체 피드 목록 가져오기
  useEffect(() => {
     axios
     .get('http://3.35.205.229:8080/api/getBoardList')
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []);
  
  return (
    <div className={classes.posts}>
      <FlipMove style={{ width: "100%" }}>
        
        {/* 봄동에서 가져온 데이터 출력 */}
        {Array.from(posts).map((post) => (
          <Post
            key={post.id}
            profile={post.data.profile}
            username={post.data.username}
            timestamp={post.data.timestamp}
            description={post.data.description}
            fileType={post.data.fileType}
            fileData={post.data.fileData}
          />
        ))}

        {Array.from(board).map((board) => (
           <Post
           key={board.id}
           profile={board.profile}
           username={board.username}
           timestamp={board.data}
           description={board.content}
           fileType={board.fileType}
           fileData={board.fileData}
           postId={board.id}
           like={board.likes}
           email={board.email}
           />
        ))}
      </FlipMove>
      
    </div>
  );
};

const Style = makeStyles((theme) => ({
  posts: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default Posts;
