const Sequelize = require('sequelize');
const db = require('../db');

const { Op } = Sequelize;

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING,
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

Message.markRead = async function (readMessages, readerId) {
  //TODO: check readerId is present an all conversations that have
  // mssgs being set to messageRead=true.

  await Message.update(
    { messageRead: true },
    {
      where: {
        id: readMessages,
      },
    }
  );
};

module.exports = Message;
