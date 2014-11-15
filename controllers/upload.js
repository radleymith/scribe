'use strict';

var async = require('async'),
    LectureModel = require('../models/lecture'),
    transcriber = require('../lib/transcriber');

module.exports.uploadVideo = function (req, res) {
    async.waterfall([
        function dummy (callback) { callback(null, req.files.video.path); },
        transcriber.transcribe,
        function (lectureId, callback) {
            var lect = new LectureModel();
            lect.courseId = req.body.lectureName || 'Undefined';
            lect.uuid = lectureId;
            lect.lectureDate = new Date();

            lect.save(function (err, res) {
                callback(err, lectureId);
            });
        }
        ], function (err, lectureId) {
            res.send(err || lectureId);
            res.end();
        });
};
