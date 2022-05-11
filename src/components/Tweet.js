import { useState } from 'react';

export const Tweet = ({ username, content }) => {
  const [likes, setLikes] = useState(0);
  const handleAddLike = (event) => setLikes(likes + 1);
  const handleRemoveLike = (event) => setLikes(likes - 1);

  return (
    <div className="tweet">
      <h3>{username}</h3>
      <p>{content}</p>
      <span>{likes} Likes</span>
      {likes === 0 && <button onClick={handleAddLike}>Like</button>}
      {likes > 0 && <button onClick={handleRemoveLike}>Remove Like</button>}
    </div>
  );
};
