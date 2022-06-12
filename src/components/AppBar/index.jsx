import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useUser } from '../../contexts/UserContext';
import { Button, IconButton, MenuButton, MenuItem } from '../../ui/components';
import { Edit2 } from 'react-feather';
import { LoginPopover, NewTweetPopover } from '../';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { SignupPopover } from '../SignupPopover';
import { useTheme } from '../../contexts/ThemeContext';

const useStyles = createUseStyles({
  root: {
    height: 50,
    width: '100%',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: (theme) => theme.container.background,
    borderBottom: (theme) => `1px solid ${theme.translucent[30]}`,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    height: 75,
  },
  title: {
    color: (theme) => theme.translucent[80],
    textDecoration: 'none',
  },
  tweetButton: {
    color: (theme) => theme.translucent[60],
  },
  toggleContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: { display: 'flex', alignItems: 'center' },
  checkbox: { accentColor: (theme) => theme.primary.main, cursor: 'pointer' },
});

function AppBar({ title }) {
  const { user, setUser } = useUser();
  const { toggleTheme, theme } = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();

  const [isSignupPopoverOpen, setIsSignupPopoverOpen] = useState(false);
  const [isLoginPopoverOpen, setIsLoginPopoverOpen] = useState(false);
  const [isNewTweetFormOpen, setIsNewTweetFormOpen] = useState(false);

  const handleOpenSignupPopover = () => setIsSignupPopoverOpen(true);
  const handleCloseSignupPopover = () => {
    setIsSignupPopoverOpen(false);
  };

  const handleOpenLoginPopover = () => setIsLoginPopoverOpen(true);
  const handleCloseLoginPopover = () => {
    setIsLoginPopoverOpen(false);
  };
  const handleOpenTweetForm = () => setIsNewTweetFormOpen(true);
  const handleCloseTweetForm = () => setIsNewTweetFormOpen(false);

  const navigateToProfile = () => navigate(`/user/${user.id}`);
  const navigateToUserSettings = () => navigate(`/settings`);

  const logout = () => {
    setUser(null);
    navigate('/');
  };
  return (
    <>
      <div className={styles.root}>
        <Link to="/" className={styles.title}>
          {title}
        </Link>
        <div className={styles.buttonContainer}>
          {!user && (
            <>
              <Button onClick={handleOpenSignupPopover}>Sign Up</Button>
              <Button variant="contained" onClick={handleOpenLoginPopover}>
                Login
              </Button>
            </>
          )}
          {user && (
            <>
              <IconButton onClick={handleOpenTweetForm}>
                <Edit2 className={styles.tweetButton} size={20} />
              </IconButton>
              <MenuButton
                element={<Button variant="contained">{user.username}</Button>}
              >
                <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
                <MenuItem onClick={navigateToUserSettings}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
                <MenuItem>
                  <span className={styles.toggleContainer}>
                    <span>Dark Mode</span>
                    <input
                      type="checkbox"
                      onClick={toggleTheme}
                      checked={theme.name === 'dark'}
                      className={styles.checkbox}
                    />
                  </span>
                </MenuItem>
              </MenuButton>
            </>
          )}
        </div>
      </div>
      <div className={styles.spacer} />
      {isSignupPopoverOpen && (
        <SignupPopover handleClose={handleCloseSignupPopover} />
      )}
      {isLoginPopoverOpen && (
        <LoginPopover handleClose={handleCloseLoginPopover} />
      )}
      {isNewTweetFormOpen && (
        <NewTweetPopover handleClose={handleCloseTweetForm} />
      )}
    </>
  );
}

AppBar.propTypes = {
  title: PropTypes.string,
};

export { AppBar };
