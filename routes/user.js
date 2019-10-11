const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');
const UserController = require('../controllers/user_controller');
const router = express.Router();

router.post('/connect', function(req, res) {
    /* let bodyParams = req.body,
        token = bodyParams.token || "",
        token_secret = bodyParams.token_secret || "",
        user_id = bodyParams.user_id || "",
        screen_name = bodyParams.screen_name || "",
        url = bodyParams.userUrl || 'https://api.twitter.com/1.1/users/show.json',

        qs = { user_id, screen_name },
        oauth = AuthController.getOauthParams(bodyParams);

    oauth.token = token;
    oauth.token_secret = token_secret;

    request.get({
        url: url,
        oauth: oauth,
        qs: qs
    }, function(err, httpResponse, body) {
        res.status(httpResponse.statusCode).send(body);
    }); */

    let userId = req.session.user_id;
    if (userId) {
        UserController.connectWithUserId()
    }
});

router.post('/disconnect', function(req, res) {
    let bodyParams = req.body,
        token = bodyParams.token || "",
        user_id = bodyParams.user_id || "",
        url = 'https://api.twitter.com/1.1/oauth/invalidate_token.json',
        oauth = AuthController.getOauthParams(bodyParams);

    oauth.token = token;

    request.get({
        url: url,
        oauth: oauth
    }, function(err, httpResponse, body) {
        res.status(httpResponse.statusCode).send({ user_id });
    });
});

module.exports = router;