const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      Joi =require('joi')
      passportLocalMongoose = require('passport-local-mongoose');
  
const UserSchema = new Schema({
  email: String,
  password: {type: String, toJSON: false, select: false},
  profilePicId: String,
  firstName: String,
  lastName: String,
  bio: String, 
  age: Number, 
  weight: Number, 
  goalWeight: Number,  
  gender: String, 
  DOB: Date 
}, {strict: false});

UserSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  hashField: 'password', 
  usernameLowerCase: true 
});

module.exports = mongoose.model('User', UserSchema);