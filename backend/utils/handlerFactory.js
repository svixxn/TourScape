const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");
const Review = require("../models/reviewModel");


exports.deleteOne = Model => catchAsync(async (req, res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc){
        next(new AppError('No tour found with that id', 404));
        return;
    }
    res.status(204).json({
        status: 'success',
        data: 'Object deleted successfully'
    })
})


exports.updateOne = Model => catchAsync(async (req, res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!doc){
        next(new AppError('No document found with that id', 404));
        return;
    }
    res.status(200).json({
        status: 'success',
        data: {doc}
    })
})

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        if(Model === Review && req.body.modelReview) {
            let existed = undefined;
            switch(req.body.modelReview){
                case "tour": existed = await Model.findOne({user:req.body.user, tour: req.body.tour})
                case "hotel": existed = await Model.findOne({user:req.body.user, tour: req.body.hotel})
                case "restaurant": existed = await Model.findOne({user:req.body.user, restaurant: req.body.restaurant})
                default: existed = null;
            }
            req.body.modelReview = undefined
            if(existed) return next(new AppError('You have already added review.', 400))

        }
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;
        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };
        if (req.params.hotelId) filter = { hotel: req.params.hotelId };
        if (req.params.restaurantId) filter = { restaurant: req.params.restaurantId };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .search()
            .limitFields()
            .paginate();
        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });
    });



