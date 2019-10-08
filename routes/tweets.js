const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');
const router = express.Router();

router.get('/tweets', function(req, res) {
    let bodyParams = req.params,
        user_id = bodyParams.user_id || "",
        screen_name = bodyParams.screen_name || "",
        count = 100,
        url = bodyParams.userUrl || 'https://api.twitter.com/1.1/statuses/user_timeline.json',

        qs = { user_id, screen_name, count },
        oauth = AuthController.getOauthParams();

    oauth.token = bodyParams.oauth_token;
    oauth.token_secret = bodyParams.oauth_token_secret;
    oauth.verifier = bodyParams.oauth_verifier;

    request.get({
        url: url,
        oauth: oauth,
        qs: qs
    }, function(err, httpResponse, body) {
        res.status(httpResponse.statusCode).send(body);
    });
});

module.exports = router;