import { createUseStyles } from 'react-jss';
import { borderColor, boxShadow } from '../styles';

const useStyles = createUseStyles({
  root: {
    border: `1px solid ${borderColor}`,
    borderRadius: 5,
    padding: 20,
    boxShadow: boxShadow,
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  title: {
    margin: 0,
    marginBottom: 10,
  },
  item: {
    display: 'block',
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  checkbox: {
    marginRight: 10,
  },
});

export default function List({ title, items }) {
  const classes = useStyles();

  const listItems = items.map((item, index) => (
    <span className={classes.item}>
      <input
        className={classes.checkbox}
        type="checkbox"
        id={index}
        name={item}
        value={index}
      />
      <label for={index}>{item}</label>
    </span>
  ));

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{title}</h2>
      <form>{listItems}</form>
    </div>
  );
}
