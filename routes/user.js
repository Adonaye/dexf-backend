const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');
const router = express.Router();

router.post('/connect', function(req, res) {
    let token = req.body.token || "",
        token_secret = req.body.token_secret || "",
        user_id = req.body.user_id || "",
        screen_name = req.body.screen_name || "",
        url = req.body.userUrl || 'https://api.twitter.com/1.1/users/show.json',

        qs = { user_id, screen_name },
        oauth = AuthController.getOauthParams(req);

    oauth.token = token;
    oauth.token_secret = token_secret;

    request.get({
        url: url,
        oauth: oauth,
        qs: qs
    }, function(err, httpResponse, body) {
        let parsedBody = qs.parse(body);
        res.statusCode(httpResponse.statusCode).send(parsedBody);
    });
});

module.exports = router;