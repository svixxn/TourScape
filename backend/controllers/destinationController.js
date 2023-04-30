const Destination = require("../models/destinationModel")
const factory = require('../utils/handlerFactory')

exports.getAllDestinations = factory.getAll(Destination)

exports.getDestination = factory.getOne(Destination, {path:'tours hotels restaurants'})

exports.createDestination = factory.createOne(Destination)

exports.updateDestination = factory.updateOne(Destination)

exports.deleteDestination = factory.deleteOne(Destination)