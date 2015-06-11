'use strict';
/*jslint nomen: true unparam: true*/

var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption'),
    mandrill = require('node-mandrill')(process.env.MANDRILL_APIKEY);
    // client = require('campaign')();
    // client.send(template, options, done);


//noinspection JSUnusedLocalSymbols
exports.getUsers = function (req, res, next) {
    var query;
    if (req.user.hasRole('supervisor')) {
        query = User.find(req.query);
    } else {
        query = User.find(req.query).select({ "firstName": 1, "lastName": 1});
    }

    query.exec(function (err, users, next) {
        if (err) { return next(err); }
        if (!users) { return next(new Error('No users found')); }
        res.send(users);
    });
};

exports.getUsersByID = function (req, res) {
    var query = User.findOne({_id: req.params.id});

    query.exec(function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(new Error('No user found')); }
        res.send(user);
    });
};

exports.getUsersListByID = function (req, res) {
    var query = User.findOne({_id: req.params.id}).select({ "firstName": 1, "lastName": 1, "email": 1, "role": 1});

    query.exec(function (err, user) {
        res.send(user);
    });
};

//noinspection JSUnusedLocalSymbols
exports.createUser = function (req, res, next) {
    var user_data = req.body,
        rec_email = user_data.email,
        rec_name = user_data.firstName.charAt(0).toUpperCase() + user_data.firstName.slice(1) + " " + user_data.lastName.charAt(0).toUpperCase() + user_data.lastName.slice(1),
        rec_role = user_data.role.charAt(0).toUpperCase() + user_data.role.slice(1),
        rec_username = user_data.username,
        rec_password = user_data.password,
        send_name = req.user.firstName + " " + req.user.lastName;

    user_data.username = user_data.username.toLowerCase();
    user_data.salt = encrypt.createSalt();
    user_data.hashed_pwd = encrypt.hashPwd(user_data.salt, user_data.password);
    user_data.createdBy = req.user._id;

    //noinspection JSUnusedLocalSymbols
    User.create(user_data, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
    });

    mandrill('/messages/send', {
        message: {
            to: [{email: rec_email, name: rec_name}],
            from_email: 'cperry@resourcegovernance.org',
            subject: rec_role + ' account created!',
            html: "Hello " + rec_name + ",<p>\
                   an MGA " + rec_role + "account was just set up for you by <a href='" + req.user.email + "'>" + send_name + "</a>.<p>\
                   The user name is <b>" + rec_username + "</b> and the password is <b>" + rec_password + "</b>.\
                   Please login <a href='http://mgaassessmenttool.elasticbeanstalk.com'>here</a>.<p>\
                   Thanks!<p>\
                   The MGA Team."
        }
    }, function (error, response) {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });
    res.send();
};

exports.updateUser = function (req, res) {
    var user_updates = req.body,
        query = User.findOne({_id: req.body._id}),
        rec_email = user_updates.email,
        rec_name = user_updates.firstName.charAt(0).toUpperCase() + user_updates.firstName.slice(1) + " " + user_updates.lastName.charAt(0).toUpperCase() + user_updates.lastName.slice(1),
        rec_role = user_updates.role.charAt(0).toUpperCase() + user_updates.role.slice(1);

    if (req.user._id != user_updates._id && !req.user.hasRole('supervisor')) {
        res.status(404);
        return res.end();
    }
    if (user_updates.password && user_updates.password.length > 0) {
        user_updates.salt = encrypt.createSalt();
        user_updates.hashed_pwd = encrypt.hashPwd(req.user.salt, user_updates.password);
    }

    query.exec(function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        user.firstName = user_updates.firstName;
        user.lastName = user_updates.lastName;
        user.email = user_updates.email;
        user.salt = user_updates.salt;
        user.hashed_pwd = user_updates.hashed_pwd;
        user.language = user_updates.language;
        user.assessments = user_updates.assessments;
        if (user.modified) {
            user.modified.push({modifiedBy: req.user._id});
        } else {
            user.modified = {modifiedBy: req.user._id};
        }
        user.save(function (err) {
            if (err) {
                return res.send({ reason: err.toString() });
            }
        });
    });
    //send an e-mail to alert update
    mandrill('/messages/send', {
        message: {
            to: [{email: rec_email, name: rec_name}],
            from_email: 'cperry@resourcegovernance.org',
            subject: rec_role + ' account modified.',
            html: "Hello " + rec_name + ",<p>\
                   Your account was just modified.</a>.<p>\
                   If you did not make this change, please contact your administrator</b>.\
                   Thanks!<p>\
                   The MGA Team."
        }
    }, function (error, response) {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });
    res.send();
};

exports.deleteUser = function (req, res) {
    var query = User.remove({_id: req.params.id});

    query.exec(function (err) {
        if (!err) {
            res.send();
        } else {
            return res.send({ reason: err.toString() });
        }
    });
    //send an e-mail to jim rubenstein
    // mandrill('/messages/send', {
    //     message: {
    //         to: [{email: rec_email, name: rec_name}],
    //         from_email: 'cperry@resourcegovernance.org',
    //         subject: rec_role + ' account created!',
    //         html: "Hello " + rec_name + ",<p>\
    //                an RGI " + rec_role + "account was just set up for you by <a href='" + req.user.email + "'>" + send_name + "</a>.<p>\
    //                The user name is <b>" + rec_username + "</b> and the password is <b>" + rec_password + "</b>.\
    //                Please login <a href='http://rgiassessmenttool.elasticbeanstalk.com'>here</a>.<p>\
    //                Thanks!<p>\
    //                The RGI Team."
    //     }
    // }, function (error, response) {
    //     //uh oh, there was an error
    //     if (error) console.log( JSON.stringify(error) );

    //     //everything's good, lets see what mandrill said
    //     else console.log(response);
    // });
    res.send();
};