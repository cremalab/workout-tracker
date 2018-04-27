const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      Joi =require('joi');

const UserSessionSchema = new Schema({
    userId: String
});

module.exports = mongoose.model('UserSession', UserSessionSchema);