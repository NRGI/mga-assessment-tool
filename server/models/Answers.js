'use strict';

var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);

var commentSchema, citationSchema, interviewSchema, scoreHistorySchema, interviewScoreSchema, answerOptionSchema, answerSchema, Answer,
    ObjectId        = mongoose.Schema.Types.ObjectId,
    mongooseHistory = require('mongoose-history'),
    Schema          = mongoose.Schema,
    options         = {customCollectionName: "answer_hst"},
    HTML            = mongoose.Types.Html,
    htmlSettings    = {
        type: HTML,
        setting: {
            allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del'],
            allowedAttributes: {
                'a': ['href']
            }
        }
    };
commentSchema = new Schema({
    date: {
        type: Date,
        default: Date.now},
    content: String,
    author: ObjectId, // Pull from current user _id value
    author_name: String,
    role: String,
    addressed: Boolean
});

citationSchema = new Schema({
    document_ID: String,
    mendeley_ID: String,
    file_hash: String,
    date: {
        type: Date,
        default: Date.now},
    date_accessed: Date,
    author: ObjectId, // Pull from current user _id value
    author_name: String,
    role: String,
    comment: htmlSettings,
    location: String
});

interviewSchema = new Schema({
    interviewee_ID: ObjectId,
    contact_date: {
        type: Date,
        default: Date.now},
    date: {
        type: Date,
        default: Date.now},
    comment: htmlSettings,
    author: ObjectId, // Pull from curretn user _id value
    author_name: String,
    author_role: String
});

scoreHistorySchema = new Schema({
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

interviewScoreSchema = new Schema({
    interviewee_ID: ObjectId,
    option_order: Number,
    option_text: String,
    answer_text: htmlSettings,
    answer_num: Number,
    value: Number,
    interview_text: String,
    interview_date: {
        type: Date,
        default: Date.now}
});

answerOptionSchema = new Schema({
    option_order: Number,
    option_text: String,
    value: Number
});

answerSchema = new Schema({
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
        option_text: htmlSettings,
        value: Number,
        _id: ObjectId},
    score_history: [scoreHistorySchema],
    comments: [commentSchema],
    references: {
        citation: [citationSchema],
        human: [interviewSchema]},
    last_modified: {
        modified_by: ObjectId,
        modified_date: {
            type: Date,
            default: Date.now}}
});

answerSchema.plugin(mongooseHistory, options);

Answer = mongoose.model('Answer', answerSchema);

//var webSchema = new mongoose.Schema({
//    title: String,
//    URL: String, // generated from upload path in S3
//    access_date: {
//        type: Date,
//        default: Date.now},
//    comment: {
//        date: {
//            type: Date,
//            default: Date.now},
//        content: String,
//        author: ObjectId, // Pull from current user _id value
//        author_name: String,
//        role: String,
//        addressed: Boolean
//    }
//});
//
//var humanSchema = new mongoose.Schema({
//    first_name: String,
//    last_name: String, // generated from upload path in S3
//    phone: String,
//    email: String,
//    contact_date: {
//        type: Date,
//        default: Date.now},
//    comment: {
//        date: {type: Date, default: Date.now},
//        content: String,
//        author: ObjectId, // Pull from curretn user _id value
//        author_name: String,
//        role: String,
//        addressed: Boolean
//    }
//});






