
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    currentToken: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Token', tokenSchema);
