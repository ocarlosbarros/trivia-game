<<<<<<< HEAD
import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <Header />
=======
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../services/getToken';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
    };
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const { token } = await getToken();
    getAnswers(token);
  }

  render() {
    const { answers } = this.props;
    const { currentId } = this.state;
    return (
      <div className="quiz">
        {answers && (
          <>
            <p data-testid="question-category">{answers[currentId].category}</p>
            <p data-testid="question-text">{answers[currentId].question}</p>
            <RenderAlternatives
              correct={ answers[currentId].correct_answer }
              incorrect={ answers[currentId].incorrect_answers }
            />
          </>
        )}
      </div>
>>>>>>> main-group-11
    );
  }
}

<<<<<<< HEAD
export default Game;
=======
const mapDispatchToPros = (dispatch) => ({
  getAnswers: (token) => dispatch(actionGetAnswers(token)),
});

const mapStateToProps = ({ gameInfo }) => ({
  answers: gameInfo.answers.results,
});

Game.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToPros)(Game);
>>>>>>> main-group-11
