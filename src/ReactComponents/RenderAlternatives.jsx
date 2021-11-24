import React from 'react';

const randomizer = 0.5;

class RenderAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.scramble = this.scramble.bind(this);

    this.state = {
      alternatives: [],
      correct: props.correct,
      incorrect: props.incorrect,
    };
  }

  componentDidMount() {
    const { correct, incorrect } = this.props;
    const formatAlternatives = [correct, ...incorrect];
    this.scramble(formatAlternatives);
  }

  scramble(alt) {
    const alternatives = alt.sort(() => Math.random() - randomizer);
    this.setState({ alternatives });
  }

  getIncorrectId(currIncorrectAnswer) {
    const { incorrect } = this.state;
    const id = incorrect.indexOf(currIncorrectAnswer);
    return id;
  }

  render() {
    const { alternatives, correct } = this.state;
    return (
      <div className="quiz__alternatives">
        { alternatives && alternatives.map((curr, id) => <button data-testid={ curr === correct ? 'correct-answer' : this.getIncorrectId(curr) } key={ id } type="button">{curr}</button>)}
      </div>
    );
  }
}

export default RenderAlternatives;
