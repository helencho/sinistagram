const pgp = require('pg-promise')({});
const authHelpers = require('../auth/helpers')
const passport = require('../auth/local')
require('dotenv').config();
const db = pgp(process.env.DATABASE_URL);

// Information on all users 
// Route: /users/
function getAllUsers(req, res, next) {
    db
        .any('SELECT * FROM users')
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved all users'
            })
        })
        .catch((err) => {
            return next(err)
        })
}

// Get a user by user id 
// Route: /users/u/:id 
function getSingleUser(req, res, next) {
    db
        .one('SELECT * FROM users WHERE user_id = $1',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved selected user'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Update a single user's username, email, full name, profile ic, and user description
// Route: /users/u/:id/edit 
function editUser(req, res, next) {
    db
        .none('UPDATE users SET username=$1, email=$2, fullname=$3, profile_url=$4, user_description=$5 WHERE user_id = $6',
            [req.body.newName, req.body.newEmail, req.body.newFullName, req.body.newProfilePic, req.body.newDescription, req.params.id])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated one user'
                })
        })
        .catch((err) => {
            return next(err)
        })
}


// function getPhotoLikes(req, res, next) {
//     db
//         .one('SELECT photos.photo_id, COUNT(likes.user_id) AS total_likes FROM likes JOIN photos ON photos.photo_id=likes.photo_id WHERE photos.photo_id=$1 GROUP BY photos.photo_id;',
//             [req.params.id])
//         .then(data => {
//             res.status(200).json({
//                 status: 'Success',
//                 data: data,
//                 message: 'Retrieved total photo likes'
//             })
//         })
//         .catch(err => {
//             return next(err)
//         })
// }


