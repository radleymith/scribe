module.exports = function (server) {
    server.get('/', function (req, res) {
        res.json({
            some: "Stuff"
        });
    });
};
