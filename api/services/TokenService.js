import jwt from 'jsonwebtoken'

const secret = 'HF'

module.exports = {

  sign: payload => jwt.sign(payload, secret, { expiresIn: '1d' }),

  verify: token => jwt.verify(token, secret)

}
