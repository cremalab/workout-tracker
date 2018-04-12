const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      Joi =require('joi');
  
const UserSchema = new Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);