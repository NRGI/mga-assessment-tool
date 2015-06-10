'use strict';

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var modificationSchema = new mongoose.Schema({
    modifiedBy: ObjectId,
    modifiedDate: {type: Date, default: Date.now}
});


var intervieweeSchema = mongoose.Schema({
    firstName:  {type: String, required: '{PATH} is required!'},
    lastName:  {type: String, required: '{PATH} is required!'},
    email:  String,
    phonte: String,
    role:  {type: String, required: '{PATH} is required!'}, // gov, industry, CSO, expert or other
    answers: [{
        answer_ID: String,
        country: String, // Text name of country
        year: String // Year of assessment
    }],
    createdBy:  ObjectId,
    creationDate:  {type:  Date, default: Date.now},
    modified:  [modificationSchema]

});

var Interviewee = mongoose.model('Answer', intervieweeSchema);