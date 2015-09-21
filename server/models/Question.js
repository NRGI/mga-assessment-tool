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
            Question.create({"question_text":"Who has the title to minerals in the ground?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"text","question_order":1,"question_flow_order":1,"question_mode":"desk_research"});
            Question.create({"question_text":"What mining, mineral processing or exploration  rights can mining companies acquire?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"text","question_order":2,"question_flow_order":2,"question_mode":"desk_research"});
            Question.create({"question_text":"Is there a set of Mining Regulations that lays out the procedures for the application and allocation of mineral rights?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":3,"question_flow_order":3,"question_mode":"desk_research"});
            Question.create({"question_text":"Does the legislation impose limits to discretionary powers of the authority in charge of awarding licences?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":5,"question_flow_order":4,"question_mode":"desk_research"});
            Question.create({"question_text":"Is the authority in charge of awarding licences for mineral exploration and production (a) independent and separate from the mining ministry, and (b) not influenced by state-owned enterprises (SOEs)?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":7,"question_flow_order":5,"question_mode":"desk_research"});
            Question.create({"question_text":"In the law, is the licensing process designed to be non-discriminatory?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":8,"question_flow_order":6,"question_mode":"desk_research"});
            Question.create({"question_text":"Is the process of allocation of mineral rights either \u201cFirst-come-first-served\u201d (FCFS) or based on tenders and auctions, as opposed to ad-hoc rules for negotiations?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":10,"question_flow_order":7,"question_mode":"desk_research"});
            Question.create({"question_text":"Is the information required for licence applications easily accessible?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":12,"question_flow_order":8,"question_mode":"desk_research"});
            Question.create({"question_text":"Is there a transparent process for licence cancellations?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":13,"question_flow_order":9,"question_mode":"desk_research"});
            Question.create({"question_text":"When applications are denied are the reasons communicated to the applicant/holder?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":15,"question_flow_order":10,"question_mode":"desk_research"});
            Question.create({"question_text":"When licences are cancelled, are the reasons communicated to the licence holder?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":16,"question_flow_order":11,"question_mode":"desk_research"});
            Question.create({"question_text":"Is there a due process to appeal licensing decisions utilising channels outside and independent of the mining ministry?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":17,"question_flow_order":12,"question_mode":"desk_research"});
            Question.create({"question_text":"Are there rules on contract transparency?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":19,"question_flow_order":13,"question_mode":"desk_research"});
            Question.create({"question_text":"Are all mining contracts, regardless of the way they are granted, disclosed to the public?","question_mode_text":"desk research","assessment_ID":"base","question_data_type":"multi","question_order":21,"question_flow_order":14,"question_mode":"desk_research"});
            Question.create({"question_text":"Are the procedures for the application and allocation of (a) exploration and/or (b) mining rights in the Mining Regulations followed?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":4,"question_flow_order":15,"question_mode":"interview"});
            Question.create({"question_text":"Are limits to discretionary power in award of (a) exploration and/or (b) mining rights licences followed?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":6,"question_flow_order":16,"question_mode":"interview"});
            Question.create({"question_text":"Are there instances of discrimination without legal basis in the licence allocation process?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":9,"question_flow_order":17,"question_mode":"interview"});
            Question.create({"question_text":"Are the non-discriminatory methods in which licences are to be allocated followed?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":11,"question_flow_order":18,"question_mode":"interview"});
            Question.create({"question_text":"Is the process for cancellation of (a) exploration licences and/or (b) mining licences followed?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":14,"question_flow_order":19,"question_mode":"interview"});
            Question.create({"question_text":"Is this independent appeal process (a) operational and (b) used to challenge decisions?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":18,"question_flow_order":20,"question_mode":"interview"});
            Question.create({"question_text":"Are the rules on contract transparency followed?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":20,"question_flow_order":21,"question_mode":"interview"});
            Question.create({"question_text":"Does the government publish key details such as licence holder, duration of licence and key commitments (e.g., minimum expenditure or investment)?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":23,"question_flow_order":22,"question_mode":"interview"});
            Question.create({"question_text":"Does the state publish reliable mineral resource and reserve information?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":24,"question_flow_order":23,"question_mode":"interview"});
            Question.create({"question_text":"Does the Geological Survey Department (GSD) or mining authority collect geological information from companies in a comprehensive and secure  database?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":27,"question_flow_order":24,"question_mode":"interview"});
            Question.create({"question_text":"Does the Geological Survey Department (GSD) or a similar organisation make use of the geological data collected to improve understanding of geological prospectivity and to monitor compliance with licences?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":28,"question_flow_order":25,"question_mode":"interview"});
            Question.create({"question_text":"Is the Geological Survey Department (GSD) or a similar organisation staffed with well-trained geologists who are involved in building a geological library?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":29,"question_flow_order":26,"question_mode":"interview"});
            Question.create({"question_text":"Is the mining cadastre up-to-date?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":34,"question_flow_order":27,"question_mode":"interview"});
            Question.create({"question_text":"Is the mining cadastre complete?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":35,"question_flow_order":28,"question_mode":"interview"});
            Question.create({"question_text":"Does the mining cadastre system support the administration of licences?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":36,"question_flow_order":29,"question_mode":"interview"});
            Question.create({"question_text":"Is the cadastre system operating without major technical problems?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":38,"question_flow_order":30,"question_mode":"interview"});
            Question.create({"question_text":"Is there documented evidence of boundary disputes between licence holders based on ambiguity of boundaries?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":39,"question_flow_order":31,"question_mode":"interview"});
            Question.create({"question_text":"Have licence cancellations or denied applications been based on grounds outside the law that have resulted in court cases and appeals, etc.?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":40,"question_flow_order":32,"question_mode":"interview"});
            Question.create({"question_text":"If a company holds an exploration licence and is in compliance with licence conditions, does that give prior right to apply for a mining lease in that area ?","question_mode_text":"Interview","assessment_ID":"base","question_data_type":"multi","question_order":41,"question_flow_order":33,"question_mode":"interview"});
            Question.create({"question_text":"Mineral resource wealth % GDP \u2013 WB","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"percentage","question_order":54,"question_flow_order":34,"question_mode":"secondary_sources"});
            Question.create({"question_text":"World Gold Council report on gold production","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":55,"question_flow_order":35,"question_mode":"secondary_sources"});
            Question.create({"question_text":"How would you rate the level of efficiency of customs procedures (related to the entry and exit of merchandise)? \u2013 WEF GCI","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":58,"question_flow_order":36,"question_mode":"secondary_sources"});
            Question.create({"question_text":"How burdensome is it for businesses to comply with governmental administrative requirements (e.g., permits, regulations, reporting)? \u2013 WEF GCI","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":59,"question_flow_order":37,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Cost, time and procedures to start up a business \u2013 WB DB","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":60,"question_flow_order":38,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Legal system (legal processes that are fair, transparent, non-corrupt, timely, efficiently administered, etc.)   - Fraser","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":61,"question_flow_order":39,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Perceptions index measuring effectiveness of civil law system \u2013 WJP","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":62,"question_flow_order":40,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Country risk (transfer and convertibility risk, force majeure) \u2013 OECD country risk","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":63,"question_flow_order":41,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Expropriation risk \u2013 Delcredere Ducroire (Belgium\u2019s public credit insurer)","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":64,"question_flow_order":42,"question_mode":"secondary_sources"});
            Question.create({"question_text":"How would you rate the protection of property rights, including financial assets, in your country? \u2013 WEF GCI","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":65,"question_flow_order":43,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Road density (km of road per 100 sq. km of land area) \u2013 WB","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":138,"question_flow_order":44,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Power outages in firms in a typical month (number) \u2013 WB","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"integer","question_order":139,"question_flow_order":45,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Improved water source (% of population with access) \u2013 WB","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"percentage","question_order":140,"question_flow_order":46,"question_mode":"secondary_sources"});
            Question.create({"question_text":"Perception of the availability of labour/skills \u2013 Fraser","question_mode_text":"Secondary sources","assessment_ID":"base","question_data_type":"float","question_order":143,"question_flow_order":47,"question_mode":"secondary_sources"});
        }
    });
}

exports.createDefaultQuestions = createDefaultQuestions;