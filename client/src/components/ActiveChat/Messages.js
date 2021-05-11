import React from 'react';
import { Avatar, Box, makeStyles } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  confimationBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: '10px 0px',
  },
  avatar: {
    height: 20,
    width: 20,
  },
}));

const Messages = ({ messages, otherUser, userId }) => {
  const classes = useStyles();

  return (
    <Box>
      {messages.map(message => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <div key={message.id}>
            <SenderBubble text={message.text} time={time} />
            {message.messageRead && (
              <Box className={classes.confimationBox}>
                <Avatar
                  alt="message read"
                  className={classes.avatar}
                  src={otherUser.photoUrl}
                ></Avatar>
              </Box>
            )}
          </div>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
