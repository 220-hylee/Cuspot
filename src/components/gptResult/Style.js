import { makeStyles } from '@material-ui/core/styles';

const Style = makeStyles((theme) => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 8px',
    backgroundColor: '#ffffff',  // 배경색을 설정해주세요
    color: 'black',
    textAlign: 'center',
    border: '1px solid #ddd',
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
  },
  root: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#ffffff',
    color: 'white',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  tableContainer: {
    marginTop: theme.spacing(2),
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
  } 
}));

export default Style;