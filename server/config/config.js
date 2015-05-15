/*jslint nomen: true */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    local: {
        db: 'mongodb://localhost/mga_local',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    development: {
        db: '@candidate.32.mongolayer.com:10582/mga_dev',
        rootPath: rootPath,
        port: process.env.PORT || 8080
    },
    production: {
        db: '@candidate.32.mongolayer.com:10582/mga_production',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};