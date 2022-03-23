const { Schema, model } = require('mongoose');

const twoFactorSchema = new Schema({
    phone : { type: String, required: true },
    code : { type: String, required: true },
    sendAt: { type: Date, default: Date.now()}
}, { timestamps: true });

twoFactorSchema.index({sendAt: 1},{expireAfterSeconds: 240});

module.exports = model('TwoFactorAuth', twoFactorSchema);
