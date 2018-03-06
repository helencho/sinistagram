import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../stylesheets/singlephoto.css'

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
        const id = this.props.photoid

        // Get request to grab photo and photo's author information 
        axios
            .get(`/users/p/${id}`)
            .then(res => {
                let photoData = res.data.data
                this.setState({
                    authorId: photoData.user_id,
                    authorName: photoData.fullname,
                    authorUsername: photoData.username,
                    authorImgUrl: photoData.profile_url,
                    photoUrl: photoData.photo_url,
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
                                picUrl: item.profile_url
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

    handleCommentSubmit = e => {
        e.preventDefault()
        console.log('comment submitted')
    }


    render() {
        const { authorId, authorName, authorUsername, authorImgUrl, following, photoUrl, photoCaption, likedByUsers, liked } = this.state
        const totalLikes = likedByUsers.length
        const likedStatus = liked ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>
        // console.log(this.state)
        // console.log(this.props.photoid)

        return (
            <div className='single-photo-container'> {/* row */}
                <div className='single-photo-left'>
                    <div className='single-photo'>
                        <img src={photoUrl} alt='photo' />
                    </div>
                </div>
                <div className='single-photo-right'> {/* column */}
                    <div className='single-photo-info'> {/* row */}
                        <img src={authorImgUrl} alt={authorUsername} />
                        <p>{authorUsername}</p>
                        <button name='showPhoto' onClick={this.props.handleModal}>X</button>
                    </div>
                    <div className='single-photo-comments'> {/* column */}
                        <p><span className='author-name'>{authorUsername}</span> {photoCaption}</p>
                        <p><span className='author-name'>test</span> I love it!</p>
                    </div>
                    <div className='single-photo-likes'> {/* column */}
                        <p>{likedStatus}</p>
                        <p>{totalLikes} likes</p>
                    </div>
                    <form className='single-photo-add-comment' onSubmit={this.handleCommentSubmit}>
                        <input type='text' placeholder='Add a comment...' />
                    </form>
                </div>
            </div>
        )
    }
}

export default SinglePhoto 