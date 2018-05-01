const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
  
const WorkoutSchema = new Schema({
  name: String,
  stats: {type: String, toJSON: false, select: false}
});

module.exports = mongoose.model('Workout', WorkoutSchema);