import React from 'react';
<<<<<<< HEAD:src/components/Login.jsx
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../Actions';
=======
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
>>>>>>> main-group-11:src/ReactPages/Login.jsx

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisable: true,
      redirect: false,
    };
<<<<<<< HEAD:src/components/Login.jsx
    this.handleClick = this.handleClick.bind(this);
=======

    this.redirect = this.redirect.bind(this);
>>>>>>> main-group-11:src/ReactPages/Login.jsx
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

<<<<<<< HEAD:src/components/Login.jsx
  handleClick(event) {
    const { name, email } = this.state;
    const { login } = this.props;
    const { history } = this.props;
    event.preventDefault();
    login({ name, email });
    history.push('/game');
=======
  redirect() {
    this.setState({ redirect: true });
>>>>>>> main-group-11:src/ReactPages/Login.jsx
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
<<<<<<< HEAD:src/components/Login.jsx
          onClick={ this.handleClick }
=======
          onClick={ this.redirect }
>>>>>>> main-group-11:src/ReactPages/Login.jsx
        >
          Jogar

        </button>
        <header className="App-header">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            <Link to="config">
              Configurações
            </Link>
          </button>
        </header>
      </form>
    );
    return redirect ? <Redirect to="/game" /> : form;
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
