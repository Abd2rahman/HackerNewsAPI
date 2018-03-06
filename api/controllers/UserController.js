/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import FB from 'fb'

module.exports = {

  async facebook (req, res) {
    const { accessToken } = req.body
    if (!accessToken) return res.forbidden()
    try {
      const userProfil = await FB.api('me', { fields: ['id', 'name', 'email'], accessToken })
      const facebookId = userProfil.id

      if (!facebookId) return res.forbidden()

      const user = await User.findOne({ facebookId })
      if (!user) {
        const username = userProfil.name
        const createdUser = await User.create({ username, facebookId })
        const payload = {
          id: createdUser.id
        }
        const token = TokenService.sign(payload)
        return res.json({ token })
      } else {
        const payload = {
          id: user.id
        }
        const token = TokenService.sign(payload)
        return res.json({ token })
      }
    } catch (err) {
      return res.negotiate(err)
    }
  }

}
