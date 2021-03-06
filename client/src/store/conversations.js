import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  addOwnMessageToStore,
  markMessagesRead,
  markOwnMessagesRead,
  addMessageToUnRead,
  setSenderTypingTrue,
  setSenderTypingFalse,
} from './utils/reducerFunctions';

// ACTIONS

const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_OWN_MESSAGE = 'SET_OWN_MESSAGE';
const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
const REMOVE_OFFLINE_USER = 'REMOVE_OFFLINE_USER';
const SET_SEARCHED_USERS = 'SET_SEARCHED_USERS';
const CLEAR_SEARCHED_USERS = 'CLEAR_SEARCHED_USERS';
const ADD_CONVERSATION = 'ADD_CONVERSATION';
const MESSAGES_READ = 'MESSAGES_READ';
const SET_UNREAD_MESSAGE = 'SET_UNREAD_MESSAGE';
const OWN_MESSAGES_READ = 'OWN_MESSAGES_READ';
const SENDER_TYPING = 'SENDER_TYPING';
const RESET_SENDER_TYPING = 'RESET_SENDER_TYPING';

// ACTION CREATORS

export const gotConversations = conversations => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

// add a new message to unread messages for a conversation
export const setNewUnreadMessage = message => {
  return {
    type: SET_UNREAD_MESSAGE,
    payload: { message },
  };
};

// add a message from this user from another user-agent
export const setNewOwnMessage = (message, sender, user) => {
  return {
    type: SET_OWN_MESSAGE,
    payload: { message, sender: sender || null, user },
  };
};

export const addOnlineUser = id => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = id => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = users => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

// when received messages have been viewed set messages read.
export const setMessagesRead = conversationId => {
  return {
    type: MESSAGES_READ,
    payload: { conversationId },
  };
};

// when sent messages have been viewed set own messages read.
export const setOwnMessagesRead = conversationId => {
  return {
    type: OWN_MESSAGES_READ,
    payload: { conversationId },
  };
};

// when conversation sender is typing.
export const setSenderTyping = conversationId => {
  return {
    type: SENDER_TYPING,
    payload: { conversationId },
  };
};

// when sender typing icon should be reset.
export const resetSenderTyping = conversationId => {
  return {
    type: RESET_SENDER_TYPING,
    payload: { conversationId },
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case SET_OWN_MESSAGE:
      return addOwnMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter(convo => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case MESSAGES_READ:
      return markMessagesRead(state, action.payload);
    case OWN_MESSAGES_READ:
      return markOwnMessagesRead(state, action.payload);
    case SET_UNREAD_MESSAGE:
      return addMessageToUnRead(state, action.payload);
    case SENDER_TYPING:
      return setSenderTypingTrue(state, action.payload);
    case RESET_SENDER_TYPING:
      return setSenderTypingFalse(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
