import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.jsx';
import { randomColor } from '../../../util/randomColor.js';

const useStyles = createUseStyles({
  root: {
    display: 'inline-flex',
    textDecoration: 'none',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    backgroundColor: ({ color }) => color,
    marginRight: 10,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
    boxSizing: 'border-box',
    '&:hover': {
      border: ({ theme }) => `2px solid ${theme.primary.main}`,
      cursor: 'pointer',
    },
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: ({ theme }) => theme.translucent[60],
  },
  displayName: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 3,
    color: ({ theme }) => theme.translucent[90],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  username: {
    fontSize: 13,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function Avatar({ id, username, displayName, color = randomColor() }) {
  const { theme } = useTheme();
  const styles = useStyles({ theme, color });
  const avatarLetter = displayName[0];
  return (
    <Link className={styles.root} to={`/user/${id}`}>
      <div className={styles.avatarCircle}>{avatarLetter}</div>
      <div className={styles.nameContainer}>
        <div className={styles.displayName}>{displayName}</div>
        <div className={styles.username}>{username}</div>
      </div>
    </Link>
  );
}

Avatar.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export { Avatar };
