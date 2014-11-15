'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package.json');

module.exports.getAllLectures = function (req, res) {
    LectureModel.find(function (err, lectures) {
        var model = { version: pkg.version, model: { lectures: lectures }};
        model.model.lectures.forEach(function (lecture) {
            lecture.link = 'http://localhost:8000/scribe/lectures/' + lecture.uuid;
        });
        res.render('listLectures', model);
    });
};

module.exports.getLectureByGuid = function (req, res) {
    console.log(JSON.stringify(req.guid));
    LectureModel.findById(req.guid, function (err, lecture) {
        if (!err) {
            res.render('lecture_view', {version: pkg.version, lecture: lecture});
        }
    });
};
