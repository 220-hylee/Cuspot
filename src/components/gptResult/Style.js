import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  //----gptResult추가
  container: {
    display: 'flex',
    minWidth : '100%',
    justifyContent: 'center',
    alignContent: "flex-start",
    alignItems: 'center',
    // height: '100vh',
  },
  gpt_root: {    
    width: "100%",
    minHeight: "100vh", // 최소 높이를 화면 높이로 설정하여 화면 전체를 채움
    display: 'flex',
    alignContent: "flex-start",
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#ffffff',
    color: 'white',
    boxSizing: 'border-box',
  },

  GptResult : {
    width: "100%",
    minHeight: "100vh", // 최소 높이를 화면 높이로 설정하여 화면 전체를 채움
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    color: 'white',
    boxSizing: 'border-box',
  },
  gpt_logo: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    "& > img": {
      height: 80,
      alignItems: "center",
    }
  },  

  //가장 밖 페이퍼 크기 조정
  gpt_paper: { 
    // width: "100%",
    minWidth: "800",
    maxWidth: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: 0, // 내부 여백 추가
    margin: '10px', // 외부 여백 제거
    boxSizing: 'border-box',
  },

  //테이블
  gpt_tableContainer: { 
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin : '0px 50px',
    boxSizing: 'border-box',
    border: 'none', // 투명한 경계선 설정
  },

  gpt_table: {
    marginBottom: theme.spacing(5),
    alignItems: 'center',
    width: "100%",
    borderCollapse: 'collapse',
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
    fontSize: '15px',
    fontWeight: 'bold',
  },

  gpt_tr: {
    '&:nth-child(even)': {
      border: "1px solid transparent",
    },
    '&:hover': {
      backgroundColor: '#ddd',
      fontSize: '20px',
    },
  },

  gpt_tablebody: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: "20px",
  },
  
  // 버튼~
  fullWidthButtonGroup: {
    width: '100%', // 100% 너비 설정
    marginLeft: theme.spacing(4), // 여�� 설정L: theme.spacing(5), // 여�� 설정
    marginRight: theme.spacing(4), // 여�� 설정L: theme.spacing(5), // 여�� 설정
  },
  linkButton: {
    textDecoration: 'none',
    width: '50%', // 두 개의 버튼이 있을 경우 각각 50% 너비 설정
  },
  gpt_button: {
    width: '100%', // 버튼이 부모 요소의 너비를 채우도록 설정
    minWidth: '120px',
  }

}));
