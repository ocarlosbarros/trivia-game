import React from 'react';
import PropTypes from 'prop-types';

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
    console.log(this.state);
  }

  checkButton() {
    const { name, email } = this.state;
    const result = !(name && email);

    return result;
  }

  handleClick(event) {
    event.preventDefault();
    const { history } = this.props;
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
};

export default Login;
