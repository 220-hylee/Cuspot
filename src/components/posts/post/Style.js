import { makeStyles } from "@material-ui/core/styles";
import { darkPrimary, darkSecondary, textDark } from "../../../assets/Colors";

export default makeStyles((theme) => ({
  post: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: theme.palette.type === "dark" && darkPrimary,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      border: 0,
      boxShadow: "none",
    },
  },

  post__header: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    "& > .MuiAvatar-root": {
      cursor: "pointer",
    },
    "& > .MuiSvgIcon-root": {
      color: theme.palette.type === "dark" ? textDark : "grey",
      cursor: "pointer",
      borderRadius: 999,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#FAFAFA",
      },
    },
  },

  header__info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
    "& > h4": {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 3,
    },
    "& > p": {
      color: "grey",
      fontSize: 12,
    },
  },

  post__body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  // 피드 토글 버튼
  post__options : {
       cursor: 'pointer'
  },

  body__description: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    paddingTop: 5,
    boxSizing: "border-box",
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
  },

  body__image: {
    width: "100%",
    display: "flex",
    // justifyContent: 'center',
    alignItems: "center",
    overflow: "hidden",
    "& > img": {
      width: "auto",
      height: "auto",
      objectFit: "contain",
      transition: "all 0.5s ease",
      marginLeft: "5px",

      "&:hover": {
        transform: "scale(1.1)",
        [theme.breakpoints.down("xs")]: {
          transform: "scale(1.0)",
        },
      },
    },
  },

  post__footer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 0,
  },

  footer__stats: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.type === "dark" ? darkSecondary : "lightgrey"}`,

    "& > div": {
      display: "flex",
      "& > img": {
        width: 18,
        height: 18,
      },
    },

    "& > h4": {
      flex: 1,
      color: theme.palette.type === "dark" && textDark,
      fontSize: 14,
      marginLeft: 5,
      fontWeight: 100,
    },

    "& > section": {
      display: "flex",
      alignItems: "center",

      "& > h4": {
        color: theme.palette.type === "dark" && textDark,
        fontSize: 13,
        marginLeft: 10,
        fontWeight: 100,
      },
    },
  },

  footer__actions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 4,
  },

  icon_small  : {
    fontSize : '12px',
  }, 

  action__icons: { // 좋아요, 커멘트, 공유 아이콘
    flex: 1,
    display: "flex",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    padding: "5px 0",
    borderRadius: 4,
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: theme.palette.type === "dark" ? "lightgrey" : darkSecondary,
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? darkSecondary : "#FAFAFA",
    },
    [theme.breakpoints.down("xs")]: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "& > .MuiSvgIcon-root": {
      color: theme.palette.type === "dark" && textDark,
      [theme.breakpoints.down("xs")]: {
        fontSize: 18, //아이콘 크기
      },
    },
    "& > h4": {
      color: theme.palette.type === "dark" && textDark,
      marginLeft: 4,
      [theme.breakpoints.down("xs")]: {
        fontSize: 15, // 아이콘 옆 폰트 사이즈
        fontWeight: 100,
      },
    },
  }, 
  popup__overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in-out",
  },

  popup__content: {
    background: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: 600,
    width: "100%",
    animation: "slideIn 0.3s ease-in-out",
  },

  popup__header: {
    display: "flex",
    justifyContent: "flex-end",
  },

  popup__closeIcon: {
    cursor: "pointer",
  },

  popup__body: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },

  comment: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    flexDirection: "row", // 추가: 가로로 배치
  },

  comment__icon: {
    marginRight: "10px",
  },

  // 댓글
  //삭제 버튼
  comment__delete: {
    textAlign: "right",
      cursor: 'pointer', 
  },
  comment__details: {
    display: "flex",
    flexDirection: "column",
    "& > h4": {
      margin: 0,
      fontSize: "14px",
      fontWeight: "bold",
    },
    "& > p": {
      margin: "5px 0 0 0",
      fontSize: "14px",
    },
    "& > .MuiTypography-root": {
      fontSize: "12px",
      color: "gray",
    },
  },

  comment__time: {
    fontSize: "12px",
    color: "gray",
  },

  comment__input: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid lightgray",
    resize: "none",
    fontSize: "16px",
  },

  comment__submit: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: 'black',
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: textDark,
    },
  },

  "@keyframes fadeIn": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },

  "@keyframes slideIn": {
    from: {
      transform: "translateY(-50px)",
    },
    to: {
      transform: "translateY(0)",
    },
  },
}));

//==================== 원본 ====================================
// import { makeStyles } from "@material-ui/core/styles";
// import { darkPrimary, darkSecondary, textDark } from "../../../assets/Colors";

// export default makeStyles((theme) => ({

//   post: {
//     width: "100%",
//     height: "auto",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: 10,
//     backgroundColor: theme.palette.type === "dark" && darkPrimary,
//     [theme.breakpoints.down("xs")]: {
//       borderRadius: 0,
//       border: 0,
//       boxShadow: "none",
//     },
//   },

//   post__header: {
//     width: "100%",
//     height: "auto",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 10,
//     "& > .MuiAvatar-root": {
//       cursor: "pointer",
//     },
//     "& > .MuiSvgIcon-root": {
//       color: theme.palette.type === "dark" ? textDark : "grey",
//       cursor: "pointer",
//       borderRadius: 999,
//       transition: "all 0.3s ease",
//       "&:hover": {
//         backgroundColor: "#FAFAFA",
//       },
//     },
//   },

//   header__info: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     marginLeft: 10,
//     "& > h4": {
//       fontSize: 16,
//       fontWeight: 600,
//       marginBottom: 3,
//     },
//     "& > p": {
//       color: "grey",
//       fontSize: 12,
//     },
//   },

//   post__body: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },

//   body__description: {
//     display: "flex",
//     alignItems: "center",
//     padding: 10,
//     paddingTop: 5,
//   },

//   body__image: {
//     width: "100%",
//     display: "flex",
//     // justifyContent: 'center',
//     alignItems: "center",
//     overflow: "hidden",
//     "& > img": {
//       width: "auto",
//       height: "auto",
//       objectFit: "contain",
//       transition: "all 0.5s ease",
//       marginLeft: "5px",
      
//       "&:hover": {
//         transform: "scale(1.1)",
//         [theme.breakpoints.down("xs")]: {
//           transform: "scale(1.0)",
//         },
//       },
//     },
//   },
  
//   post__footer: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: 10,
//     paddingBottom: 0,
//   },

//   footer__stats: {
//     display: "flex",
//     alignItems: "center",
//     paddingBottom: 10,
//     borderBottom: `1px solid ${theme.palette.type === "dark" ? darkSecondary : "lightgrey"}`,

//     "& > div": {
//       display: "flex",
//       "& > img": {
//         width: 18,
//         height: 18,
//       },
//     },

//     "& > h4": {
//       flex: 1,
//       color: theme.palette.type === "dark" && textDark,
//       fontSize: 14,
//       marginLeft: 5,
//       fontWeight: 100,
//     },

//     "& > section": {
//       display: "flex",
//       alignItems: "center",

//       "& > h4": {
//         color: theme.palette.type === "dark" && textDark,
//         fontSize: 13,
//         marginLeft: 10,
//         fontWeight: 100,//수정중
//       },
//     },
//   },

//   footer__actions: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     padding: 4,
//   },

//   action__icons: { // 좋아요, 커멘트, 공유 아이콘
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 2,
//     padding: "5px 0",
//     borderRadius: 4,
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     color: theme.palette.type === "dark" ? "lightgrey" : darkSecondary,
//     "&:hover": {
//       backgroundColor: theme.palette.type === "dark" ? darkSecondary : "#FAFAFA",
//     },
//     [theme.breakpoints.down("xs")]: {
//       "&:hover": {
//         backgroundColor: "transparent",
//       },
//     },
//     "& > .MuiSvgIcon-root": {
//       color: theme.palette.type === "dark" && textDark,
//       [theme.breakpoints.down("xs")]: {
//         fontSize: 16,
//       },
//     },
//     "& > h4": {
//       color: theme.palette.type === "dark" && textDark,
//       marginLeft: 4,
//       [theme.breakpoints.down("xs")]: {
//         fontSize: 12,
//       },
//     },
//   },
  
// }));
