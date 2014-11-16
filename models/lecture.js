'use strict';

var mongoose = require('mongoose'),
    mongooseTextSearch = require('mongoose-text-search');

var schema = mongoose.Schema({
    courseId: String,
    name: String,
    description: String,
    uuid: String,
    uploadDate: Date,
    categories: [String],
    transcript: Array
});

schema.plugin(mongooseTextSearch);
schema.index({
    name: 'text',
    description: 'text'
});

module.exports = mongoose.model('Lecture', schema);
