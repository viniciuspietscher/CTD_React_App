import { flexbox } from '@mui/system';
import { createUseStyles } from 'react-jss';
import { GREY, LIGHT_ON_DARK_TEXT_COLOR } from '../styles';

const useStyles = createUseStyles({
  root: {
    color: LIGHT_ON_DARK_TEXT_COLOR,
    boxSizing: 'border-box',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: GREY[700],
    padding: '20px 30px',
  },
});

export function Footer({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>Created by Karson Kalt 2022</span>
      <span>Find me around the web</span>
    </div>
  );
}
export default Footer;
