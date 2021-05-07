const router = require('express').Router();
const { Conversation, Message } = require('../../db/models');
const onlineUsers = require('../../onlineUsers');

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// Set messageRead to true for messages that have been read by user.
// Expects an array named "readMessages" containing the message ids.
router.post('/read', (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (
      !req.body.readMessages ||
      !req.body.conversationId ||
      !Array.isArray(req.body.readMessages) ||
      !Number.isInteger(+req.body.conversationId)
    ) {
      return res.sendStatus(400);
    }
    const { readMessages, conversationId } = req.body;

    Message.markRead(readMessages, conversationId);

    res.json({ status: 'marked read' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
