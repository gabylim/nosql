const mongoose = require('mongoose');
const Users = require('../controllers/users');

const SchemaEvent = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'event name is required']
    },
    description: {
        type: String,
        required: [true, 'Event description is required']
    },
    beginDate:{
        type: Date,
        default: Date.now
    },
    endDate: Date,
    location: String,
    coverPicture: String,
    visibility: {
        type: String,
        enum:['Private','Public'],
        required: true
    },
    organisateurs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    collection: 'events',
    minimize: false,
    versionKey: false
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
    }
})

module.exports = SchemaEvent;