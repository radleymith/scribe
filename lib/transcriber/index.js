'use strict';

var fs = require('fs'),
    async = require('async'),
    shellExec = require('shelljs').exec,
    LectureModel = require('../../models/lecture'),
    uuid = require('node-uuid'),
    _ = require('underscore'),
    dataDir = process.cwd() + '/data_files';

require('shelljs').config.silent = true;

// Make sure that all of our data directories are set up
(function setup (baseDataDir) {

    function createDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else if (!fs.lstatSync(dir).isDirectory()) {
            fs.unlink(dir);
            fs.mkdirSync(dir);
        }
    }

    createDir(baseDataDir);
    createDir(baseDataDir + '/audio');
    createDir(baseDataDir + '/transcripts');

})(dataDir);

/**
 * video2Audio - Convert a .mp4 file to a .wav file and save it with a UUID in the
 * /data_files/audio directory
 *
 * @param  {String} videoPath The absolute file path to the video.
 * @param  {Function} callback  async waterfall callback
 */
function video2Audio (videoPath, callback) {
    var lectureId = uuid.v4(),
        cmd = 'ffmpeg -i ' + videoPath + ' -acodec pcm_s16le -ac 2 -ar 8000 ' + dataDir + '/audio/' + lectureId + '.wav';

    shellExec(cmd, function (code, output) {
        callback(code === 0 ? null : 'Error converting video to audio.', lectureId);
    }, {silent: true});
}


/**
 * audio2Text - Convert a .wav audio file to a text file transcript and save it in the
 * /data_files/transcripts directory
 *
 * @param  {String} lectureId UUID of the lecture, assumes that it's in data_files/audio
 * @param  {Function} callback  async waterfall callback
 */
function audio2Text (lectureId, callback) {
    var cmd = 'pocketsphinx_continuous -infile ' + dataDir + '/audio/' + lectureId + '.wav > ' + dataDir + '/transcripts/' + lectureId + '.txt';

    shellExec(cmd, function (code, output) {
        callback(code === 0 ? null : 'Error converting audio to text.', lectureId);
    }, { silent: true });
}


/**
 * cleanup - Remove the temporary audio file, we don't need it anymore.
 *
 * @param  {String} lectureId UUID of the lecture
 * @param  {Function} callback  async waterfall callback
 */
function cleanup (lectureId, callback) {
    fs.unlink(dataDir + '/audio/' + lectureId + '.wav', function (err) {
        callback(err, lectureId);
    });
}

/**
 * Given a file path string pointing to an mp4 file, convert the file to a text file
 * transcript.
 *
 * @param  {String} filePath Absolute file system path to the mp4 file
 * @param  {Function} callback Callback function taking two arguments, teh first for any
 * error objects and the second fo the UUID of the transcript file, saved to /data_files/transcripts
 */
module.exports.transcribe = function (filePath, processInitiatedCB, uploadCompleteCB) {
    video2Audio(filePath, function (err, lectureId, videoPath) {
        setTimeout(function () {
            async.waterfall([
                function (callback) { callback(null, lectureId); },
                audio2Text,
                cleanup
            ], function (err, lectureId) {
                uploadCompleteCB(lectureId);
                // TODO error handling
            });
        });

        processInitiatedCB(err, lectureId);
    });

}

module.exports.readTranscript = function (lectureId) {
    var rawText = fs.readFileSync(dataDir + '/transcripts/' + lectureId + '.txt').toString();
    return _.map(rawText.split('\n'), function(line) {
        var split = line.split(':');

        if (split.length > 1) {
            return {
                "timeStamp": split[0],
                "text": split[1].slice(1)
            };
        } else return undefined;
    });
};
