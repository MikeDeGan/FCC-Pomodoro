import React, { Component } from 'react';
import './App.scss';
import Pie from './components/Pie';
import Settings from './components/Settings';
import Controls from './components/Controls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25, //25
      breakLength: 5, //5
      secRemaining: 1500, //1500
      circleTime: 0,
      minDisplay: '25', //25
      secDisplay: '00', //00
      timerState: 'paused',
      timerType: 'session',
      alarmState: 'paused',
      startButton: 'start',
      playSound: true, //true
      flash: true //true
    };
    this.handleIncreaseBreak = this.handleIncreaseBreak.bind(this);
    this.handleDecreaseBreak = this.handleDecreaseBreak.bind(this);
    this.handleIncreaseSession = this.handleIncreaseSession.bind(this);
    this.handleDecreaseSession = this.handleDecreaseSession.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.handleFlash = this.handleFlash.bind(this);
    this.playAnimation = this.playAnimation.bind(this);
    this.animateLabel = this.animateLabel.bind(this);
  }

  handlePlaySound() {
    this.setState({ playSound: !this.state.playSound });
  }

  handleFlash() {
    this.setState({ flash: !this.state.flash });
  }

  handleIncreaseBreak() {
    let bLength = this.state.breakLength;
    if (bLength > 59 || this.state.timerState === 'running') {
      return;
    }

    this.setState({
      breakLength: this.state.breakLength + 1
    });
  }

  handleDecreaseBreak() {
    let bLength = this.state.breakLength;
    if (bLength === 1 || this.state.timerState === 'running') {
      return;
    }

    this.setState({
      breakLength: this.state.breakLength - 1
    });
  }

  handleIncreaseSession() {
    let sLength = this.state.sessionLength;
    if (sLength > 59 || this.state.timerState === 'running') {
      return;
    }
    sLength++;

    this.setState({
      sessionLength: sLength,
      minDisplay: sLength < 10 ? '0' + sLength.toString() : sLength.toString(),
      secDisplay: '00',
      secRemaining: sLength * 60
    });
  }

  handleDecreaseSession() {
    let sLength = this.state.sessionLength;
    if (sLength === 1 || this.state.timerState === 'running') {
      return;
    }
    sLength--;

    this.setState({
      sessionLength: sLength,
      minDisplay: sLength < 10 ? '0' + sLength.toString() : sLength.toString(),
      secDisplay: '00',
      secRemaining: sLength * 60
    });
  }

  playAnimation(pie) {
    //
    //
    for (let i = 50; i <= 1000; i += 100) {
      setTimeout(() => {
        pie.style = `box-shadow: 0px 0px 16px 16px rgb(238, 155, 2)`;
      }, i);
      setTimeout(() => {
        pie.style = `box-shadow: 0px 0px 13px 13px rgb(2, 238, 238)`;
      }, i + 50);
    }
  }

  animateLabel(timerLabel) {
    setTimeout(() => {
      timerLabel.style.opacity = 1;
    }, 500);
  }

  switchTimerType() {
    let newTimerType;
    let newSecRemaining;
    let newCircleTime;
    const { breakLength, sessionLength, timerType } = this.state;
    const elem = document.getElementById('beep');
    if (this.state.playSound) {
      elem.play();
    }
    if (this.state.flash) {
      let e = document.getElementsByClassName('pie');
      this.playAnimation(e[0]);
    }

    let eTimerLabel = document.getElementById('timer-label');
    eTimerLabel.style.opacity = 0;
    this.animateLabel(eTimerLabel);

    if (timerType === 'session') {
      newTimerType = 'break';
      newSecRemaining = breakLength * 60 + 1;
      newCircleTime = 0;
    } else {
      newTimerType = 'session';
      newSecRemaining = sessionLength * 60 + 1;
      newCircleTime = 0;
    }
    // move timertype to the setTimeout line below to fade smoothly
    // have to keep it here to pass the freeCodeCamp tests
    this.setState({
      timerType: newTimerType,
      secRemaining: newSecRemaining,
      secDisplay: '00',
      circleTime: newCircleTime
    });

    //use this to fade the timer title smoothly
    // setTimeout(() => {
    //   this.setState({
    //     timerType: newTimerType
    //   });
    // }, 500);
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
      startButton: 'Start',
      playSound: true,
      flash: true
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">FCC Pomodoro Project</header>
        <div id="timer-label">{this.state.timerType}</div>
        <Pie
          alarmState={this.state.alarmState}
          circleTime={this.state.circleTime}
          minDisplay={this.state.minDisplay}
          secDisplay={this.state.secDisplay}
        />

        <Settings
          handleIncreaseBreak={this.handleIncreaseBreak}
          breakLength={this.state.breakLength}
          handleDecreaseBreak={this.handleDecreaseBreak}
          handleIncreaseSession={this.handleIncreaseSession}
          sessionLength={this.state.sessionLength}
          handleDecreaseSession={this.handleDecreaseSession}
          playSound={this.state.playSound}
          handlePlaySound={this.handlePlaySound}
          flash={this.state.flash}
          handleFlash={this.handleFlash}
        />

        <Controls
          handleStart={this.handleStart}
          startButton={this.state.startButton}
          handleReset={this.handleReset}
        />

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
