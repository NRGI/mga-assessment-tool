'use strict';
var mongoose        = require('mongoose'),
    mongooseHistory = require('mongoose-history'),
    Schema          = mongoose.Schema,
    options         = {customCollectionName: "interviewee_hst"},
    ObjectId        = mongoose.Schema.Types.ObjectId;

var intervieweeSchema = Schema({
    firstName: {
        type: String,
        required: '{PATH} is required!'},
    lastName: {
        type: String,
        required: '{PATH} is required!'},
    title: String,
    salutation: String,
    email: String,
    alt_email: String,
    phone: String,
    alt_phone: String,
    mailing_address: String,
    role: {
        type: String,
        required: '{PATH} is required!'}, // gov, industry, CSO, expert or other
    job_title: String,
    organization: String,
    //TOOL MAPPING
    assessments: [String],
    questions: [ObjectId],
    answers: [String],
    users: [ObjectId],
    attribution: {
        type: Boolean,
        default: true},
    createdBy: ObjectId,
    creationDate: {
        type: Date,
        default: Date.now},
    last_modified: {
        modified_by: ObjectId,
        modified_date: Date}
});

assessmentSchema.plugin(mongooseHistory, options);

var Interviewee = mongoose.model('Interviewee', intervieweeSchema);

function createDefaultInterviewees() {
    Interviewee.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Interviewee.create({
                firstName: "Steve",
                lastName: "Jobs",
                email:  "sj@gmail.com",
                phone: "666-666-6666",
                role:  "government", // gov, industry, CSO, expert or other
                answers: [],
                assessments: ["AF-2015"],
                creationDate: Date.now()
            });
            Interviewee.create({
                firstName: "Fred",
                lastName: "Flinstone",
                email:  "ff@gmail.com",
                phone: "666-666-6666",
                role:  "industry", // gov, industry, CSO, expert or other
                answers: [],
                assessments: ["AF-2015"],
                creationDate: Date.now()
            });
            Interviewee.create({
                firstName: "Jack",
                lastName: "Jill",
                email:  "jj@gmail.com",
                phone: "666-666-6666",
                role:  "cso", // gov, industry, CSO, expert or other
                answers: [],
                assessments: ["AF-2015"],
                creationDate: Date.now()
            });
            Interviewee.create({
                firstName: "Foo",
                lastName: "Bar",
                email:  "fb@gmail.com",
                phone: "666-666-6666",
                role:  "expert", // gov, industry, CSO, expert or other
                answers: [],
                assessments: ["AF-2015"],
                creationDate: Date.now()
            });
            Interviewee.create({
                firstName: "Seven",
                lastName: "Up",
                email:  "su@gmail.com",
                phone: "666-666-6666",
                role:  "other", // gov, industry, CSO, expert or other
                answers: [],
                assessments: ["AF-2015", "AL-2015"],
                creationDate: Date.now()
            });
        }
    });
}

exports.createDefaultInterviewees = createDefaultInterviewees;
