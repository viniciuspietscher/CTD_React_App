import { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
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

export function ListItem({ text, checked: initialChecked, index, onChange }) {
  const classes = useStyles();

  return (
    <span className={classes.item}>
      <input
        className={classes.checkbox}
        type="checkbox"
        id={index}
        name={text}
        value={text}
        checked={initialChecked}
        onChange={() => onChange(index)}
      />
      <label htmlFor={index}>{text}</label>
    </span>
  );
}

export default ListItem;
