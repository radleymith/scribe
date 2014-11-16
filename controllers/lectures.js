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
    console.log('>>>>>>>>>>>>>>'+JSON.stringify(req.params));
    LectureModel.find({uuid: req.params.guid}, function (err, lecture) {
        console.log('>>>>>>>>>>this the leture')
        console.log(JSON.stringify(lecture));
        if (!err) {
            res.render('lecture_view', {version: pkg.version, lecture: lecture[0]});
        }else {
            res.render('no_lecture_view', {version: pkg.version, lecture_id: req.params.guid});
        }
    });
};

// module.exports.getLectureAudioByGuid = function (req, res) {
//     console.log('>>>>>>>>>>>>>>'+JSON.stringify(req.params));

// }