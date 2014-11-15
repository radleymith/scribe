'use strict';

var LectureModel = require('../models/lecture'),
    pkg = require('../package.json');

module.exports.getAllLectures = function (req, res) {
    LectureModel.find(function (err, lectures) {
        res.json(lectures);
    });
};

module.exports.getLectureByGuid = function (req, res) {
    LectureModel.findById(req.id, function (err, lecture) {
        if (!err) {
            res.render('text_view', {version: pkg.version, lecture: lecture});
        }
    });
};



