import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',

  },
  toolbar: {
    height: '70px',
  },
  content: {
    marginTop: '30px',
    flexGrow: '1',
    padding: '2em',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '0px',
    },
  },

}));
