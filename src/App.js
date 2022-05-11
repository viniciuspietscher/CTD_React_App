import React from 'react';
import { useState } from 'react';
import { TweetsContainer } from './components/TweetsContainer';
import { NextStepsPopover } from './components/NextStepsPopover';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);

  const handleOpenNextStepsPopover = (event) => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = (event) => setNextStepsPopoverOpen(false);
  const handleLoginClick = (event) => setIsLoggedIn(true);

  return (
    <div>
      <h1>Twitter App</h1>
      {!isLoggedIn && <button onClick={handleLoginClick}>Login</button>}
      {isLoggedIn && (
        <>
          <TweetsContainer />
          <footer>
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
