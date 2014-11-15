'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scribe');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  var Lecture = require('./lecture');

  // var lect = new Lecture();
  // lect.courseId = 'courseA';
  // lect.uuid = 'sdflkjasdflkjasdflkj';
  // lect.lectureDate = new Date();
  //
  // lect.save(function (err, res) {
  //     console.log(err);
  // });
  Lecture.find({uuid: 'sdflkjasdflkjasdflkj'}, function (err, lectures) {
      console.log(lectures);
  });
});
