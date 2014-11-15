'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    courseId: String,
    name: String,
    description: String,
    uuid: String,
    uploadDate: Date,
    categories: Array,
    transcript: Object
});

module.exports = mongoose.model('Lecture', schema);
