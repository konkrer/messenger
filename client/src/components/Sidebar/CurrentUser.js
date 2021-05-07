import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BadgeAvatar } from './index';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// local
import { logout } from '../../store/utils/thunkCreators';
import { clearOnLogout } from '../../store/index';

const useStyles = makeStyles(theme => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 17,
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5,
  },
  drawerItem: {
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CurrentUser = ({ user = {} }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(user.id));
    dispatch(clearOnLogout());
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <MoreHorizIcon
          classes={{ root: classes.ellipsis }}
          onClick={() => setDrawerOpen(drawerOpen => !drawerOpen)}
        />
        <Drawer
          anchor={'left'}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box py={5}>
            <Box className={classes.drawerItem}>
              {/* logout button will eventually be in a dropdown next to username */}
              <ExitToAppIcon />
              <Button className={classes.logout} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CurrentUser);
