import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../../ui/components';
import { useUser } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { useToast } from '../../contexts/ToastContext';

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
  const { createToast } = useToast();

  useEffect(() => {
    if(data?.login) {
      setUser(data.login);
      handleClose();
      navigate('/home');
      createToast(`Welcome back, ${data.login.username}`);
    }
  },[data])

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleEnter = (event) => {
    event.key === 'Enter' && handleSubmitClick();
  };
  const handleSubmitClick = () => {
      login();
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
