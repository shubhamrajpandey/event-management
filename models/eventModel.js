const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String},
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // this is like the joins in the SQL (mongoose.Schema.Types.ObjectId) - takes the id of that model
  //reg - points out to the which collection is being used.
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
