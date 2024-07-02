import { makeStyles } from '@material-ui/core/styles';
import { cuspotBlue } from "../../assets/Colors";


const Style = makeStyles((theme) => ({
  divtable : {
    width : '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 8px',
    backgroundColor: '#1C1209',  // 배경색을 설정해주세요
    color: 'white',
    textAlign: 'center',
    border: '1px solid #ddd',
    fontSize: '12px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'justyfy-center',
  },
  tr: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
    '&:hover': {
      backgroundColor: '#ddd',
    },
    fontSize: '20px',
  },
  // root: {
  //   padding: 20,
  //   margin : 20,
  //   height: '100vh',
  //   backgroundColor: '#ffffff',
  //   color: 'white',
  // },
  
  // loadingContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '100px',
  // },
  // tableContainer: {
  //   marginTop: theme.spacing(2),
  // },

  // logo: {
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 20,
  //   "& > img": {
  //     height: 35,
  //   }
  // }, 

  // tablebody : {
  //   fontSize: "20px",
  //   fontWeight: "bold",
  //   color: "black",
  //   textAlign: "center",
  //   padding: "20px"
  // }
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    height: '100vh',
    backgroundColor: '#ffffff',
    color: 'white',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  tableContainer: {
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    "& > img": {
      height: 35,
    }
  }, 
  tablebody: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: "20px",
  },
    // 뒤로가기 버튼
    button: {
      width:250,  
      height: 30,
      border: "1px solid lightgrey",
      borderRadius: 4,
      color: "white",
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: 'black',
      },
}));

export default Style;