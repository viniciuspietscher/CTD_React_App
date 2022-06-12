import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ReactLoading from 'react-loading';
import { Button, Dialog } from '../../ui/components';
import { useUser } from '../../contexts/UserContext';
import { useMutation, gql } from '@apollo/client';
import { useTheme } from '../../contexts/ThemeContext';

const CREATE_TWEET = gql`
  mutation CreateTweet($text: String!, $authorId: ID!) {
    createTweet(text: $text, authorId: $authorId) {
      id
    }
  }
`;

const useStyles = createUseStyles({
  tweetContainer: {
    boxSizing: 'border-box',
    resize: 'none',
    width: '100%',
    margin: 0,
    padding: 10,
    fontFamily: 'Arial',
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    borderRadius: 3,
    backgroundColor: ({ theme }) => theme.container.background,
    color: ({ theme }) => theme.translucent[80],
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Arial',
    color: ({ pastWarningCharacters, theme }) =>
      pastWarningCharacters ? theme.warning : theme.translucent[50],
  },
});

function NewTweetPopover({ handleClose }) {
  const { user } = useUser();
  const { theme } = useTheme();
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [submitTweet] = useMutation(CREATE_TWEET, {
    variables: {
      text: tweet,
      authorId: user.id,
    },
  });

  const characterCount = tweet.length;
  const MAX_CHARACTERS = 120; // Constant convention is all caps
  const WARNING_CHARACTERS = 20; // Constant convention is all caps
  const pastWarningCharacters =
    characterCount >= MAX_CHARACTERS - WARNING_CHARACTERS;
  const styles = useStyles({ theme, pastWarningCharacters });

  const handleSubmitTweetClick = async () => {
    if (tweet.trim() === '') {
      setError({ message: 'You can not submit a blank string' });
      return;
    }
    setLoading(true);
    try {
      const response = await submitTweet();
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const handleTweetChange = (event) => {
    if (event.target.value.length <= MAX_CHARACTERS)
      setTweet(event.target.value);
  };
  const handleClearTweetClick = () => setTweet('');

  return (
    <Dialog title="New Tweet" handleClose={handleClose}>
      {loading && <ReactLoading type="spin" color="f0f6ff" />}
      {!loading && (
        <>
          <div>
            <textarea
              name="tweet"
              rows="5"
              className={styles.tweetContainer}
              onChange={handleTweetChange}
              value={tweet}
            />
            <span className={styles.characterCount}>
              {characterCount} / {MAX_CHARACTERS}
            </span>
          </div>
          <Button onClick={handleClearTweetClick}>Clear</Button>
          <Button variant="contained" onClick={handleSubmitTweetClick}>
            Post
          </Button>
          {error && <span>{error.message}</span>}
        </>
      )}
    </Dialog>
  );
}

NewTweetPopover.propTypes = {
  handleClose: PropTypes.func,
};

export { NewTweetPopover };
