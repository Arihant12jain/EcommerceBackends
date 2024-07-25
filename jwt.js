const { expressjwt: expressJwt } = require('express-jwt');

const secret = 'secret'; // Make sure this is consistent

function authJwt() {
  return expressJwt({
    secret: secret,
    algorithms: ['HS256']
  }).unless({
    path: [
       '/user/login',
      '/user/register',
      'pro/products',
      '/order',
     
       // Example: Add other public paths if needed
    ]
  });
}

module.exports = authJwt;