import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { player: { name, path, score } } = this.props;
    return (
      <header className="header">
        <div>
          <img data-testId="header-profile-picture" src={ path } alt="" />
        </div>
        <p data-testId="header-player-name">{name}</p>
        <p data-testId="header-score">{ score }</p>
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
