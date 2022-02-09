const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    recipientId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    sendAt: { type: Date, required: true }
}, { timestamps: true });
module.exports = model('Message', messageSchema);
