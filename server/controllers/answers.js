'use strict';
/*jslint nomen: true unparam: true*/

var Answer = require('mongoose').model('Answer'),
    Question = require('mongoose').model('Question'),
    Assessment = require('mongoose').model('Assessment');

exports.getAnswers = function (req, res, next) {

    if (req.user.hasRole('supervisor')) {
        Answer.find(req.query, function (err, answers) {
            if (err) { return next(err); }
            if (!answers) { return next(new Error('No answers found')); }
            res.send(answers);
        });
    } else {
        Assessment.find({'users': req.user._id}, {assessment_ID: 1}, function (err, assessments) {
            var assessment_ids = assessments.map(function (doc) { return doc.assessment_ID; });

            if (err) { return next(err); }
            if (!assessments) { return next(new Error('No assessments assigned to user')); }

            if (assessment_ids.indexOf(req.query.assessment_ID) > -1) {
                Answer.find(req.query, function (err, answers) {
                    if (err) { return next(err); }
                    if (!answers) { return next(new Error('No answers found')); }
                    res.send(answers);
                });
            } else {
                res.sendStatus(404);
                return res.end();
            }
        });
    }
};

//noinspection JSUnusedLocalSymbols
exports.getAnswersByID = function (req, res, next) {
    var query = Answer.findOne({answer_ID: req.params.answer_ID});

    query.exec(function (err, answer, next) {
        if (!answer) { return next(new Error('No answer found')); }
        Assessment.findOne({assessment_ID: answer.assessment_ID}, function (err, assessment) {
            if (assessment.users.indexOf(String(req.user._id)) < 0 && !req.user.hasRole('supervisor')) {
                res.sendStatus(404);
                return res.end();
            }
        });
        res.send(answer);
    });
};

//noinspection JSUnusedLocalSymbols
exports.createAnswers = function (req, res, next) {
    var new_answers, i;
    new_answers = req.body;

    for (i = 0; i < new_answers.length; i += 1) {
        //noinspection JSUnusedLocalSymbols
        Answer.create(new_answers[i], function (err, answer) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate answer');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
        });
    }
    res.send();
};

exports.updateAnswer = function (req, res) {
    var answer_update = req.body,
        timestamp = new Date().toISOString(),
        answer_history_update = {};

    Assessment.findOne({assessment_ID: answer_update.assessment_ID}, function (err, assessment) {
        if (assessment.users.indexOf(String(req.user._id)) < 0 && !req.user.hasRole('supervisor')) {
            res.sendStatus(404);
            return res.end();
        }

        Answer.findOne({answer_ID: answer_update.answer_ID}, function (err, answer) {
            answer.status = answer_update.status;
            answer.comments = answer_update.comments;
            answer.refereces = answer_update.refereces;
            answer.flags = answer_update.flags;
            answer.questions_flagged = answer_update.questions_flagged;
            answer.question_set_length = answer_update.question_set_length;
            answer.references = answer_update.references;
            answer.interview_score = answer_update.interview_score;

            if (!answer.interview_score.interview_date) {
                answer_update.interview_score.interview_date = timestamp;
            }
            answer.modified.push({modifiedBy: req.user._id, modifiedDate: timestamp});

            if (answer_update.hasOwnProperty('answer_score') && answer_update.hasOwnProperty('answer_text')) {
                answer_history_update.date = timestamp;
                answer_history_update.order = answer_update.score_history.length + 1;
            }

            if (answer_update.hasOwnProperty('answer_score')) {

                if (answer.question_mode === 'secondary_data') {
                    answer.secondary_data_score = answer_update.secondary_data_score;
                    answer_history_update.secondary_data_score = answer_update.answer_score;
                } else {
                    answer.answer_score = answer_update.answer_score;
                    answer_history_update.score = answer_update.answer_score;
                }
            }

            if (answer_update.hasOwnProperty('answer_text')) {
                answer.answer_text = answer_update.answer_text;
                answer_history_update.text = answer_update.answer_text;
            }

            if (answer_history_update.hasOwnProperty('date')) {
                answer.score_history.push(answer_history_update);
            }

            answer.save(function (err) {
                if (err) {
                    res.send({ reason: err.toString() });
                }
            });
        });
    });
    res.send();
};
