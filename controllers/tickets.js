const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
};

function newTicket(req, res) {
    res.render('tickets/new', {title: 'Add New Ticket', flightId: req.params.id})
}

function create(req, res) { 
    req.body.flight = req.params.id;
    ticket = new Ticket(req.body);
    ticket.save()
    res.redirect('/flights/'+req.params.id)
}