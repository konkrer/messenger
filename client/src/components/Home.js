import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, CssBaseline } from '@material-ui/core';
import { SidebarContainer } from './Sidebar';
import { ActiveChat } from './ActiveChat';
import { fetchConversations } from '../store/utils/thunkCreators';

const styles = {
  root: {
    height: '100vh',
  },
};

const Home = ({ fetchConversations, classes, user }) => {
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (!user.id) {
    return <Redirect to="/login" />;
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={4}>
        <SidebarContainer />
      </Grid>
      <Grid item xs={12} md={8}>
        <ActiveChat />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
