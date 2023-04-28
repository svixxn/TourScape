const express = require("express");
const reviewController = require('./../controllers/reviewController');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router({mergeParams:true});

router.use(authMiddleware.protect)

router.route('/').get(reviewController.getAllReviews).post(authMiddleware.protect, authMiddleware.restrictTo('user'), reviewController.setModelUserIds, reviewController.createReview)

router.route('/:id').delete(authMiddleware.restrictTo('user', 'admin'), reviewController.deleteReview).patch(authMiddleware.restrictTo('user', 'admin'), reviewController.updateReview).get(reviewController.getReview)

module.exports = router;