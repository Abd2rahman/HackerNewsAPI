const jwt = require('jsonwebtoken');
const secret = 'HF';

module.exports = {

  sign: payload => jwt.sign(payload, secret),

  verify: token => jwt.verify(token, secret)

}
