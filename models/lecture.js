'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scribe');
var db = mongoose.connection;

var schema = mongoose.Schema({
    courseId: String,
    uuid: String,
    lectureDate: Date
});

module.exports = mongoose.model('Lecture', schema);
