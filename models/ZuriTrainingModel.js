const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const zuriTrainingSchema = Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  track: {
    type: String,
    enum: ['frontend', 'mobile', 'design', 'backend'],
    required: true
  },

  level: {
    type: String,
    enum: ['beginner', 'intermediate'],
    default: 'beginner'
  }
},
{
  timestamps: true
});

zuriTrainingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('ZuriTraining', zuriTrainingSchema);
