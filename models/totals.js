const {Schema, model} = require('mongoose');

const totalsSchema = new Schema ({
    answers: [{type: String}]
})

const Totals = model('Totals', totalsSchema);

module.exports = Totals;


//my totals are passed answers that are an array of objects with a key value pair.