const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: String,
    screenName: String,
    accessToken: String,
    accessSecret: String
});

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };