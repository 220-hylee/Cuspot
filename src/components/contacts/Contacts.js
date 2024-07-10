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
  const [friends, setFriends] = useState([]);
  const modalBackground = useRef();
  
  // 봄동에서 전체 유저 데이터 가져오기
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .orderBy("date", "desc")
      .onSnapshot((snap) =>
        setUsers(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    return unsubscribe;
  }, []);


  // 친구 리스트 가져오기
  useEffect(() => {
    const unsubscribe = db
      .collection("friends")
      .where("currentUserEmail", "==", email)
      .onSnapshot((snap) =>
        setFriends(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    return () => unsubscribe();
  }, [email]);

  const handleInputChange = (e) => {
    setFriendSearch(e.target.value);
  };

  const friendSubmit = (e) => {
    e.preventDefault();
  };

  const handleAvatarClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser({ ...user, isFriend: false });
  };

  const handleFriendClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser({ ...user, isFriend: true });
  };

  const handleDeleteFriend = () => {
    if (selectedUser) {
      db.collection("friends")
        .doc(selectedUser.id)
        .delete()
        .then(() => {
          alert("친구 삭제 완료");
        })
        .catch((error) => {
          alert("친구 삭제 실패:", error);
        });
    }
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };


  // 친구 추가하기
  const handleAddFriend = () => {
    if (selectedUser) {
      const newFriend = {
        currentUserEmail: email,
        currentUserName: displayName,
        friendId: selectedUser.data.email,
        friendName: selectedUser.data.displayName,
        photoURL: selectedUser.data.photoURL
      };

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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // 친구와 본인을 제외한 사용자 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.data.email !== email &&
      !friends.some((friend) => friend.data.friendId === user.data.email)
  );

  return (
    <Paper elevation={0} className={classes.contacts}>
      <Scrollbars autoHide autoHideDuration={200}>
        <Divider />
        <div className={classes.contacts__tab}>
          <h4>친구 리스트</h4>
          
          <IconButton color="inherit" type="button" onClick={() => setFriendModal(true)}>
            <MoreHorizIcon />
          </IconButton>
        </div>
        {/* 친구 리스트 정렬 */}
        {friends.map(({ id, data }) => (
              <InfoBar
                key={id}
                Source={
                  <Tooltip placement="left" title={data.friendId} arrow>
                    <Avatar src={data.photoURL} onClick={(event) => handleFriendClick(event, { id, data })} />
                  </Tooltip>
                }
                title={data.friendName}
                online={true}
                noTransform={true}
                className="list"
              />
            ))}
        
        {/* ... 누르면 친구 추가 가능 */}
        {friendModal && (
          <div
            className={"modal-container"}
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setFriendModal(false);
              }
            }}
          >
            <div className={"modal-content"}>
              <form onSubmit={friendSubmit}>
                <input
                  className={"search"}
                  type="text"
                  placeholder="검색을 입력하세요"
                  value={friendSearch}
                  onChange={handleInputChange}
                />
                <IconButton color="inherit" type="submit">
                  <SearchIcon />
                </IconButton>
              </form>
              {filteredUsers
                .filter((user) => user.data.displayName.includes(friendSearch))
                .map(({ id, data }) => (
                  <InfoBar
                    key={id}
                    Source={
                      <Tooltip placement="left" title={data.email} arrow>
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
        )}
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
        {selectedUser && selectedUser.isFriend ? (
          <div>
            <Button variant="contained" color="primary" onClick={handleDeleteFriend}>
              친구 삭제
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="contained" color="primary" onClick={handleAddFriend}>
              친구 추가
            </Button>
          </div>
        )}
      </Popover>
    </Paper>
  );
};

export default Contacts;
