import React from 'react';
import PropTypes from 'prop-types';

const Settings = props => {
  return (
    <div id="adjustments">
      <div className="container">
        <div className="row">
          <span id="break-label" className="col-6">
            Break Length
          </span>
          <span id="session-label" className="col-6">
            Session Length
          </span>
        </div>

        <div className="row">
          <div className="col-6">
            <i
              className="fas fa-minus d-inline plusminus"
              id="break-decrement"
              onClick={props.handleDecreaseBreak}
            />
            <div id="break-length" className="d-inline">
              {props.breakLength}
            </div>
            <i
              className="fas fa-plus d-inline plusminus"
              id="break-increment"
              onClick={props.handleIncreaseBreak}
            />
          </div>
          <div className="col-6">
            <i
              className="fas fa-minus d-inline plusminus"
              id="session-decrement"
              onClick={props.handleDecreaseSession}
            />
            <div id="session-length" className="d-inline">
              {props.sessionLength}
            </div>
            <i
              className="fas fa-plus d-inline plusminus"
              id="session-increment"
              onClick={props.handleIncreaseSession}
            />
          </div>

          <div className="row options">
            <div className="col-6">
              <input
                id="play-sound"
                type="checkbox"
                checked={props.playSound}
                onChange={props.handlePlaySound}
              />
              <label htmlFor="play-sound">Play Sound</label>
            </div>
            <div className="col-6">
              <input
                id="flash"
                type="checkbox"
                checked={props.flash}
                onChange={props.handleFlash}
              />
              <label htmlFor="flash">Flash on Alarm</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  handleIncreaseBreak: PropTypes.func.isRequired,
  breakLength: PropTypes.number.isRequired,
  handleDecreaseBreak: PropTypes.func.isRequired,
  handleIncreaseSession: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired,
  handleDecreaseSession: PropTypes.func.isRequired,
  playSound: PropTypes.bool.isRequired,
  handlePlaySound: PropTypes.func.isRequired,
  flash: PropTypes.bool.isRequired,
  handleFlash: PropTypes.func.isRequired
};

export default Settings;
