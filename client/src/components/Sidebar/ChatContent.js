import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
    maxWidth: '25ch',
    overflow: 'hidden',
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: '#3F92FF',
    marginRight: 10,
    marginTop: 10,
    color: 'white',
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
}));

const messageSummary = message => {
  return message?.length > 60 ? `${message.slice(0, 60)}...` : message;
};

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root} textOverflow="ellipsis">
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {messageSummary(latestMessageText)}
        </Typography>
      </Box>
      {conversation.unreadMessages?.length > 0 && (
        <Box component="span" className={classes.notification}>
          {conversation.unreadMessages.length}
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
