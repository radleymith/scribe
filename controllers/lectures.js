'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package.json');

module.exports.getAllLectures = function (req, res) {
    var filter = {};
    if (req.query.category) {
        filter.categories = req.query.category;
    }

    LectureModel.find(filter, function (err, lectures) {
        var model = { version: pkg.version, model: { lectures: lectures }};
        model.model.lectures.forEach(function (lecture) {
            lecture.link = 'http://localhost:8000/scribe/lectures/' + lecture.uuid;
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
