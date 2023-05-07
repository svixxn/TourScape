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

const userRoutes = require("../backend/routes/userRoutes")
const tourRoutes = require("../backend/routes/toursRoutes")
const hotelRoutes = require("./routes/hotelRoutes")
const destinationRoutes = require("../backend/routes/destinationRoutes")
const restaurantRoutes = require("../backend/routes/restaurantRoutes")
const reviewRoutes = require("../backend/routes/reviewRoutes")


const app = express();


// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests for this ip, please try again in an hour"
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb'}));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(sanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameters pollution
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

//Routes
app.use('/api/users', userRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)

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