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
        // db: '@candidate.32.mongolayer.com:10726/mga_dev',
        db: 'c726.candidate.19.mongolayer.com:10726,candidate.32.mongolayer.com:10582/mga_dev?replicaSet=set-54c2868c4ae1de388800b2a3',
        rootPath: rootPath,
        port: process.env.PORT || 80
    },
    production: {
        db: '@candidate.32.mongolayer.com:10726/mga_production',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};
