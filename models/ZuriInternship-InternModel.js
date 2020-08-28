const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { InternObject } = require('./Intern');

const { Schema } = mongoose;

const zuriInternSchema = Schema({
  ...InternObject
},
{
  timestamps: true
});

zuriInternSchema.plugin(uniqueValidator);
module.exports = mongoose.model('ZuriIntern', zuriInternSchema);
