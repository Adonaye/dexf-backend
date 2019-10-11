const CONSUMER_KEY = process.env.CONSUMER_KEY,
      CONSUMER_SECRET = process.env.CONSUMER_SECRET,
      DEFAULT_AUTH_CALLBACK_URL = "http://127.0.0.1:3000/callback";
    
function getOauthParams(params = {}) {
    return {
        callback: params.callbackUrl || DEFAULT_AUTH_CALLBACK_URL,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
    }
}

function accessToken(oauthToken, oauthTokenVerifier, callback) {
    let oauth = AuthController.getOauthParams();
    oauth.token = oauthToken,
    oauth.verifier = oauthTokenVerifier;

    request.post({
        url: 'https://api.twitter.com/oauth/access_token',
        oauth: oauth
    }, function(err, httpResponse, body) {
        if(err) {
            callback(err, httpResponse, null);
        }
        let parsedBody = qs.parse(body);
        callback(null, httpResponse, parsedBody);
    });
}

function verifyCredentials(accessToken, accessSecret, callback) {
    let oauth = AuthController.getOauthParams();
    oauth.token = accessToken,
    oauth.token_secret = accessSecret;

    request.get({
        url: 'https://api.twitter.com/oauth/access_token',
        oauth: oauth
    }, function(err, httpResponse, body) {
        if(err) {
            callback(err, httpResponse, null);
        }
        let user = body[0];
        callback(null, httpResponse, user);
    });
}

module.exports = { getOauthParams, accessToken, verifyCredentials };