const Destination = require("../models/destinationModel")
const factory = require('../utils/handlerFactory')
const cloudinary = require('./../utils/cloudinary');
const catchAsync = require("../utils/catchAsync");

const uploadDestPhoto = publicId => (req, res, next) => {
   cloudinary.createMulti('photo', 'Destinations', publicId, 900, 700)(req, res, (err) => {
      if (err) return next(err);
      if (req.files && req.files.length>0) {
         req.body.photo = req.files.map(el=>el.path);
      }
      next();
   })
};

const deleteDestPhoto = publicId => (req, res, next) => {
   cloudinary.deleteSingle('Destinations', publicId);
   next();
};

exports.uploadDestPhoto = (req, res, next) => {
   uploadDestPhoto(req.params.id)(req, res, next);
}

exports.deleteDestPhoto = (req, res, next) => {
   deleteDestPhoto(req.params.id)(req, res, next);
}


exports.getAllDestinations = factory.getAll(Destination)

exports.getDestination = factory.getOne(Destination, { path: 'tours hotels restaurants' })

exports.createDestination = factory.createOne(Destination)

exports.updateDestination = factory.updateOne(Destination)

exports.deleteDestination = factory.deleteOne(Destination)