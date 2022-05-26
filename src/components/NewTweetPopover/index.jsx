import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { X } from 'react-feather';
import ReactLoading from 'react-loading';

const useStyles = createUseStyles({
  background: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    cursor: 'pointer',
    marginRight: 15,
    padding: 5,
    borderRadius: '100%',
    '&:hover': {
      backgroundColor: '#f0f6ff',
    },
  },
  title: {
    fontSize: 20,
  },
  tweetContainer: {
    boxSizing: 'border-box',
    resize: 'none',
    width: '100%',
    margin: 0,
    padding: 10,
    fontFamily: 'Arial',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Arial',
    color: (pastWarningCharacters) =>
      pastWarningCharacters ? '#ff4e4e' : '#797979',
  },
  button: {
    padding: 8,
    fontSize: 16,
    border: 'none',
    borderRadius: 3,
    marginTop: 10,
    marginRight: 10,
    color: 'white',
    backgroundColor: '#3685ff',
    '&:hover': {
      backgroundColor: '#2161c4',
    },
  },
});

export function NewTweetPopover({ handleClose }) {
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [username, setUsername] = useState('');

  const characterCount = tweet.length;
  const MAX_CHARACTERS = 30; // Constant convention is all caps
  const WARNING_CHARACTERS = 20; // Constant convention is all caps
  const pastWarningCharacters =
    characterCount >= MAX_CHARACTERS - WARNING_CHARACTERS;

  const styles = useStyles(pastWarningCharacters);

  const handlePostClick = async () => {
    if (tweet.trim() === '') {
      setError({ message: 'You can not submit a blank string' });
      return;
    }
    setLoading(true);

    // ES6 way of POST fetch using.then

    // fetch('http://localhost:3000/tweets', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify({
    //     displayName: username,
    //     content: tweet,
    //   }),
    // })
    //   .then((resp) => resp.json())

    // ES8 Async / Await
    try {
      const resp = await fetch('http://localhost:3000/tweets', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          displayName: username,
          content: tweet,
        }),
      });
      const json = await resp.json(); // should do something with this object
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <X onClick={handleClose} className={styles.icon} />
          <span className={styles.title}>New Tweet</span>
        </div>
        {loading && <ReactLoading type="spin" color="f0f6ff" />}
        {!loading && (
          <>
            <textarea
              name="tweet"
              rows="5"
              className={styles.tweetContainer}
              onChange={handleTweetChange}
              value={tweet}
            />
            <input
              type="text"
              name="displayName"
              onChange={handleUsernameChange}
              value={username}
            />
            <button onClick={handleClearTweetClick}>Clear</button>
            <button className={styles.button} onClick={handlePostClick}>
              Post
            </button>
            <span className={styles.characterCount}>
              {characterCount} / {MAX_CHARACTERS}
            </span>
            {error && <span>{error.message}</span>}
          </>
        )}
      </div>
    </div>
  );
}
