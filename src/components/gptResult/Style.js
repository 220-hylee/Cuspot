import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  tr: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
});

export default useStyles;
