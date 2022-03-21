import { createUseStyles } from 'react-jss';
import { BORDER, ROUNDED, BOX_SHADOW, CARD_BACKGROUND_COLOR } from '../styles';

const useStyles = createUseStyles({
  root: {
    border: BORDER,
    borderRadius: ROUNDED,
    padding: 20,
    backgroundColor: CARD_BACKGROUND_COLOR,
    boxShadow: BOX_SHADOW,
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
});

export function Card({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

export default Card;
