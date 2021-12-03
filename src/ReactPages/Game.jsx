import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers,
  actionChangeAssertions, actionChangeScore } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';
import Timer from '../ReactComponents/Timer';
import '../css/Game.css';
<<<<<<< HEAD
import { savePlayer, saveToken } from '../services/localStorage';
=======
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
import getToken from '../services/getToken';
import { readPlayers, saveToken, savePlayer } from '../services/localStorage';

const CORRECT_ANSWER = 'correct-answer';

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
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const { token } = await getToken();
<<<<<<< HEAD
=======
    this.playersList = readPlayers();
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
    getAnswers(token);
    saveToken(token);
    this.startTimer();
  }

<<<<<<< HEAD
  async componentDidUpdate(prevProps, prevState) {
    const { seconds } = prevState;
    const { player } = this.props;
    const FINAL = 0;
    const isFinal = seconds === FINAL;
    if (isFinal) {
      this.showCorrectAnswer();
      this.resetTimer();
    }
    if (player !== prevProps.player) {
      savePlayer(player);
    }
=======
  componentDidUpdate(prevState, prevProps) {
    const SIXSECONDS = 6000;
    setTimeout(() => {
      this.showCorrectAnswer();
      this.resetTimer();
    }, SIXSECONDS);
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getAssignedWeight(difficulty) {
    const assignedWeight = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    return assignedWeight[difficulty] ? assignedWeight[difficulty] : 0;
  }

  getDifficultyAnswer(selectedAnswer = '', answersList = []) {
    const answerFound = answersList.find((answer) => (
      selectedAnswer === answer.correct_answer));
    if (answerFound) return answerFound.difficulty;
  }

  calculateScore(seconds, assignedWeight) {
    const TEN_POINTS = 10;
<<<<<<< HEAD
    const score = TEN_POINTS + (seconds * assignedWeight);
    return score;
  }

  selectAnswer({ target }) {
    const { setAssertion, answers, setScore } = this.props;
=======
    const { setScore } = this.props;
    // Se assignedWeight for 0 quer dizer que usuário não acertou a resposta
    if (assignedWeight !== 0) {
      const score = TEN_POINTS + (seconds * assignedWeight);
      setScore(score);
      return score;
    }
  }

  selectAnswer({ target }) {
    const { setAssertion, answers, players } = this.props;
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
    const selectedAnswer = target.innerText;
    const assertion = target.className === CORRECT_ANSWER ? 1 : 0;
    setAssertion(assertion);
    const difficulty = this.getDifficultyAnswer(selectedAnswer, answers);
    const assignedWeight = this.getAssignedWeight(difficulty);
    this.resetTimer();
    const { seconds } = this.state;
<<<<<<< HEAD
    // Se assignedWeight for 0 quer dizer que usuário não acertou a resposta
    if (assignedWeight !== 0) {
      const score = this.calculateScore(seconds, assignedWeight);
      setScore(score);
    }
=======
    const score = this.calculateScore(seconds, assignedWeight);

    const updatedPlayer = {
      ...players,
      assertions: players.assertions + assertion,
      score: players.score + score,
    };
    savePlayer(updatedPlayer);
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
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

  showCorrectAnswer() {
    this.setState({ isAnswerChosen: true, isNextVisible: true, isDisabled: true });
    clearInterval(this.timer);
  }

  nextAnswer() {
    const { answers } = this.props;
    const { currentId } = this.state;
    if (currentId < answers.length - 1) {
      this.setState((prevState) => ({
        currentId: prevState.currentId + 1,
        isAnswerChosen: false,
        isDisabled: false,
<<<<<<< HEAD
        isNextVisible: false,
=======
        isNextVisible: true,
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
      }));
    }
    this.setState({ isNextVisible: false });
    this.startTimer();
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
    this.selectAnswer({ target });
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
                />
              </div>
              {isNextVisible && (
                <button
                  data-testid="btn-next"
                  onClick={ this.nextAnswer }
                  type="button"
                >
                  Próxima
                </button>
              )}
            </>
          )}
        </div>
        <Timer seconds={ seconds } />
      </main>
    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  getAnswers: (token) => dispatch(actionGetAnswers(token)),
  setAssertion: (assertion) => dispatch(actionChangeAssertions(assertion)),
  setScore: (score) => dispatch(actionChangeScore(score)),
});

const mapStateToProps = ({ gameInfo, players }) => ({
  answers: gameInfo.answers.results,
<<<<<<< HEAD
  player: players.player,
=======
  players,
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
});

Game.propTypes = {
  answers: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
  getAnswers: PropTypes.func.isRequired,
<<<<<<< HEAD
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
=======
  players: PropTypes.objectOf.isRequired,
>>>>>>> cacff9b775175ec90ba71d791ffe44c2365d7923
  setAssertion: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToPros)(Game);
