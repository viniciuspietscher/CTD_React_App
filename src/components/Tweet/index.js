import { useState } from 'react';
// import './index.css'
// import styles from './index.module.css';
// import styles from './index.module.scss';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    padding: 20,
    backgroundColor: (promoted) => promoted ? '#ffedcf' : '',
    border: (promoted) => promoted ? '1px solid #ffb53b' : '1px solid #a3a3a3',
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    '&:first-child': {
      marginTop: 20
    }
  },
  button: {
    padding: 10,
    marginLeft: 10,
    '&:hover': {
      backgroundColor: 'green'
    }
  }
});

export const Tweet = ({ username, content, promoted }) => {
  const styles = useStyles(promoted);

  const [likes, setLikes] = useState(0);
  const handleAddLike = (event) => setLikes(likes + 1);
  const handleRemoveLike = (event) => setLikes(likes - 1);

  return (
    <div
      //className="Tweet"
      className={styles.root}
    >
      <h3>{username}</h3>
      <p>{content}</p>
      <span>{likes} Likes</span>
      {likes === 0 && (
        <button onClick={handleAddLike} className={styles.button}>
          Like
        </button>
      )}
      {likes > 0 && <button onClick={handleRemoveLike}>Remove Like</button>}
    </div>
  );
};
