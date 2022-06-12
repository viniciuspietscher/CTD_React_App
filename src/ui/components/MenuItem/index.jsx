import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/ThemeContext';

const useStyles = createUseStyles({
  root: {
    borderBottom: '1px solid #ccc',
    padding: 10,
    fontSize: 13,
    cursor: ({ onClick }) => (onClick ? 'pointer' : 'auto'),
    '&:hover': {
      backgroundColor: ({ onClick, theme }) => onClick && theme.translucent[10],
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

function MenuItem({ children, onClick }) {
  const { theme } = useTheme();
  const styles = useStyles({ onClick, theme });
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  );
}

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export { MenuItem };
