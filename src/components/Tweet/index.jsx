/*  COMPONENT NOTES 
    - This component uses a JSS approach to styling
    - JSS supports "SASS" syntax and lets us next selectors with the '&'
    - createUse styles returns a hook to us that can be invoked in the component
    - useStyles is a hook that takes an argument of a props object
    - We can use these props to conditionally render styles
*/

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { IconButton, MenuButton, MenuItem } from '../../ui/components';
import { ThumbsUp, Bookmark, MoreHorizontal } from 'react-feather';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from './Avatar';
import { useUser } from '../../contexts/UserContext';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

const useStyles = createUseStyles({
  root: {
    border: ({ promoted, theme }) =>
      promoted
        ? `1px solid ${theme.promoted.outline}`
        : `1px solid ${theme.container.outline}`,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    backgroundColor: ({ theme, promoted }) =>
      promoted ? theme.promoted.background : theme.container.background,
    boxShadow: 'rgb(11 11 11 / 20%) 0px 3px 6px 0px',
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  promotedLabel: {
    border: ({ theme }) => `1px solid ${theme.promoted.outline}`,
    padding: 4,
    color: ({ theme }) => theme.promoted.outline,
    fontSize: 10,
    borderRadius: 3,
  },
  tweetBody: {
    color: ({ theme }) => theme.translucent[80],
    fontSize: 14,
    paddingLeft: 20,
    marginBottom: 10,
    borderLeft: ({ theme }) => `3px solid ${theme.translucent[10]}`,
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //TODO remove duplicated styles here
  likeIcon: {
    color: ({ liked, theme }) =>
      liked ? theme.translucent[60] : theme.translucent[30],
    fill: ({ liked, theme }) => (liked ? theme.like : theme.translucent[0]),
    animation: ({ liked }) => (liked ? '$grow .5s ease' : ''),
    transition: 'fill .3s',
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 3,
    fontSize: 12,
    color: ({ theme }) => theme.translucent[30],
  },
  bookmarkButton: {
    color: ({ bookmarked, theme }) =>
      bookmarked ? theme.translucent[60] : theme.translucent[30],
    fill: ({ bookmarked, theme }) =>
      bookmarked ? theme.bookmark : theme.translucent[0],
    animation: ({ bookmarked }) => (bookmarked ? '$grow .5s ease' : ''),
    transition: 'fill .3s',
  },
  timeAgo: {
    color: ({ theme }) => theme.translucent[30],
    fontSize: 12,
    marginTop: 5,
  },
  moreButton: {
    color: ({ theme }) => theme.translucent[30],
  },
  '@keyframes grow': {
    '0%': { transform: 'scale(1)' },
    '20%': { transform: 'scale(1.3)' },
    '100%': { transform: 'scale(1)' },
  },
});

function Tweet({ id, text, createdAt, promoted, author, likes }) {
  const [liked, setLikes] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { theme } = useTheme();
  const styles = useStyles({ theme, promoted, liked, bookmarked });
  const { user } = useUser();

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo('en-US').format(new Date(createdAt));

  const handleToggleLike = () => setLikes((prev) => !prev);
  const handleToggleBookmark = () => setBookmarked((prev) => !prev);

  const handleCopyTweetClick = async () => {
    await navigator.clipboard.writeText(text);
    alert('Copied the text: ' + text);
  };

  return (
    <div className={styles.root} id={id}>
      <div className={styles.headerContainer}>
        <Avatar {...author} />
        {promoted && <span className={styles.promotedLabel}>Ad</span>}
      </div>
      <p className={styles.tweetBody}>
        {text}
        <div className={styles.timeAgo}>{timeAgo}</div>
      </p>
      <div className={styles.actionContainer}>
        <div>
          <IconButton
            className={styles.likeButton}
            variant="square"
            onClick={handleToggleLike}
          >
            <ThumbsUp className={styles.likeIcon} size={18} />
            <span className={styles.likeCount}>
              {liked ? (likes + 1).toLocaleString() : likes.toLocaleString()}
            </span>
          </IconButton>
          <IconButton variant="square" onClick={handleToggleBookmark}>
            <Bookmark className={styles.bookmarkButton} size={18} />
          </IconButton>
        </div>
        <div>
          <MenuButton
            element={
              <IconButton variant="square">
                <MoreHorizontal className={styles.moreButton} size={18} />
              </IconButton>
            }
          >
            {user.id === author.id && <MenuItem>Edit</MenuItem>}
            <MenuItem onClick={handleCopyTweetClick}>Copy Tweet</MenuItem>
          </MenuButton>
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  promoted: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }),
};

export { Tweet };
