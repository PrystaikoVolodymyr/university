const User = require('../models/User');
const bcrypt = require('../crypto/bcrypt');
const TwoFactorAuth = require('../models/twoFactorAuth')
const nodemailer = require('../lib/nodemailer')
const tokenGenerator = require('../lib/tokenGenerator')
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    async singUp(req, res) {
        try {
            const { email, password, name, surname, phone } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User is already exist' });
            }
            const hashPassword = await bcrypt.hasher(password);

            await User.create({
                email,
                password: hashPassword,
                name,
                surname,
                phone
            });

            res.status(201).json({ message: 'User is created' });
        } catch (e) {
            console.log(e.message)
            res.status(500).json(e.message);
        }
    },

    async singIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const code = Math.floor(1000 + Math.random() * 9000);


            if (!user) {
                throw new Error('no user')
            }

            await bcrypt.compare(password, user.password);

            await TwoFactorAuth.create({
                email: email,
                code: code,
            })

            const token = await tokenGenerator.generateToken({email: email, userId: user._id})

             await nodemailer.sendMail('TwoFactorAuth', code, email)

            return res.status(201).json({ message: 'Login is complete', token:  token});

        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    async verifyTwoFactorAuth(req, res) {
        try {
            const { code } = req.body;

            const token = req.headers.token

            const info = jwt.verify(token, config.Token_key, {},(err, info) => {
                if (err)  {
                    throw new Error('wrong token')
                }
                return info
            })

            const verify = await TwoFactorAuth.findOne({email: info.userInfo.email, code: code})

            if (!verify) {
                throw new Error('not valid code')
            }

            const tokens = tokenGenerator.generateAccessAndRefreshToken({userId: info.userInfo.userId})

            res.status(201).json({ message: 'Verify is complete', tokens });
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    async checkRefreshToken(req, res) {
        try {
            const tokens = JSON.parse(req.headers.tokens);
            const refresh_token = tokens.refresh_token

            const info = jwt.verify(refresh_token, config.Refresh_Key, {},(err, info) => {
                if (err)  {
                    throw new Error('wrong token')
                }
                return info
            })

            const newTokens = tokenGenerator.generateAccessAndRefreshToken({userId: info.userInfo.userId})

            res.status(201).json({ message: 'Verify is complete', tokens: newTokens });

        } catch (e) {
            res.status(401).json(e.message);
        }
    }
};
