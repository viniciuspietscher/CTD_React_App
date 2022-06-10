import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../../ui/components';
import { useUser } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation SignUp($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
    }
  }
`;

function SignupPopover({ handleClose }) {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    displayName: '',
    bio: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  const handleTextChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmitClick = async () => {
    const resp = await signup({
      variables: {
        input: {
          ...form,
        },
      },
    });
    setUser(resp.data.createUser);
    handleClose();
    navigate('/home');
  };

  //TODO make components for form inputs
  //TODO this should be wrapped in a form
  return (
    <Dialog title="Signup" handleClose={handleClose}>
      <div>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleTextChange}
            autoFocus
          />
        </div>
        <div>
          <label for="displayName">Display name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={form.displayName}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label for="bio">Bio</label>
          <input
            type="text"
            name="bio"
            id="bio"
            value={form.bio}
            onChange={handleTextChange}
          />
        </div>
        {error && <span>{error.message}</span>}
      </div>
      <Button onClick={handleSubmitClick}>Sign Up</Button>
    </Dialog>
  );
}

SignupPopover.propTypes = {
  handleClose: PropTypes.func,
};

export { SignupPopover };
