"use strict";

var pkg = require('../package.json'),
    uploadController = require('./upload'),
    lectureController = require('./lectures'),
    lectureCategories = require('../models/lectureCategories');

module.exports = function(server) {
    server.get('/', function(req, res) {
        res.render('index', {
            categories: lectureCategories,
            version: pkg.version
        });
    });

    server.post('/upload', uploadController.uploadVideo);
    server.get('/lectures', lectureController.getAllLectures);
    server.get('/lectures/:guid', lectureController.getLectureByGuid);
    server.get('/lectures/:guid/download', lectureController.downloadLecture);
};
