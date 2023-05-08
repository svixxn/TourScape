const express = require("express");
const userController = require('./../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');


const router = express.Router();


router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authMiddleware.protect)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMyPassword', authController.updatePassword)
router.patch(
    '/updateMe',
    userController.uploadUserPhoto,
    userController.updateMe
);
router.delete('/deleteMe',authMiddleware.restrictTo('user'), userController.deleteUserPhoto, userController.deleteMe)

router.use(authMiddleware.restrictTo('admin'))

router.get('/', userController.getAllUsers)
router.route('/:id').get(userController.getUser).patch(userController.uploadUserPhoto, userController.updateUser).delete(userController.deleteUserPhoto, userController.deleteUser)


module.exports = router