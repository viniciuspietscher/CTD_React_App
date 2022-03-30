import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import {
  Box,
  IconButton,
  Card,
  CardContent,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <form>
          {items.map((item, index) => (
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={item.checked} />}
                onChange={() => handleCheckClick(index)}
                label={item.text}
              />
            </FormGroup>
          ))}
        </form>
        <form onSubmit={handleAddNewItem}>
          <TextField
            value={newItem}
            onChange={handleNewItemChange}
            label="New item"
            variant="standard"
            InputProps={{
              endAdornment: (
                <IconButton color="primary" aria-label="add" component="span">
                  <AddCircleOutlineIcon />
                </IconButton>
              ),
            }}
          />
        </form>
        <CompletionBar completed={completed} total={items.length} />
      </CardContent>
    </Card>
  );
}

export default List;
