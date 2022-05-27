import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant }) => {
  return <button>{children}</button>;
};

Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'contained']).isRequired,
  children: PropTypes.string
};

Button.defaultProps = {
    variant: 'outlined'
  };

export { Button };
