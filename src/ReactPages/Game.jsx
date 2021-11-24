import React from 'react';
import { connect } from 'react-redux';
import getToken from '../services/getToken';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
    };
  }

  async componentDidMount() {
    const { getAnswers, answers } = this.props;
    const { token } = await getToken();
    getAnswers(token);
  }

  render() {
    const { answers } = this.props;
    const { currentId } = this.state;
    return (
      <div className="quiz">
        {answers && (
          <>
            <p datatest-id="question-category">{answers[currentId].category}</p>
            <p datatest-id="question-text">{answers[currentId].question}</p>
            <RenderAlternatives correct={ answers[currentId].correct_answer } incorrect={ answers[currentId].incorrect_answers } />
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToPros = (dispatch) => ({
  getAnswers: (token) => dispatch(actionGetAnswers(token)),
});

const mapStateToProps = ({ gameInfo }) => ({
  answers: gameInfo.answers.results,
});

export default connect(mapStateToProps, mapDispatchToPros)(Game);
