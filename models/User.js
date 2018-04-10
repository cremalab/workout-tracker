const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      //bcrypt = require('bycrpt'),
      //SALT_WORK_FACTOR = 10;
      

const UserSchema = new Schema({
  firstName: String
  // {
  //   type: String,
  //   required: true,
  //   default: '',
  //   index: true
  // }
//   lastName: {
//     type: String,
//     default: ''
//   },
//   email: {
//     type: String,
//     default: ''
//   },
//   password: {
//     type: String,
//     default: ''
//   },
});

// UserSchema.pre(save, function(next){
//     var user = this;
//     //only hash password if it has been modified or is new
//     if(!user.isModified('password'))
//         return next();
//     //generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
//         if(err) return next(err);
//         //hash the password using our new salt
//         bycrpt.hash(user.password, salt, function(err, hash){
//             if(err) return next(err);
//             //override cleartext password with new hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

module.exports = mongoose.model('User', UserSchema);