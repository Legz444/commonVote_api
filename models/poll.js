const {Schema, model} = require('mongoose');

const pollSchema = new Schema ([{
    question: String,
    answer: Array
}])

const Poll = model('Poll', pollSchema);

module.exports = Poll;


//my poll list data only has questions and answers.
//Can I add to this schema the votes? How do I store the value?