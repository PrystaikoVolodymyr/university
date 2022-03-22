// const User = require('../models/User');
const Message = require('../models/Message');
const encoder = require('../scripts/encoder');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { senderId, recipientId, message } = req.body;
            const cryptoMessage = encoder.encryption(message);
            await Message.create({
                senderId,
                recipientId,
                message: cryptoMessage,
                sendAt: new Date()
            });

            res.status(201).json({ message: 'success' });
        } catch (e) {
            res.json(e.message);
        }
    },

    async getMessage(req, res) {
        try {
            const { senderId, recipientId } = req.body;
            const message = await Message.find({
                senderId,
                recipientId
            }).select({
                senderId: 1, message: 1, sendAt: 1, _id: 0
            });

            message.forEach((element) => {
                element.message = encoder.decryption(element.message);
            });

            res.status(201).json({ status: 'success', message });
        } catch (e) {
            res.json(e.message);
        }
    }
};
