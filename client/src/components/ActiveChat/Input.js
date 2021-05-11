import React, { useState } from 'react';
import { FormControl, FilledInput } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// local
import { postMessage } from '../../store/utils/thunkCreators';
import socket from '../../socket';

const styles = {
  root: {
    justifySelf: 'flex-end',
    marginTop: 35,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = ({
  classes,
  postMessage,
  otherUser,
  conversationId,
  user,
  reference,
}) => {
  const [text, setText] = useState('');

  const handleChange = event => {
    setText(event.target.value);
    socket.emit('sender-typing', { conversationId, otherUserId: otherUser.id });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const text = event.target.text.value;
    if (!text) return;
    // add sender user info if posting to a brand new convo,
    // so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
      senderId: user.id,
    };
    await postMessage(reqBody);
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} ref={reference}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Input));
