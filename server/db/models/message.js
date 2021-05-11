const Sequelize = require('sequelize');
const Conversation = require('./conversation');
const db = require('../db');

const { Op } = Sequelize;

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING(8000),
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  messageRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

/**
 * Mark messages as having been viewed (read).
 * @param {array} readMessages ids of messages to be marked read
 * @param {number} conversationId id of conversation messages are part of
 * @param {obj} user current user
 */
Message.markRead = async function (readMessages, conversationId, user) {
  // Get conversation.
  // Current user must be a participant in conversation.
  const conversation = Conversation.findOne({
    where: {
      id: conversationId,
      [Op.or]: [{ user1Id: user.id }, { user2Id: user.id }],
    },
  });
  // if user isn't part of this conversation throw error
  if (!conversation) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  await Message.update(
    { messageRead: true },
    {
      where: {
        id: readMessages,
        conversationId: conversationId,
      },
    }
  );
};

module.exports = Message;
