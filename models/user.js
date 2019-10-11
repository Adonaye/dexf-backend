const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    screenName: String,
    profileImageUrl: String
});

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };