import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({ user, conversation = {} }) => {
  const classes = useStyles();
  const messagesLengthRef = useRef(conversation.messages?.length || 0);

  // scroll to bottom of active chat when length of messages changes.
  useEffect(() => {
    const msgInput = document.getElementById('message-input');
    if (
      msgInput &&
      conversation.messages?.length !== messagesLengthRef.current
    ) {
      msgInput.scrollIntoView();
      messagesLengthRef.current = conversation.messages.length;
    }
  }, [conversation.messages]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
              id={'message-input'}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        conversation =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
