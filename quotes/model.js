const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const QuoteSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    scores: {
        type: Array,
        default: []
    }
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = {Quote};