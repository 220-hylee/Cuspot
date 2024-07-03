import React from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";
import { useSelector } from "react-redux";

const GroupChat = () => {
  const { displayName, photoURL, email } = useSelector((state) => state.user);
  // const iframeSrc = `http://localhost:3001/?displayName=${displayName}&photoURL=${photoURL}&email=${email}`;

  

   React.useEffect(() => {
    fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            username: displayName,
            profile: photoURL,
        }),
    })
    .then(response => {
        console.log(`response`, response);   
        if (response.status === 201) {
            return response.json();     
        } else {
            return null;
        }
    })
    .then(data => {
        // 여기서 데이터 처리
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, [email, displayName, photoURL]);
  
  const classes = Style();
  return (
    
    
    
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
          <iframe src="https://chat-9eb84.web.app" width="100%" height="870px" title="chat"></iframe>
        </Grid>
           
      </Grid>
      
    </div>
  );
};

export default GroupChat;
