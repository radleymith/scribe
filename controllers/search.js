'use strict';

var LectureModel = require('../models/lecture'),
    lectureCategories = require('../models/lectureCategories'),
    pkg = require('../package'),
    _ = require('underscore');

module.exports.search = function (req, res) {
    LectureModel.textSearch(req.body.q, function (err, response) {

        var model = { version: pkg.version, model: {}, categories: lectureCategories };
        model.model.lectures = _.map(response.results, function (res) {
            return res.obj;
        });

        model.model.lectures.forEach(function (lecture) {
            lecture.links = {
                view: 'http://localhost:8000/scribe/lectures/' + lecture.uuid,
                download: 'http://localhost:8000/scribe/lectures/' + lecture.uuid + '/download'
            };
        });

        res.render('listLectures', model);
    });
};
