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
  console.log('connected to server', socket.id);
  console.log('connected to server', store.getState());

  socket.on('add-online-user', id => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on('remove-offline-user', id => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on('new-message', ({ message, sender }) => {
    store.dispatch(setNewMessage(message, sender));
    store.dispatch(setNewUnreadMessage(message));
  });

  socket.on('new-own-message', ({ message, sender }) => {
    store.dispatch(setNewOwnMessage(message, sender, store.getState().user));
  });

  socket.on('sender-messages-read', ({ conversationId }) => {
    store.dispatch(setOwnMessagesRead(conversationId));
  });

  socket.on('recipient-messages-read', ({ conversationId }) => {
    store.dispatch(setMessagesRead(conversationId));
  });

  // if user is signed in but this socket has just connected (i.e. page refresh)
  // emit "add-online-user" event with the userId and socketId.
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
