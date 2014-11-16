'use strict';

var mongoose = require('mongoose');

//will want to add a user later maybe
var schema = mongoose.Schema({
    courseId: String,
    uuid_lecture: String,
    index: Number,
    text: String,
    timestamp_transcript_segment: String,
    uploadDate: Date
});

module.exports = mongoose.model('Note', schema);