import React, { Component } from 'react';
import './App.scss';
import Pie from './components/Pie';
import Settings from './components/Settings';
import Controls from './components/Controls';

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
      startButton: 'Start',
      playSound: true,
      flash: true
    };
    this.handleIncreaseBreak = this.handleIncreaseBreak.bind(this);
    this.handleDecreaseBreak = this.handleDecreaseBreak.bind(this);
    this.handleIncreaseSession = this.handleIncreaseSession.bind(this);
    this.handleDecreaseSession = this.handleDecreaseSession.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlaySound = this.handlePlaySound.bind(this);
    this.handleFlash = this.handleFlash.bind(this);
    this.pauseAnimation = this.pauseAnimation.bind(this);
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
    });
  }

  pauseAnimation(pie) {
    this.setState({ alarmState: 'paused' });
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 23px 23px rgb(2, 238, 238)`;
    }, 100);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 16px 16px rgb(238, 155, 2)`;
    }, 200);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 23px 23px rgb(2, 238, 238)`;
    }, 300);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 16px 16px rgb(238, 155, 2);`;
    }, 400);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 23px 23px rgb(2, 238, 238)`;
    }, 500);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 16px 16px rgb(238, 155, 2);`;
    }, 600);
    setTimeout(() => {
      pie.style = `box-shadow: 0px 0px 13px 13px rgb(2, 238, 238)`;
    }, 700);
    console.log(pie);
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
      this.setState({ alarmState: 'running' });
      setTimeout(() => {
        var e = document.getElementsByClassName('pie');

        // Code for Chrome, Safari and Opera
        e[0].addEventListener(
          'webkitAnimationStart',
          this.pauseAnimation(e[0])
        );

        // Standard syntax
        e[0].addEventListener('animationstart', this.pauseAnimation(e[0]));
        // this.setState({ alarmState: 'paused' });
      }, 1000);
    }

    if (timerType === 'session') {
      newTimerType = 'break';
      newSecRemaining = breakLength * 60 + 1;
      newCircleTime = 0;
    } else {
      newTimerType = 'session';
      newSecRemaining = sessionLength * 60 + 1;
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
