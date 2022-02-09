// const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { senderId, recipientId, message } = req.body;
            const cryptoMessage = message;
            await Message.create({
                senderId,
                recipientId,
                message: cryptoMessage,
                sendAt: new Date()
            });
        } catch (e) {
            res.json(e.message);
        }
    }
};
