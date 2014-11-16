'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    courseId: String,
    name: String,
    description: String,
    uuid: String,
    uploadDate: Date,
    categories: [String],
    transcript: Array
});

module.exports = mongoose.model('Lecture', schema);
