const User = require('../models/User');
const bcrypt = require('../crypto/bcrypt');
const TwoFactorAuth = require('../models/twoFactorAuth')

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
            const user = await User.findOne({ email });
            const code = Math.floor(1000 + Math.random() * 9000);


            if (!user) {
                return res.status(400).json({ message: 'Wrong email or password' });
            }

            await bcrypt.compare(password, user.password);

            await TwoFactorAuth.create({
                phone: user.phone,
                code: code,
            })

            res.status(201).json({ message: 'Login is complete' });
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    async verifyTwoFactorAuth(req, res) {
        const { email, code } = req.body;


    }
};
