import React from 'react';
import PropTypes from 'prop-types';

const randomizer = 0.5;
const CORRECT_ANSWER = 'correct-answer';

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);

    this.state = {
      alternatives: [],
      correct: props.correct,
      incorrect: props.incorrect,
    };
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

  render() {
    const { alternatives, correct } = this.state;
    const { onClick } = this.props;
    return (
      <div className="quiz__alternatives">
        {alternatives
          && alternatives.map((curr, id) => (
            <button
              onClick={ onClick }
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
  onClick: PropTypes.func.isRequired,
};

export default RenderAlternatives;
