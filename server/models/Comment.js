const { Schema, model } = require('mongoose');

const schema = new Schema({
  content: { type: String, required: true },
  pageId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  // this is the person who wrote a comment
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
  timestamps: { createdAt: 'create_at'}
});

module.exports = model('Comment', schema);
