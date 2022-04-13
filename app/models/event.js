const mongoose = require('mongoose');
const Users = require('../controllers/users');

const SchemaEvent = new mongoose.Schema({
    Nom: {
        type: String,
        unique: false,
        required: "veuillez donner un Nom à votre event"
        
    },
    Description :  {
        type: String,
        unique: false,
        required: "veuillez saisir une description"
    }
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