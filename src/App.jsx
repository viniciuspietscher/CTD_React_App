/*  COMPONENT NOTES
    - Normally the App component should not be this logic-based.
    - The App component wraps everything and should primarily be used for
      routing.
*/

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { TweetsContainer } from './components/TweetsContainer';
import { NextStepsPopover } from './components/NextStepsPopover';
import { AppBar } from './components/AppBar';
import { NewTweetPopover } from './components/NewTweetPopover';
import { Edit2 } from 'react-feather';
import { Button, IconButton } from './ui_components';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);
  const [isNewTweetFormOpen, setIsNewTweetFormOpen] = useState(false);

  // Hooks
  const styles = useStyles();

  // Handlers
  const handleOpenNextStepsPopover = () => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = () => setNextStepsPopoverOpen(false);
  const handleOpenTweetForm = () => setIsNewTweetFormOpen(true);
  const handleCloseTweetForm = () => setIsNewTweetFormOpen(false);
  const handleLoginClick = () => setIsLoggedIn(true);

  return (
    <div className={styles.root}>
      <AppBar title="CTD Twitter">
        {!isLoggedIn && <Button onClick={handleLoginClick}>Login</Button>}
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
    </div>
  );
}

export default App;
