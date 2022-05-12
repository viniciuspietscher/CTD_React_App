import React from 'react';
import { useState } from 'react';
import { TweetsContainer } from './components/TweetsContainer';
import { NextStepsPopover } from './components/NextStepsPopover';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    padding: 20,
    fontFamily: 'Arial',
    backgroundColor: '#eee',
    minHeight: '100vh',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
    fontSize: 14,
    padding: 20,
    pointer: '',
  },
  loginButton: {
    padding: 8,
    fontSize: 16,
    border: 'none',
    borderRadius: 3,
    margin: 10,
    color: 'white',
    backgroundColor: '#3685ff',
    '&:hover': {
      backgroundColor: '#2161c4',
    },
  },
});

const App = () => {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);

  // Hooks
  const styles = useStyles();

  // Handlers
  const handleOpenNextStepsPopover = (event) => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = (event) => setNextStepsPopoverOpen(false);
  const handleLoginClick = (event) => setIsLoggedIn(true);

  return (
    <div className={styles.root}>
      <h1>CTD Twitter</h1>
      {!isLoggedIn && (
        <button onClick={handleLoginClick} className={styles.loginButton}>
          Login
        </button>
      )}
      {isLoggedIn && (
        <>
          <TweetsContainer />
          <footer className={styles.footer}>
            <span onClick={handleOpenNextStepsPopover}>Open next steps</span>
          </footer>
        </>
      )}
      {nextStepsPopoverOpen && (
        <NextStepsPopover handleClose={handleCloseNextStepsPopover} />
      )}
    </div>
  );
};

export default App;
