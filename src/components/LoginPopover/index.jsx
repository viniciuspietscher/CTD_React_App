import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../../ui/components';
import { useUser } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';

const LOGIN = gql`
  query Login($username: String!) {
    login(username: $username) {
      id
      username
    }
  }
`;

function LoginPopover({ handleClose }) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { username: text },
  });

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleEnter = (event) => {
    event.key === 'Enter' && handleSubmitClick();
  };
  const handleSubmitClick = async () => {
    await login();
    console.log(data);
    setUser(data.login);
    handleClose();
    navigate('/home');
  };

  return (
    <Dialog title="Login" handleClose={handleClose}>
      <div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleEnter}
          autoFocus
        />
        {error && <span>{error.message}</span>}
      </div>
      <Button onClick={handleSubmitClick}>Login</Button>
    </Dialog>
  );
}

LoginPopover.propTypes = {
  handleClose: PropTypes.func,
};

export { LoginPopover };
