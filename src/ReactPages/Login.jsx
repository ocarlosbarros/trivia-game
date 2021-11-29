import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../Redux/Actions';
import getToken from '../services/getToken';
import '../css/Login.css';
import sprite from '../sprite.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.checkButton);
  }

  checkButton() {
    const { name, email } = this.state;
    if (name.length !== 0 && email.includes('@' && '.com')) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  }

  async handleClick(event) {
    const { name, email } = this.state;
    const { login } = this.props;
    const { history } = this.props;
    event.preventDefault();
    login({ name, email });
    const { token } = await getToken();
    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div className="login-page">
        <button className="config-btn" type="submit" data-testid="btn-settings">
          <svg className="config-icon">
            <use href={ `${sprite}#icon-cog` } />
          </svg>
          <Link className="config-btn" to="config">Configurações</Link>
        </button>
        <h1 className="heading-primary">TRIVIA</h1>
        <form className="form">
          <p className="form__label">Nome</p>
          <input
            className="form__input"
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ (e) => this.handleChange(e) }
          />
          <p className="form__label">E-mail</p>
          <input
            className="form__input"
            typeof="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ (e) => this.handleChange(e) }
          />
          <button
            className={ isButtonDisabled ? 'form__btn-disabled' : 'form__btn' }
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (player) => dispatch(loginAction(player)),
});

export default connect(null, mapDispatchToProps)(Login);
