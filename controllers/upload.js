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

module.exports.uploadVideo = function(req, res) {
    console.log(req.body);
    var lect = new LectureModel();
    transcriber.transcribe(req.files.video.path, function (err, lectureId) {
        if (err) {
            res.send(err);
            res.end();
        } else {

            lect.courseId = 'Undefined';
            lect.uuid = lectureId;
            lect.description = req.body.description;
            lect.name = req.body.vname;
            lect.uploadDate = new Date();

            res.render('upload', {
                lecture: {
                    vname: lect.name,
                    guid: lect.uuid,
                    date: lect.uploadDate,
                    description: lect.description
                },
                version: pkg.version
            });


        }
    }, function (lectureId) {
        // Save the lecture off.
        async.series([
            function (callback) {
                lect.transcript = transcriber.readTranscript(lectureId);
                lect.save(callback);
            },
            function (callback) {
                // Send off the email.
                var email = req.body.email,
                    url = 'http://localhost:8000/scribe/lectures/' + lectureId;

                if (email) {
                    messaging.sendEmail(email, url, function (err, res) {
                        callback(err);
                    });
                } else {
                    callback();
                }
            }
        ], function (err) { });

    });
};
