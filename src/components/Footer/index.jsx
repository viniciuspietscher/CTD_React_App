import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { NextStepsPopover } from '../NextStepsPopover';
import { useTheme } from '../../contexts/ThemeContext';

const useStyles = createUseStyles({
  footer: {
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: (theme) => theme.container.background,
    borderTop: (theme) => `1px solid ${theme.container.outline}`,
    fontSize: 14,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    color: (theme) => theme.translucent[70],
    textDecoration: 'none',
    padding: 5,
    borderRadius: 5,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: (theme) => theme.translucent[10],
    },
  },
});

export function Footer() {
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const [nextStepsPopoverOpen, setNextStepsPopoverOpen] = useState(false);

  const handleOpenNextStepsPopover = () => setNextStepsPopoverOpen(true);
  const handleCloseNextStepsPopover = () => setNextStepsPopoverOpen(false);

  return (
    <>
      <footer className={styles.footer}>
        <span
          className={styles.footerButton}
          onClick={handleOpenNextStepsPopover}
        >
          Ideas for Next Steps
        </span>
        <a
          href="https://github.com/karsonkalt"
          className={styles.footerButton}
          target="_blank"
        >
          Karson Kalt 2022
        </a>
      </footer>
      {nextStepsPopoverOpen && (
        <NextStepsPopover handleClose={handleCloseNextStepsPopover} />
      )}
    </>
  );
}
