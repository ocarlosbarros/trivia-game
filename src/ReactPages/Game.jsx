import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      currentId: 0,
    };
  }

  async componentDidMount() {
    const { getAnswers } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAnswers(token);
  }

  render() {
    const { answers } = this.props;
    const { currentId } = this.state;
    return (
      <>
        <Header />
        <div className="quiz">
          {answers && (
            <>
              <p data-testid="question-category">{answers[currentId].category}</p>
              <p data-testid="question-text">{answers[currentId].question}</p>
              <RenderAlternatives
                correct={ answers[currentId].correct_answer }
                incorrect={ answers[currentId].incorrect_answers }
              />
            </>
          )}
        </div>
      </>
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
