const CONSUMER_KEY = process.env.CONSUMER_KEY,
      CONSUMER_SECRET = process.env.CONSUMER_SECRET,
      DEFAULT_AUTH_CALLBACK_URL = "http://127.0.0.1:3000/callback";
    
function getOauthParams(params = {}) {
    let requestedCallbackUrl = params.callbackUrl;
    return {
        callback: requestedCallbackUrl || DEFAULT_AUTH_CALLBACK_URL,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
    }
}

module.exports = { getOauthParams };