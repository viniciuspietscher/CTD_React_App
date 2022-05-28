import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../../ui_components';
import { useUser } from '../../contexts/useUser';

function LoginPopover({ handleClose }) {
  // State
  const [text, setText] = useState('');

  // Context
  const { setUsername } = useUser();

  // Handlers
  const handleTextChange = (event) => setText(event.target.value);
  const handleSubmitClick = () => {
    setUsername(text);
    handleClose();
  };

  return (
    <Dialog title="Login" handleClose={handleClose}>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <Button onClick={handleSubmitClick}>Login</Button>
    </Dialog>
  );
}

LoginPopover.propTypes = {
  handleClose: PropTypes.func,
};

export { LoginPopover };
