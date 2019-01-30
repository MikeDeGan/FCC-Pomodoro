import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 20,
      breakLength: 5,
      timeRemaining: 20
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div class="pieholder">
          <svg viewBox="0 0 64 64" class="pie">
            <circle r="25%" cx="50%" cy="50%" />
          </svg>
        </div>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" />
        <div id="break-length" />
        <button id="break-increment" />

        <div id="session-label">Session Length</div>
        <button id="session-decrement" />
        <div id="session-length" />
        <button id="session-increment" />
        <div id="timer-label">Session</div>
        <div id="time-left">mm:ss</div>
        <div className="btn-group">
          <button id="start-stop" class="btn-info">
            Start
          </button>
          <button id="reset" class="btn-info">
            Reset
          </button>
        </div>
        <audio src="" id="beep" />
      </div>
    );
  }
}

export default App;
