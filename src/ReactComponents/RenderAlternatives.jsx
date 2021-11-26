import React from 'react';
import PropTypes from 'prop-types';

const randomizer = 0.5;

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
    this.colorLogic = this.colorLogic.bind(this);

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

  colorLogic(alternative) {
    const { correct } = this.state;
    const { isAnswerChosen } = this.props;
    if (isAnswerChosen) {
      return alternative === correct
        ? '3px solid rgb(6, 240, 15)'
        : '3px solid rgb(255, 0, 0)';
    }
  }

  shuffle(alt) {
    const alternatives = alt.sort(() => Math.random() - randomizer);
    this.setState({ alternatives });
  }

  render() {
    const {
      alternatives,
      correct,
    } = this.state;

    const { onClick, isAnswerChosen,
      answerChosen, isDisabled } = this.props;
    return (
      <>
        <div className="quiz__alternatives">
          {alternatives
            && alternatives.map((curr, id) => (
              <button
                style={ { border: this.colorLogic(curr) } }
                disabled={ isDisabled }
                onClick={ onClick }
                data-testid={
                  curr === correct
                    ? 'correct-answer'
                    : this.getIncorrectId(curr)
                }
                key={ id }
                type="button"
              >
                {curr}
              </button>
            ))}
        </div>
        { isAnswerChosen && <p>{`Você escolheu ${answerChosen}`}</p> }
      </>
    );
  }
}

RenderAlternatives.propTypes = {
  answerChosen: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.string.isRequired,
  isAnswerChosen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RenderAlternatives;
