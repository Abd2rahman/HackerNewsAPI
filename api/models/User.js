/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      required: true
    },
    facebookId: {
      type: 'string'
    },
    topics: {
      collection: 'topic',
      via: 'user'
    },
    comments: {
      collection: 'comment',
      via: 'user'
    }
  }
}
