const mongoose = require('mongoose');
const BaseModel = require('./base');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    profile: {
      type: String,
      required: true,
    },
    sent: {
        type: Boolean,
        required: true,
    },
    content: {
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


const Message = mongoose.model('message', messageSchema);
const MessageModel = BaseModel(Message);


module.exports = MessageModel;
