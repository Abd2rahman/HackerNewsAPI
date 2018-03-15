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
    if (!accessToken) return res.badRequest()
    try {
      const userProfil = await FB.api('me', { fields: ['id', 'name'], access_token: accessToken })
      const facebookId = userProfil.id

      let user = await User.findOne({ facebookId })

      if (!user) {
        const username = userProfil.name
        user = await User.create({ username, facebookId })
      }
      const payload = {
        id: user.id
      }
      const token = TokenService.sign(payload)
      sails.log.info(`REST request to authenticate with FB from user ${user.id}`)
      return res.json({ token })
    } catch (err) {
      if (err.response.error.code === 190) return res.forbidden()
      return res.negotiate(err)
    }
  },

  async getUser (req, res) {
    try {
      const userId = req.params['id']
      const user = await User.findOne(userId).populate('comments').populate('topics')

      if (user) return res.json(user)
      return res.notFound()
    } catch (err) {
      return res.negotiate(err)
    }
  }

}
