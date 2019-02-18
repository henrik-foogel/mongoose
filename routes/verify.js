// models
let Ticket = require('../models/ticket');

module.exports.get = async (req, res) => {

    try{
        // verify code
        let resp = await Ticket.find({ code: req.params.code })
        // FindById('*id number*')
        if(resp.length == 1) {
            // valid
            res.status(200).send('Ticket is valid, you magnificent bastard!')
        } else {
            // not valid
            res.status(500).send('Ticket is invalid, you worthless theif!!!!')
        }

    } catch(err) {
        res.status(500).send(err)
    }
}