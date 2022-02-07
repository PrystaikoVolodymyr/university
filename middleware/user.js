const Validator = require('../validator/userValidator')

module.exports = {
    async createUser (req, res, next) {
        try {
            const { error } = Validator.createUser.validate(req.body)

            if (error) {
                throw new Error(error.details[0].message);
            }
            await next()
        }catch (e) {
            res.json(e.message)
        }
    }
}