'use strict';
//noinspection JSUnusedGlobalSymbols
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    // mendelyTokenModel = require('../models/MendeleyToken'),
    questionModel = require('../models/Question'),
    answerModel = require('../models/Answers'),
    countryModel = require('../models/Countries'),
    documentModel = require('../models/Documents'),
    intervieweeModel = require('../models/Interviewees'),
    assessmentModel = require('../models/Assessment');

module.exports = function (config, user, pass, env) {
    // connect to mongo

    if (env === 'local') {
        mongoose.connect(config.db);
    } else {
        mongoose.connect('mongodb://' + user + ':' + pass + config.db);
    }

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('mga db opened');
    });

    // import data
    userModel.createDefaultUsers();
    intervieweeModel.createDefaultInterviewees();
    countryModel.createDefaultCountries();
    //assessmentModel.createDefaultAssessments();
};