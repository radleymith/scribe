'use strict';

var LectureModel = require('../models/lecture');

module.exports.getAllLectures = function (req, res) {
    LectureModel.find(function (err, lectures) {
        res.json(lectures);
    });
};
