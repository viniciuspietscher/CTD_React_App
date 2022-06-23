import React from 'react';
import { createUseStyles } from 'react-jss';
import { useToast } from '../../../contexts/ToastContext';
import { Toast } from '../Toast';

const useStyles = createUseStyles({
  root: {
    position: 'fixed',
    left: 20,
    bottom: 65,
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
  },
});

function ToastContainer() {
  const styles = useStyles();
  const { toasts } = useToast();

  // Do not show the ToastContainer if there are no toasts
  if (!toasts.length) return <></>;

  return (
    <div className={styles.root}>
      {toasts.map((toast) => (
        <Toast {...toast} />
      ))}
    </div>
  );
}

ToastContainer.propTypes = {};

export { ToastContainer };
