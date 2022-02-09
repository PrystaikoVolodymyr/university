const User = require('../models/User');

module.exports = {
    async getUserInfo(req, res) {
        try {
            const { userId } = req.body;

            const user = await User.findOne({ _id: userId });

            res.json({ user, status: 'success' });
        } catch (e) {
            res.json(e.message);
        }
    },
    async sendRequestToConnect(req, res) {
        try {
            const { userId, connectId } = req.body;

            const user = await User.findOne({ _id: userId });
            const connectUser = await User.findOne({ _id: connectId });

            if (!user || !connectUser) {
                throw new Error('No user');
            }
            await User.updateOne({
                _id: connectId
            },
            {
                $push: { requestConnections: userId }
            });
            await User.updateOne({
                _id: userId
            },
            {
                $push: { sendConnections: connectId }
            });

            res.status(201).json({ message: 'Request to connect send successfully' });
        } catch (e) {
            res.json(e.message);
        }
    },
    async approveConnectRequest(req, res) {
        try {
            const { userId, connectId } = req.body;

            const user = await User.findOne({ _id: userId });
            const connectUser = await User.findOne({ _id: connectId });

            if (!user || !connectUser) {
                throw new Error('No user');
            }
            await User.updateOne({
                _id: userId
            },
            {
                $push: { connections: connectId },
                $pull: { requestConnections: connectId }
            });
            await User.updateOne({
                _id: connectId
            },
            {
                $push: { connections: userId },
                $pull: { sendConnections: connectId }
            });

            res.status(201).json({ message: 'Connected was successfully' });
        } catch (e) {
            res.json(e.message);
        }
    }
};
