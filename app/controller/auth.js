const User = require('../models/User');
const bcrypt = require('../crypto/bcrypt');

module.exports = {
    async singUp(req, res) {
        try {
            const { email, password, name } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User is already exist' });
            }
            const hashPassword = await bcrypt.hasher(password);

            await User.create({
                email,
                password: hashPassword,
                name
            });

            res.status(201).json({ message: 'User is created' });
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    async singIn(req, res) {
        try {
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (!candidate) {
                return res.status(400).json({ message: 'Wrong email or password' });
            }

            await bcrypt.compare(password, candidate.password);

            res.status(201).json({ message: 'Login is complete' });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
};
