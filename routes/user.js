const express = require('express');
const request = require('request');
const AuthController = require('../controllers/auth_controller');
const UserController = require('../controllers/user_controller');
const router = express.Router();

router.post('/connect', async function (req, res) {
    let userId = req.session.user_id,
        tokens = req.body,
        userCallback = (user, twitterUser) => {
            if (!user) {
                req.session = null;
                res.status(400).send("Error al buscar usuario.");
                return;
            }
            req.session.user_id = user.get('user_id');
            res.send(twitterUser);
            return;
        }
    if (userId) {
        await UserController.connectWithUserId(userId, userCallback);
    } else if (tokens.oauth_token) {
        await UserController.connectWithRequestToken(tokens.oauth_token,
            tokens.oauth_verifier, userCallback);
    } else {
        res.status(500).send("No hay datos de identificacion de usuario.")
    }
});

router.post('/disconnect', async function (req, res) {
    let userId = req.session.user_id,
        url = 'https://api.twitter.com/1.1/oauth/invalidate_token.json',
        user = await UserController.findById(userId),
        oauth = AuthController.getOauthParams();

    oauth.token = user.get('token');
    oauth.token_secret = user.get('token_secret');

    request.post({
        url: url,
        oauth: oauth
    }, function (err, httpResponse, body) {
        req.session = null;
        res.status(httpResponse.statusCode).send({ body, userId });
    });
});

module.exports = router;