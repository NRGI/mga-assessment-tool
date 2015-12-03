'use strict';
//noinspection JSUnusedGlobalSymbols
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    users = require('mongoose').model('User'),
    // mendelyTokenModel = require('../models/MendeleyToken'),
    questionModel = require('../models/Question'),
    answerModel = require('../models/Answers'),
    countryModel = require('../models/Countries'),
    documentModel = require('../models/Documents'),
    intervieweeModel = require('../models/Interviewees'),
    assessmentModel = require('../models/Assessment');

module.exports = function (config, user, pass, env) {
    // connect to mongo
    //var dbOptions;
    //if(config.db.indexOf('replicaSet') > - 1) {
    //    dbOptions = {
    //        db: {native_parser: true},
    //        replset: {
    //            auto_reconnect:false,
    //            poolSize: 10,
    //            socketOptions: {
    //                keepAlive: 1,
    //                connectTimeoutMS: 30000
    //            }
    //        },
    //        server: {
    //            poolSize: 5,
    //            socketOptions: {
    //                keepAlive: 1,
    //                connectTimeoutMS: 30000
    //            }
    //        }
    //    };
    //}
    if (env === 'local') {
        mongoose.connect(config.db);
        //mongoose.connect('mongodb://' + user + ':' + pass + config.db, dbOptions);
    } else {
        mongoose.connect('mongodb://' + user + ':' + pass + config.db);
    }

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.on('open', function callback() {
        console.log('mga db opened');
    });

    // import data
    userModel.createDefaultUsers();
    countryModel.createDefaultCountries();
    if (process.env.NODE_ENV !== 'production') {
        intervieweeModel.createDefaultInterviewees();
        questionModel.createDefaultQuestions();
    }
};
