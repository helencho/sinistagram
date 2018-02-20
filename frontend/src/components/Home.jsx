import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInAs: '',
            followings: [],
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
            // Then get users that logged in user follows 
            this.getFollowingUsers()
        })
    }

    // Make ajax request to see who the user follows 
    getFollowingUsers = () => {
        const { loggedInAs } = this.state

        if (loggedInAs) {
            axios
                .get(`/users/u/${loggedInAs.user_id}/following`)
                .then(res => {
                    let followings = res.data.data

                    // Set state in followings array 
                    this.setState({
                        followings: followings
                    }, () => {
                        // Then get photos that these users have 'posted'
                        this.getPhotosFromFollowees()
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    // Grab all photos posted by these users 
    getPhotosFromFollowees = () => {
        const { loggedInAs, followings } = this.state

        // If user follows people 
        if (followings.length > 0) {

            // Map through each following user 
            followings.map(user => {

                // Get photos and total likes by current user 
                axios
                    .get(`/users/u/${user.following_id}/photos`)
                    .then(res => {
                        let photos = res.data.data
                        photos.map(photo => {
                            // See if user likes the photo or not 
                            this.doesUserLikePhoto(photo, photo.photo_id)

                            // // Add to photo feed state 
                            // this.setState({
                            //     photoFeed: [...this.state.photoFeed, photo]
                            // })
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    }) // End ajax request 
            })

        }
    }

    // See if logged in user likes the photo and add true/false 
    doesUserLikePhoto = (photo, photo_id) => {
        let id = photo_id
        let userid = this.state.loggedInAs.user_id

        axios
            .get(`/users/p/${id}/likedby/${userid}`)
            .then(res => {
                let userFound = res.data.data
                if (userFound.length === 0) {
                    photo.liked = false
                    this.setState({
                        photoFeed: [...this.state.photoFeed, photo]
                    })
                } else if (userFound.length > 0) {
                    photo.liked = true
                    this.setState({
                        photoFeed: [...this.state.photoFeed, photo]
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    favePhoto = e => {
        const { loggedInAs, photoFeed } = this.state
        let user_id = loggedInAs.user_id
        let photo_id = e.target.name
        console.log('target id: ' + photo_id)

        let newPhotoFeed = [...photoFeed]
        newPhotoFeed.map(photo => {
            if (photo.photo_id.toString() === photo_id) {
                photo.liked = true
            }
        })
        
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
                // this.getPhotosFromFollowees() // this adds to the photo feed. Simply toggle liked to true or false 
                // this.doesUserLikePhoto(photo_id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    unfavePhoto = e => {
        const { loggedInAs } = this.state
        let user_id = loggedInAs.user_id
        let photo_id = e.target.name
        console.log(photo_id)
    }

    render() {
        const { loggedInAs, followings, photoFeed } = this.state
        console.log(this.state)

        return (
            <div className='homefeed-page-container'>
                {photoFeed.length > 0 ?
                    photoFeed.map((photo) => (
                        <div className='homefeed-card-container'>
                            <div className='homefeed-card-meta'>
                                <img src={photo.profile_pic} alt={`Picture`} className='homefeed-card-userprof' />
                                <p className='homefeed-card-username'><Link to={`/users/u/${photo.user_id}/profile`}>{photo.username}</Link></p>
                            </div>
                            <div className='homefeed-card-img'>
                                <img src={photo.photo_link} alt='Awesome photo' />
                            </div>
                            <div className='homefeed-card-heart'>
                                {photo.liked ? <button name={photo.photo_id} onClick={this.unfavePhoto} className='homefeed-card-liked-button'></button> : <button name={photo.photo_id} onClick={this.favePhoto} className='homefeed-card-unliked-button'></button>}
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
                    <h1>Nothing to show :(</h1>
                }

            </div>
        )
    }
}

export default Home 