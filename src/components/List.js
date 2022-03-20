import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import Card from '../layout/Card';
import ListItem from './ListItem';
import CompletionBar from './CompletionBar';
import { ROUNDED, TRANSPARENT } from '../styles';

const useStyles = createUseStyles({
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
  newItem: {
    border: 'none',
    backgroundColor: TRANSPARENT[50],
    borderRadius: ROUNDED,
    fontSize: 16,
    marginLeft: 25,
    marginTop: 15,
    padding: 5,
  },
});

export function List({ title, items: initialItems }) {
  const classes = useStyles();
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');

  const completed = items.reduce((counter, item) => {
    if (item.checked) counter += 1;
    return counter;
  }, 0);

  const handleCheckClick = (clickedIndex) => {
    setItems(
      items.map((item, index) => {
        if (index !== clickedIndex) return item;
        return { ...item, checked: !item.checked };
      })
    );
  };

  const handleAddNewItem = (event) => {
    event.preventDefault();
    if (newItem.trim()) {
      setItems([...items, { text: newItem.trim(), checked: false }]);
      setNewItem('');
    }
  };

  const handleNewItemChange = (event) => {
    event.preventDefault();
    setNewItem(event.target.value);
  };

  const listItems = items.map((item, index) => (
    <ListItem
      key={index}
      text={item.text}
      checked={item.checked}
      index={index}
      onChange={handleCheckClick}
    />
  ));

  return (
    <Card>
      <h2 className={classes.title}>{title}</h2>
      <form>{listItems}</form>
      <form onSubmit={handleAddNewItem}>
        <input
          type="text"
          className={classes.newItem}
          value={newItem}
          onChange={handleNewItemChange}
          placeholder="new item"
        ></input>
        <input type="submit" />
      </form>
      <CompletionBar completed={completed} total={items.length} />
    </Card>
  );
}

export default List;
