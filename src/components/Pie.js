import React from 'react';
import PropTypes from 'prop-types';

const Pie = props => {
  return (
    <div className="pieholder">
      <svg
        viewBox="0 0 64 64"
        className="pie"
        style={{
          animation: 'flashShadow 0.1s linear infinite',
          animationPlayState: `${props.alarmState}`
        }}
      >
        <circle
          r="25%"
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: `${props.circleTime} 100.53088`
          }}
        />
      </svg>
      <span id="time-left">
        {props.minDisplay}:{props.secDisplay}
      </span>
    </div>
  );
};

Pie.propTypes = {
  alarmState: PropTypes.string.isRequired,
  circleTime: PropTypes.number.isRequired,
  minDisplay: PropTypes.string.isRequired,
  secDisplay: PropTypes.string.isRequired
};

export default Pie;
