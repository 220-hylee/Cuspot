import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  app__header: {
    height: "8vh",
    borderBottom: "1px solid rgba(212, 212, 212,0.2)",
    zIndex: 100,
  },
  app__body: {
    height: "92vh",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  body__left: {
    position: 'fixed',
    left: 0,
    width: "100%",
    height: "100%",
  },
  body__friend: {
    position: 'fixed',
    
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  body__feed: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "flex-start",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },

  feed__stories: {
    width: "85%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    height: "220px",
    overflow: "hidden",
  },

  feed__form: {
    width: "85%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    height: "auto",
  },

  feed__posts: {
    width: "85%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    height: "auto",
    paddingBottom: 10,
  },
  body__right: {
    width: "100%",
    height: "100%",
  },
    //----gptResult추가
    gpt_divtable : {
      width : '100%',
    },


    gpt_root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      margin: 20,
      height: '100vh',
      backgroundColor: '#ffffff',
      color: 'white',
    },
    gpt_paperContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      border: '1px solid transparent', // 투명한 경계선 설정
      [theme.breakpoints.up('sm')]: {
        width: '80%',
      },
      [theme.breakpoints.up('md')]: {
        width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '50%',
      },
    },
    gpt_table :{
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(10),
      width: '100%',
      borderCollapse: 'collapse',
      border: "1px solid transparent",
    },
    gpt_th: {
      padding: '12px 8px',
      backgroundColor: '#1C1209',  // 배경색을 설정해주세요
      color: 'white',
      textAlign: 'center',
      border: '1px solid transparent',
      fontSize: '10px',
    },
    gpt_td: {
      border: "1px solid transparent",
      padding: '20px',
      textAlign: 'justyfy-center',
      fontSize: '15px',
      fontWeight: 'bold',
    },
   gpt_tr: {
      '&:nth-child(even)': {
        border: "1px solid transparent",
      },
      '&:hover': {
        backgroundColor: '#ddd',
      },
      fontSize: '20px',
    },
    gpt_logo: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      "& > img": {
        height: 35,
      }
    }, 
    gpt_tablebody: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      padding: "20px",
    },
      // 뒤로가기 버튼
      gpt_button: {
        width: '100',  
        height: 30,
        border: "1px solid lightgrey",
        display: "flex", // flex 속성 추가
        flexDirection: "column",
        borderRadius: 4,
        color: "white",
        // fontSize: 14,
        // fontWeight: 600,
        backgroundColor: 'black',
        transition: 'all 0.5s ease', // 크기 변경 시 부드러운 애니메이션 추가
          '@media (max-width: 768px)': { // 화면 너비가 768px 이하일 때
            width: "30%",
            fontSize: "1.2rem",
          },
          '@media (max-width: 480px)': { // 화면 너비가 480px 이하일 때
            width: "40%",
            fontSize: "1rem",
    }
        }
}));
