import { useState } from 'react';
import { Button } from '../../ui/components';
import { createUseStyles } from 'react-jss';
import { Tweet } from '../Tweet';
import { useQuery, gql } from '@apollo/client';
import { useTheme } from '../../contexts/ThemeContext';

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
      likes
    }
  }
`;

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  filterSelector: {
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    borderRadius: 5,
    width: 200,
    minWidth: 200,
    marginRight: 20,
    overflow: 'hidden',
    position: 'sticky',
    top: 70,
  },
  filter: {
    padding: 10,
    color: ({ theme }) => theme.translucent[50],
    borderBottom: ({ theme }) => `1px solid ${theme.container.outline}`,
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: ({ theme }) => theme.translucent[10],
    },
  },
  selectedFilter: {
    padding: 10,
    color: ({ theme }) => theme.primary.text,
    borderBottom: ({ theme }) => `1px solid ${theme.container.outline}`,
    backgroundColor: ({ theme }) => theme.primary.main,
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: ({ theme }) => theme.primary.hover,
    },
  },
  tweetsContainer: {
    marginBottom: 50,
    width: 540,
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 25,
    fontSize: 14,
    padding: 5,
    width: '100%',
    backgroundColor: ({ theme }) => theme.container.background,
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    borderRadius: 5,
    marginRight: 10,
  },
});

export const TweetsContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [filterSelection, setFilterSelection] = useState('');
  const { theme } = useTheme();
  const styles = useStyles({ theme, filterSelection });

  const { data, loading } = useQuery(GET_ALL_TWEETS);

  const handleFilterClick = (event) => {
    setFilterSelection((prev) =>
      prev === event.target.innerText ? '' : event.target.innerText
    );
  };

  const handleUpdateSearchText = (event) => setSearchText(event.target.value);
  const handleClearSearchText = () => setSearchText('');

  const FILTER_OPTIONS = {
    Recent: (tweets) => {
      return [...tweets].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    Promoted: (tweets) => tweets.filter((tweet) => tweet.promoted),
    Search: (tweets) => {
      return tweets.filter((tweet) => {
        return (
          tweet.author.displayName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tweet.author.username
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tweet.text.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    },
  };

  const filteredTweets =
    filterSelection === ''
      ? data?.tweets
      : FILTER_OPTIONS[filterSelection](data?.tweets);

  return (
    <div className={styles.container}>
      <div className={styles.filterSelector}>
        {Object.keys(FILTER_OPTIONS).map((key) => {
          return (
            <div
              className={
                key === filterSelection ? styles.selectedFilter : styles.filter
              }
              onClick={handleFilterClick}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className={styles.tweetsContainer}>
        {filterSelection === 'Search' && (
          <div className={styles.search}>
            <input
              id="search"
              onChange={handleUpdateSearchText}
              value={searchText}
              className={styles.searchInput}
              placeholder="Search"
            />
            <Button onClick={handleClearSearchText}>Clear</Button>
          </div>
        )}
        {loading && 'Loading...'}
        {!loading &&
          filteredTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
      </div>
    </div>
  );
};
