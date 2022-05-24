/*  COMPONENT NOTES 
    - This component uses a JSS approach to styling
    - JSS supports "SASS" syntax and lets us next selectors with the '&'
    - createUse styles returns a hook to us that can be invoked in the component
    - useStyles is a hook that takes an argument of a props object
    - We can use these props to conditionally render styles
*/

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    border: (props) =>
      props.promoted ? '1px solid #feb500' : '1px solid #bbb',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    backgroundColor: (props) => (props.promoted ? '#fff7e3' : '#fff'),
  },
  button: {
    padding: 8,
    fontSize: 16,
    border: 'none',
    borderRadius: 3,
    margin: 10,
    color: 'white',
    backgroundColor: (props) => (props.liked ? '#ff4e4e' : '#3685ff'),
    '&:hover': {
      backgroundColor: (props) => (props.liked ? '#d24242' : '#2161c4'),
    },
  },
});

export function Tweet({ username, content, promoted }) {
  // State
  const [likes, setLikes] = useState(0);

  // Hooks
  const liked = Boolean(likes); // gives us a true or false if it is liked
  const styles = useStyles({ promoted, liked });

  // Handlers
  const handleAddLike = () => setLikes(likes + 1);
  const handleRemoveLike = () => setLikes(likes - 1);

  return (
    <div className={styles.root}>
      <h3>{username}</h3>
      <p>{content}</p>
      <span>{likes} Likes</span>
      {likes === 0 && (
        <button onClick={handleAddLike} className={styles.button}>
          Like
        </button>
      )}
      {likes > 0 && (
        <button onClick={handleRemoveLike} className={styles.button}>
          Remove Like
        </button>
      )}
    </div>
  );
}
