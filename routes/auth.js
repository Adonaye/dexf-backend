const express = require('express');
const request = require('request');
const qs = require('querystring');
const router = express.Router();

router.get('/oauth_request', function(req, res) {
    const oauth = {
        callback: "https://127.0.0.1:3000/callback",
        consumer_key: "T4MrAAp7iN2qfXvgl0mB2vNvd",
        consumer_secret: "UgaqFz4Lgad7t3KlEEjy2Mn2wJslDBVljHNGIYgkvTXVnccgOs"
    }
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