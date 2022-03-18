import { useState } from 'react';
import List from './List';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({});

function CreateNewList() {
  return (
    <div>
      <form>
        List Name: <input type="text"></input>
      </form>
    </div>
  );
}

function Lists({ data }) {
  const classes = useStyles();

  const [showCreateList, setShowCreateList] = useState(false);

  function handleCreateListClick() {
    setShowCreateList((prev) => !prev);
  }
  return (
    <>
      <h2>My Lists</h2>
      <button onClick={handleCreateListClick}>+</button>
      {showCreateList && <CreateNewList />}
      {data.map((list) => (
        <List title={list.title} items={list.items} />
      ))}
    </>
  );
}
export default Lists;
