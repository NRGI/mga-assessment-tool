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

exports.createInterviewee = function (req, res, next) {
    var interviewee_data = req.body;

    //user_data.username = user_data.username.toLowerCase();
    //user_data.salt = encrypt.createSalt();
    //user_data.hashed_pwd = encrypt.hashPwd(user_data.salt, user_data.password);
    //user_data.createdBy = req.interviewee._id;

    //noinspection JSUnusedLocalSymbols
    Interviewee.create(interviewee_data, function (err, interviewee) {
        if (err) {
            //if (err.toString().indexOf('E11000') > -1) {
            //    err = new Error('Duplicate Username');
            //}
            res.status(400);
            return res.send({reason: err.toString()});
        }
    });
    res.send();
};

exports.updateInterviewee = function (req, res) {
    var intrerviewee_updates = req.body,
        query = Interviewee.findOne({_id: req.body._id});

    //if (req.user._id != intrerviewee_updates._id && !req.user.hasRole('supervisor')) {
    //    res.status(404);
    //    return res.end();
    //}

    //query.exec(function (err, interviewee) {
    //    if (err) {
    //        res.status(400);
    //        return res.send({ reason: err.toString() });
    //    }
    //    interviewee.firstName = intrerviewee_updates.firstName;
    //    interviewee.lastName = intrerviewee_updates.lastName;
    //    interviewee.email = intrerviewee_updates.email;
    //    interviewee.salt = intrerviewee_updates.salt;
    //    interviewee.hashed_pwd = intrerviewee_updates.hashed_pwd;
    //    interviewee.language = intrerviewee_updates.language;
    //    interviewee.assessments = intrerviewee_updates.assessments;
    //    if (interviewee.modified) {
    //        interviewee.modified.push({modifiedBy: req.interviewee._id});
    //    } else {
    //        interviewee.modified = {modifiedBy: req.interviewee._id};
    //    }
    //    interviewee.save(function (err) {
    //        if (err) {
    //            return res.send({ reason: err.toString() });
    //        }
    //    });
    //});
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