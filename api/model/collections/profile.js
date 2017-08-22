const mongoose = require('mongoose');
const BaseModel = require('./base');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    key: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    lastModified: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});


const Profile = mongoose.model('profile', profileSchema);
const ProfileModel = BaseModel(Profile);


module.exports = ProfileModel;