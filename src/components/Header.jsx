import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div>
          <img data-testId="header-profile-picture" src="" alt="" />
        </div>
        <p data-testId="header-player-name" />
        <p data-testId="header-score" />
      </header>
    );
  }
}

export default Header;
