'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package');

module.exports.getAllLectures = function (req, res) {
    LectureModel.find(function (err, lectures) {
        var model = { version: pkg.version, model: { lectures: lectures }};
        model.model.lectures.forEach(function (lecture) {
            lecture.link = 'http://localhost:8000/scribe/lectures/' + lecture.uuid;
        });
        res.render('listLectures', model);
    });
};
