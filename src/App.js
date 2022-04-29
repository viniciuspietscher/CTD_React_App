import React from 'react';
import { useState, useEffect, useRef } from 'react';

// JSS
const spacer = 20;

const buttonStyle = {
  padding: 8,
  fontSize: 16,
  border: 'none',
  borderRadius: 3,
  margin: 10,
};

const containedButton = {
  ...buttonStyle,
  color: 'white',
  backgroundColor: '#3685ff',
  '&:hover': {
    color: '#2161c4',
  },
};

const outlinedButton = {
  ...buttonStyle,
  background: 'none',
  border: '1px solid black',
};

const styles = {
  root: {
    padding: spacer,
    fontFamily: 'Arial',
    backgroundColor: '#eee',
    minHeight: '100vh',
  },
  searchContainer: {
    marginBottom: spacer,
    fontSize: 16,
  },
  newTweetButton: {
    ...containedButton,
  },
  likeButton: {
    ...containedButton,
  },
  loginButton: {
    ...containedButton,
  },
  clearButton: {
    ...outlinedButton,
    borderColor: '#a9a9a9',
    color: '#a9a9a9',
  },
  removeLikeButton: {
    ...outlinedButton,
    borderColor: '#ff4e4e',
    color: '#ff4e4e',
  },
  newTweetArea: {
    fontFamily: 'Arial',
    fontSize: 18,
    padding: 20,
    width: 300,
    height: 200,
  },
  searchLabel: {
    marginRight: spacer,
  },
  tweet: {
    border: '1px solid #bbb',
    borderRadius: 5,
    padding: spacer,
    marginBottom: spacer,
    backgroundColor: '#fff',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
    fontSize: 14,
    padding: spacer,
    pointer: '',
  },
  nextStepsPopoverBackground: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  nextStepsPopoverContainer: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
};

// Mock data from server
const response = [
  {
    displayName: 'Oprah Winfrey',
    content:
      'HI TWITTERS . THANK YOU FOR A WARM WELCOME. FEELING REALLY 21st CENTURY .',
  },
  {
    displayName: 'Jack Dorsey',
    content: 'just setting up my twttr',
  },
  {
    displayName: 'Cher',
    content:
      'I was looking at tweets & saw that i really hurt someones feelings ! Im sorry. It was light blue background with white egg shape . Bye',
  },
  {
    displayName: 'Martha Stewart',
    content: 'L',
  },
];

// Mock delayed fetch call
const mockData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(response);
  }, 3000);
});

const nextSteps = [
  ' Hoist search text state to App, render Tweets component from App instead of as a child of Search',
  'Create an "add post" form and show created posts',
  'Another suggestion?',
];

const Tweet = ({ username, content }) => {
  const [likes, setLikes] = useState(0);
  const handleAddLike = (event) => setLikes(likes + 1);
  const handleRemoveLike = (event) => setLikes(likes - 1);

  return (
    <div className="tweet" style={styles.tweet}>
      <h3>{username}</h3>
      <p>{content}</p>
      <span>{likes} Likes</span>
      {likes === 0 && (
        <button onClick={handleAddLike} style={styles.likeButton}>
          Like
        </button>
      )}
      {likes > 0 && (
        <button onClick={handleRemoveLike} style={styles.removeLikeButton}>
          Remove Like
        </button>
      )}
    </div>
  );
};

const TweetsContainer = (props) => {
  // state
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isNewTweetFormOpen, setIsNewTweetFormOpen] = useState(false);

  // ref
  const searchElement = useRef();

  // side effects
  useEffect(() => {
    setIsLoading(true);
    mockData.then((resp) => {
      console.log(resp);
      setIsLoading(false);
      setTweets(resp);
    });
  }, []);

  // event handlers
  const handleUpdateSearchText = (event) => setSearchText(event.target.value);
  const handleClearSearchText = (event) => setSearchText('');
  const handleOpenTweetForm = (event) => setIsNewTweetFormOpen(true);
  const handleFocusOnSearchField = (event) => searchElement.current.focus();

  const filteredTweets = tweets.filter((post) =>
    post.displayName.toLowerCase().includes(searchText.toLowerCase())
  );

  // When an item in the dependency array changes, then the anonymous function runs
  // If the array is empty, it only runs when the component initially mounts
  // If it is ommitted, it runs every time the component re-renders

  return (
    <div>
      {!isNewTweetFormOpen && (
        <button
          className="newTweet"
          style={styles.newTweetButton}
          onClick={handleOpenTweetForm}
        >
          + New Tweet
        </button>
      )}
      {isNewTweetFormOpen && (
        <>
          <div>Enter your tweet here:</div>
          <textarea id="tweet-input" style={styles.newTweetArea} />
          <button>Post Tweet</button>
        </>
      )}
      <div className="search" style={styles.searchContainer}>
        <label htmlFor="search" style={styles.searchLabel}>
          Search
        </label>
        <input
          id="search"
          ref={searchElement}
          onChange={handleUpdateSearchText}
          value={searchText}
          style={{ fontSize: 16, padding: 5 }}
        />
        <button onClick={handleClearSearchText} style={styles.clearButton}>
          Clear
        </button>
        <button onClick={handleFocusOnSearchField}>Focus Input</button>
      </div>
      {isLoading && 'loading'}
      {!isLoading &&
        filteredTweets.map((tweet) => (
          <Tweet username={tweet.displayName} content={tweet.content}></Tweet>
        ))}
    </div>
  );
};

const NextStepsPopover = (props) => {
  return (
    <div onClick={props.handleClose} style={styles.nextStepsPopoverBackground}>
      <div style={styles.nextStepsPopoverContainer}>
        <span>Options for next steps:</span>
        <ol>
          {nextSteps.map((step) => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);

  const handleOpenNextStepsPopover = (event) => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = (event) => setNextStepsPopoverOpen(false);
  const handleLoginClick = (event) => setIsLoggedIn(true);

  return (
    <div style={styles.root}>
      <h1>Twitter App</h1>
      {!isLoggedIn && (
        <button onClick={handleLoginClick} style={styles.loginButton}>
          Login
        </button>
      )}
      {isLoggedIn && (
        <>
          <TweetsContainer />
          <footer style={styles.footer}>
            <span onClick={handleOpenNextStepsPopover}>Open next steps</span>
          </footer>
        </>
      )}
      {nextStepsPopoverOpen && (
        <NextStepsPopover handleClose={handleCloseNextStepsPopover} />
      )}
    </div>
  );
};

export default App;
