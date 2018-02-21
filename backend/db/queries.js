const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost/instaclone')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/local')

// Information on all users
function getAllUsers(req, res, next) {
    db
        .any('SELECT * FROM users')
        .then((data) => {
            // console.log("data:", data)
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
function getSingleUser(req, res, next) {
    db
        .one('SELECT * FROM users WHERE user_id = $1',
            [req.params.id])
        .then(data => {
            // console.log("Data from backend single user:", data)
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved selected user'
            })
        })
        .catch(err => {
            // console.log('  ERRORRRR', err)
            return next(err)
        })
}

// Update a single user's username, email, full name, profile ic, and user description
function editUser(req, res, next) {
    db
        .any('UPDATE users SET username = $1, email_add = $2, fullname = $3, profile_pic = $4, user_description = $5 WHERE user_id = $6',
            [req.body.newName, req.body.newEmail, req.body.newFullName, req.body.newProfilePic, req.body.newDescription, req.params.id])
        .then((data) => {
            // console.log("data:", data, "req.body:", req.body)
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated one user'
                })
        })
        .catch((err) => {
            // console.log(`backennd err`, err)
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
        .any('SELECT user_following.user_id, user_following.following_id, users.username, users.fullname, users.profile_pic FROM user_following JOIN users ON user_following.following_id=users.user_id WHERE user_following.user_id=$1;',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved user followees'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on the users that follow current user (based on current user ID)
function getUserFollowers(req, res, next) {
    db
        .any('SELECT user_followers.user_id, user_followers.follower_id, users.username, users.fullname, users.profile_pic FROM user_followers JOIN users ON user_followers.follower_id=users.user_id WHERE user_followers.user_id=$1',
            [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved user followers'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Get all the photos from a single user
function getPhotosFromUser(req, res, next) {
    db
        .any('SELECT photos.photo_id, photos.caption, photos.photo_link, photos.user_id AS author_id, users.username, users.profile_pic, count(likes.user_id) AS total_likes FROM photos JOIN users ON photos.user_id = users.user_id JOIN likes ON photos.photo_id = likes.photo_id WHERE users.user_id=$1 GROUP BY photos.photo_id, photos.caption, photos.photo_link, photos.user_id, users.username, users.profile_pic;',
            [req.params.id])
        .then(data => {
            // console.log("Data from backend single user photo:", data)
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
        .one('SELECT photos.photo_id, photos.photo_link, photos.caption, users.user_id, users.username, users.fullname, users.profile_pic FROM photos JOIN users ON users.user_id=photos.user_id WHERE photos.photo_id=$1',
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
        .any('SELECT photos.photo_id, users.user_id AS liked_by_user_id, users.username, users.profile_pic FROM photos JOIN likes ON photos.photo_id=likes.photo_id JOIN users ON likes.user_id=users.user_id WHERE photos.photo_id=$1;',
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

function uploadPhoto(req, res, next) {
    db
        .one('INSERT INTO photos (user_id, photo_link, caption) VALUES ($1, $2, $3) RETURNING photo_id;',
            [req.params.id, req.body.photo_link, req.body.caption])
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


// Registers user using email, username, password, fullname
function registerUser(req, res, next) {
    let hash = authHelpers.createHash(req.body.password)
    db.none('INSERT INTO users (username, password_digest, email_add, fullname, profile_pic) VALUES ($1, $2, $3, $4, $5)',
        [req.body.username, hash, req.body.email, req.body.fullname, req.body.profilepic])
        .then(() => {
            res.status(200).json({
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
    getAllPhotos: getAllPhotos,
    getSinglePhoto: getSinglePhoto,
    getPhotosFromUser: getPhotosFromUser,
    getPhotoLikedStatus: getPhotoLikedStatus,
    getPhotoDetails: getPhotoDetails,
    // loginUser: loginUser,
    favePhoto: favePhoto,
    uploadPhoto: uploadPhoto,
    registerUser: registerUser,
    logoutUser: logoutUser
}
