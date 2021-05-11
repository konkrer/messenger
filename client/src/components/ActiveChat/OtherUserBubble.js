import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: '20px',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    color: '#BECCE2',
  },
  bubble: {
    backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: '0 10px 10px 10px',
  },
  text: {
    color: '#FFFFFF',
    padding: 8,
  },
  loader: {
    transform: 'translateY(1px)',
  },
}));

const OtherUserBubble = ({ text, time, otherUser }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          {text ? (
            <Typography className={classes.text}>{text}</Typography>
          ) : (
            <Box pt={1} pb={1}>
              <Loader
                type="ThreeDots"
                color="#ffffffad"
                height={10}
                width={100}
                className={classes.loader}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
