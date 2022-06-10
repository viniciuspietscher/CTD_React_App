/*  COMPONENT NOTES 
    - This component uses a JSS approach to styling
    - JSS supports "SASS" syntax and lets us next selectors with the '&'
    - createUse styles returns a hook to us that can be invoked in the component
    - useStyles is a hook that takes an argument of a props object
    - We can use these props to conditionally render styles
*/

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { IconButton } from '../../ui/components';
import { ThumbsUp } from 'react-feather';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  root: {
    border: (props) =>
      props.promoted
        ? `1px solid ${props.theme.promoted.outline}`
        : `1px solid ${props.theme.container.outline}`,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    backgroundColor: (props) =>
      props.promoted
        ? props.theme.promoted.background
        : props.theme.container.background,
    boxShadow: 'rgb(210 210 210) 0px 3px 6px 0px',
    width: '100%',
  },
  displayName: {
    fontWeight: 'bold',
  },
  username: {
    fontWeight: 'normal',
  },
  tweetBody: {
    fontSize: 14,
    paddingLeft: 20,
    borderLeft: (props) => `3px solid ${props.theme.translucent[10]}`,
    color: (props) => props.theme.translucent[70],
  },
  likes: {
    color: (props) => `3px solid ${props.theme.translucent[10]}`,
    fontSize: 12,
  },
  likedButton: {
    color: (props) => props.theme.primary.dark, // applying to the outline
    fill: (props) => props.theme.primary.main,
    stroke: 'broken',
    animation: '$grow .75s ease',
  },
  '@keyframes grow': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.3)' },
    '100%': { transform: 'scale(1)' },
  },
});

function Tweet({ id, text, createdAt, promoted, author }) {
  const { theme } = useTheme();
  const styles = useStyles({ theme, promoted });

  const [likes, setLikes] = useState(0);

  const handleAddLike = () => setLikes(likes + 1);
  const handleRemoveLike = () => setLikes(likes - 1);

  return (
    <div className={styles.root}>
      <span className={styles.username}>{author.username}</span>
      <p className={styles.tweetBody}>{text}</p>
      {likes === 0 && (
        <IconButton variant="round" onClick={handleAddLike}>
          <ThumbsUp />
        </IconButton>
      )}
      {likes > 0 && (
        <IconButton variant="round" onClick={handleRemoveLike}>
          <ThumbsUp className={styles.likedButton} />
        </IconButton>
      )}
      <span className={styles.likes}>{likes} Likes</span>
    </div>
  );
}

Tweet.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  promoted: PropTypes.bool,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }),
};

export { Tweet };
