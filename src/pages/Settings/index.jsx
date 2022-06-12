import React, { useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

function Settings() {
  const { user } = useUser();

  const navigate = useNavigate();

  //   TODO is there a better place for these redirects?
  useEffect(function navigateToWelcomeIfNotLoggedIn() {
    if (!user) navigate('/');
  }, []);

  return (
    <div>
      <h2>Settings</h2>
    </div>
  );
}

export { Settings };
