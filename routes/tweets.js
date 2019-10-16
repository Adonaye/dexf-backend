const express = require('express');
const request = require('request');
const AuthController = require('../controllers/auth_controller');
const UserController = require('../controllers/user_controller');
const router = express.Router();

router.get('/tweets', async function (req, res) {
    let userId = req.session.user_id,
        qs = {
            count: 100,
            trim_user: true,
        },        
        url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        oauth = AuthController.getOauthParams();
    if (!userId) {
        res.status(401).send("No hay sesion");
        return;
    }
    let user = await UserController.findById(userId);

    oauth.token = user.get('token');
    oauth.token_secret = user.get('token_secret');

    request.get({
        url: url,
        oauth: oauth,
        qs: qs
    }, function (err, httpResponse, body) {
        res.status(httpResponse.statusCode).send(body);
    });
});

module.exports = router;