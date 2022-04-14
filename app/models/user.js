const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: "veuillez saisir votre id"
    },

    pseudo: {
        type: String,
        unique: false,
        required: "veuillez saisir votre pseudo"
    },
    email:  {
        type: String,
        unique: true,
        required: "veuillez saisir votre email"
    }
}, {
    collection: 'users',
    minimize: false,
    versionKey: false
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;

        delete ret._id;
    }
})

module.exports = Schema;