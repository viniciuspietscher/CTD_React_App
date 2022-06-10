import { createContext, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any,
};

export { UserContextProvider };

export const useUser = () => {
  return useContext(UserContext);
};
