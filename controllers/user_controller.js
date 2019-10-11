const AuthController = require('../controllers/auth_controller');
const UserModel = require('../models/user');

async function create(userId, screenName, accessToken, accessSecret) {
    let user = await UserModel.User.findOne({ id: userId });
    if (!user) {
        user = await new UserModel.User({
            id: userId,
            screenName: screenName,
            accessToken: accessToken,
            accessSecret: accessSecret
        });
        user.save();
    }
    return user;
}

function connect(accessToken, accessSecret, callback) {

}

module.exports = { create, connect };