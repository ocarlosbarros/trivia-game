import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  render() {
    const { seconds } = this.props;
    return (
      <div>
        <h1>Cronômetro</h1>
        <h2>{seconds}</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default Timer;
