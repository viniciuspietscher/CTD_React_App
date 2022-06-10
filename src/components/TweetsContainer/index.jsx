/*  COMPONENT NOTES 
    - This component uses a CSS modules approach to styling
    - Styles are imported as an object as the default export
*/

import { useState, useRef } from 'react';
import { Button } from '../../ui/components';
import { Tweet } from '../Tweet';
import styles from './styles.module.css';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_TWEETS = gql`
  query {
    tweets {
      id
      text
      createdAt
      author {
        id
        username
        displayName
      }
      promoted
    }
  }
`;

export const TweetsContainer = () => {
  const [searchText, setSearchText] = useState('');
  const searchElement = useRef();

  const { data, loading } = useQuery(GET_ALL_TWEETS);

  const filteredTweets = data?.tweets.filter((tweet) => {
    return (
      tweet.author.displayName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      tweet.author.username.toLowerCase().includes(searchText.toLowerCase()) ||
      tweet.text.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleUpdateSearchText = (event) => setSearchText(event.target.value);
  const handleClearSearchText = () => setSearchText('');
  const handleFocusOnSearchField = () => searchElement.current.focus();

  return (
    <>
      <div>
        <div className="search">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            ref={searchElement}
            onChange={handleUpdateSearchText}
            value={searchText}
            style={{ fontSize: 16, padding: 5 }}
          />
          <Button onClick={handleClearSearchText}>Clear</Button>
          <Button onClick={handleFocusOnSearchField}>Focus Input</Button>
        </div>
        <div className={styles.tweetsContainerWrapper}>
          <div className={styles.tweetsContainer}>
            {loading && 'Loading...'}
            {!loading && filteredTweets.map((tweet) => <Tweet {...tweet} />)}
          </div>
        </div>
      </div>
    </>
  );
};
