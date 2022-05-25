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
    boxShadow: 'rgb(210 210 210) 0px 3px 6px 0px',
  },
  username: {
    fontWeight: 'bold',
  },
  tweeBody: {
    fontSize: 14,
    paddingLeft: 20,
    borderLeft: '3px solid #0000001a',
    color: '#000000a1',
  },
  likes: {
    color: '#000000a1',
    fontSize: 12,
  },
  button: {
    padding: 8,
    fontSize: 12,
    borderRadius: 3,
    marginRight: 10,
    background: 'none',
    color: (props) => (props.liked ? '#ff4e4e' : '#3685ff'),
    borderWidth: 1,
    borderColor: (props) => (props.liked ? '#ff4e4e' : '#3685ff'),
    '&:hover': {
      backgroundColor: '#b5b5b51a',
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
      <span className={styles.username}>{username}</span>
      <p className={styles.tweeBody}>{content}</p>
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
      <span className={styles.likes}>{likes} Likes</span>
    </div>
  );
}
