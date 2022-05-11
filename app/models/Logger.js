const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    level: { type: String, required: true },
    message: { type: String, required: true, },
    info: {type: String },
    url: {type: String, required: true, },
    errorMessage: {type: String },
    type: {type: String },
}, {timestamps: true});

module.exports = mongoose.model('Logger', schema);

// userLogger.info(ctx.method, {vetInfo: ctx.request.body.email, url: ctx.url, action: logAction.resetPasswordVet, type: 'request'});
// userLogger.info(ctx.method, {vetInfo: vet._id, url: ctx.url, action: logAction.resetPasswordVet,type: 'response'})
// userLogger.error(ctx.method, {vetInfo: ctx.request.body.email, url: ctx.url, action: logAction.resetPasswordVet, errorMessage: err.message})
