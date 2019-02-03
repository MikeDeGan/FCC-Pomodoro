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
      secRemaining: 1200,
      circleTime: 10,
      minDisplay: '20',
      secDisplay: '00',
      timerState: 'paused'
    };
    this.handleIncreaseBreak = this.handleIncreaseBreak.bind(this);
    this.handleDecreaseBreak = this.handleDecreaseBreak.bind(this);
    this.handleIncreaseSession = this.handleIncreaseSession.bind(this);
    this.handleDecreaseSession = this.handleDecreaseSession.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleIncreaseBreak() {
    let bLength = this.state.breakLength;
    if (bLength > 59 || this.state.timerState === 'running') {
      return;
    }
    bLength = bLength < 10 ? (bLength = '0' + bLength) : bLength;
    this.setState({
      breakLength: this.state.breakLength + 1
    });
  }

  handleDecreaseBreak() {
    let bLength = this.state.breakLength;
    if (bLength === 1 || this.state.timerState === 'running') {
      return;
    }
    bLength = bLength < 10 ? (bLength = '0' + bLength) : bLength;
    this.setState({
      breakLength: this.state.breakLength - 1
    });
  }

  handleIncreaseSession() {
    let sLength = this.state.sessionLength;
    if (sLength > 59 || this.state.timerState === 'running') {
      return;
    }
    sLength = sLength < 9 ? (sLength = '0' + sLength + 1) : sLength + 1;
    this.setState({
      sessionLength: sLength,
      minDisplay: sLength.toString(),
      secDisplay: '00',
      secRemaining: sLength * 60
      // circleTime: sLength * 60
    });
  }

  handleDecreaseSession() {
    let sLength = this.state.sessionLength;
    if (sLength === 1 || this.state.timerState === 'running') {
      return;
    }
    sLength =
      sLength < 10 ? (sLength = '0' + (sLength - 1).toString()) : sLength - 1;
    this.setState({
      sessionLength: sLength,
      minDisplay: sLength.toString(),
      secDisplay: '00',
      secRemaining: sLength * 60
      // circleTime: sLength * 60
    });
  }

  handleStart() {
    this.setState({ timerState: 'running' });
    const timerID = setInterval(() => {
      if (this.state.timerState === 'paused') {
        clearInterval(timerID);
        return;
      }
      const secs = this.state.secRemaining - 1;
      const cTime = (100.53088 / 1200) * (1200 - secs);
      console.log(cTime);
      let newMinDisplay =
        Math.floor(secs / 60) < 10
          ? '0' + Math.floor(secs / 60).toString()
          : Math.floor(secs / 60).toString();
      let newSecDisplay =
        secs % 60 < 10 ? '0' + (secs % 60).toString() : (secs % 60).toString();

      this.setState({
        secRemaining: secs,
        minDisplay: newMinDisplay,
        secDisplay: newSecDisplay,
        circleTime: cTime
      });
    }, 1000);
  }

  handleReset() {
    this.setState({ timerState: 'paused' });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div id="timer-label">Session</div>
        <div className="pieholder">
          <svg viewBox="0 0 64 64" className="pie">
            <circle
              r="25%"
              cx="50%"
              cy="50%"
              style={{
                strokeDasharray: `${this.state.circleTime} 100`
                // animation: `runClock ${this.state.circleTime}s linear infinite`,
                // animationPlayState: this.state.timerState
              }}
            />
          </svg>
          <span id="time-left">
            {this.state.minDisplay}:{this.state.secDisplay}
          </span>
        </div>

        <div id="adjustments">
          <div id="break-label">Break Length</div>
          <div className="arrowholder">
            <SVGUpArrow
              id="break-increment"
              onClick={this.handleIncreaseBreak}
            />
            <div id="break-length">{this.state.breakLength}</div>
            <SVGDownArrow
              id="break-decrement"
              onClick={this.handleDecreaseBreak}
            />
          </div>

          <div id="session-label">Session Length</div>
          <div className="arrowholder">
            <SVGUpArrow
              id="session-increment"
              onClick={this.handleIncreaseSession}
            />
            <div id="session-length">{this.state.sessionLength}</div>
            <SVGDownArrow
              id="session-decrement"
              onClick={this.handleDecreaseSession}
            />
          </div>
        </div>

        <div className="btn-group">
          <button
            id="start-stop"
            className="btn-info"
            onClick={this.handleStart}
          >
            Start
          </button>
          <button id="reset" className="btn-info" onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <audio src="" id="beep" />
      </div>
    );
  }
}

export default App;
