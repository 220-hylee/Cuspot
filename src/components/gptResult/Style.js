import { makeStyles } from "@material-ui/core/styles";
import { darkPrimary, darkSecondary, cuspotBlue, textDark } from "../../assets/Colors";

export default makeStyles((theme) => ({
  //----gptResult추가

  gpt_root: {    
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
    minWidth: "100%",
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

  // 뒤로가기 버튼
  // gpt_button: {
  //   width: '100px',  
  //   height: 30,
  //   border: "1px solid lightgrey",
  //   display: "flex",
  //   flexDirection: "column",
  //   borderRadius: 2,
  //   color: "white",
  //   backgroundColor: 'black',
  //   transition: 'all 0.5s ease', // 크기 변경 시 부드러운 애니메이션 추가
  //   '@media (max-width: 768px)': { // 화면 너비가 768px 이하일 때
  //     width: "50%",
  //     fontSize: "1.2rem",
  //   },
  //   '@media (max-width: 480px)': { // 화면 너비가 480px 이하일 때
  //     width: "40%",
  //     fontSize: "1rem",
  //   }
  // },    
}));
