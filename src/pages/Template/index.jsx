import React from 'react';
import { AppBar, Footer } from '../../components';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { ToastContainer } from '../../ui/components/ToastContainer';

const useStyles = createUseStyles({
  root: {
    padding: 20,
    fontFamily: 'Arial',
    backgroundColor: (theme) => theme.background,
    color: (theme) => theme.translucent[70],
    minHeight: '100vh',
  },
});

function Template({ children }) {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <div className={styles.root}>
      <AppBar title="CTD Twitter" />
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
}

Template.propTypes = {
  children: PropTypes.any,
};

export { Template };