// Information on the users that current user follows including username and full name (based on current user ID)
function getUserFollowees(req, res, next) {
    db
        .any('SELECT follower_id, followee_id, users.username, users.fullname, users.profile_url FROM follows JOIN users ON followee_id=users.user_id WHERE follower_id=$1;',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved followees'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on the users that follow current user (based on current user ID)
function getUserFollowers(req, res, next) {
    db
        .any('SELECT followee_id, follower_id, users.username, users.fullname, users.profile_url FROM follows JOIN users ON follower_id=users.user_id WHERE followee_id=$1;',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved followers'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Add follower to follows table 
function followUser(req, res, next) {
    db
        .none('INSERT INTO follows (followee_id, follower_id) VALUES ($1, $2);',
            [req.body.followee_id, req.params.id])
        .then(() => {
            res.status(200).json({
                status: 'Success',
                message: 'Followed user'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Delete follower from follows table 
function unfollowUser(req, res, next) {
    db
        .none('DELETE FROM follows WHERE followee_id=$1 AND follower_id=$2;',
            [req.body.followee_id, req.params.id])
        .then(() => {
            res.status(200).json({
                status: 'Success',
                message: 'Unfollowed user'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Get all the photos from a single user
function getPhotosFromUser(req, res, next) {
    db
        .any('SELECT photos.photo_id, photos.caption, photos.photo_url, photos.user_id AS author_id, users.username, users.profile_url, count(likes.user_id) AS total_likes FROM photos LEFT JOIN users ON photos.user_id = users.user_id LEFT JOIN likes ON photos.photo_id = likes.photo_id WHERE users.user_id=$1 GROUP BY photos.photo_id, photos.caption, photos.photo_url, photos.user_id, users.username, users.profile_url;',
            [req.params.id])
        .then(data => {
            res.status(200)
                .json({
                    status: 'Success',
                    data: data,
                    message: 'Retrieved all photos by user'
                })
        })
        .catch(err => {
            return next(err)
        })
}

// Returns a row of user who liked photo. Returns none if user didn't like photo 
function getPhotoLikedStatus(req, res, next) {
    db
        .any('SELECT * FROM likes WHERE photo_id=$1 AND user_id=$2;',
            [req.params.id, req.params.userid])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved photo\'s liked status by user'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on all photos
function getAllPhotos(req, res, next) {
    db
        .any('SELECT * FROM photos')
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved all photos'
            })
        })
        .catch((err) => {
            return next(err)
        })
}

// Information on photo, including caption and image url
function getSinglePhoto(req, res, next) {
    db
        .one('SELECT photos.photo_id, photos.photo_url, photos.caption, users.user_id, users.username, users.fullname, users.profile_url FROM photos JOIN users ON users.user_id=photos.user_id WHERE photos.photo_id=$1',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved one photo'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on which users liked photo 
function getPhotoDetails(req, res, next) {
    db
        .any('SELECT photos.photo_id, users.user_id AS liked_by_user_id, users.username, users.profile_url FROM photos JOIN likes ON photos.photo_id=likes.photo_id JOIN users ON likes.user_id=users.user_id WHERE photos.photo_id=$1;',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved photo details'
            })
        })
        .catch(err => {
            return next(err)
        })
}


// function loginUser(req, res, next) {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             res.status(500).json({
//                 status: 'login error'
//             })
//         } else if (!user) {
//             res.status(404).json({
//                 status: 'User not found'
//             })
//         } else if (user) {
//             req.logIn(user, (err) => {
//                 if (err) {
//                     res.status(500).send('error')
//                 } else {
//                     res.status(200).send(user)
//                 }
//             })
//         }
//     })(req, res, next)
// }

function favePhoto(req, res, next) {
    db
        .none('INSERT INTO likes (user_id, photo_id) VALUES ($1, $2);',
            [req.body.user_id, req.body.photo_id])
        .then(() => {
            res.status(200).json({
                message: 'Liked photo'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Delete photo and user id from likes table 
function unfavePhoto(req, res, next) {
    db
        .none('DELETE FROM likes WHERE user_id=$1 AND photo_id=$2;',
            [req.body.user_id, req.params.id])
        .then(() => {
            res.status(200).json({
                status: 'Success',
                message: 'Unfaved photo'
            })
        })
        .catch(err => {
            return next(err)
        })
}

function uploadPhoto(req, res, next) {
    db
        .one('INSERT INTO photos (user_id, photo_url, caption) VALUES ($1, $2, $3) RETURNING photo_id;',
            [req.params.id, req.body.photo_url, req.body.caption])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Added photo'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Get authenticated user 
// Route: /users/getUser
function getUser(req, res, next) {
    // console.log(req.user)
    db
        .one(`SELECT * FROM users WHERE user_id = $1`,
            [req.user.user_id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved user'
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'Error',
                error: err
            })
        })
}

// Registers user using email, username, password, fullname
// Route: /users/new 
function registerUser(req, res, next) {
    let hash = authHelpers.createHash(req.body.password)
    db
        .any('INSERT INTO users (username, password_digest, email, fullname, profile_url) VALUES ($1, $2, $3, $4, $5) RETURNING user_id;',
            [req.body.username, hash, req.body.email, req.body.fullname, req.body.profile_url])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Registration successful'
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'Error',
                error: err
            })
        })
}

// Route: /users/logout 
function logoutUser(req, res, next) {
    req.logout()
    res.status(200).json({
        status: 'success',
        message: 'Logged out user'
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    editUser: editUser,
    getUserFollowees: getUserFollowees,
    getUserFollowers: getUserFollowers,
    followUser: followUser,
    unfollowUser: unfollowUser,
    getAllPhotos: getAllPhotos,
    getSinglePhoto: getSinglePhoto,
    getPhotosFromUser: getPhotosFromUser,
    getPhotoLikedStatus: getPhotoLikedStatus,
    getPhotoDetails: getPhotoDetails,
    // loginUser: loginUser,
    favePhoto: favePhoto,
    unfavePhoto: unfavePhoto,
    uploadPhoto: uploadPhoto,
    getUser: getUser,
    registerUser: registerUser,
    logoutUser: logoutUser
}
