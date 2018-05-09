const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      Joi =require('joi')
      passportLocalMongoose = require('passport-local-mongoose');
  
const UserSchema = new Schema({
  email: String,
  password: {type: String, toJSON: false, select: false},
  firstName: String,
  lastName: String,
  profilePicId: String
}, {strict: false});

UserSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  hashField: 'password', 
  usernameLowerCase: true 
});

module.exports = mongoose.model('User', UserSchema);