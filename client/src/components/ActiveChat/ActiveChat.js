import React, { useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// local
import { messagesRead } from '../../store/utils/thunkCreators';
import { Input, Header, Messages } from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
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
  const messageInput = useRef(null);
  const dispatch = useDispatch();

  // scroll to bottom of active chat when length of messages changes.
  useEffect(() => {
    if (
      messageInput.current &&
      conversation.messages?.length !== messagesLengthRef.current
    ) {
      messageInput.current.scrollIntoView({ behavior: 'smooth' });
      messagesLengthRef.current = conversation.messages.length;
    }
  }, [conversation.messages]);

  // mark messages read when active chat is showing a conversation
  // with unread messages.
  useEffect(() => {
    if (conversation.unreadMessages?.length > 0) {
      dispatch(messagesRead(conversation, user.id));
    }
  }, [conversation, dispatch, user.id]);

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
              reference={messageInput}
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
