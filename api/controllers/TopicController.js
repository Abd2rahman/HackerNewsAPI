/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  async displayRecentTopics (req, res) {
    const { page } = req.query

    try {
      const recentTopics = await Topic.find({ sort: 'createdAt ASC' }).paginate({ page, limit: 1 })
      return res.json(recentTopics)
    } catch (err) {
      return res.negotiate(err)
    }
  },

  async displayTopTopics (req, res) {
    const { page } = req.query
    try {
      const topTopics = await Topic.find({ sort: 'score DESC' }).paginate({ page, limit: 2 })
      return res.json(topTopics)
    } catch (err) {
      return res.negotiate(err)
    }
  },

  async getComments (req, res) {
    const topicId = req.params['topicId']

    try {
      const topic = await Topic.findOne(topicId).populate('comments')
      return res.json(topic)
    } catch (err) {
      return res.negotiate(err)
    }
  },

  async addComment (req, res) {
    const user = req.options.user.id
    const by = req.options.user.username
    const topic = req.params['topicId']
    const { text } = req.body

    try {
      const comment = await Comment.create({ by, text, user, topic })
      const topicToUpdate = await Topic.findOne(comment.topic)
      topicToUpdate.sumOfComments++
      topicToUpdate.save()
      return res.json(comment)
    } catch (err) {
      return res.negotiate(err)
    }
  },

  async createTopic (req, res) {
    const user = req.options.user.id
    const by = req.options.user.username
    const { url, title } = req.body
    const score = Math.floor(Math.random() * 5)

    try {
      const topic = await Topic.create({ url, title, score, user, by })
      return res.json(topic)
    } catch (err) {
      return res.negotiate(err)
    }
  },

  async upvoteTopic (req, res) {
    const topicId = req.params['topicId']
    const { score } = req.body

    try {
      const topics = await Topic.update(topicId, { score })
      if (!topics[0]) return res.notFound()
      return res.json(topics[0])
    } catch (err) {
      return res.negotiate(err)
    }
  }
}
