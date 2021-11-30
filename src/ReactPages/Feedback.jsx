import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Feedback.css';
import Header from '../ReactComponents/Header';

const minAssertions = 3;

class Feedback extends React.Component {
  constructor() {
    super();

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-section">
        <Header />
        <p data-testid="feedback-text">
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button type="button" onClick={ this.redirect } data-testid="btn-play-again">
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateTopProps = ({ players }) => ({
  score: players.score,
  assertions: players.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateTopProps)(Feedback);
