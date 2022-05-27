import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const buttonStyles = {
  padding: 8,
  fontSize: 12,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  color: 'white',
  '&:hover': {
    backgroundColor: '#2161c4',
  },
};

const useStyles = createUseStyles({
  contained: {
    ...buttonStyles,
    border: 'none',
    color: 'white',
    backgroundColor: '#3685ff',
    '&:hover': {
      backgroundColor: '#2161c4',
    },
  },
  outlined: {
    ...buttonStyles,
    background: 'none',
    color: '#3685ff',
    borderColor: '#3685ff',
    '&:hover': {
      backgroundColor: '#b5b5b51a',
    },
  },
});

const Button = ({ children, variant = 'outlined', onClick }) => {
  const styles = useStyles();
  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'contained']),
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export { Button };
