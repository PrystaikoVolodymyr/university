const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [
            'admin',
            'student',
            'teacher'
        ],
    },
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    requestConnections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sendConnections: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = model('User', userSchema);
