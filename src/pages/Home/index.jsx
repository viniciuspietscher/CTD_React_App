import React, { useEffect } from 'react';
import { TweetsContainer } from '../../components/TweetsContainer';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';

export function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { createToast } = useToast();

  useEffect(function navigateAwayIfNotLoggedIn() {
    if (!user) navigate('/');
  }, []);

  useEffect(() => {
    if (user) createToast(`Welcome back, ${user.username}`);
  }, []);

  return (
    <>
      <TweetsContainer />
    </>
  );
}
