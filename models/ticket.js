let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Skapa ett schema
let ticketSchema = new Schema({
    code: {
        type: [String, 'Koden måste vara en sträng, ditt pundhuvud'],
        required: [true, 'Du din jävel, du måste ha en kod för fan!']
    },
    event: {
        type: [Object, 'ditt pundhuvud'],
        required: [true, 'Du din jävel']
    },
    used: {
        type: [Boolean, 'ditt booleanhuvud'],
        default: false
    }
});

//Skapa en modell baserat på det schemat
let Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;