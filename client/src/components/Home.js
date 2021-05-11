import React, { useEffect, useState } from 'react';
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
  const [documentVisible, setDocumentVisible] = useState(true);

  const setDocumentVisibleHandler = () => {
    setDocumentVisible(document.visibilityState === 'visible');
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    document.addEventListener('visibilitychange', setDocumentVisibleHandler);
    return () => {
      document.removeEventListener(
        'visibilitychange',
        setDocumentVisibleHandler
      );
    };
  }, []);

  if (!user.id) {
    return <Redirect to="/login" />;
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4}>
        <SidebarContainer />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ActiveChat documentVisible={documentVisible} />
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
