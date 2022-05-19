/*  COMPONENT NOTES
    - This component uses a JSS approach to styling.
    - Constants related to this component are placed in a constants folder in
      the same directory
*/
import React from 'react';
import { createUseStyles } from 'react-jss';
import nextSteps from './constants';

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
  container: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
});

export default function NextStepsPopover(props) {
  const styles = useStyles();
  return (
    <div onClick={props.handleClose} className={styles.background}>
      <div className={styles.container}>
        <span>Options for next steps:</span>
        <ol>
          {nextSteps.map((step) => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
