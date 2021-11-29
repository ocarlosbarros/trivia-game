import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';
import '../css/Game.css';
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
      isNextVisible: false,
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAnswers(token);
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { seconds } = prevState;
    const FINAL = 0;
    const isFinal = (seconds === FINAL);
    if (isFinal) {
      this.nextAnswer();
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  nextAnswer() {
    const { answers } = this.props;
    const { currentId } = this.state;
    if (currentId < answers.length) {
      this.setState((prevState) => ({
        currentId: prevState.currentId + 1,
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
    const { currentId, seconds, isDisabled, isAnswerChosen, answerChosen, isNextVisible } = this.state;
    return (
      <main className="game-section">
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
              { isNextVisible && <button onClick={ this.nextAnswer } type="button">Próxima</button>}
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
});

const mapStateToProps = ({ gameInfo }) => ({
  answers: gameInfo.answers.results,
});

Game.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToPros)(Game);
