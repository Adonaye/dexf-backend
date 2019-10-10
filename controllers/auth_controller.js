const qs = require('querystring');

const CONSUMER_KEY = "T4MrAAp7iN2qfXvgl0mB2vNvd", // envvar
      CONSUMER_SECRET = "UgaqFz4Lgad7t3KlEEjy2Mn2wJslDBVljHNGIYgkvTXVnccgOs", //envvar
      DEFAULT_AUTH_CALLBACK_URL = "http://127.0.0.1:3001/twitter_callback";
    
function getOauthParams(params = {}) {
    return {
        callback: requestedCallbackUrl || DEFAULT_AUTH_CALLBACK_URL,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
    }
}

function accessToken(oauthToken, oauthTokenVerifier, callback) {
    let requestToken = oauthToken,
        verifier = oauthTokenVerifier,
        oauth = AuthController.getOauthParams();
    oauth.token = requestToken,
    oauth.verifier = verifier;

    request.post({
        url: 'https://api.twitter.com/oauth/access_token',
        oauth: oauth
    }, function(err, httpResponse, body) {
        if(err) {
            callback(err, null);
        }
        let parsedBody = qs.parse(body);
        callback(null, parsedBody);
    });
}

module.exports = { getOauthParams, accessToken };