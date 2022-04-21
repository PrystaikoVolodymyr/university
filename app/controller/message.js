// const User = require('../models/User');
const Message = require('../models/Message');
const encoder = require('../scripts/encoder');

module.exports = {
    async sendMessage(req, res) {
        try {
            const { recipientId, message } = req.body;
            const senderId = req.info.userId
            const cryptoMessage = await encoder.encryption(message);
            await Message.create({
                senderId,
                recipientId,
                message: cryptoMessage,
                sendAt: new Date()
            });

            res.status(201).json({ message: 'success' });
        } catch (e) {
            console.log(e)
            res.json(e.message);
        }
    },

    async getMessage(req, res) {
        try {
            const { recipientId } = req.query;
            const senderId = req.info.userId
            let messages = await Message.find({
                $or: [
                    { senderId: senderId, recipientId: recipientId},
                    { senderId: recipientId, recipientId: senderId}
                ]
            }).select({
                senderId: 1, message: 1, sendAt: 1, recipientId: 1, _id: 0
            }).sort({sendAt: -1});

            for (const messageElement of messages) {
                let index = messages.indexOf(messageElement)
                let m = await encoder.decryption(messageElement.message)
                messages[index].message = m
            }

            res.status(201).json({ status: 'success', messages });
        } catch (e) {
            console.log(e.message)
            res.json(e.message);
        }
    }
};
