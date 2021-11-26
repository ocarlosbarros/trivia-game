import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers, actionChangeAssertions,
  actionChangeScore } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';

const CORRECT_ANSWER = 'correct-answer';
const TEN_POINTS = 10;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
      timer: 30,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.getDifficultyAnswer = this.getDifficultyAnswer.bind(this);
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAnswers(token);
    this.startTimer();
  }

  getAssignedWeight(difficulty) {
    const assignedWeight = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    return assignedWeight[difficulty];
  }

  getDifficultyAnswer(selectedAnswer = '', answersList = []) {
    const answerFound = answersList.find((answer) => (
      selectedAnswer === answer.correct_answer));
    if (answerFound) return answerFound.difficulty;
  }

  selectAnswer({ target }) {
    const { setAssertion, answers, setScore } = this.props;
    const selectedAnswer = target.innerText;
    const assertion = target.className === CORRECT_ANSWER ? 1 : 0;
    setAssertion(assertion);

    if (assertion !== 0) {
      const difficulty = this.getDifficultyAnswer(selectedAnswer, answers);
      const assignedWeight = this.getAssignedWeight(difficulty);
      this.endTimer();
      const { timer } = this.state;
      const score = TEN_POINTS + (timer * assignedWeight);
      setScore(score);
    }
  }

  startTimer() {
    const ONE_SECOND = 1;
    const ONE_MILLISECONDS = 1000;
    const { timer } = this.state;
    if (timer > 0) {
      this.TIMER = setInterval(() => {
        this.setState((prevState) => (
          { timer: prevState.timer > 0 ? prevState.timer - ONE_SECOND : 0 }));
      }, ONE_MILLISECONDS);
    } else {
      clearInterval(this.TIMER);
    }
  }

  endTimer() {
    clearInterval(this.TIMER);
  }

  render() {
    const { answers } = this.props;
    const { currentId } = this.state;
    return (
      <>
        <Header />
        <div className="quiz">
          {answers && (
            <>
              <p data-testid="question-category">{answers[currentId].category}</p>
              <p data-testid="question-text">{answers[currentId].question}</p>
              <RenderAlternatives
                onClick={ this.selectAnswer }
                answersList={ answers }
                correct={ answers[currentId].correct_answer }
                incorrect={ answers[currentId].incorrect_answers }
              />
            </>
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  getAnswers: (token) => dispatch(actionGetAnswers(token)),
  setAssertion: (target) => dispatch(actionChangeAssertions(target)),
  setScore: (score) => dispatch(actionChangeScore(score)),
});

const mapStateToProps = ({ gameInfo }) => ({
  answers: gameInfo.answers.results,
});

Game.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(Object).isRequired,
  setAssertion: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToPros)(Game);
