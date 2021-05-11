import io from 'socket.io-client';

// local
import store from './store';
import {
  setNewMessage,
  setNewUnreadMessage,
  setNewOwnMessage,
  setOwnMessagesRead,
  setMessagesRead,
  removeOfflineUser,
  addOnlineUser,
  setSenderTyping,
  resetSenderTyping,
} from './store/conversations';

const socket = io(window.location.origin);

socket.on('connect', async () => {
  let messageTypingTimer;
  // new user comes online
  socket.on('add-online-user', id => {
    store.dispatch(addOnlineUser(id));
  });
  // user goes offline
  socket.on('remove-offline-user', id => {
    store.dispatch(removeOfflineUser(id));
  });
  // new message received
  socket.on('new-message', ({ message, sender }) => {
    clearTimeout(messageTypingTimer);
    store.dispatch(setNewMessage(message, sender));
    store.dispatch(setNewUnreadMessage(message));
    store.dispatch(resetSenderTyping(message.conversationId));
  });
  // new message frow this user from another user-agent connection
  socket.on('new-own-message', ({ message, sender }) => {
    store.dispatch(setNewOwnMessage(message, sender, store.getState().user));
  });
  // messages this user wrote were read
  socket.on('sender-messages-read', ({ conversationId }) => {
    store.dispatch(setOwnMessagesRead(conversationId));
  });
  // this user read messages from another user-agent connection.
  // Removes unread messages notifications badge.
  socket.on('recipient-messages-read', ({ conversationId }) => {
    store.dispatch(setMessagesRead(conversationId));
  });
  // Another user is typing a message in a chat with this user.
  socket.on('sender-typing', ({ conversationId }) => {
    clearTimeout(messageTypingTimer);
    store.dispatch(setSenderTyping(conversationId));
    messageTypingTimer = setTimeout(() => {
      store.dispatch(resetSenderTyping(conversationId));
    }, 2000);
  });

  // if user is signed in but this socket has just connected (i.e. page refresh)
  // emit "add-online-user" event with the userId.
  try {
    const userId = store.getState().user.id;
    if (userId) {
      socket.emit('add-online-user', userId);
    }
  } catch (error) {
    console.error(error);
  }
});

export default socket;
