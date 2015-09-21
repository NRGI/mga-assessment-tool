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

function createDefaultQuestions() {
    Question.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Question.create({"question_indicator_ID": "A-1-1",
                "question_mode_text": "Desk Research",
                "question_indicator": "Clear and competitive rules of licence allocation",
                "question_text": "Are procedures for the application and allocation of mining rights laid out in law and/or government regulations?",
                "question_value_chain_ID": "1",
                "assessment_ID": "base",
                "question_data_type": "bool",
                "question_order": 3,
                "question_theme_ID": "A",
                "question_flow_order": 2,
                "question_mode": "desk_research"
            });
            Question.create({
                "question_indicator_ID": "M-4-0",
                "question_mode_text": "Desk Research",
                "question_indicator": "Significance of state participation",
                "question_text": "Is there a significant state participation in the mining sector?",
                "question_value_chain_ID": "4",
                "assessment_ID": "base",
                "question_data_type": "multi",
                "question_order": 357,
                "question_theme_ID": "M",
                "question_flow_order": 168,
                "question_mode": "desk_research"
            });
            Question.create({
                "question_indicator_ID": "X-2-0",
                "question_mode_text": "Desk Research",
                "question_indicator": "Mining rules and legislation - descriptive information",
                "question_text": "Is the legal system based on civil law or common law?",
                "question_value_chain_ID": "2",
                "assessment_ID": "base",
                "question_data_type": "text",
                "question_order": 318,
                "question_theme_ID": "X",
                "question_flow_order": 136,
                "question_mode": "desk_research"
            });
            Question.create({
                "question_indicator_ID": "C-1-3",
                "question_mode_text": "Interview",
                "question_indicator": "Mining cadastre effectiveness",
                "question_text": "Is the mining cadastre fully up-to-date?",
                "question_value_chain_ID": "1",
                "assessment_ID": "base",
                "question_data_type": "multi",
                "question_order": 46,
                "question_theme_ID": "C",
                "question_flow_order": 194,
                "question_mode": "interview"
            });
            Question.create({
                "question_indicator_ID": "A-1-1",
                "question_mode_text": "Interview",
                "question_indicator": "Clear and competitive rules of licence allocation",
                "question_text": "Are the procedures for the allocation of mining rights laid out in legal framework followed in practice?",
                "question_value_chain_ID": "1",
                "assessment_ID": "base",
                "question_data_type": "bool",
                "question_order": 4,
                "question_theme_ID": "A",
                "question_flow_order": 174,
                "question_mode": "interview"
            });
            Question.create({
                "question_indicator_ID": "D-1-1",
                "question_mode_text": "Secondary Source",
                "question_indicator": "Business and investment environment",
                "question_text": "Dealing with construction permits",
                "question_value_chain_ID": "1",
                "question_secondary_source": "Doing Business indicators",
                "assessment_ID": "base",
                "question_data_type": "float",
                "question_order": 71,
                "question_theme_ID": "D",
                "question_flow_order": 303,
                "question_mode": "secondary_source"
            });
            Question.create({
                "question_indicator_ID": "D-1-1",
                "question_mode_text": "Secondary Source",
                "question_indicator": "Business and investment environment",
                "question_text": "How burdensome is it for businesses to comply with governmental administrative requirements (e.g., permits, regulations, reporting)?",
                "question_value_chain_ID": "1",
                "question_secondary_source": "WEF GCI",
                "assessment_ID": "base",
                "question_data_type": "float",
                "question_order": 76,
                "question_theme_ID": "D",
                "question_flow_order": 308,
                "question_mode": "secondary_source"
            });
        }
    });
}

exports.createDefaultQuestions = createDefaultQuestions;