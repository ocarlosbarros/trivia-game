import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';
import Timer from '../ReactComponents/Timer';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
      seconds: 30,
      correct: 0,
      incorrect: 0,
      isDisabled: false,
      isAnswerChosen: false,
      answerChosen: '',
    };
    this.resetTimer = this.resetTimer.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAnswers(token);

    // Timer
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
  }

  verifyAnswer({ target }) {
    this.setState({
      isDisabled: true,
      isAnswerChosen: true,
      answerChosen: target.innerHTML,

    });
  }

  render() {
    const { answers } = this.props;
    const { currentId, seconds, isDisabled, isAnswerChosen, answerChosen } = this.state;
    return (
      <>
        <Header />
        <div className="quiz">
          {answers && (
            <>
              <p data-testid="question-category">{answers[currentId].category}</p>
              <p data-testid="question-text">{answers[currentId].question}</p>
              <RenderAlternatives
                onClick={ this.verifyAnswer }
                disabled={ isDisabled }
                isAnswerChosen={ isAnswerChosen }
                answerChosen={ answerChosen }
                correct={ answers[currentId].correct_answer }
                incorrect={ answers[currentId].incorrect_answers }
              />
            </>
          )}
        </div>
        <Timer seconds={ seconds } />
      </>
    );
  }
}

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
