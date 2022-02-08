const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [
            'admin',
            'student',
            'teacher'
        ],
        required: true
    },
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('User', userSchema);
