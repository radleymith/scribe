'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package.json'),
    lectureCategories = require('../models/lectureCategories'),
    _ = require('underscore'),
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

        model.categories = _.map(lectureCategories, function (cat) {
            cat.isSelected = filter.categories === cat.code;
            return cat;
        });

        res.render('listLectures', model);
    });
};

module.exports.getLectureByGuid = function (req, res) {
    LectureModel.findById(req.id, function (err, lecture) {
        if (!err && lecture.length > 0) {
            res.render('lecture_view', {version: pkg.version, lecture: lecture[0]});
        }else {
            res.render('no_lecture_view', {version: pkg.version, lecture_id: req.params.guid});
        }
    });
};

// module.exports.getLectureByGuidWithNotes = function (req, res) {
//     LectureModel.findById(req.id, function (err, lecture) {
//         if (!err) {
//             res.render('lecture_view', {version: pkg.version, lecture: lecture[0]});
//         }else {
//             res.render('no_lecture_view', {version: pkg.version, lecture_id: req.params.guid});
//         }
//     });
// }

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
