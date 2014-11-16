'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package.json'),
    fs = require('fs');

module.exports.getAllLectures = function (req, res) {
    var filter = {};
    if (req.query.category) {
        filter.categories = req.query.category;
    }

    LectureModel.find(filter, function (err, lectures) {
        var model = { version: pkg.version, model: { lectures: lectures }};
        model.model.lectures.forEach(function (lecture) {
            lecture.links = {
                view: 'http://localhost:8000/scribe/lectures/' + lecture.uuid,
                download: 'http://localhost:8000/scribe/lectures/' + lecture.uuid + '/download'
            };
        });
        res.render('listLectures', model);
    });
};

module.exports.getLectureByGuid = function (req, res) {
    LectureModel.findById(req.id, function (err, lecture) {
        if (!err) {
            res.render('text_view', {version: pkg.version, lecture: lecture});
        }
    });
};

module.exports.downloadLecture = function (req, res) {
    var lectureId = req.params.guid;
    LectureModel.findOne({uuid: lectureId}, function (err, lecture) {
        var fileName = lecture.name.split(' ').join('_') + '.txt';
        res.set({
            "Content-Disposition": "attachment; filename=" + fileName,
            "Content-Type": "text/plain"
        });

        var body = "";
        lecture.transcript.forEach(function (obj) {
            if (obj) {
                body += obj.text;
            }
        });

        res.send(body);
    });

};
