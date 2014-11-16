"use strict";

var pkg = require('../package.json'),
    uploadController = require('./upload'),
    lectureController = require('./lectures'),
    lectureCategories = require('../models/lectureCategories'),
    searchController = require('./search');

module.exports = function(server) {
    server.get('/', function(req, res) {
        res.render('index', {
            categories: lectureCategories,
            version: pkg.version
        });
    });

    server.get('/search', searchController.searchPage);
    server.post('/upload', uploadController.uploadVideo);
    server.get('/lectures', lectureController.getAllLectures);
    server.get('/lectures/:guid', lectureController.getLectureByGuid);
    server.post('/lecture-search', searchController.search);
    server.post('/lectures/:guid', lectureController.updateLecture);
    server.get('/lectures/:guid/download', lectureController.downloadLecture);
};
