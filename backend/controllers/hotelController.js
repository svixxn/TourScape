const Hotel = require("../models/hotelModel")
const factory = require('../utils/handlerFactory')

exports.getAllHotels = factory.getAll(Hotel)

exports.getHotel = factory.getOne(Hotel, {path:'reviews'})

exports.createHotel = factory.createOne(Hotel)

exports.updateHotel = factory.updateOne(Hotel)

exports.deleteHotel = factory.deleteOne(Hotel)