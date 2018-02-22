import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInAs: '',
            followees: [],
            photoFeed: []
        }
    }

    componentDidMount() {
        this.mountLoggedInUser()
    }

    // Set loggedInAs as the current user logged in 
    mountLoggedInUser = () => {
        this.setState({
            loggedInAs: this.props.user
        }, () => {
            // Then get followee users 
            this.getFolloweeUsers()
        })
    }

    // Make ajax request to see who the user follows 
    getFolloweeUsers = () => {
        const { loggedInAs } = this.state

        // If user is logged in, get all following users under user's id 
        if (loggedInAs) {
            axios
                .get(`/users/u/${loggedInAs.user_id}/followees`)
                .then(res => {
                    let followees = res.data.data
                    // Set state in followees array 
                    this.setState({
                        followees: followees
                    })
                })
                // Get photos from the followee users 
                .then(() => {
                    this.getPhotosFromFollowees()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    // Grab all photos posted by these users 
    getPhotosFromFollowees = () => {
        const { loggedInAs, followees } = this.state

        // If user follows people 
        if (followees.length > 0) {

            // Map through each following user 
            followees.map(user => {

                // Get photos and total likes by current user 
                axios
                    .get(`/users/u/${user.followee_id}/photos`)
                    .then(res => {
                        let photos = res.data.data
                        photos.map(photo => {
                            // See if user likes the photo or not 
                            this.doesUserLikePhoto(photo.photo_id, photo)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    }) // End ajax request 
            })

        }
    }

    // See if logged in user likes the photo, add true/false to state 
    doesUserLikePhoto = (photo_id, photo) => {
        let newPhotoFeed = [...this.state.photoFeed]
        let id = photo_id
        let userid = this.state.loggedInAs.user_id

        axios
            .get(`/users/p/${id}/likedby/${userid}`)
            .then(res => {
                let userFound = res.data.data
                let photoFound = newPhotoFeed.find(photo => photo.photo_id === id)

                // If current user doesn't like photo 
                if (userFound.length === 0) {
                    // If photo is found in the feed 
                    if (photoFound) {
                        // Set liked to false, add to feed 
                        newPhotoFeed.map(photo => {
                            if (photo.photo_id === id) {
                                photo.liked = false
                            }
                        })
                        this.setState({
                            photoFeed: newPhotoFeed
                        })
                    }
                    // If no matching photo is found
                    else if (!photoFound) {
                        // Set liked to false, add to feed 
                        photo.liked = false
                        this.setState({
                            photoFeed: [...this.state.photoFeed, photo]
                        })
                    }
                }
                // If current user does like photo 
                else if (userFound.length > 0) {
                    // If photo is found in the feed 
                    if (photoFound) {
                        // Set liked to true, add to feed 
                        newPhotoFeed.map(photo => {
                            if (photo.photo_id === id) {
                                photo.liked = true
                            }
                        })
                        this.setState({
                            photoFeed: newPhotoFeed
                        })
                    }
                    // If no matching photo is found
                    else if (!photoFound) {
                        // Set liked to true, add to feed 
                        photo.liked = true
                        this.setState({
                            photoFeed: [...this.state.photoFeed, photo]
                        })
                    }
                }

            })
            .catch(err => {
                console.log(err)
            })
    }


    favePhoto = e => {
        let user_id = this.state.loggedInAs.user_id
        let photo_id = e.target.name
        let newPhotoFeed = [...this.state.photoFeed]

        console.log('target id: ' + photo_id)

        // Find photo in the feed, set liked to true, add 1 to total likes 
        newPhotoFeed.map(photo => {
            if (photo.photo_id.toString() === photo_id) {
                // If user has not liked photo 
                if (!photo.liked) {
                    photo.liked = true
                    photo.total_likes = parseInt(photo.total_likes) + 1
                }
            }
        })

        // Add faved photo and user to database 
        axios
            .post(`/users/p/${photo_id}/fave`, {
                user_id: user_id,
                photo_id: photo_id
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    photoFeed: newPhotoFeed
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    unfavePhoto = e => {
        let user_id = this.state.loggedInAs.user_id
        let photo_id = e.target.name
        console.log('unfaving photo ' + photo_id)
    }

    render() {
        const { loggedInAs, followees, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {photoFeed.length > 0 ?
                    photoFeed.map((photo) => (
                        <div className='homefeed-card-container'>
                            <div className='homefeed-card-meta'>
                                <img src={photo.profile_url} alt={`Picture`} className='homefeed-card-userprof' />
                                <p className='homefeed-card-username'><Link to={`/users/u/${photo.author_id}/profile`}>{photo.username}</Link></p>
                            </div>
                            <div className='homefeed-card-img'>
                                <img src={photo.photo_url} alt='Awesome photo' />
                            </div>
                            <div className='homefeed-card-heart'>
                                {photo.liked ?
                                    <button name={photo.photo_id} onClick={this.unfavePhoto} className='homefeed-card-liked-button'></button>
                                    :
                                    <button name={photo.photo_id} onClick={this.favePhoto} className='homefeed-card-unliked-button'></button>}
                            </div>
                            <div className='homefeed-card-likes'>
                                <p>{photo.total_likes} likes</p>
                            </div>
                            <div className='homefeed-card-caption'>
                                <p><span className='homefeed-caption-username'>{photo.username}</span> {photo.caption}</p>
                            </div>
                        </div>
                    ))
                    :
                    <h1>...</h1>
                }

            </div>
        )
    }
}

export default Home 