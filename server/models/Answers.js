'use strict';

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var modificationSchema = new mongoose.Schema({
    modifiedBy: ObjectId,
    modifiedDate: {
        type: Date,
        default: Date.now}
});

var commentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now},
    content: String,
    author: ObjectId, // Pull from current user _id value
    author_name: String,
    role: String,
    addressed: Boolean
});

var citationSchema = new mongoose.Schema({
    document_ID: String,
    mendeley_ID: String,
    file_hash: String,
    comment: {
        date: {
            type: Date,
            default: Date.now},
        content: String,
        author: ObjectId, // Pull from current user _id value
        author_name: String,
        role: String,
        addressed: Boolean
    }
});

var webSchema = new mongoose.Schema({
    title: String,
    URL: String, // generated from upload path in S3
    comment: {
        date: {
            type: Date,
            default: Date.now},
        content: String,
        author: ObjectId, // Pull from current user _id value
        author_name: String,
        role: String,
        addressed: Boolean
    }
});

var humanSchema = new mongoose.Schema({
    first_name: String,
    last_name: String, // generated from upload path in S3
    phone: String,
    email: String,
    contact_date: {
        type: Date,
        default: Date.now},
    comment: {
        date: {type: Date, default: Date.now},
        content: String,
        author: ObjectId, // Pull from curretn user _id value
        author_name: String,
        role: String,
        addressed: Boolean
    }
});

var scoreHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now},
    order: Number,
    secondary_data_score: Number,
    score: {
        option_order: Number,
        option_text: String,
        value: Number
    },
    answer_text: String,
    answer_num: Number
});

var interviewScoreSchema = new mongoose.Schema({
    interviewee_ID: ObjectId,
    option_order: Number,
    option_text: String,
    answer_text: String,
    answer_num: Number,
    value: Number,
    interview_text: String,
    interview_date: {
        type: Date,
        default: Date.now}
});

var answerOptionSchema = new mongoose.Schema({
    option_order: Number,
    option_text: String,
    value: Number
});

var answerSchema = mongoose.Schema({
    answer_ID: {
        type: String,
        required: '{PATH} is required',
        index: true,
        unique: true}, // combination assessment_ID + question_order in Question Model with 2 leading 0's
    assessment_ID: {
        type: String,
        required: '{PATH} is required',
        index: true},
    country: {
        type: String,
        required: '{PATH} is required',
        index: true},
    year: String,
    question_order: {
        type: Number,
        required: '{PATH} is required'}, // generated from the order_ID of Question Model
    question_flow_order: {
        type: Number,
        required: '{PATH} is required'},
    question_text: String,
    question_secondary_source: String,
    question_mode: {
        type: String,
        required: '{PATH} is required'},
    question_data_type: {
        type: String,
        required: '{PATH} is required'},
    question_indicator: String,
    question_indicator_ID: String,
    question_theme_ID: String,
    question_value_chain_ID: String,
    root_question_ID: {
        type: ObjectId,
        required: '{PATH} is required',
        index: true}, // generated from _id value of Question Model
    status: {
        type: String,
        default: 'created'}, // created, saved, submitted, flagged, reviewed, approved
    flags: [commentSchema],
    answer_options: [answerOptionSchema],
    answer_text: String,
    answer_num: Number,
    interview_score: [interviewScoreSchema],
    answer_score: {
        option_order: Number,
        option_text: String,
        value: Number,
        _id: ObjectId},
    score_history: [scoreHistorySchema],
    comments: [commentSchema],
    references: {
        citation: [citationSchema],
        web: [webSchema],
        human: [humanSchema]},
    modified: [modificationSchema]
});

var Answer = mongoose.model('Answer', answerSchema);

