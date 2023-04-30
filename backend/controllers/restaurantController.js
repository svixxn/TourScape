const Restaurant = require("../models/restaurantModel")
const factory = require('../utils/handlerFactory')

exports.getAllRestaurants = factory.getAll(Restaurant)

exports.getRestaurant = factory.getOne(Restaurant, {path:'reviews'})

exports.createRestaurant = factory.createOne(Restaurant)

exports.updateRestaurant = factory.updateOne(Restaurant)

exports.deleteRestaurant = factory.deleteOne(Restaurant)