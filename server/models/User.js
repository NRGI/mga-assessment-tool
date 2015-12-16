'use strict';
var userSchema, User,
    mongoose        = require('mongoose'),
    mongooseHistory = require('mongoose-history'),
    options         = {customCollectionName: "user_hst"},
    Schema          = mongoose.Schema,
    //validate        = require('mongoose-validate'),
    encrypt         = require('../utilities/encryption'),
    ObjectId        = Schema.Types.ObjectId;

userSchema = new Schema({
    firstName: {
        type: String,
        required: '{PATH} is required!'},
    lastName: {
        type: String,
        required: '{PATH} is required!'},
    username: {
        type: String,
        required:  '{PATH} is required!',
        unique: true},
    email: {
        type:  String,
        required: '{PATH} is required'},
    salt: {
        type: String,
        required: '{PATH} is required!'},
    hashed_pwd: {
        type: String,
        required: '{PATH} is required!'},
    /////// Do we need to deal with multiple roles here ///////////////////
    role:  {
        type: String,
        required: '{PATH} is required!',
        default: 'None'},
    assessments: [{
        assessment_ID:  String,
        country:  String, // Text name of country
        year: String // Year of assessment
    }],
    documents: [ObjectId],
    interviewees: [ObjectId],
    createdBy:  ObjectId,
    creationDate:  {type:  Date, default: Date.now},
    last_modified: {
        modified_by: ObjectId,
        modified_date: {
            type: Date,
            default: Date.now}}
    ///////////////////Add modification array on the ser update ctrl///////////////////
    // address:  String,
    // language:  String
    // groups:  [String]
});

userSchema.methods = {
    authenticate:  function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole:  function (role) {
        return this.role === role;
    },
    setPassword: function (password, callback) {
        this.salt = encrypt.createSalt();
        this.hashed_pwd = encrypt.hashPwd(this.salt, password);
        this.save(callback);
    }
};

userSchema.plugin(mongooseHistory, options);

User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        // console.log(collection);
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jcust');
            User.create({
                firstName: 'Jim',
                lastName: 'Cust',
                username: 'jcust',
                email: 'jcust@resourcegovernance.org',
                salt:  salt,
                hashed_pwd:  hash,
                role: 'supervisor',
                language:  'English'
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'cperry');
            User.create({firstName: 'Chris',
                lastName: 'Perry',
                username: 'cperry',
                email: 'cperry@resourcegovernance.org',
                salt:  salt,
                hashed_pwd:  hash, role: 'researcher',
                language:  'English',
                assessments: []
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'apederson');
            User.create({firstName: 'Anders',
                lastName: 'Pederson',
                username: 'apederson',
                email: 'apederson@resourcegovernance.org',
                salt:  salt,
                hashed_pwd:  hash, role: 'reviewer',
                language:  'English',
                assessments: []
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ahasermann');
            User.create({firstName: 'Anna',
                lastName: 'Hasermann',
                username: 'ahasermann',
                email: 'ahasermann@resourcegovernance.org',
                salt:  salt,
                hashed_pwd:  hash, role: 'researcher',
                language:  'English',
                assessments: []
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'dmihalyi');
            User.create({firstName: 'David',
                lastName: 'Mihalyi',
                username: 'dmihalyi',
                email: 'dmihalyi@resourcegovernance.org',
                salt: salt,
                hashed_pwd:  hash, role: 'reviewer',
                language:  'English',
                assessments: []
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
