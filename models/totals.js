const {Schema, model} = require('mongoose');

const totalsSchema = new Schema ({
    totals: String
})

const Totals = model('Totals', totalsSchema);

module.exports = Totals;


//my totals are passed answers that are an array of objects with a key value pair.

//calculator in the charts that are displayed?:
// for every item in totals.answers, seperate out the keys. If key === this question, then map over every value with that question and count how many there are.
//display the counted answers for this question in this chart.