const path = require("path");
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const bookingController = require('./controllers/bookingController')

const userRoutes = require("../backend/routes/userRoutes")
const tourRoutes = require("../backend/routes/toursRoutes")
const hotelRoutes = require("./routes/hotelRoutes")
const destinationRoutes = require("../backend/routes/destinationRoutes")
const restaurantRoutes = require("../backend/routes/restaurantRoutes")
const reviewRoutes = require("../backend/routes/reviewRoutes")
const bookingRoutes = require("../backend/routes/bookingRoutes")



const app = express();


// Set security HTTP headers
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: {
            allowOrigins: [
                'https://res.cloudinary.com',
                'https://icon-library.com',
                'https://media.giphy.com'
            ],
        },
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                'img-src': [
                    "'self'",
                    'data:',
                    'https://res.cloudinary.com',
                    'https://icon-library.com',
                    'https://media.giphy.com',
                    'blob:',
                ],
                'media-src': [
                    "'self'",
                    'data:',
                    'https://res.cloudinary.com'
                ],
                'default-src': [
                    "'self'",
                    'data:',
                    'https://res.cloudinary.com',
                ],
                'script-src': [
                    "'self'",
                    'data:',
                    'https://www.mapbox.com',
                    'https://api.mapbox.com'
                ],
                'style-src': [
                    "'self'",
                    "'unsafe-inline'",
                    'https://api.mapbox.com/'
                ],
                'worker-src': [
                    "'self'",
                    'blob:'
                ],
                'child-src': [
                    'blob:'
                ],
                'connect-src': [
                    "'self'",
                    'https://events.mapbox.com/',
                    'https://api.mapbox.com/',
                    'https://res.cloudinary.com/',
                    'https://*.tiles.mapbox.com/'
                ]
            },
        },
    })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    bookingController.checkoutWebhook
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());


app.use(sanitize());


app.use(xss());


app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

app.use('/api/users', userRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/bookings', bookingRoutes)

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.all('*', (req, res, next) => {
    if (req.originalUrl.includes('api'))
        return next(
            new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
        );
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// Error handlers
app.use(globalErrorHandler)

module.exports = app;