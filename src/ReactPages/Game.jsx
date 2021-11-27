import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetAnswers } from '../Redux/Actions';
import RenderAlternatives from '../ReactComponents/RenderAlternatives';
import Header from '../ReactComponents/Header';
import '../css/Game.css';

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
    console.log(token);
    getAnswers(token);
  }

  render() {
    const { answers } = this.props;
    const { currentId } = this.state;
    return (
      <main className="game-section">
        <Header />
        <div className="quiz">
          {answers && (
            <>
              <p className="quiz__category" data-testid="question-category">
                {answers[currentId].category}
              </p>
              <div className="question__box">
                <p className="question__text" data-testid="question-text">
                  {answers[currentId].question}
                </p>
                <RenderAlternatives
                  correct={ answers[currentId].correct_answer }
                  incorrect={ answers[currentId].incorrect_answers }
                />
              </div>
            </>
          )}
        </div>
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
