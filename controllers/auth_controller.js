const CONSUMER_KEY = "T4MrAAp7iN2qfXvgl0mB2vNvd", // envvar
      CONSUMER_SECRET = "UgaqFz4Lgad7t3KlEEjy2Mn2wJslDBVljHNGIYgkvTXVnccgOs", //envvar
      DEFAULT_AUTH_CALLBACK_URL = "https://127.0.0.1:3000/callback";
    
function getOauthParams(req) {
    let requestedCallbackUrl = req.body.callbackUrl;
    return {
        callback: requestedCallbackUrl || DEFAULT_AUTH_CALLBACK_URL,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
    }
}