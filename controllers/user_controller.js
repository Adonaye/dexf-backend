const AuthController = require('../controllers/auth_controller');
const UserModel = require('../models/user');

async function findById(userId) {
    let user = await UserModel.User.findOne({ user_id: userId });
    return user;
}

async function create(userId, screenName, accessToken, accessSecret) {
    let user = findById(userId);
    if (!user) {
        user = await new UserModel.User({
            user_id: userId,
            screen_name: screenName,
            token: accessToken,
            token_secret: accessSecret
        });
        user.save();
    }
    return user;
}

async function connectWithUserId(userId, callback) {
    const user = await findById(userId);
    if (!user) {
        callback(null);
    }
    let accessToken = user.get('token'),
        accessSecret = user.get('token_secret');
    connect(accessToken, accessSecret, callback);
}

function connectWithRequestToken(oauthToken, oauthTokenVerifier, callback) {
    AuthController.accessToken(oauthToken, oauthTokenVerifier, 
        (err, httpResponse, parsedBody) => {
            if (err) {
                callback(null);
            }
            let userId = parsedBody.user_id,
                screenName = parsedBody.screen_name,
                accessToken = parsedBody.oauth_token,
                accessSecret = parsedBody.oauth_token_secret;
            create(userId, screenName, accessToken, accessSecret);
            connect(accessToken, accessSecret, callback);
        }
    );
}

function connect(accessToken, accessSecret, callback) {
    AuthController.verifyCredentials(accessToken, accessSecret, 
        (err, httpResponse, user) => {
            if (err) {
                return null;
            }
            callback(user);
        }
    );
}

module.exports = { findById, create, connectWithRequestToken, connectWithRequestToken };