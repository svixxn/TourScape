const express = require('express');
const destinationController = require('../controllers/destinationController');
const {protect, restrictTo} = require("../middlewares/authMiddleware")

const router = express.Router()

router.get('/', destinationController.getAllDestinations)
router.get('/:slug', destinationController.getDestination)

router.use(protect)
router.use(restrictTo('admin', 'lead-guide'))

router.post('/', destinationController.createDestination)
router.patch('/:id', destinationController.uploadDestPhoto, destinationController.updateDestination)
router.delete('/:id', destinationController.deleteDestination)

module.exports = router

