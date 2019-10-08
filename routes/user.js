const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');
const router = express.Router();

router.post('/connect', function(req, res) {
    let bodyParams = req.body,
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
    });
});

module.exports = router;