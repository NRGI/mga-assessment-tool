'use strict';
/*jslint nomen: true unparam: true*/

//noinspection JSUnusedGlobalSymbols
var Assessment = require('mongoose').model('Assessment'),
    User = require('mongoose').model('User'),
    mandrill = require('node-mandrill')(process.env.MANDRILL_APIKEY);

exports.getAssessments = function (req, res, next) {
    var query = Assessment.find(req.query);

    query.exec(function (err, assessments) {
        if (err) { return next(err); }
        if (!assessments) { return next(new Error('No answers found')); }
        res.send(assessments);
    });
};


exports.getAssessmentsByID = function (req, res, next) {
    var query = Assessment.findOne({assessment_ID: req.params.assessment_ID});

    query.exec(function (err, assessment) {
        if (err) { return next(err); }
        if (!assessment) { return next(new Error('No assessment found')); }
        res.send(assessment);
    });
};

exports.createAssessment = function (req, res) {
    var new_assessments, i;

    new_assessments = req.body;

    for (i = 0; i < new_assessments.length; i += 1) {
        //noinspection JSUnusedLocalSymbols
        Assessment.create(new_assessments[i], function (err, assessment) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate assessment');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
        });
    }
    res.send();
};

//noinspection JSUnusedLocalSymbols
exports.updateAssessment = function (req, res, next) {
    var assessment_updates = req.body,
        timestamp = new Date().toISOString();

    if (assessment_updates.users.indexOf(String(req.user._id)) < 0 && !req.user.hasRole('supervisor')) {
        res.sendStatus(404);
        return res.end();
    }

    Assessment.findOne({_id: assessment_updates._id}).exec(function (err, assessment) {
        assessment.status = assessment_updates.status;
        assessment.start_date = assessment_updates.start_date;
        assessment.modified = assessment_updates.modified;
        assessment.questions_flagged = assessment_updates.questions_flagged;
        assessment.questions_complete = assessment_updates.questions_complete;
        assessment.questions_unfinalized = assessment_updates.questions_unfinalized;
        assessment.question_length = assessment_updates.question_length;
        //assessment.desk_research_set_length = assessment_updates.desk_research_set_length;
        //assessment.interview_set_length = assessment_updates.interview_set_length;
        assessment.users = assessment_updates.users;
        assessment.modified.push({modified_by: req.user._id, modified_date: timestamp});

        assessment.save(function (err) {
            if (err) {
                return res.send({ reason: err.toString() });
            }
        });
    });
    res.send();
};
