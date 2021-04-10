const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, select: false},
    firstName: String,
    lastName: String,
    dob: String,
    isRegistered: Boolean,
    id: String,
    votes: Array
})

const User = model('User', userSchema);

module.exports = User;