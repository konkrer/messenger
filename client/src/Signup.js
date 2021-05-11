import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import { register } from './store/utils/thunkCreators';
import { SignupLoginGrid, SignupForm } from './components/SignupLogin';

/** Signup View Component */

const Signup = ({ user, register }) => {
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <SignupLoginGrid
      submitHandler={handleRegister}
      formErrorMessage={formErrorMessage}
      FormComponent={SignupForm}
      page={'signup'}
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
    register: credentials => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
