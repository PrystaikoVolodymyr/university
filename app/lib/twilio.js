const client = require('twilio')('ACe6c525b68c693aba7fa18f92a51befd9','1746a39b4a9c82981ec45a8108b31edf')

module.exports = {
    async sendCode(code, recipient) {
        try {
            const message = await client.messages.create({
                body: code,
                from: '+12696821856',
                to: recipient
            })

            return message.sid
        } catch (err) {
            throw err
        }
    }
}

