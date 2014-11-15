'use strict';

var pkg = require('../package.json'),
    async = require('async'),
    LectureModel = require('../models/lecture'),
    transcriber = require('../lib/transcriber'),
    messaging = require('../lib/messaging');

function initWaterfall(initParam) {
    return function(callback) {
        callback(null, initParam);
    };
}

function saveLectureMetadata(data, callback) {
    var lect = new LectureModel();
    lect.courseId = data.name || 'Undefined';
    lect.uuid = data.id;
    lect.lectureDate = data.date = new Date();

    lect.save(function(err, res) {
        callback(err, data);
    });
}

function sendEmail(data, callback) {
    var email = data.email,
        url = 'http://localhost:8000/scribe/lectures/' + data.id;

    if (email) {
        messaging.sendEmail(email, url, function(err, res) {
            callback(err, data);
        });
    } else {
        callback(null, data);
    }
}

module.exports.uploadVideo = function(req, res) {
    async.waterfall([
        initWaterfall(req.files.video.path), // Inject the vid file path into waterfall
        transcriber.transcribe, // Transcribe the video
        function(lectureId, callback) {
            callback(null, {
                id: lectureId,
                name: req.body.vname,
                email: req.body.email,
                phone: req.body.phone,
                description: req.body.description
            });
        },
        saveLectureMetadata, // Save the lecture metadata to mongo
        sendEmail // Send a notification email to the user.
    ], function(err, data) {
        if (err) {
            res.send(err);
            res.end();
        } else {
            res.render('upload', {
                lecture: {
                    vname: data.name,
                    guid: data.id,
                    date: data.date,
                    description: data.description
                },
                version: pkg.version
            });
        }
    });
};
