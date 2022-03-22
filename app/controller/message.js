// const User = require('../models/User');
const Message = require('../models/Message');
const encoder = require('../scripts/encoder');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { senderId, recipientId, message } = req.body;
            const cryptoMessage = await encoder.encryption(message);
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
            let message = await Message.find({
                senderId,
                recipientId
            }).select({
                senderId: 1, message: 1, sendAt: 1, _id: 0
            });

            for (const messageElement of message) {
                let index = message.indexOf(messageElement)
                let m = await encoder.decryption(messageElement.message)
                message[index].message = m
            }

            res.status(201).json({ status: 'success', message });
        } catch (e) {
            res.json(e.message);
        }
    }
};
