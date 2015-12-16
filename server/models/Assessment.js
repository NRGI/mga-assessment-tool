'use strict';
/*jslint unparam: true*/

var assessmentSchema, Assessment,
    mongoose        = require('mongoose'),
    mongooseHistory = require('mongoose-history'),
    Schema          = mongoose.Schema,
    options = {customCollectionName: "assessment_hst"},
    ObjectId = mongoose.Schema.Types.ObjectId;

assessmentSchema = new Schema({
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
    documents: [ObjectId],
    interviewees: [ObjectId],
    users: [ObjectId],
    last_modified: {
        modified_by: ObjectId,
        modified_date: {
            type: Date,
            default: Date.now}}
});

assessmentSchema.plugin(mongooseHistory, options);

Assessment = mongoose.model('Assessment', assessmentSchema);
