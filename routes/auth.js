const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();

router.get('/oauth_request', function(req, res) {
    const oauth = AuthController.getOauthParams(req.query);
    const url = "https://api.twitter.com/oauth/request_token";
    
    request.post({
        url: url,
        oauth: oauth
    }, function(err, httpResponse, body) {
        let parsedBody = qs.parse(body),
            oauthTokenQuery = qs.stringify({ oauth_token: parsedBody.oauth_token }),
            authorizeUrl = `https://api.twitter.com/oauth/authorize?${oauthTokenQuery}`;

        res.status(httpResponse.statusCode).send(authorizeUrl);
    });
});

module.exports = router;