const User = require('../models/User');

module.exports = {
    async getUserInfo(req, res) {
        try {
            const { userId } = req.query;

            const user = await User.findOne({ _id: userId });

            res.json({ user, status: 'success' });
        } catch (e) {
            res.json(e.message);
        }
    },
    async getUsers(req, res) {
        try {
            const {name, surname}  = req.query

            let users
            if ((name && surname) !== '') {
                 users = await User.find({name: name, surname: surname});
            }else if (name !== '' && surname === '') {
                 users = await User.find({name: name});
            } else if (surname !== '' && name === '') {
                 users = await User.find({surname: surname});
            }
            res.status(201).json({ users: users});
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
                throw new Error('No User');
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
            if (!user.requestConnections.includes(connectId) || !connectUser.sendConnections.includes(userId)) {
                throw new Error('Connection didnt sent');
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
                $pull: { sendConnections: userId }
            });

            res.status(201).json({ message: 'Connected was successfully' });
        } catch (e) {
            res.json(e.message);
        }
    },
    async rejectConnectRequest(req, res) {
        try {
            const { userId, connectId } = req.body;

            const user = await User.findOne({ _id: userId });
            const connectUser = await User.findOne({ _id: connectId });

            if (!user.requestConnections.includes(connectId) || !connectUser.sendConnections.includes(userId)) {
                throw new Error('Connection didnt sent');
            }

            if (!user || !connectUser) {
                throw new Error('No user');
            }
            await User.updateOne({
                _id: userId
            },
            {
                $pull: { requestConnections: connectId }
            });
            await User.updateOne({
                _id: connectId
            },
            {
                $pull: { sendConnections: userId }
            });

            res.status(201).json({ message: 'Connected reject was successfully' });
        } catch (e) {
            res.json(e.message);
        }
    }
};
