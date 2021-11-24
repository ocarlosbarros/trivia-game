import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisable: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
      isButtonDisable: this.checkButton(),
    });
  }

  checkButton() {
    const { name, email } = this.state;
    const result = !(name && email);

    return result;
  }

  handleClick(event) {
    const { name, email } = this.state;
    const { login } = this.props;
    const { history } = this.props;
    event.preventDefault();
    login({ name, email });
    history.push('/game');
  }

  render() {
    const { name, email, isButtonDisable } = this.state;
    return (
      <form>
        <p>Nome</p>
        <input
          type="text"
          name="name"
          placeholder="Juliette Freire"
          data-testid="input-player-name"
          value={ name }
          onChange={ (e) => this.handleChange(e) }
        />
        <p>E-mail</p>
        <input
          typeof="email"
          name="email"
          placeholder="juliette123@gmail.com"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          type="submit"
          disabled={ isButtonDisable }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar

        </button>
      </form>
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
