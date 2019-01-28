import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div class="pieholder">
          <svg viewBox="0 0 64 64" class="pie">
            <circle r="25%" cx="50%" cy="50%" />
          </svg>
        </div>
        <span id="break-label">Break Length</span>
        <button id="break-decrement" />
        <span id="break-length" />
        <button id="break-increment" />
        <span id="session-label">Session Length</span>
        <button id="session-decrement" />
        <span id="session-length" />
        <button id="session-increment" />
      </div>
    );
  }
}

export default App;
