const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: String,
    screen_name: String,
    token: String,
    token_secret: String
});

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };