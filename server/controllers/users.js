'use strict';
/*jslint nomen: true unparam: true*/

var User                = require('mongoose').model('User'),
    ResetPasswordToken  = require('mongoose').model('ResetPasswordToken'),
    encrypt             = require('../utilities/encryption'),
    contact             = require('../utilities/contact');

//var User = require('mongoose').model('User'),
//    encrypt = require('../utilities/encryption'),
//    mandrill = require('node-mandrill')(process.env.MANDRILL_APIKEY),
//    ResetPasswordToken  = require('mongoose').model('ResetPasswordToken'),;
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

//exports.createUser = function (req, res) {
//    var user_data = req.body,
//        contact_packet;
//    user_data.password = new Date().toISOString();
//    contact_packet = {
//        send_name: req.user.firstName + " " + req.user.lastName,
//        send_email: req.user.email
//    };
//
//    if (user_data.firstName && user_data.lastName) {
//        contact_packet.rec_name = user_data.firstName.charAt(0).toUpperCase() + user_data.firstName.slice(1) + " " + user_data.lastName.charAt(0).toUpperCase() + user_data.lastName.slice(1);
//    }
//    if (user_data.username) {
//        user_data.username = user_data.username.toLowerCase();
//        contact_packet.rec_username = user_data.username;
//    }
//    if (user_data.email) {
//        contact_packet.email = user_data.email;
//    }
//    if (user_data.rec_role) {
//        contact_packet.rec_role = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
//    }
//    //try {
//    //    contact_packet.rec_name = userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1) + " " + userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1);
//    //}
//    //catch(err) {
//
//    //    res.status(400);
//    //    return res.send({reason: 'first and last name is required'});
//    //}
//    //try {
//    //    userData.username = userData.username.toLowerCase();
//    //}
//    //catch(err) {
//    //    res.status(400);
//    //    return res.send({reason: 'username is required'});
//    //}
//    //try {
//    //    contact_packet.rec_role = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
//    //}
//    //catch(err) {
//    //    res.status(400);
//    //    return res.send({reason: 'user role is required'});
//    //}
//    //contact_packet.rec_username = userData.username;
//    //contact_packet.rec_password = userData.password;
//    //contact_packet.send_name = req.user.firstName + " " + req.user.lastName;
//    //contact_packet.send_email = req.user.email;
//
//
//    user_data.salt = encrypt.createSalt();
//    user_data.hashed_pwd = encrypt.hashPwd(user_data.salt, user_data.password);
//    user_data.createdBy = req.user._id;
//
//    User.create(user_data, function (err, user, next) {
//        if (err) {
//            if (err.toString().indexOf('E11000') > -1) {
//                err = new Error('Duplicate Username');
//            }
//            res.status(400);
//            return res.send({reason: err.toString()});
//        }
//
//        ResetPasswordToken.createByUser(user._id, function(err, tokenData) {
//            contact.new_user_confirmation(contact_packet, tokenData._id);
//        });
//
//        res.send();
//        next();
//    });
//};


//TODO deal with validation
exports.updateUser = function (req, res) {
    var user_update = req.body;

    if (req.user._id != user_update._id && !req.user.hasRole('supervisor')) {
        res.status(404);
        return res.end();
    }


    User.findOne({_id: req.body._id}).exec(function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        if (user_update.password && user_update.password.length > 0) {
            user.setPassword(user_update.password, function (err) {
                if (err) {
                    return res.send({reason: err.toString()});
                }
            });
        }
        user.firstName = user_update.firstName;
        user.lastName = user_update.lastName;
        user.email = user_update.email;
        user.address = user_update.address;
        user.language = user_update.language;
        user.assessments = user_update.assessments;
        user.documents = user_update.documents;
        user.interviewees = user_update.interviewees;

        user.save(function (err) {
            if (err) {
                return res.send({ reason: err.toString() });
            }
        });
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
