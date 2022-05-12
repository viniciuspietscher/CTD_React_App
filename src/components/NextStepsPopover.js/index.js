import {nextSteps} from '../../constants/nextSteps'

export const NextStepsPopover = (props) => {
    return (
      <div onClick={props.handleClose}>
        <div>
          <span>Options for next steps:</span>
          <ol>
            {nextSteps.map((step) => (
              <li>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };
