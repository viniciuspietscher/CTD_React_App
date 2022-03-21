import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    marginTop: 10,
    width: '100%',
  },
});

export function CompletionBar({ completed, total }) {
  const classes = useStyles();
  return <progress className={classes.root} value={completed} max={total} />;
}

export default CompletionBar;
