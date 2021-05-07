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
} from './store/conversations';
import { getCookie } from './utils/cookieHelper';

const socket = io(window.location.origin);

socket.on('connect', async () => {
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
    store.dispatch(setNewMessage(message, sender));
    store.dispatch(setNewUnreadMessage(message));
  });
  // new message frow this user from another user-agent connection
  socket.on('new-own-message', ({ message, sender }) => {
    store.dispatch(setNewOwnMessage(message, sender, store.getState().user));
  });
  // messages this user wrote were read
  socket.on('sender-messages-read', ({ conversationId }) => {
    store.dispatch(setOwnMessagesRead(conversationId));
  });
  // this user read meassages from another user-agent update.
  // Removes unread messages notifications badge.
  socket.on('recipient-messages-read', ({ conversationId }) => {
    store.dispatch(setMessagesRead(conversationId));
  });

  // if user is signed in but this socket has just connected (i.e. page refresh)
  // emit "add-online-user" event with the userId and new/ updated socketId.
  try {
    const userId = store.getState().user.id;
    if (userId) {
      const userAgentId = getCookie('userAgentId');
      socket.emit('add-online-user', userId, socket.id, userAgentId);
    }
  } catch (error) {
    console.error(error);
  }
});

export default socket;
