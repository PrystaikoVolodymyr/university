const { Schema, model } = require('mongoose');

const oAuth = new Schema({
    userId : { type: String, required: true },
    access_token : { type: String, required: true },
    refresh_token: { type: String, required: true}
});

module.exports = model('OAuth', oAuth);
