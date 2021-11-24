import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;
    return (
      <header className="header">
        <div>
          <img data-testid="header-profile-picture" src={ gravatarEmail } alt="" />
        </div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player.player,
});

export default connect(mapStateToProps, null)(Header);
