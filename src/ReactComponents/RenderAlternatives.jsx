import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionChangeScore } from '../Redux/Actions';

const randomizer = 0.5;
const CORRECT_ANSWER = 'correct_answer';
const TEN_POINTS = 10;
class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);

    this.state = {
      alternatives: [],
      correct: props.correct,
      incorrect: props.incorrect,
      timer: 30,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.getDifficultyAnswer = this.getDifficultyAnswer.bind(this);
  }

  componentDidMount() {
    const { correct, incorrect } = this.props;
    const formatAlternatives = [correct, ...incorrect];
    this.shuffle(formatAlternatives);
    this.startTimer();
  }

  getIncorrectId(currIncorrectAnswer) {
    const { incorrect } = this.state;
    const id = incorrect.indexOf(currIncorrectAnswer);
    return `wrong-answer-${id}`;
  }

  calculateScore() {

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

  shuffle(alt) {
    const alternatives = alt.sort(() => Math.random() - randomizer);
    this.setState({ alternatives });
  }

  selectAnswer({ target }) {
    const { setAssertion, answersList } = this.props;
    const selectedAnswer = target.innerText;
    const assertion = target.className === CORRECT_ANSWER ? 1 : 0;
    setAssertion(assertion);
    const difficulty = this.getDifficultyAnswer(selectedAnswer, answersList);
    const assignedWeight = this.getAssignedWeight(difficulty);
    this.endTimer();
    const { timer } = this.state;
    console.log(timer);
    const score = TEN_POINTS + (TEN_POINTS + assignedWeight);
    return score;
  }

  startTimer() {
    const ONE_SECOND = 1;
    const ONE_MILLISECONDS = 1000;
    this.TIMER = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - ONE_SECOND }));
    }, ONE_MILLISECONDS);
  }

  endTimer() {
    clearInterval(this.TIMER);
  }

  render() {
    const { alternatives, correct } = this.state;
    return (
      <div className="quiz__alternatives">
        {alternatives
          && alternatives.map((curr, id) => (
            <button
              onClick={ this.selectAnswer }
              data-testid={
                curr === correct ? CORRECT_ANSWER : this.getIncorrectId(curr)
              }
              className={
                curr === correct ? CORRECT_ANSWER : 'incorrect-answer'
              }
              key={ id }
              type="button"
            >
              {curr}
            </button>
          ))}
      </div>
    );
  }
}

RenderAlternatives.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(String).isRequired,
  setAssertion: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAssertion: (target) => dispatch(actionChangeScore(target)),
});

export default connect(null, mapDispatchToProps)(RenderAlternatives);
