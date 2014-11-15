'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    courseId: String,
    uuid: String,
    lectureDate: Date,
    transcript: Array
});

module.exports = mongoose.model('Lecture', schema);
