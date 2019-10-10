const express = require('express');
const request = require('request');
const qs = require('querystring');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();

router.get('/oauth_request', function(req, res) {
    const oauth = AuthController.getOauthParams();
    const url = "https://api.twitter.com/oauth/request_token";
    
    request.post({
        url: url,
        oauth: oauth
    }, function(err, httpResponse, body) {
        if(err) {
            res.status(httpResponse.statusCode).send(err);
        }
        let parsedBody = qs.parse(body),
            oauthTokenQuery = qs.stringify({ oauth_token: parsedBody.oauth_token }),
            response = { authorizeUrl: `https://api.twitter.com/oauth/authenticate?${oauthTokenQuery}` }

        res.status(httpResponse.statusCode).json(response);
    });
});

module.exports = router;