import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/ThemeContext';
import { IconButton } from '../IconButton';
import { X } from 'react-feather';

const PERSISTED_DURATION = 5000;
const ANIMATION_DURATION = 750;

const useStyles = createUseStyles({
  root: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    left: 20,
    bottom: 65,
    borderRadius: 5,
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    backgroundColor: ({ theme }) => theme.container.background,
    padding: 10,
    fontSize: 13,
    animationName: ({ open }) => (open ? '$slideIn' : '$slideOut'),
    animationDuration: ANIMATION_DURATION,
    animationFillMode: 'forwards',
  },
  text: {
    marginLeft: 10,
    maxWidth: 250,
  },
  '@keyframes slideIn': {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    to: { opacity: 1, transform: 'translateX(0%)' },
  },
  '@keyframes slideOut': {
    from: { opacity: 1, transform: 'translateX(0%)' },
    to: { opacity: 0, transform: 'translateX(-100%)' },
  },
  close: {
    cursor: 'pointer',
  },
});

function Toast({ children, persisted = false }) {
  const [open, setOpen] = useState(true);
  const { theme } = useTheme();
  const styles = useStyles({ theme, open });

  useEffect(() => {
    if (!persisted) {
      setTimeout(() => {
        setOpen(false);
      }, PERSISTED_DURATION);
    }
  }, []);

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <IconButton variant="round" onClick={handleCloseClick}>
        <X size={15} />
      </IconButton>
      <span className={styles.text}>{children}</span>
    </div>
  );
}

Toast.propTypes = {
  children: PropTypes.string.isRequired,
  persisted: PropTypes.bool,
};

export { Toast };
