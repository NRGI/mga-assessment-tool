'use strict';
/*jslint nomen: true unparam: true*/

var Country = require('mongoose').model('Country');

exports.getCountries = function (req, res) {
    console.log(req.query);
    var query = Country.find(req.query);

    query.exec(function (err, collection) {
        res.send(collection);
    });
};


exports.getCountriesByID = function (req, res) {
    var query = Country.findOne({country_ID: req.params.country_ID});

    query.exec(function (err, country) {
        res.send(country);
    });
};
