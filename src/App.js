import React, { Component } from 'react';
import './App.scss';
import SVGDownArrow from './SVGDownArrow';
import SVGUpArrow from './SVGUpArrow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 20,
      breakLength: 5,
      minRemaining: '20',
      secRemaining: '00'
    };
    this.handleDownArrow = this.handleDownArrow.bind(this);
  }

  handleDownArrow() {
    let secs = this.state.sessionLength;
    secs = secs < 10 ? (secs = '0' + secs) : secs;
    this.setState({
      secRemaining: secs,
      sessionLength: this.state.sessionLength - 1
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div className="pieholder">
          <svg viewBox="0 0 64 64" className="pie">
            <circle r="25%" cx="50%" cy="50%" />
          </svg>
          <span id="countdown">
            {this.state.minRemaining}:{this.state.secRemaining}
          </span>
        </div>
        <div id="break-label">Break Length</div>
        <div className="arrowholder">
          <SVGUpArrow id="break-increment" onClick={this.handleDownArrow} />
          <SVGDownArrow id="break-decrement" onClick={this.handleDownArrow} />
        </div>

        <div id="break-length" />

        <div id="session-label">Session Length</div>
        <div className="arrowholder">
          <SVGUpArrow id="session-increment" onClick={this.handleDownArrow} />
          <SVGDownArrow id="session-decrement" onClick={this.handleDownArrow} />
        </div>
        <div id="session-length" />

        <div id="timer-label">Session</div>
        <div id="time-left">mm:ss</div>
        <div className="btn-group">
          <button id="start-stop" className="btn-info">
            Start
          </button>
          <button id="reset" className="btn-info">
            Reset
          </button>
        </div>
        <audio src="" id="beep" />
      </div>
    );
  }
}

export default App;
