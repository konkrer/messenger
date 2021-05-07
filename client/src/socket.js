import io from 'socket.io-client';

// local
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from './store/conversations';

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
  socket.on('new-message', data => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  // if user is signed in but this socket has just connected (i.e. page refresh)
  // emit "add-online-user" event with the userId and socketId.
  try {
    const userId = store.getState().user.id;
    if (userId) {
      socket.emit('add-online-user', userId, socket.id);
    }
  } catch (error) {
    console.error(error);
  }
});

export default socket;
