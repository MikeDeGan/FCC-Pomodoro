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
      </div>
    );
  }
}

export default App;
