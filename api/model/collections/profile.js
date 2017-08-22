const mongoose = require('mongoose');
const BaseModel = require('./base');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    token: {
        type: String,
        required: true,
    },
    page_id: {
        type: String,
        required: true,
    },
    cron: {
        type: String,
        require: false,
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
