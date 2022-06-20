import React, { useEffect } from 'react';
import { TweetsContainer } from '../../components/TweetsContainer';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { Toast } from '../../ui/components/Toast';

export function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(function navigateAwayIfNotLoggedIn() {
    if (!user) navigate('/');
  }, []);

  return (
    <>
      <TweetsContainer />
      <Toast>Welcome to the homepage</Toast>
    </>
  );
}
