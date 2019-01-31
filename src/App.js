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
      timeRemaining: 20
    };
  }

  handleDownArrow() {
    console.log('down arrow click');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div className="pieholder">
          <svg viewBox="0 0 64 64" className="pie">
            <circle r="25%" cx="50%" cy="50%" />
          </svg>
        </div>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" />
        <div id="break-length" />
        <button id="break-increment" />
        <div id="session-label">Session Length</div>
        <div className="arrowholder">
          <SVGUpArrow id="session-increment" onClick={this.handleDownArrow} />
          <SVGDownArrow id="session-decrement" onClick={this.handleDownArrow} />
        </div>
        <div id="session-length" />
        <button id="session-increment" />
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
