const mongoose = require('mongoose');

const TokenizedDataSchema = new mongoose.Schema({
    originalData: { type: String, required: true },
    tokenizedData: { type: String, required: true },
    transactionHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TokenizedData', TokenizedDataSchema);
