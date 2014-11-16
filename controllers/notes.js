'use strict';

var NoteModel = require('../models/note'),
    pkg = require('../package.json'),
    _ = require('underscore'),
    fs = require('fs');


// module.exports.getNotesForLecture = function (req,res) {
//     NoteModel.find({uuid_lecture: req.param.uuid}, function (err, notes) {
//         res.render()
//     })
// }