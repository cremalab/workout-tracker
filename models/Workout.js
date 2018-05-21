const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
  
const WorkoutSchema = new Schema({ 
  userId: String,
  name: String,
  stats: {type: String, toJSON: false, select: false}
}, {strict: false});

module.exports = mongoose.model('Workout', WorkoutSchema);