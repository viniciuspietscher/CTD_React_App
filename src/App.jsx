/*  COMPONENT NOTES
    - The App component wraps everything and should primarily be used for
      routing.
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ToastContextProvider } from './contexts/ToastContext';
import {
  Home,
  NotFound,
  About,
  Welcome,
  Template,
  User,
  Settings,
} from './pages';
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
          <ToastContextProvider>
            <BrowserRouter>
              <Template>
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Template>
            </BrowserRouter>
          </ToastContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
