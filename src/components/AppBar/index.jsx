import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    height: 75,
    width: '100%',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: '#222',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    height: 75,
  },
});

export function AppBar({ children, title }) {
  const styles = useStyles();
  return (
    <>
      <div className={styles.root}>
        <span className={styles.title}>{title}</span>
        {children}
      </div>
      <div className={styles.spacer} />
      {/* Ensures that content is never hidden under the app bar */}
    </>
  );
}
