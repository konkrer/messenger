import React, { useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// local
import { messagesRead } from '../../store/utils/thunkCreators';
import { Input, Header, Messages, OtherUserBubble } from './index';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh',
    },
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

const ActiveChat = ({ user, conversation = {}, documentVisible }) => {
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
    if (conversation.unreadMessages?.length > 0 && documentVisible) {
      dispatch(messagesRead(conversation, user.id));
    }
  }, [conversation, dispatch, user.id, documentVisible]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Box>
              <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                userId={user.id}
              />
              {/* Show other user typing indicator when other user is typing */}
              {conversation.senderTyping && (
                <OtherUserBubble
                  text={null}
                  time={'Now'}
                  otherUser={conversation.otherUser}
                />
              )}
            </Box>
            {/* End other user typing indicator. */}
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
