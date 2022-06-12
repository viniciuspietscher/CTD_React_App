import React, { useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Tweet } from '../../components/Tweet';

const GET_USER = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      id
      username
      displayName
      bio
      tweets {
        id
        text
        createdAt
        promoted
        id
        author {
          id
          username
          displayName
        }
      }
      location
    }
  }
`;

function User() {
  const { user } = useUser();
  const { userId } = useParams();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
  });

  const navigate = useNavigate();

  //   TODO is there a better place for these redirects?
  useEffect(function navigateToWelcomeIfNotLoggedIn() {
    if (!user) navigate('/');
  }, []);

  return (
    <div>
      {!loading && data && (
        <div>
          <h2>{data.user.displayName}</h2>
          <h3>{data.user.username}</h3>
          <h4>{data.user.bio}</h4>
          <h4>{data.user.location}</h4>
          <span>Tweets</span>
          {data.user.tweets.map((tweet) => (
            <Tweet {...tweet}></Tweet>
          ))}
        </div>
      )}
      {error && (
        <div>
          <h2>{error.message}</h2>
        </div>
      )}
    </div>
  );
}

export { User };
