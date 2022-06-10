/*  COMPONENT NOTES
    - The App component wraps everything and should primarily be used for
      routing.
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { Home, NotFound, About, Welcome, Template, User } from './pages';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Template>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Template>
          </BrowserRouter>
        </UserContextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
