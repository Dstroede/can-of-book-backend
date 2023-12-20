const jwt = require('jsonwebtoken'); // auth
const jwksClient = require('jwks-rsa'); // auth

// This is a special function for express called "Middleware"
// We can simply "use()" this in our server
// When a user is validated, request.user will contain their information
// Otherwise, this will force an error
async function verifyUser(request, response, next) {

    function valid(err, user) {
        if (err) {
          console.error('Error verifying token:', err);
          return next('Not Authorized');
        }
    
        request.user = user;
        next();
      }

  try {
    console.log(request.headers.authorization)
    const token = request.headers.authorization.split(' ')[1];
    console.log(token)
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    console.error('Error decoding token:', error);
    next('Not Authorized');
  }
}


// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
        console.error('Error getting signing key:', err);
        return callback(err);
      }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}



module.exports = verifyUser;