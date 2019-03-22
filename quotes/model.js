const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const QuoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    ratings: {
        type: Array,
        default: []
    },
    addresses: {
        type: Array,
        default: []
    }
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = {Quote};