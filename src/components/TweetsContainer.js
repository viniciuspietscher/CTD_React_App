import { useState, useEffect, useRef } from 'react';
import { mockData } from '../constants/data';
import { Tweet } from './Tweet';


export const TweetsContainer = (props) => {
  // State
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isNewTweetFormOpen, setIsNewTweetFormOpen] = useState(false);

  // Ref
  const searchElement = useRef();

  // Effects
  useEffect(() => {
    setIsLoading(true);
    mockData.then((resp) => {
      console.log(resp);
      setIsLoading(false);
      setTweets(resp);
    });
  }, []);

  // Handlers
  const handleUpdateSearchText = (event) => setSearchText(event.target.value);
  const handleClearSearchText = (event) => setSearchText('');
  const handleOpenTweetForm = (event) => setIsNewTweetFormOpen(true);
  const handleFocusOnSearchField = (event) => searchElement.current.focus();

  const filteredTweets = tweets.filter((post) =>
    post.displayName.toLowerCase().includes(searchText.toLowerCase())
  );

  // When an item in the dependency array changes, then the anonymous function runs
  // If the array is empty, it only runs when the component initially mounts
  // If it is omitted, it runs every time the component re-renders

  return (
    <div>
      {!isNewTweetFormOpen && (
        <button className="newTweet" onClick={handleOpenTweetForm}>
          + New Tweet
        </button>
      )}
      {isNewTweetFormOpen && (
        <>
          <div>Enter your tweet here:</div>
          <textarea id="tweet-input" />
          <button>Post Tweet</button>
        </>
      )}
      <div className="search">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          ref={searchElement}
          onChange={handleUpdateSearchText}
          value={searchText}
          style={{ fontSize: 16, padding: 5 }}
        />
        <button onClick={handleClearSearchText}>Clear</button>
        <button onClick={handleFocusOnSearchField}>Focus Input</button>
      </div>
      {isLoading && 'loading'}
      {!isLoading &&
        filteredTweets.map((tweet) => (
          <Tweet username={tweet.displayName} content={tweet.content} promoted={tweet.promoted}></Tweet>
        ))}
    </div>
  );
};
