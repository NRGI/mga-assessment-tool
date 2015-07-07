'use strict';
/*jslint unparam: true*/

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var modificationSchema = new mongoose.Schema({
    modified_by: ObjectId,
    modified_date: Date
});


var assessmentSchema = mongoose.Schema({
    assessment_ID: {type: String, required: '{PATH} is required', index: true}, // ISO2 of country + year
    ISO3: {type: String, required: '{PATH} is required'}, // ISO3 of country
    country: {type: String, required: '{PATH} is required'}, // String of country name
    year: {type: String, required: '{PATH} is required'},
    status: {type: String, required: '{PATH} is required', default: 'created'}, // created, desk_research, interviews, review, approved
    create_date: {created_by: ObjectId, date: Date},
    start_date: {started_by: ObjectId, date: Date},
    modified: [modificationSchema],
    questions_flagged: {type: Number, default: 0},
    questions_complete: {type: Number, default: 0},
    questions_unfinalized: {type: Number, required: '{PATH} is required'},
    question_length: {type: Number, required: '{PATH} is required'},
    question_set_length: Number,
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

function createDefaultAssessments() {
    Assessment.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Assessment.create({assessment_ID: "TZ-2015", ISO3: "TZA", year: "2015", country: "Tanzania", questions_unfinalized: 41, question_length: 41, users:["5564fd88952bb683837112ca","5564fd88952bb683837112d3"]});
            Assessment.create({assessment_ID: "NG-2015", ISO3: "NGA", year: "2015", country: "Nigeria", questions_unfinalized: 41, question_length: 41});
            Assessment.create({assessment_ID: "MM-2015", ISO3: "MMR", year: "2015", country: "Myanmar", questions_unfinalized: 41, question_length: 41});
            Assessment.create({assessment_ID: "AO-2015", ISO3: "AGO", year: "2015", country: "Angola", questions_unfinalized: 41, question_length: 41});
            Assessment.create({assessment_ID: "RU-2015", ISO3: "RUS", year: "2015", country: "Russian Federation", questions_unfinalized: 41, question_length: 41});
            Assessment.create({assessment_ID: "MX-2015", ISO3: "MEX", year: "2015", country: "Mexico", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "EG-2015", ISO3: "EGY", year: "2015", country: "Egypt, Arab Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IR-2015", ISO3: "IRN", year: "2015", country: "Iran, Islamic Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IR-2015", ISO3: "IRN", year: "2015", country: "Iran, Islamic Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "DZ-2015", ISO3: "DZA", year: "2015", country: "Algeria", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IQ-2015", ISO3: "IRQ", year: "2015", country: "Iraq", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PE-2015", ISO3: "PER", year: "2015", country: "Peru", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "VE-2015", ISO3: "VEN", year: "2015", country: "Venezuela, RB", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AF-2015", ISO3: "AFG", year: "2015", country: "Afghanistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SA-2015", ISO3: "SAU", year: "2015", country: "Saudi Arabia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GH-2015", ISO3: "GHA", year: "2015", country: "Ghana", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MZ-2015", ISO3: "MOZ", year: "2015", country: "Mozambique", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "YE-2015", ISO3: "YEM", year: "2015", country: "Yemen, Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KZ-2015", ISO3: "KAZ", year: "2015", country: "Kazakhstan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "EC-2015", ISO3: "ECU", year: "2015", country: "Ecuador", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZM-2015", ISO3: "ZMB", year: "2015", country: "Zambia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZW-2015", ISO3: "ZWE", year: "2015", country: "Zimbabwe", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TD-2015", ISO3: "TCD", year: "2015", country: "Chad", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GN-2015", ISO3: "GIN", year: "2015", country: "Guinea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BO-2015", ISO3: "BOL", year: "2015", country: "Bolivia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AZ-2015", ISO3: "AZE", year: "2015", country: "Azerbaijan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AE-2015", ISO3: "ARE", year: "2015", country: "United Arab Emirates", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LY-2015", ISO3: "LBY", year: "2015", country: "Libya", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KG-2015", ISO3: "KGZ", year: "2015", country: "Kyrgyz Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NO-2015", ISO3: "NOR", year: "2015", country: "Norway", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CG-2015", ISO3: "COG", year: "2015", country: "Congo, Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KW-2015", ISO3: "KWT", year: "2015", country: "Kuwait", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "OM-2015", ISO3: "OMN", year: "2015", country: "Oman", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "QA-2015", ISO3: "QAT", year: "2015", country: "Qatar", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GA-2015", ISO3: "GAB", year: "2015", country: "Gabon", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TT-2015", ISO3: "TTO", year: "2015", country: "Trinidad and Tobago", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BH-2015", ISO3: "BHR", year: "2015", country: "Bahrain", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CD-2015", ISO3: "COD", year: "2015", country: "Congo, Dem. Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "UZ-2015", ISO3: "UZB", year: "2015", country: "Uzbekistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SY-2015", ISO3: "SYR", year: "2015", country: "Syrian Arab Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LA-2015", ISO3: "LAO", year: "2015", country: "Lao PDR", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ER-2015", ISO3: "ERI", year: "2015", country: "Eritrea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TM-2015", ISO3: "TKM", year: "2015", country: "Turkmenistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LR-2015", ISO3: "LBR", year: "2015", country: "Liberia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MN-2015", ISO3: "MNG", year: "2015", country: "Mongolia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GW-2015", ISO3: "GNB", year: "2015", country: "Guinea-Bissau", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CO-2015", ISO3: "COL", year: "2015", country: "Colombia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SD-2015", ISO3: "SDN", year: "2015", country: "Sudan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CM-2015", ISO3: "CMR", year: "2015", country: "Cameroon", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CL-2015", ISO3: "CHL", year: "2015", country: "Chile", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NE-2015", ISO3: "NER", year: "2015", country: "Niger", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PG-2015", ISO3: "PNG", year: "2015", country: "Papua New Guinea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MR-2015", ISO3: "MRT", year: "2015", country: "Mauritania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IN-2015", ISO3: "IND", year: "2015", country: "India", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BR-2015", ISO3: "BRA", year: "2015", country: "Brazil", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ET-2015", ISO3: "ETH", year: "2015", country: "Ethiopia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "VN-2015", ISO3: "VNM", year: "2015", country: "Vietnam", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZA-2015", ISO3: "ZAF", year: "2015", country: "South Africa", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "UG-2015", ISO3: "UGA", year: "2015", country: "Uganda", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CA-2015", ISO3: "CAN", year: "2015", country: "Canada", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MY-2015", ISO3: "MYS", year: "2015", country: "Malaysia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AU-2015", ISO3: "AUS", year: "2015", country: "Australia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BF-2015", ISO3: "BFA", year: "2015", country: "Burkina Faso", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ML-2015", ISO3: "MLI", year: "2015", country: "Mali", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SN-2015", ISO3: "SEN", year: "2015", country: "Senegal", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "RW-2015", ISO3: "RWA", year: "2015", country: "Rwanda", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GR-2015", ISO3: "GRC", year: "2015", country: "Greece", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BI-2015", ISO3: "BDI", year: "2015", country: "Burundi", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BY-2015", ISO3: "BLR", year: "2015", country: "Belarus", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BG-2015", ISO3: "BGR", year: "2015", country: "Bulgaria", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PY-2015", ISO3: "PRY", year: "2015", country: "Paraguay", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SL-2015", ISO3: "SLE", year: "2015", country: "Sierra Leone", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GE-2015", ISO3: "GEO", year: "2015", country: "Georgia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CF-2015", ISO3: "CAF", year: "2015", country: "Central African Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BA-2015", ISO3: "BIH", year: "2015", country: "Bosnia and Herzegovina", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LT-2015", ISO3: "LTU", year: "2015", country: "Lithuania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AM-2015", ISO3: "ARM", year: "2015", country: "Armenia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AL-2015", ISO3: "ALB", year: "2015", country: "Albania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "JM-2015", ISO3: "JAM", year: "2015", country: "Jamaica", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ID-2015", ISO3: "IDN", year: "2015", country: "Indonesia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CI-2015", ISO3: "CIV", year: "2015", country: "Cote d'Ivoire", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NA-2015", ISO3: "NAM", year: "2015", country: "Namibia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BW-2015", ISO3: "BWA", year: "2015", country: "Botswana", questions_unfinalized: 41, question_length: 41});

            // Assessment.create({assessment_ID: "TZ-2015-FU", ISO3: "TZA", year: "2015", country: "Tanzania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NG-2015-FU", ISO3: "NGA", year: "2015", country: "Nigeria", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MM-2015-FU", ISO3: "MMR", year: "2015", country: "Myanmar", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AO-2015-FU", ISO3: "AGO", year: "2015", country: "Angola", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "RU-2015-FU", ISO3: "RUS", year: "2015", country: "Russian Federation", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MX-2015-FU", ISO3: "MEX", year: "2015", country: "Mexico", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "EG-2015-FU", ISO3: "EGY", year: "2015", country: "Egypt, Arab Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IR-2015-FU", ISO3: "IRN", year: "2015", country: "Iran, Islamic Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "DZ-2015-FU", ISO3: "DZA", year: "2015", country: "Algeria", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IQ-2015-FU", ISO3: "IRQ", year: "2015", country: "Iraq", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PE-2015-FU", ISO3: "PER", year: "2015", country: "Peru", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "VE-2015-FU", ISO3: "VEN", year: "2015", country: "Venezuela, RB", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AF-2015-FU", ISO3: "AFG", year: "2015", country: "Afghanistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SA-2015-FU", ISO3: "SAU", year: "2015", country: "Saudi Arabia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GH-2015-FU", ISO3: "GHA", year: "2015", country: "Ghana", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MZ-2015-FU", ISO3: "MOZ", year: "2015", country: "Mozambique", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "YE-2015-FU", ISO3: "YEM", year: "2015", country: "Yemen, Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KZ-2015-FU", ISO3: "KAZ", year: "2015", country: "Kazakhstan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "EC-2015-FU", ISO3: "ECU", year: "2015", country: "Ecuador", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZM-2015-FU", ISO3: "ZMB", year: "2015", country: "Zambia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZW-2015-FU", ISO3: "ZWE", year: "2015", country: "Zimbabwe", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TD-2015-FU", ISO3: "TCD", year: "2015", country: "Chad", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GN-2015-FU", ISO3: "GIN", year: "2015", country: "Guinea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BO-2015-FU", ISO3: "BOL", year: "2015", country: "Bolivia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AZ-2015-FU", ISO3: "AZE", year: "2015", country: "Azerbaijan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AE-2015-FU", ISO3: "ARE", year: "2015", country: "United Arab Emirates", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LY-2015-FU", ISO3: "LBY", year: "2015", country: "Libya", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KG-2015-FU", ISO3: "KGZ", year: "2015", country: "Kyrgyz Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NO-2015-FU", ISO3: "NOR", year: "2015", country: "Norway", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CG-2015-FU", ISO3: "COG", year: "2015", country: "Congo, Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "KW-2015-FU", ISO3: "KWT", year: "2015", country: "Kuwait", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "OM-2015-FU", ISO3: "OMN", year: "2015", country: "Oman", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "QA-2015-FU", ISO3: "QAT", year: "2015", country: "Qatar", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GA-2015-FU", ISO3: "GAB", year: "2015", country: "Gabon", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TT-2015-FU", ISO3: "TTO", year: "2015", country: "Trinidad and Tobago", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BH-2015-FU", ISO3: "BHR", year: "2015", country: "Bahrain", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CD-2015-FU", ISO3: "COD", year: "2015", country: "Congo, Dem. Rep.", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "UZ-2015-FU", ISO3: "UZB", year: "2015", country: "Uzbekistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SY-2015-FU", ISO3: "SYR", year: "2015", country: "Syrian Arab Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LA-2015-FU", ISO3: "LAO", year: "2015", country: "Lao PDR", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ER-2015-FU", ISO3: "ERI", year: "2015", country: "Eritrea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "TM-2015-FU", ISO3: "TKM", year: "2015", country: "Turkmenistan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LR-2015-FU", ISO3: "LBR", year: "2015", country: "Liberia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MN-2015-FU", ISO3: "MNG", year: "2015", country: "Mongolia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GW-2015-FU", ISO3: "GNB", year: "2015", country: "Guinea-Bissau", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CO-2015-FU", ISO3: "COL", year: "2015", country: "Colombia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SD-2015-FU", ISO3: "SDN", year: "2015", country: "Sudan", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CM-2015-FU", ISO3: "CMR", year: "2015", country: "Cameroon", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CL-2015-FU", ISO3: "CHL", year: "2015", country: "Chile", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NE-2015-FU", ISO3: "NER", year: "2015", country: "Niger", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PG-2015-FU", ISO3: "PNG", year: "2015", country: "Papua New Guinea", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MR-2015-FU", ISO3: "MRT", year: "2015", country: "Mauritania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "IN-2015-FU", ISO3: "IND", year: "2015", country: "India", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BR-2015-FU", ISO3: "BRA", year: "2015", country: "Brazil", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ET-2015-FU", ISO3: "ETH", year: "2015", country: "Ethiopia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "VN-2015-FU", ISO3: "VNM", year: "2015", country: "Vietnam", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ZA-2015-FU", ISO3: "ZAF", year: "2015", country: "South Africa", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "UG-2015-FU", ISO3: "UGA", year: "2015", country: "Uganda", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CA-2015-FU", ISO3: "CAN", year: "2015", country: "Canada", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "MY-2015-FU", ISO3: "MYS", year: "2015", country: "Malaysia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AU-2015-FU", ISO3: "AUS", year: "2015", country: "Australia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BF-2015-FU", ISO3: "BFA", year: "2015", country: "Burkina Faso", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ML-2015-FU", ISO3: "MLI", year: "2015", country: "Mali", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SN-2015-FU", ISO3: "SEN", year: "2015", country: "Senegal", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "RW-2015-FU", ISO3: "RWA", year: "2015", country: "Rwanda", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GR-2015-FU", ISO3: "GRC", year: "2015", country: "Greece", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BI-2015-FU", ISO3: "BDI", year: "2015", country: "Burundi", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BY-2015-FU", ISO3: "BLR", year: "2015", country: "Belarus", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BG-2015-FU", ISO3: "BGR", year: "2015", country: "Bulgaria", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "PY-2015-FU", ISO3: "PRY", year: "2015", country: "Paraguay", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "SL-2015-FU", ISO3: "SLE", year: "2015", country: "Sierra Leone", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "GE-2015-FU", ISO3: "GEO", year: "2015", country: "Georgia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CF-2015-FU", ISO3: "CAF", year: "2015", country: "Central African Republic", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BA-2015-FU", ISO3: "BIH", year: "2015", country: "Bosnia and Herzegovina", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "LT-2015-FU", ISO3: "LTU", year: "2015", country: "Lithuania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AM-2015-FU", ISO3: "ARM", year: "2015", country: "Armenia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "AL-2015-FU", ISO3: "ALB", year: "2015", country: "Albania", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "JM-2015-FU", ISO3: "JAM", year: "2015", country: "Jamaica", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "ID-2015-FU", ISO3: "IDN", year: "2015", country: "Indonesia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "CI-2015-FU", ISO3: "CIV", year: "2015", country: "Cote d'Ivoire", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "NA-2015-FU", ISO3: "NAM", year: "2015", country: "Namibia", questions_unfinalized: 41, question_length: 41});
            // Assessment.create({assessment_ID: "BW-2015-FU", ISO3: "BWA", year: "2015", country: "Botswana", questions_unfinalized: 41, question_length: 41});
        }
    });
}

exports.createDefaultAssessments = createDefaultAssessments;