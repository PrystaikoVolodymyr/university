// const User = require('../models/User');
const Message = require('../models/Message');
const encoder = require('../scripts/encoder');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { senderId, recipientId, message } = req.body;
            const cryptoMessage = encoder.encryption(message);
            console.log(cryptoMessage)
            await Message.create({
                senderId,
                recipientId,
                message: cryptoMessage,
                sendAt: new Date()
            });

            res.status(201).json({ message:  "success" });
        } catch (e) {
            res.json(e.message);
        }
    }
};
