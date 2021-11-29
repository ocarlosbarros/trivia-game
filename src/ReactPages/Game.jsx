import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';
import Timer from '../ReactComponents/Timer';
import '../css/Game.css';

const randomizer = 0.5;
class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
      seconds: 30,
      incorrect: [],
      isDisabled: false,
      isAnswerChosen: false,
      answerChosen: '',
      isNextVisible: false,
      alternatives: [],
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
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

  async componentDidUpdate(prevProps, prevState) {
    const { seconds } = prevState;
    const FINAL = 0;
    const isFinal = seconds === FINAL;
    if (isFinal) {
      this.showCorrectAnswer();
      this.resetTimer();
      // setTimeout(() => {
      //   this.nextAnswer();
      // }, ONE_SECOND);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  showCorrectAnswer() {
    this.setState({ isAnswerChosen: true, isNextVisible: true, isDisabled: true });
  }

  shuffle(alt) {
    const alternatives = alt.sort(() => Math.random() - randomizer);
    this.setState({ alternatives });
  }

  nextAnswer() {
    const { answers } = this.props;
    const { currentId } = this.state;
    if (currentId < answers.length - 1) {
      this.setState((prevState) => ({
        currentId: prevState.currentId + 1,
        isAnswerChosen: false,
      }));
    }
  }

  startTimer() {
    // Timer
    const SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, SECOND);
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
    this.setState({ isNextVisible: true });
    clearInterval(this.timer);
  }

  render() {
    const { answers } = this.props;
    const { currentId, seconds, isDisabled, isAnswerChosen,
      answerChosen, isNextVisible, alternatives,
    } = this.state;
    return (
      <main className="game-section">
        <Header />
        <div className="quiz">
          {answers && (
            <>
              <h2 className="heading-secondary" data-testid="question-category">
                {answers[currentId].category}
              </h2>
              <div className="question__box">
                <p
                  className="question__text"
                  data-testid="question-text"
                >
                  {answers[currentId].question}
                </p>
                <RenderAlternatives
                  alternatives={ alternatives }
                  currentId={ currentId }
                  onClick={ this.verifyAnswer }
                  disabled={ isDisabled }
                  isAnswerChosen={ isAnswerChosen }
                  answerChosen={ answerChosen }
                  correct={ answers[currentId].correct_answer }
                  incorrect={ answers[currentId].incorrect_answers }
                  shuffle={ this.shuffle }
                />
              </div>
              {isNextVisible && (
                <button onClick={ this.nextAnswer } type="button">
                  Próxima
                </button>
              )}
            </>
          )}
        </div>
        { !isAnswerChosen && <Timer seconds={ seconds } /> }
      </main>
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
