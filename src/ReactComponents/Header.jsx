import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGravatarImageAction } from '../Redux/Actions';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    const { getGravatarImage } = this.props;
    const { gravatarEmail } = this.props;
    getGravatarImage(gravatarEmail);
  }

  render() {
    const { name, score, imagePath } = this.props;
    return (
      <header className="header">
        <div className="header__box">
          <img
            className="header__img"
            data-testid="header-profile-picture"
            src={ imagePath }
            alt=""
          />
          <p className="header__id" data-testid="header-player-name">
            Jogador:
            {' '}
            <span className="header__name">
              {name}
            </span>
          </p>
        </div>
        <div className="header__box--score">
          <p className="header__score" data-testid="header-score">
            Pontos:
            {' '}
            {score}
          </p>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  gravatarEmail: '',
};

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  imagePath: PropTypes.string.isRequired,
  getGravatarImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.players.name,
  imagePath: state.players.imagePath,
  score: state.players.score,
});

const mapDispatchToProps = (dispatch) => ({
  getGravatarImage: (email) => dispatch(getGravatarImageAction(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
