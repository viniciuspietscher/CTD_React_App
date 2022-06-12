import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { IconButton } from '../index';
import { X } from 'react-feather';
import { useTheme } from '../../../contexts/ThemeContext';

const useStyles = createUseStyles({
  background: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  dialog: {
    backgroundColor: ({ theme }) => theme.container.background,
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    margin: '15% auto',
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
    maxWidth: ({ maxWidth }) => maxWidth,
    color: ({ theme }) => theme.translucent[70],
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: ({ theme }) => theme.translucent[70],
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    color: ({ theme }) => theme.translucent[60],
  },
});

const Dialog = ({ children, handleClose, title, maxWidth = 400 }) => {
  const { theme } = useTheme();
  const styles = useStyles({ theme, maxWidth });
  return (
    <div className={styles.background}>
      <div className={styles.dialog}>
        <div className={styles.titleContainer}>
          <IconButton variant="round" onClick={handleClose}>
            <X className={styles.closeButton} size={20} />
          </IconButton>
          <span className={styles.title}>{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  handleClose: PropTypes.func,
  title: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export { Dialog };
