var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')

// User information functions 
router.get('/', db.getAllUsers)
router.get('/u/:id', db.getSingleUser)
router.patch('/u/:id/edit', db.editUser)
router.post('/u/:id/follow', db.followUser)
router.post('/u/:id/unfollow', db.unfollowUser) 
router.get('/u/:id/followees', db.getUserFollowees)
router.get('/u/:id/followers', db.getUserFollowers) 
router.get('/u/:id/photos', db.getPhotosFromUser)
router.post('/u/:id/upload', db.uploadPhoto) 
router.get('/p', db.getAllPhotos)
router.get('/p/:id', db.getSinglePhoto)
router.get('/p/:id/details', db.getPhotoDetails)
router.post('/p/:id/fave', db.favePhoto) 
router.post('/p/:id/unfave', db.unfavePhoto)
router.get('/p/:id/likedby/:userid', db.getPhotoLikedStatus)


// User authentication functions 
router.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user))
router.post('/new', db.registerUser)
router.get('/logout', loginRequired, db.logoutUser)

module.exports = router;