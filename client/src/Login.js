import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import { login } from './store/utils/thunkCreators';
import LoginForm from './components/LoginForm';
import SignupLoginGrid from './components/SignupLoginGrid';

const Login = ({ user, login }) => {
  const handleLogin = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <SignupLoginGrid
      submitHandler={handleLogin}
      formErrorMessage={null}
      FormComponent={LoginForm}
      xsScreenButtonText={'Login'}
      pageSwitchText={"Don't have an account?"}
      pageSwitchBtnText={'Create Account'}
      pageSwitchUrl={'/register'}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
