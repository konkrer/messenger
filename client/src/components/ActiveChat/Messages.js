import { memo } from 'react';
import { Avatar, Box, makeStyles } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '1.5rem',
    letterSpacing: -0.2,
    fontWeight: 'bold',
  },
  confirmationBox: {
    position: 'absolute',
    width: '100%',
    bottom: -35,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: '0px 0px 10px 0px',
  },
  avatar: {
    height: 20,
    width: 20,
  },
}));

/** Find the index of the last message user sent for showing the message read indicator. */
const indexOfLastOwnMessage = (messages, userId) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].senderId === userId) return i;
  }
  return -1;
};

const Messages = ({ messages, otherUser, userId }) => {
  const classes = useStyles();
  const idxLastOwnMessage = indexOfLastOwnMessage(messages, userId);

  return (
    <Box className={classes.root}>
      {messages.map((message, idx) => {
        const time = moment(message.createdAt).format('h:mm');
        const latestOwnMessage = idx === idxLastOwnMessage;

        return message.senderId === userId ? (
          <div key={message.id} style={{ position: 'relative' }}>
            <SenderBubble text={message.text} time={time} />
            {latestOwnMessage && message.messageRead && (
              <Box className={classes.confirmationBox}>
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

export default memo(Messages);
