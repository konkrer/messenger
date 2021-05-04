import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button, Hidden } from '@material-ui/core';

// local
import { useStyles } from '../themes/signupLogin';
import Bubble from '../assets/bubble.svg';

/**
 * Return dictionary object with appropriate text for either the login or signup page.
 * If omitted returns text for login page.
 *
 * @param {string} page signup | login
 * @returns object with appropriate page text
 */
const pageText = page => {
  if (/signup/i.test(page))
    return {
      xsScreenButtonText: 'Signup',
      pageSwitchText: 'Already have an account?',
      pageSwitchBtnText: 'Login',
      pageSwitchUrl: '/login',
    };
  return {
    xsScreenButtonText: 'Login',
    pageSwitchText: "Don't have an account?",
    pageSwitchBtnText: 'Create Account',
    pageSwitchUrl: '/register',
  };
};

/**
 * SignupLoginGrid View Component.
 *
 * This component holds the layout grid with styling for both the signup and login views.
 */

const SignupLoginGrid = ({
  FormComponent,
  submitHandler,
  formErrorMessage,
  page,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const text = pageText(page);

  return (
    <Grid container className={classes.mainGrid}>
      <Grid
        container
        item
        className={classes.imgPanel}
        justify="center"
        alignItems="center"
        xs={12}
        md={5}
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
          <Hidden mdUp>
            <a href={'#formPanel'} className={'link-noStyle'}>
              <Button variant="contained">{text.xsScreenButtonText}</Button>
            </a>
          </Hidden>
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
        xs={12}
        md={7}
      >
        <Grid container item xs={12} justify="flex-end" alignItems="center">
          <Box my={10} />
          <Grid container item xs={8} justify="flex-end">
            <Box className={classes.pageChangeText}>
              <Typography color="secondary">
                <Box component="span" fontSize={18}>
                  {text.pageSwitchText}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={4}>
            <Button
              variant="contained"
              className={classes.xlButtonWhite}
              onClick={() => history.push(text.pageSwitchUrl)}
            >
              <Typography color="primary">
                <Box component="span" fontSize={18} fontWeight="fontWeightBold">
                  {text.pageSwitchBtnText}
                </Box>
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <FormComponent
          submitHandler={submitHandler}
          classes={classes}
          formErrorMessage={formErrorMessage}
        />
      </Grid>
    </Grid>
  );
};

export default SignupLoginGrid;
