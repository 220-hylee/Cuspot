import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import Post from "./post/Post";
import db from "../../firebase";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
const Posts = () => {
  const classes = Style();
  // 이메일 정보 가져오기

  const [posts, setPosts] = useState([]);
  // 게시판 정보 담기
  const[board,setBoard] = useState([]);
  const info = useSelector(state => state.session.info);

  // 봄동에서 피드 데이터 가져오기
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snap) => setPosts(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  //   return unsubscribe;
  // }, []);

//------------------------------------------------------------
    // 스프링부트 전체 피드 가져오기
    const fetchData = async () => {
      
      try {
        const response = await axios.get('http://3.35.205.229:8080/api/getBoardList');
       
        if(response == null){
          response.data = "";
        }
        
        return response.data;
      
      
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
    useQuery("board", fetchData, {
      onSuccess: (data) => setBoard(data),
      
    });
    
    
  
    return (
    <div className={classes.posts}>
      <FlipMove style={{ width: "100%" }}>
        
        {/* 봄동에서 가져온 데이터 출력 */}
        {/* {Array.from(posts).map((post) => (
          <Post
            key={post.id}
            profile={post.data.profile}
            username={post.data.username}
            timestamp={post.data.timestamp}
            description={post.data.description}
            fileType={post.data.fileType}
            fileData={post.data.fileData}
          />
        ))} */}

        {Array.from(board)
        .filter(board => board.category === info)
        .map((board) => (
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
           category={board.category}
           userEmail={board.email}
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
