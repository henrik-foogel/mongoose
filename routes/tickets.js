// Tickets route for where it's @ app

// Models
let Ticket = require('../models/ticket');
let Event = require('../models/events')

module.exports.post = async (req, res, next) => {

    try{



        let event = await Event.findById(req.body.event);

        if(event.tickets.available >= event.tickets.sold + req.body.amount) {

            let newSold = event.tickets.sold + req.body.amount
            let newAvailable = event.tickets.available - req.body.amount

            await Event.findOneAndUpdate({_id: req.body.event}, {
                tickets: {
                    sold: newSold,
                    available: newAvailable
                }
            })

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
            let resp = await Ticket.create(tickets);
            console.log(resp)

            // return tickets 
            res.status(200).send(resp);

        } else {
            console.info('all tickets are sold')
            res.status(200).send('all tickets are sold')
        }

        
    } catch(err) {
        res.status(500).send(err.stack)
    }
};

// GET
module.exports.get = async (req, res) => {
    
    try {

        res.status(200).send( await Ticket.find({}) );        
    
    } catch(err){
    
        res.status(500).send(err.stack);
    
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
