import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Feedback.css';

class Feedback extends React.Component {
  render() {
    const { img, name, score } = this.props;
    return (
      <div className="feedback-section">
        <img data-testid="header-profile-picture" src={ img } alt="user profile" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateTopProps = ({ players }) => ({
  img: players.imagePath,
  name: players.name,
  score: players.score,
});

Feedback.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateTopProps)(Feedback);
