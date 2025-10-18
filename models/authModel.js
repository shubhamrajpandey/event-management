const mongoose = require('mongoose');
//Schema - It is the structure of the collection and the model help to use in the another modules.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;
