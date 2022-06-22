import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/ThemeContext';
import { IconButton } from '../IconButton';
import { X } from 'react-feather';
import { useToast } from '../../../contexts/ToastContext';

const PERSISTED_DURATION = 5000;
const ANIMATION_DURATION = 750;

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    backgroundColor: ({ theme }) => theme.container.background,
    padding: 10,
    fontSize: 13,
    animationName: '$slideIn',
    animationDuration: ANIMATION_DURATION,
    animationFillMode: 'forwards',
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  text: {
    marginLeft: 10,
    maxWidth: 250,
  },
  '@keyframes slideIn': {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    to: { opacity: 1, transform: 'translateX(0%)' },
  },
});

function Toast({ id, text, persisted }) {
  const { theme } = useTheme();
  const styles = useStyles({ theme });
  const { removeToast } = useToast();

  useEffect(() => {
    if (!persisted) {
      setTimeout(() => {
        removeToast(id);
      }, PERSISTED_DURATION);
    }
  }, []);

  return (
    <div className={styles.root}>
      <IconButton variant="round" onClick={() => removeToast(id)}>
        <X size={15} />
      </IconButton>
      <span className={styles.text}>{text}</span>
    </div>
  );
}

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  persisted: PropTypes.bool,
  id: PropTypes.number,
};

export { Toast };
