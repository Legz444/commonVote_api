const {Schema, model} = require('mongoose');

const pollSchema = new Schema ({
    question: String,
    answers: []
})

const Poll = model('Poll', pollSchema);

module.exports = Poll;
