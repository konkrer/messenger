import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from '@material-ui/core';
import { register } from './store/utils/thunkCreators';
import bgImg from './assets/bg-img.png';
import Bubble from './assets/bubble.svg';

/** Page styles */
const useStyles = makeStyles(theme => ({
  mainGrid: {
    height: '100vh',
  },
  imgPanel: {
    background: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    minHeight: '100vh',
  },
  imgPanelColorOverlay: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: `linear-gradient(
       #3A8DFF,
      #86B9FF
    )`,
    opacity: 0.85,
  },
  imgPanelTextOverlay: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    overflow: 'hidden',
  },
  imgHeader: {
    width: '15ch',
    paddingBottom: '30px',
    marginTop: '50px',
    textAlign: 'center',
    lineHeight: 1.6,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      paddingBottom: '10px',
      marginTop: '10px',
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: '135px',
      marginTop: '50px',
    },
  },
  formPanel: {
    minHeight: '100vh',
  },
  xlButtonWhite: {
    height: '70px',
    width: '185px',
    boxShadow: '0px 0px 15px 0px rgb(88 83 150 / 20%);',
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
  },
  xxlButton: {
    height: '75px',
    width: '210px',
    boxShadow: '0px 0px 15px 0px rgb(88 83 150 / 20%);',
    marginRight: theme.spacing(2),
  },
  pageChangeText: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(5),
    },
  },
  formWrapper: {
    width: '85%',
    marginTop: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: '75%',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
      width: '70%',
    },
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontSize: '28px',
  },
  inputFont: {
    fontSize: 18,
  },
  labelFont: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.secondary,
  },
}));

/** Login Component */

const Login = ({ user, register }) => {
  const history = useHistory();
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

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
    <Grid container className={classes.mainGrid}>
      <Grid
        container
        item
        className={classes.imgPanel}
        justify="center"
        alignItems="center"
        xs="12"
        md="5"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.imgPanelColorOverlay}
        ></Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.imgPanelTextOverlay}
        >
          <img src={Bubble} alt="conversation bubble" height={90} />
          <Typography variant="h4" component="h1" className={classes.imgHeader}>
            Converse with anyone with any language.
          </Typography>
          {/* MaterialUI Quirk/Bug: below box needs to be present for following box below to hide as desired. */}
          <Box display={{ xs: 'none', md: 'block' }}></Box>
          <Box
            display={{
              xs: 'block',
              md: 'none',
            }}
          >
            <a href={'#formPanel'} className={'link-noStyle'}>
              <Button variant="contained">Signup</Button>
            </a>
          </Box>
        </Box>
      </Grid>
      <Grid
        container
        item
        className={classes.formPanel}
        id="formPanel"
        justify="flex-start"
        alignItems="center"
        direction="column"
        xs="12"
        md="7"
      >
        <Grid container item xs="12" justify="flex-end" alignItems="center">
          <Box my={10} />
          <Grid container item xs="8" justify="flex-end">
            <Box className={classes.pageChangeText}>
              <Typography color="secondary">
                <Box fontSize={18}>Already have an account?</Box>
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs="4">
            <Button
              variant="contained"
              className={classes.xlButtonWhite}
              onClick={() => history.push('/login')}
            >
              <Typography color="primary">
                <Box fontSize={18} fontWeight="fontWeightBold">
                  Login
                </Box>
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Box className={classes.formWrapper}>
          <Typography variant="h4" component="h2">
            <b>Create an account.</b>
          </Typography>
          <form onSubmit={handleRegister}>
            <FormControl className={classes.formControl}>
              <Box py={1}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  fullWidth
                  required
                  InputProps={{
                    classes: {
                      root: classes.inputFont,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelFont,
                    },
                  }}
                />
              </Box>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                autocomplete="email"
                fullWidth
                required
                InputProps={{
                  classes: {
                    root: classes.inputFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelFont,
                  },
                }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                autocomplete="password"
                fullWidth
                required
                InputProps={{
                  classes: {
                    root: classes.inputFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelFont,
                  },
                }}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                autocomplete="password"
                fullWidth
                required
                InputProps={{
                  classes: {
                    root: classes.inputFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelFont,
                  },
                }}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Box display="flex" justifyContent="center" py={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.xxlButton}
              >
                <Box fontSize={20}>Create</Box>
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
