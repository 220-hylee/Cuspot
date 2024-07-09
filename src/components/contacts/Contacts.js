import React, { useState, useEffect, useRef } from "react";
import { Avatar, Tooltip, Paper, Divider, IconButton, Popover, Button } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import InfoBar from "../util/InfoBar";
import Style from "./Style";
import db from "../../firebase";
import { useSelector } from "react-redux";
import "./friend.css";
const Contacts = () => {
  const classes = Style();
  const [users, setUsers] = useState([]);
  const [friendSearch, setFriendSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendModal, setFriendModal] = useState(false);
  const { displayName, photoURL, email } = useSelector((state) => state.user);
  const [friends,setFriends] = useState([]);
  const modalBackground = useRef();
  useEffect(() => {
    
    // 전체 유저 정보 가져오기
    const unsubscribe = db
      .collection("users")
      .orderBy("date", "desc")
      .onSnapshot((snap) =>
        setUsers(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    return unsubscribe;
  }, []);

  // 검색한 친구 
  const handleInputChange = (e) => {
    setFriendSearch(e.target.value); // 입력값을 기준으로 friend 상태를 업데이트
  };

  const friendSubmit = (e) => {
    e.preventDefault();
  };


  //프로필을 누르면 실행 
  const handleAvatarClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  // 친구추가 닫으면 초기화
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // selectedUser에 내가 선택한 유저 값이 들어가면 newFriend에 해당 값들 넣기
  const handleAddFriend = () => {
    if (selectedUser) {
      const newFriend = {
        currentUserEmail: email,
        currentUserName: displayName,
        friendId: selectedUser.data.email,
        friendName: selectedUser.data.displayName,
      };

      // Firestore에 친구 관계 추가
      db.collection("friends")
        .add(newFriend)
        .then(() => {
          alert("친구 추가 완료:", newFriend);
        })
        .catch((error) => {
          alert("친구 추가 실패:", error);
        });
    }
    handleClose();
  };
  
  // 친구 정보 가져오기
  const unsubscribeFriends = db
  .collection("friends")
  .where("currentUserEmail", "==", email)
  .onSnapshot((snap) =>
    setFriends(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
  );

 

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper elevation={0} className={classes.contacts}>
      <Scrollbars autoHide autoHideDuration={200}>
        <Divider />
        <div className={classes.contacts__tab}>
          <h4>친구 리스트</h4>
          

          {/* 친구 추가 띄우기  */}
          <IconButton color="inherit" type="button" onClick={() => setFriendModal(true)}>
              <MoreHorizIcon/>
          </IconButton>
        </div>
        {
        friendModal &&
        <div className={'modal-container'} ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setFriendModal(false);
          }
        }}>
          <div className={'modal-content'}>
            <form onSubmit={friendSubmit}>
              <input
                className={classes.searchBar}
                type="text"
                placeholder="검색을 입력하세요"
                value={friendSearch}
                onChange={handleInputChange}
              />
            {/*  검색 버튼 */}
            <IconButton color="inherit" type="submit">
              <SearchIcon />
            </IconButton>
          </form>
             {/* 유저 정보  */}
              {users
                .filter((user) => user.data.displayName.includes(friendSearch))
                .map(({ id, data }) => (
                  <InfoBar
                    key={id}
                    Source={
                      <Tooltip placement="left" title={data.displayName} arrow>
                        <Avatar src={data.photoURL} onClick={(event) => handleAvatarClick(event, { id, data })} />
                      </Tooltip>
                    }
                    title={data.displayName}
                    online={true}
                    noTransform={true}
                    className="list"
                  />
                ))}
          </div>
        </div>
      }
      </Scrollbars>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>
          <Button variant="contained" color="primary" onClick={handleAddFriend}>
            친구 추가
          </Button>
        </div>
      </Popover>
    </Paper>
  );
};

export default Contacts;
