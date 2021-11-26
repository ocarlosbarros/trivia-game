import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
      correct: 0,
      incorrect: 0,
    };
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    const SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { seconds } = prevState;
    const FINAL = 0;
    const isFinal = (seconds === FINAL);
    if (isFinal) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState((prevState) => ({
      seconds: 30,
      incorrect: prevState.incorrect - 1,
    }));
    console.log(this.state);
  }

  render() {
    const { state: { seconds } } = this;
    return (
      <div>
        <h1>Cronômetro</h1>
        <h2>{seconds}</h2>
      </div>
    );
  }
}

export default Timer;
