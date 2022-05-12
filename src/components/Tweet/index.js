import { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    padding: 20,
    backgroundColor: (promoted) =>
      promoted ? 'rgb(197, 126, 54)' : 'rgb(184, 199, 245)',
    border: (promoted) =>
      promoted ? 'rgb(233, 155, 46)' : '1px solid rgb(54, 92, 197)',
    borderRadius: 10,
    margin: '0 10 10 10',
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
});

export const Tweet = ({ username, content, promoted }) => {
  const styles = useStyles(promoted);

  const [likes, setLikes] = useState(0);
  const handleAddLike = (event) => setLikes(likes + 1);
  const handleRemoveLike = (event) => setLikes(likes - 1);

  return (
    <div
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
