'use strict';
/*jslint nomen: true unparam: true*/

var mongoose = require('mongoose');

//noinspection JSUnusedGlobalSymbols
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schemaless = mongoose.Schema.Types.Mixed;

var modificationSchema = new mongoose.Schema({
    modifiedBy: Schemaless, // Pull from current user _id value but needs to handle legacy comments
    modifiedDate: {type: Date, default: Date.now}
});

var commentSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    content: String,
    author: Schemaless, // Pull from current user _id value but needs to handle legacy comments
    author_name: String,
    // ACTUAL CHANGE
    role: String
});

var questionSchema = mongoose.Schema({
    assessment_ID: {
        type: String,
        required: '{PATH} is required'},
    question_order: {
        type: Number,
        required: '{PATH} is required'},
    question_flow_order: {
        type: Number,
        required: '{PATH} is required'},
    question_mode: {
        type: String,
        required: '{PATH} is required'},
    question_mode_text: {
        type: String,
        required: '{PATH} is required'},
    question_text: {
        type: String,
        required: '{PATH} is required'},
    question_secondary_source: String,
    question_data_type: {
        type: String,
        required: '{PATH} is required'},
    question_indicator: String,
    question_indicator_ID: String,
    question_theme_ID: String,
    question_value_chain_ID: String,
    question_tags: Array,
    comments: [commentSchema],
    modified: [modificationSchema]
});

var Question = mongoose.model('Question', questionSchema);
