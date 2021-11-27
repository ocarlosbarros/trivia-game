import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

const randomizer = 0.5;

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.colorLogic = this.colorLogic.bind(this);

    this.state = {
      alternatives: [],
      correct: props.correct,
      incorrect: props.incorrect,
      isButtonDisabled: false,
      isAnswerChosen: false,
      answerChosen: '',
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

  verifyAnswer(answer) {
    this.setState({
      isButtonDisabled: true,
      isAnswerChosen: true,
      answerChosen: answer,
    });
  }

  colorLogic(alternative) {
    const { correct, isAnswerChosen } = this.state;
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
      isButtonDisabled,
      isAnswerChosen,
      answerChosen,
    } = this.state;
    return (
      <>
        <div className="quiz__alternatives">
          {alternatives
            && alternatives.map((curr, id) => (
              <button
                className="quiz__alternative"
                style={ { border: this.colorLogic(curr) } }
                disabled={ isButtonDisabled }
                onClick={ () => this.verifyAnswer(curr) }
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
        <Timer />
        { isAnswerChosen && <p>{`Você escolheu ${answerChosen}`}</p> }
      </>
    );
  }
}

RenderAlternatives.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(String).isRequired,
};

export default RenderAlternatives;
