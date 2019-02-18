// Tickets route for where it's @ app

// Models
let Ticket = require('../models/ticket');
let Event = require('../models/events')

module.exports.post = async (req, res, next) => {

    try{

        let event = await Event.findById(req.body.event);

        let tickets = [];

        for(i = 0; i<req.body.amount; i++) {
            let ticket = {
                code: uid(5),
                event: event,
                used: false
            }

            tickets.push(ticket);
        }
        
        // write ticket to mongo
        let resp = Ticket.create(tickets);

        // return tickets 
        res.status(200).send(resp);
    } catch(err) {
        res.status(500).send(err.stack)
    }
};

// GET
module.exports.get = async (req, res) => {

    try {

        let tickets = await Ticket.find({});

        res.status(200).send(tickets)

    } catch (err) {
        res.status(500).send(err);
    }

}

//uid
function uid(len) {

    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let code = [];

    for(let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random()*chars.length);
        code.push(chars[rand]);
    }

    return code.join('');

};
