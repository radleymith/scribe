'use strict';

var async = require('async'),
    LectureModel = require('../models/lecture'),
    transcriber = require('../lib/transcriber'),
    messaging = require('../lib/messaging');

function initWaterfall (initParam) {
    return function (callback) { callback(null, initParam); };
}

function saveLectureMetadata (lectureId, callback) {
    var lect = new LectureModel();
    lect.courseId = req.body.lectureName || 'Undefined';
    lect.uuid = lectureId;
    lect.lectureDate = new Date();

    lect.save(function (err, res) {
        callback(err, lectureId);
    });
}

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
}

module.exports.uploadVideo = function (req, res) {
    async.waterfall([
        initWaterfall(req.files.video.path), // Inject the vid file path into waterfall
        transcriber.transcribe, // Transcribe the video
        saveLectureMetadata, // Save the lecture metadata to mongo
        sendEmail // Send a notification email to the user. 
        ], function (err, lectureId) {
            res.send(err || lectureId);
            res.end();
        });
};
