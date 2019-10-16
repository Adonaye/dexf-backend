const AuthController = require('../controllers/auth_controller');
const UserModel = require('../models/user');

async function findById(userId) {
    let user = await UserModel.User.findOne({ user_id: userId });
    return user;
}

async function create(userId, screenName, accessToken, accessSecret) {
    let user = await findById(userId);
    if (!user) {
        user = await new UserModel.User({
            user_id: userId,
            screen_name: screenName,
            token: accessToken,
            token_secret: accessSecret
        });
    } else {
        await user.updateOne({
            token: accessToken,
            token_secret: accessSecret,
        });
    }
    await user.save();
    return user;
}

async function connectWithUserId(userId, callback) {
    const user = await findById(userId);
    if (!user) {
        callback(null);
    }
    let accessToken = user.get('token'),
        accessSecret = user.get('token_secret');
    connect(accessToken, accessSecret, user, callback);
}

async function connectWithRequestToken(oauthToken, oauthTokenVerifier, callback) {
    AuthController.accessToken(oauthToken, oauthTokenVerifier, 
        async (err, httpResponse, parsedBody) => {
            if (err) {
                callback(null);
            }
            let userId = parsedBody.user_id,
                screenName = parsedBody.screen_name,
                accessToken = parsedBody.oauth_token,
                accessSecret = parsedBody.oauth_token_secret;
            let user = await create(userId, screenName, accessToken, accessSecret);
            connect(accessToken, accessSecret, user, callback);
        }
    );
}

function connect(accessToken, accessSecret, user, callback) {
    AuthController.verifyCredentials(accessToken, accessSecret, 
        (err, httpResponse, twitterUser) => {
            if (err) {
                callback(null);
            }
            callback(user, twitterUser);
        }
    );
}

module.exports = { findById, create, connectWithRequestToken, connectWithUserId };