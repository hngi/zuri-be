const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { InternObject } = require('./Intern');

const { Schema } = mongoose;

const zuriInternSchema = Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'intermediate'
  },
  achievement: {
    type: String,
    required: false
  },
  eduLevel: {
    type: String,
    required: false
  },
  employmentStatus: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  referredFrom: {
    type: String,
    required: false
  }
}
,
{ 
  timestamps: true
});

zuriInternSchema.plugin(uniqueValidator);
module.exports = mongoose.model('ZuriIntern', zuriInternSchema);
