import React from 'react';
import PropTypes from 'prop-types';

const Controls = props => {
  return (
    <div className="container button-holder">
      <div className="row">
        <div className="col-6">
          <button
            id="start_stop"
            className="btn-info"
            onClick={props.handleStart}
          >
            {props.startButton}
          </button>
        </div>
        <div className="col-6">
          <button id="reset" className="btn-info" onClick={props.handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  handleStart: PropTypes.func.isRequired,
  startButton: PropTypes.string.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Controls;
