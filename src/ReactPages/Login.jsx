import React from 'react';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisable: true,
      redirect: false,
    };

    this.redirect = this.redirect.bind(this);
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
    console.log(result);
    return result;
  }

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, isButtonDisable, redirect } = this.state;
    const form = (
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
          onClick={ this.redirect }
        >
          Jogar

        </button>
      </form>
    );
    return redirect ? <Redirect to="/game" /> : form;
  }
}

export default Login;
