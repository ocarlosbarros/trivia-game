import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisable: true,
    };
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

  render() {
    const { name, email, isButtonDisable } = this.state;
    return (
      <form>
        <p>Nome</p>
        <input
          type="text"
          name="name"
          placeholder="Juliette Freire"
          data-testId="input-player-name"
          value={ name }
          onChange={ (e) => this.handleChange(e) }
        />
        <p>E-mail</p>
        <input
          typeof="email"
          name="email"
          placeholder="juliette123@gmail.com"
          data-testId="input-gravatar-email"
          value={ email }
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          type="submit"
          disabled={ isButtonDisable }
          data-testId="btn-play"
        >
          Jogar

        </button>
      </form>
    );
  }
}

export default Login;
