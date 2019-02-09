import React from 'react';
import PropTypes from 'prop-types';

const Settings = props => {
  return (
    <div id="adjustments">
      <div className="container">
        <div className="col-sm-2" />
        <span id="break-label" className="col-sm-3">
          Break Length
        </span>
        <span className="col-sm-2" />
        <span id="session-label" className="col-sm-3">
          Session Length
        </span>
        <div className="col-sm-2" />
      </div>

      <div className="arrowholder">
        {/* <div className="col-sm-2" /> */}

        <i
          className="fas fa-minus d-inline"
          id="break-decrement"
          onClick={props.handleDecreaseBreak}
        />
        <div id="break-length" className="d-inline">
          {props.breakLength}
        </div>
        <i
          className="fas fa-plus d-inline"
          id="break-increment"
          onClick={props.handleIncreaseBreak}
        />

        {/* <div className="col-sm-2" /> */}

        <i
          className="fas fa-minus d-inline"
          id="session-decrement"
          onClick={props.handleDecreaseSession}
        />
        <div id="session-length" className="d-inline">
          {props.sessionLength}
        </div>
        <i
          className="fas fa-plus d-inline"
          id="session-increment"
          onClick={props.handleIncreaseSession}
        />

        {/* <div className="col-sm-2" /> */}
      </div>

      <div id="alarm-settings">Alarm Settings</div>
      <input
        id="play-sound"
        type="checkbox"
        checked={props.playSound}
        onChange={props.handlePlaySound}
      />
      <label htmlFor="play-sound">Play Sound</label>
      <input
        id="flash"
        type="checkbox"
        checked={props.flash}
        onChange={props.handleFlash}
      />
      <label htmlFor="flash">Flash on Alarm</label>
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
