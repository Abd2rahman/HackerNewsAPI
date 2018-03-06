/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    by: {
      type: 'string'
    },
    url: {
      type: 'string',
      unique: true,
      required: true
    },
    title: {
      type: 'string',
      unique: true,
      required: true
    },
    score: {
      type: 'integer'
    },
    sumOfComments: {
      type: 'integer',
      defaultsTo: 0
    },
    comments: {
      collection: 'comment',
      via: 'topic'
    },
    user: {
      model: 'user'
    }

  }
}
