const multer = require('multer');
const sharp = require('sharp');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('../utils/handlerFactory');
const AppError = require('./../utils/appError');
const cloudinary = require('./../utils/cloudinary');


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '4';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,photo,ratingsAverage,ratingQuantity,slug,summary';
    next();
}

exports.getAllTours = factory.getAll(Tour)

exports.getTourById = factory.getOne(Tour, {path:'reviews'})

exports.createTour = factory.createOne(Tour)

exports.updateTourById = factory.updateOne(Tour)

exports.deleteTour = factory.deleteOne(Tour)

exports.getTourStats = catchAsync(async (req, res,next) => {
    const stats = await Tour.aggregate([
        {
            $match: {
                ratingsAverage: {$gte: 0}
            }
        },
        {
            $group: {
                _id:{ $toUpper: '$difficulty' },
                num: {$sum: 1},
                numRatings: {$sum: '$ratingQuantity'},
                avgRating: {$avg: '$ratingsAverage'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'}
            }
        },
        {
            $sort: {
                avgPrice: 1
            }
        }
    ]);
    res.status(200).json({
        status: 'success',
        data: {stats}
    })
})

exports.getMonthlyPlan = catchAsync(async (req,res,next) =>{
    const year = req.params.year * 1;
    const plan =  await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: {$month: '$startDates'},
                numTourStats :{ $sum : 1 },
                tours:{$push: '$name'}
            }
        },
        {
            $addFields: { month: '$_id'}
        },
        {
            $project : {_id:0}
        },
        {
            $sort : {numberTourStarts: -1}
        },
        {
            $limit:12
        }
    ]);

    res.status(200).json({
        status: 'success',
        result: plan.length,
        data: {plan}
    })
})

exports.getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(new AppError('Please provide latitutr and longitude in the format lat,lng.', 400));
    }

    const tours = await Tour.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });
});

exports.getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
        next(
            new AppError(
                'Please provide latitude and longitude in the format lat,lng.',
                400
            )
        );
    }

    const distances = await Tour.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            data: distances
        }
    });
});

exports.updateAllStartDates = catchAsync(async (req,res,next) => {
    const tours = await Tour.find({})

    tours.forEach(async (tour) => {
        tour.startDates.forEach(date => {
            date.availablePlaces = tour.maxGroupSize;
        })
       await tour.save()
    })



    res.status(200).json({
        status: 'success',
        message: 'Start dates was successfully updated.'
    });
})

const uploadTourPhoto = publicId => (req, res, next) => {
    cloudinary.createMulti('photo', 'Tours', publicId, 900, 700)(req, res, (err) => {
       if (err) return next(err);
       if (req.files && req.files.length>0) {
          req.body.photo = req.files.map(el=>el.path);
       }
       next();
    }) 
 };
 
 const deleteTourPhoto = publicId => (req, res, next) => {
    cloudinary.deleteSingle('Tours', publicId);
    next();
 };
 
 exports.uploadTourPhoto = (req, res, next) => {
    uploadTourPhoto(req.params.id)(req, res, next);
 }
 
 exports.deleteTourPhoto = (req, res, next) => {
    deleteTourPhoto(req.params.id)(req, res, next);
 }