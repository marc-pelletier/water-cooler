const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    addDestination
};

function index(req, res) {
    Flight.find({})
    .then(function(flights) {
        return res.render('flights', {title: 'Flights Index', flights})
    })
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add New Flight'})
}

function create(req, res) {
    if (req.body.departs == null) {
        req.body.departs = new Date().getTime() + 365*24*60*6000
    }
    const p = new Promise(function(resolve, reject) {
        resolve(req.body)
    })
    .then(function(flight) {
        return flight = new Flight(flight)
    })
    .then(function(flight) {
        flight.save()
    })
    .then(function() {
        res.redirect('flights')
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            return res.render('flights/show', {title: 'Flight '+flight.flightNo, flight, tickets})
        });
    });
}

function addDestination(req, res) {
    Flight.findById(req.params.id)
    .then(function(flight) {
        flight.destinations.push(req.body)
        return flight;
    })
    .then(function(flight) {
        flight.save()
    })
    .then(function() {
        res.redirect('/flights/'+req.params.id)
    })
}