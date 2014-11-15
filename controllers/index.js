"use strict";

var pkg = require('../package.json'),
    formidable = require('formidable');

module.exports = function(server) {
    server.get('/', function(req, res) {
        res.render('index', {
            version: pkg.version
        });
    });

    server.post('/upload', function(req, res, next) {
        console.log(req.body, req.files);
        res.send("done");
        res.end();
        /*
        var processing = true;
        var heartbeat = function () {
            if (processing) {
                res.write('<p>processing<p>');
                setTimeout(heartbeat, 1000);
            } else {
                res.end();
            }
        };
        heartbeat();
        /*
        var form = new formidable.IncomingForm();
        form.uploadDir = "../temp/";
        form.parse(req, function(err, fields, files) {
            console.log(err, fields);
            processing = false;
            var newfile, path, uid, versionName;
            uid = uuid.v4();
            newfile = "../files/" + uid;
            copyFile(files.file.path, newfile, function(err) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Oops, something went wrong! (reason: copy)");
                    return res.redirect(req.url);
                }
                fs.unlink(files.file.path, function(err) {
                    if (err) {
                        req.flash("error",
                            "Oops, something went wrong! (reason: deletion)");
                        return res.redirect(req.url);
                    }
                    // done!
                    // ...
                });
            });
        });*/
    });
};
