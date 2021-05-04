import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@material-ui/core';

// local
import { useStyles } from '../themes/signupLogin';
import Bubble from '../assets/bubble.svg';

const SignupLoginGrid = ({
  FormComponent,
  submitHandler,
  formErrorMessage,
  xsScreenButtonText,
  pageSwitchText,
  pageSwitchBtnText,
  pageSwitchUrl,
}) => {
  const classes = useStyles();
  const history = useHistory();

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
              <Button variant="contained">{xsScreenButtonText}</Button>
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
                <Box fontSize={18}>{pageSwitchText}</Box>
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs="4">
            <Button
              variant="contained"
              className={classes.xlButtonWhite}
              onClick={() => history.push(pageSwitchUrl)}
            >
              <Typography color="primary">
                <Box fontSize={18} fontWeight="fontWeightBold">
                  {pageSwitchBtnText}
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
