import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      secRemaining: 1500,
      circleTime: 0,
      minDisplay: '25',
      secDisplay: '00',
      timerState: 'paused',
      timerType: 'session',
      alarmState: 'paused',
      startButton: 'Start'
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
      sLength <= 10 ? (sLength = '0' + (sLength - 1).toString()) : sLength - 1;
    this.setState({
      sessionLength: sLength * 1,
      minDisplay: sLength.toString(),
      secDisplay: '00',
      secRemaining: sLength * 60
      // circleTime: sLength * 60
    });
  }

  switchTimerType() {
    let newTimerType;
    let newSecRemaining;
    // let newMinDisplay;
    let newCircleTime;
    const { breakLength, sessionLength, timerType } = this.state;
    const elem = document.getElementById('beep');
    elem.play();
    this.setState({ alarmState: 'running' });
    setTimeout(() => {
      this.setState({ alarmState: 'paused' });
    }, 1000);

    if (timerType === 'session') {
      newTimerType = 'break';
      newSecRemaining = breakLength * 60 + 1;
      // newMinDisplay = '00';
      newCircleTime = 0;
    } else {
      newTimerType = 'session';
      newSecRemaining = sessionLength * 60 + 1;
      // newMinDisplay = '00';
      newCircleTime = 0;
    }

    this.setState({
      timerType: newTimerType,
      secRemaining: newSecRemaining,
      secDisplay: '00',
      circleTime: newCircleTime
    });
  }

  handleStart() {
    if (this.state.timerState === 'running') {
      this.setState({ timerState: 'paused', startButton: 'Start' });
      return;
    }
    this.setState({ timerState: 'running', startButton: 'Pause' });
    const timerID = setInterval(() => {
      if (this.state.timerState === 'paused') {
        clearInterval(timerID);
        return;
      }
      const secs = this.state.secRemaining - 1;
      if (secs < 1) {
        this.switchTimerType();
        return;
      }
      const startTime =
        this.state.timerType === 'session'
          ? this.state.sessionLength * 60
          : this.state.breakLength * 60;
      const cTime = (100.53088 / startTime) * (startTime - secs);

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
    const elem = document.getElementById('beep');
    elem.pause();
    elem.load();

    this.setState({
      sessionLength: 25,
      breakLength: 5,
      secRemaining: 1500,
      circleTime: 0,
      minDisplay: '25',
      secDisplay: '00',
      timerState: 'paused',
      timerType: 'session',
      alarmState: 'paused',
      startButton: 'Start'
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div id="timer-label">{this.state.timerType}</div>
        <div className="pieholder">
          <svg
            viewBox="0 0 64 64"
            className="pie"
            style={{
              animation: 'flashShadow 0.1s linear infinite alternate',
              animationPlayState: `${this.state.alarmState}`
            }}
          >
            <circle
              r="25%"
              cx="50%"
              cy="50%"
              style={{
                strokeDasharray: `${this.state.circleTime} 100.53088`

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
            <i
              className="fas fa-angle-up"
              id="break-increment"
              onClick={this.handleIncreaseBreak}
            />
            <div id="break-length">{this.state.breakLength}</div>
            <i
              className="fas fa-angle-down"
              id="break-decrement"
              onClick={this.handleDecreaseBreak}
            />
          </div>

          <div id="session-label">Session Length</div>
          <div className="arrowholder">
            <i
              className="fas fa-angle-up"
              id="session-increment"
              onClick={this.handleIncreaseSession}
            />

            <div id="session-length">{this.state.sessionLength}</div>
            <i
              className="fas fa-angle-down"
              id="session-decrement"
              onClick={this.handleDecreaseSession}
            />
          </div>
        </div>

        <div className="btn-group">
          <button
            id="start_stop"
            className="btn-info"
            onClick={this.handleStart}
          >
            {this.state.startButton}
          </button>
          <button id="reset" className="btn-info" onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <audio id="beep">
          <source
            src="./sounds/service-bell_daniel_simion.mp3"
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default App;
