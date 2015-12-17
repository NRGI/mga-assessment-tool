'use strict';

var Interviewee = require('mongoose').model('Interviewee');

exports.getInterviewees = function (req, res, next) {
    var query = Interviewee.find(req.query);
    query.exec(function (err, interviewees) {
        if (err) { return next(err); }
        if (!interviewees) { return next(new Error('No interviewees found')); }
        res.send(interviewees);
    });
};

exports.getIntervieweesByID = function (req, res, next) {
    var query = Interviewee.findOne({_id: req.params.id});

    query.exec(function (err, interviewee) {
        if (err) { return next(err); }
        if (!interviewee) { return next(new Error('No interviewee found')); }
        res.send(interviewee);
    });
};
//noinspection JSUnusedLocalSymbols
exports.createInterviewee = function (req, res, next) {
    var interviewee_data = req.body,
        timestamp = new Date().toISOString();

    interviewee_data.createdBy = req.user._id;
    interviewee_data.last_modified = {modified_by: req.user._id, modified_date: timestamp};

    //noinspection JSUnusedLocalSymbols
    Interviewee.create(interviewee_data, function (err, interviewee) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate email');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            console.log(interviewee);
            res.send(interviewee);
        }
    });

};
exports.updateInterviewee = function (req, res) {
    var interviewee_updates = req.body,
        query = Interviewee.findOne({_id: req.body._id}),
        timestamp = new Date().toISOString();

    query.exec(function (err, interviewee) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        interviewee.firstName = interviewee_updates.firstName;
        interviewee.lastName = interviewee_updates.lastName;
        interviewee.salutation = interviewee_updates.salutation;
        interviewee.title = interviewee_updates.title;
        interviewee.email = interviewee_updates.email;
        interviewee.phone = interviewee_updates.phone;
        interviewee.alt_phone = interviewee_updates.alt_phone;
        interviewee.alt_email = interviewee_updates.alt_email;
        interviewee.mailing_address = interviewee_updates.mailing_address;
        interviewee.role = interviewee_updates.role;
        interviewee.job_title = interviewee_updates.job_title;
        interviewee.organization = interviewee_updates.organization;
        interviewee.attribution = interviewee_updates.attribution;
        interviewee.assessments = interviewee_updates.assessments;
        interviewee.answers = interviewee_updates.answers;
        interviewee.questions = interviewee_updates.questions;
        interviewee.users = interviewee_updates.users;
        interviewee.last_modified = {modified_by: req.user._id, modified_date: timestamp};

        interviewee.save(function (err) {
            if (err) {
                return res.send({reason: err.toString()});
            }
        });
    });
    res.send();
};

exports.deleteInterviewee = function (req, res) {

    // Interviewee.remove({_id: req.params.id}, function (err) {
    //     if (!err) {
    //         res.send();
    //     } else {
    //         return res.send({ reason: err.toString() });
    //     }
    // });
    // res.send();
};
