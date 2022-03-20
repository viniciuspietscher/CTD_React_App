import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { HOVER_BUTTON, ROUNDED, TRANSPARENT } from '../styles';
import List from './List';
import NewList from './NewList';
import { v4 as uuid } from 'uuid';

const useStyles = createUseStyles({
  button: { marginBottom: 20 },
  root: { display: 'flex' },
  listOverview: {
    width: 200,
    marginRight: 20,
  },
  listDetail: {
    flexGrow: 1,
  },
  listName: {
    margin: 0,
    marginBottom: 5,
    ...HOVER_BUTTON,
  },
});

export function Lists({ data }) {
  const classes = useStyles();
  const [showCreateList, setShowCreateList] = useState(false);
  const [selectedList, setSelectedList] = useState(data[0]);

  function handleCreateListClick() {
    setShowCreateList((prev) => !prev);
  }

  function handleSelectedListClick(index) {
    setSelectedList(data[index]);
  }

  return (
    <>
      <button className={classes.button} onClick={handleCreateListClick}>
        {showCreateList ? 'Cancel' : 'New List'}
      </button>
      {showCreateList && <NewList />}
      <div className={classes.root}>
        <div className={classes.listOverview}>
          <h2>Lists</h2>
          {data.map((list, index) => (
            <h4
              className={classes.listName}
              key={index}
              onClick={() => handleSelectedListClick(index)}
            >
              {list.title}
            </h4>
          ))}
        </div>
        <div className={classes.listDetail}>
          <List
            title={selectedList.title}
            items={selectedList.items}
            key={uuid()}
          />
        </div>
      </div>
    </>
  );
}
export default Lists;
