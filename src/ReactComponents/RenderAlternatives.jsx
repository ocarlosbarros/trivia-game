import React from 'react';
import PropTypes from 'prop-types';

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.colorLogic = this.colorLogic.bind(this);
  }

  getIncorrectId(currIncorrectAnswer) {
    const { incorrect } = this.props;
    const id = incorrect.indexOf(currIncorrectAnswer);
    return `wrong-answer-${id}`;
  }

  colorLogic(alternative) {
    const { isAnswerChosen, correct } = this.props;
    if (isAnswerChosen) {
      return alternative === correct
        ? '3px solid rgb(6, 240, 15)'
        : '3px solid rgb(255, 0, 0)';
    }
  }

  render() {
    const { onClick, isAnswerChosen, answerChosen,
      isDisabled, correct, incorrect, alternatives } = this.props;
    console.log('correct', correct);
    console.log('incorrect', incorrect);
    console.log('al', alternatives);

    return (
      <>
        <div className="quiz__alternatives">
          {
            alternatives && alternatives.map((curr, id) => (
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
            ))
          }
        </div>
        { isAnswerChosen && <p>{`Você escolheu ${answerChosen}`}</p> }
      </>
    );
  }
}

RenderAlternatives.propTypes = {
  alternatives: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  answerChosen: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.string.isRequired,
  isAnswerChosen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};

export default RenderAlternatives;
