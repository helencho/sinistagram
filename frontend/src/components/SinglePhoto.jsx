import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../SinglePhoto.css'

class SinglePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorId: '',
            authorName: '',
            authorUsername: '',
            authorImgUrl: '',
            following: false,
            photoUrl: '',
            photoCaption: '',
            likedByUsers: [],
            liked: false
        }
    }

    componentDidMount() {
        this.getPhoto()
    }

    getPhoto = () => {
        console.log('props:', this.props)
        // Photo id 
        const id = this.props.match.params.photoid

        // Get request to grab photo and photo's author information 
        axios
            .get(`/users/p/${id}`)
            .then(res => {
                let photoData = res.data.data
                this.setState({
                    authorId: photoData.user_id,
                    authorName: photoData.fullname,
                    authorUsername: photoData.username,
                    authorImgUrl: photoData.profile_pic,
                    photoUrl: photoData.photo_link,
                    photoCaption: photoData.caption
                })

                // Get request to grab information on who liked the photo 
                axios
                    .get(`/users/p/${id}/details`)
                    .then(res => {
                        let detailData = res.data.data
                        let users = []
                        detailData.map(item => {
                            let user = {
                                id: item.liked_by_user_id,
                                username: item.username,
                                picUrl: item.profile_pic
                            }
                            users = [...users, user]
                        })

                        // Find out if current user likes the photo 
                        const userFound = users.find(user => user.id === this.state.authorId)

                        // If user not found, liked is set to false 
                        if (!userFound) {
                            this.setState({
                                liked: false,
                                likedByUsers: users
                            })
                        } else {
                            this.setState({
                                liked: true,
                                likedByUsers: users
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    }) // End second ajax request 
            })
            .catch(err => {
                console.log(err)
            }) // End first ajax request 

    }

    // toggleLike = () => {
    //     // Clicking on heart will toggle true or false 
    //     // Will also send an ajax request (post request) to a route that doesn't exist yet 
    // }


    render() {
        const { authorId, authorName, authorUsername, authorImgUrl, following, photoUrl, photoCaption, likedByUsers, liked } = this.state
        // console.log(this.state.liked)
        const totalLikes = likedByUsers.length
        const likedStatus = liked ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>
        // console.log('user liked: ' + liked)
        console.log(this.state)
        console.log(photoUrl)

        return (
            <div className='single-photo-container'>
                <div className='single-photo'>
                    <img className='single-photo-img' src={photoUrl} alt='image' />
                </div>
                <div className='single-photo-details'>
                    <div className='single-photo-author'>
                        <img className='prof-img-small' src={authorImgUrl} /> <span className='author-name'>{authorUsername}</span> • {following ? 'Following' : 'Follow'}
                    </div>
                    <div className='single-photo-caption'><span className='author-name'>{authorUsername}</span> {photoCaption}</div>
                    <div className='single-photo-liked-status'>{likedStatus}</div>
                    <div className='single-photo-likes'>{totalLikes} likes</div>
                    <form><input type='text' placeholder='Add a comment...' /></form>
                </div>
            </div>
        )
    }
}

export default SinglePhoto 