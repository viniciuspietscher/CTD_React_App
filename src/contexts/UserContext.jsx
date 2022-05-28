import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const setUsernameWrap = (string) => {
    console.log('this fired');
    setUsername(string);
  };
  const contextValue = { username, setUsername: setUsernameWrap };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any,
};

export { UserContextProvider };
