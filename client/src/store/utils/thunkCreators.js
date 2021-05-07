import axios from 'axios';

// local
import socket from '../../socket';
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  setMessagesRead,
} from '../conversations';
import { gotUser, setFetchingStatus } from '../user';
import { getCookie } from '../../utils/cookieHelper';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async dispatch => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/auth/user');
    dispatch(gotUser(data));
    if (data.id && socket.id) {
      const userAgentId = getCookie('userAgentId');
      socket.emit('add-online-user', data.id, socket.id, userAgentId);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = credentials => async dispatch => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    const userAgentId = getCookie('userAgentId');
    socket.emit('add-online-user', data.id, socket.id, userAgentId);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = credentials => async dispatch => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    const userAgentId = getCookie('userAgentId');
    socket.emit('add-online-user', data.id, socket.id, userAgentId);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = id => async dispatch => {
  try {
    await localStorage.removeItem('messenger-token');
    dispatch(gotUser({}));
    const userAgentId = getCookie('userAgentId');
    socket.emit('remove-offline-user', id, userAgentId);
    await axios.delete('/auth/logout');
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/conversations');
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async body => {
  const { data } = await axios.post('/api/messages', body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit('new-message', {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
    senderSkipSocket: socket.id,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = body => async dispatch => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

const saveMessagesRead = async body => {
  await axios.post('/api/messages/read', body);
};

const sendMessagesRead = (conversation, userId) => {
  socket.emit('messages-read', {
    conversationId: conversation.id,
    senderId: conversation.otherUser.id,
    recipientId: userId,
    recipientSocketSkip: socket.id,
  });
};

// mark messages read in DB, Redux store, and emit socket event.
export const messagesRead = (conversation, userId) => async dispatch => {
  try {
    await saveMessagesRead({ readMessages: conversation.unreadMessages });

    dispatch(setMessagesRead(conversation.id));

    sendMessagesRead(conversation, userId);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = searchTerm => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
