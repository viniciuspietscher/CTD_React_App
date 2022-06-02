/*  COMPONENT NOTES
    - Normally the App component should not be this logic-based.
    - The App component wraps everything and should primarily be used for
      routing.
*/

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { TweetsContainer } from './components/TweetsContainer';
import { NextStepsPopover } from './components/NextStepsPopover';
import { LoginPopover } from './components/LoginPopover';
import { AppBar } from './components/AppBar';
import { NewTweetPopover } from './components/NewTweetPopover';
import { Edit2 } from 'react-feather';
import { Button, IconButton } from './ui/components';
import { UserContextProvider } from './contexts/UserContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

const useStyles = createUseStyles({
  root: {
    padding: 20,
    fontFamily: 'Arial',
    backgroundColor: '#eee',
    minHeight: '100vh',
  },
  footer: {
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
    fontSize: 14,
    padding: '10px 20px',
    pointer: '',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextSteps: {
    padding: 5,
    borderRadius: 5,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#d8d8d821',
    },
  },
});

function App() {
  // State
  const [isLoginPopoverOpen, setIsLoginPopoverOpen] = useState(false);
  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);
  const [isNewTweetFormOpen, setIsNewTweetFormOpen] = useState(false);

  // Hooks
  const styles = useStyles();

  // Variables
  // TODO this entire component needs to be moved down a level
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handlers
  const handleOpenNextStepsPopover = () => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = () => setNextStepsPopoverOpen(false);
  const handleOpenLoginPopover = () => setIsLoginPopoverOpen(true);
  const handleCloseLoginPopover = () => {
    setIsLoginPopoverOpen(false);
    setIsLoggedIn(true);
  };
  const handleOpenTweetForm = () => setIsNewTweetFormOpen(true);
  const handleCloseTweetForm = () => setIsNewTweetFormOpen(false);

  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <div className={styles.root}>
          <AppBar title="CTD Twitter">
            {!isLoggedIn && (
              <Button onClick={handleOpenLoginPopover}>Login</Button>
            )}
            {isLoggedIn && (
              <IconButton onClick={handleOpenTweetForm}>
                <Edit2 />
              </IconButton>
            )}
          </AppBar>
          {isLoggedIn && (
            <>
              <TweetsContainer />
              <footer className={styles.footer}>
                <span
                  className={styles.nextSteps}
                  onClick={handleOpenNextStepsPopover}
                >
                  Ideas for Next Steps
                </span>
                <span>Karson Kalt 2022</span>
              </footer>
            </>
          )}
          {nextStepsPopoverOpen && (
            <NextStepsPopover handleClose={handleCloseNextStepsPopover} />
          )}
          {isNewTweetFormOpen && (
            <NewTweetPopover handleClose={handleCloseTweetForm} />
          )}
          {isLoginPopoverOpen && (
            <LoginPopover handleClose={handleCloseLoginPopover} />
          )}
        </div>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
