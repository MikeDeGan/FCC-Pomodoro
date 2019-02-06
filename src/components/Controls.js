import React from 'react';
import PropTypes from 'prop-types';

const Controls = props => {
  return (
    <div className="btn-group container">
      <div className="col-sm-4" />
      <button
        id="start_stop"
        className="btn-info col-sm-2"
        onClick={props.handleStart}
      >
        {props.startButton}
      </button>
      <button
        id="reset"
        className="btn-info col-sm-2"
        onClick={props.handleReset}
      >
        Reset
      </button>
      <div className="col-sm-4" />
    </div>
  );
};

Controls.propTypes = {
  handleStart: PropTypes.func.isRequired,
  startButton: PropTypes.string.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Controls;
