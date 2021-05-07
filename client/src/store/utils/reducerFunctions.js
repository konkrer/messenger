/**  When a new message is received or created add to store. */
export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMessages: [],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map(convo => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convoCopy.messages, message];
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

/** When new messages is received add message ids to
 * unread messages array for this conversation */
export const addMessageToUnRead = (state, payload) => {
  const { message } = payload;

  return state.map(convo => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.unreadMessages = convoCopy.unreadMessages
        ? [...convoCopy.unreadMessages, message.id]
        : [message.id];
      return convoCopy;
    } else {
      return convo;
    }
  });
};

/** When this user sent a new messages on a different user-agent update
 * this store with these new message in the approriate conversation. */
export const addOwnMessageToStore = (state, payload) => {
  const { message, sender, user } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: user,
      messages: [message],
      unreadMessages: [],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map(convo => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convoCopy.messages, message];
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

/** Note new online users as they come online in store. */
export const addOnlineUserToStore = (state, id) => {
  return state.map(convo => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map(convo => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

/** When user searches for other users put a fake conversaton in store
 * for each found user with no coversaton yet. This allows ActiveChat
 * to mount correctly and chat to be initalized. */
export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = new Set();

  // make table of current users so we can lookup faster
  state.forEach(convo => {
    currentUsers.add(convo.otherUser.id);
  });

  const newState = [...state];
  users.forEach(user => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers.has(user.id)) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

/** Add a new conversation to store. */
export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map(convo => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

/** Mark recieved messages of a conversaton as read. */
export const markMessagesRead = (state, payload) => {
  const { conversationId } = payload;
  return state.map(convo => {
    if (convo.id === conversationId) {
      convo.unreadMessages = [];
      const convoCopy = { ...convo };
      convoCopy.messages = convo.messages.map(msg => {
        if (msg.senderId === convo.otherUser.id) msg.messageRead = true;
        return msg;
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};

/** Mark sent messages of a conversation as read. */
export const markOwnMessagesRead = (state, payload) => {
  const { conversationId } = payload;
  return state.map(convo => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = convo.messages.map(msg => {
        if (msg.senderId !== convo.otherUser.id) msg.messageRead = true;
        return msg;
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};
