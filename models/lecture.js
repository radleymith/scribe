'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    courseId: String,
    vName: String,
    description: String,
    uuid: String,
    uploadDate: Date,
    transcript: Object
});

module.exports = mongoose.model('Lecture', schema);
