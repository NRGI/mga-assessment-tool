'use strict';
/*jslint unparam: true*/

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var modificationSchema = new mongoose.Schema({
    modified_by: ObjectId,
    modified_date: Date
});


var assessmentSchema = mongoose.Schema({
    assessment_ID: {
        type: String,
        required: '{PATH} is required',
        index: true,
        unique: true
    }, // ISO2 of country + year
    ISO3: {
        type: String,
        required: '{PATH} is required'}, // ISO3 of country
    country: {
        type: String,
        required: '{PATH} is required'}, // String of country name
    year: {
        type: String,
        required: '{PATH} is required'},
    status: {
        type: String,
        required: '{PATH} is required',
        default: 'created'}, // created, desk_research, interviews, review, approved
    create_date: {
        created_by: ObjectId,
        date: Date},
    start_date: {
        started_by: ObjectId,
        date: Date},
    approve_date: {
        approved_by: ObjectId,
        date: Date},
    modified: [modificationSchema],
    questions_flagged: {
        type: Number,
        default: 0},
    questions_complete: {
        type: Number,
        default: 0},
    questions_unfinalized: {
        type: Number,
        required: '{PATH} is required'},
    //question_length: {type: Number, required: '{PATH} is required'},
    desk_research_set_length: Number,
    interview_set_length: Number,
    users: [ObjectId]
    // researcher_ID: {type: ObjectId, index: true}, // pulled from user_id
    // reviewer_ID: {type: ObjectId, index: true}, // pulled from user_id
    // edit_control: ObjectId, // user_ID of editing rights
    // first_pass: {type: Boolean, default: true},
    // submit_date: {submitted_by: ObjectId, date: Date},
    // review_date: {reviewed_by: ObjectId, date: Date},
    // approval: {approved_by: ObjectId, date: Date},
    // questions_resubmitted: {type: Number, default: 0}
});

var Assessment = mongoose.model('Assessment', assessmentSchema);
