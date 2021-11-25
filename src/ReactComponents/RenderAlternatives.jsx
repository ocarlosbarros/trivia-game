import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionChangeScore } from '../Redux/Actions';

const randomizer = 0.5;
const CORRECT_ANSWER = 'correct_answer';

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);

    this.state = {
      alternatives: [],
      correct: props.correct,
      incorrect: props.incorrect,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    const { correct, incorrect } = this.props;
    const formatAlternatives = [correct, ...incorrect];
    this.shuffle(formatAlternatives);
  }

  getIncorrectId(currIncorrectAnswer) {
    const { incorrect } = this.state;
    const id = incorrect.indexOf(currIncorrectAnswer);
    return `wrong-answer-${id}`;
  }

  shuffle(alt) {
    const alternatives = alt.sort(() => Math.random() - randomizer);
    this.setState({ alternatives });
  }

  // calculateScore({ target }) {
  //   // 10 + ( timer * dificuldade )
  //   console.log(target.className);
  // }

  selectAnswer({ target }) {
    const { selectedAnswer } = this.props;
    console.log(selectedAnswer);
    const assertion = target.className === CORRECT_ANSWER ? 1 : 0;
    selectedAnswer(assertion);
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
  selectedAnswer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  selectedAnswer: (target) => dispatch(actionChangeScore(target)),
});

export default connect(null, mapDispatchToProps)(RenderAlternatives);
