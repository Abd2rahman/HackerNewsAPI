module.exports = async function (req, res, next) {
  const { token } = req.headers
  if (token === undefined) return res.forbidden()

  try {
    const decoded = TokenService.verify(token)
    const user = await User.findOne(decoded.id)

    if (user) {
      const { id, username } = user

      req.options.user = {
        id,
        username
      }
      return next()
    }
    return res.forbidden()
  } catch (err) {
    return res.forbidden()
  }
}
