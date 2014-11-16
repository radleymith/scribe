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
            lect.categories = [req.body.category];

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
                var url = 'http://localhost:8000/scribe/lectures/' + lectureId;
                async.parallel([
                    function () {
                        // Send off the email.
                        var email = req.body.email;

                        if (email) {
                            messaging.sendEmail(email, url, function (err, res) {
                                callback();
                            });
                        } else {
                            callback();
                        }
                    },
                    function () {
                        // Send off the text.
                        var phone = req.body.phone;

                        if (phone) {
                            messaging.sendText(phone, url, function (err, res) {
                                console.log("Done: ", err, res);
                                callback();
                            });
                        } else {
                            callback();
                        }
                    }
                ], callback);

            }
        ], function (err) { });

    });
};
