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

async function connectWithSession(session, callback) {
    const userId = session.user_id;
    const user = await findById(userId);
    if (!user) {
        callback(null);
    }
    let accessToken = user.get('accessToken'),
        accessSecret = user.get('accessSecret');
    connect(accessToken, accessSecret, callback);
}

function connectWithRequestToken(oauthToken, oauthTokenVerifier, callback) {
    AuthController.accessToken(oauthToken, oauthTokenVerifier, 
        (err, httpResponse, parsedBody) => {
            if (err) {
                callback(null);
            }
            let accessToken = parsedBody.oauth_token,
                accessSecret = parsedBody.oauth_token_secret,

        }
    );
}

function connect(accessToken, accessSecret, callback) {

}

module.exports = { findById, create, connectWithSession, connectWithRequestToken };