'use strict';

var async = require('async'),
    LectureModel = require('../models/lecture'),
    transcriber = require('../lib/transcriber'),
    messaging = require('../lib/messaging'),
    fs = require('fs');

function initWaterfall (initParam) {
    return function (callback) { callback(null, initParam); };
}

module.exports.uploadVideo = function (req, res) {
    async.waterfall([
        initWaterfall(req.files.video.path), // Inject the vid file path into waterfall
        transcriber.transcribe, // Transcribe the video
        function saveLectureMetadata (lectureId, callback) {
            var lect = new LectureModel();
            lect.courseId = 'Undefined';
            lect.uuid = lectureId;
            lect.lectureDate = new Date();
            lect.transcript = transcriber.readTranscript(lectureId);

            lect.save(function (err, res) {
                callback(err, lectureId);
            });
        }, // Save the lecture metadata to mongo, need req in scope
        function sendEmail (lectureId, callback) {
            var email = req.body.email,
                url = 'http://localhost:8000/scribe/lectures/' + lectureId;

            if (email) {
                messaging.sendEmail(email, url, function (err, res) {
                    callback(err, lectureId);
                });
            } else {
                callback(null, lectureId);
            }
        } // Send a notification email to the user.
        ], function (err, lectureId) {
            res.send(err || lectureId);
            res.end();
        });
};
