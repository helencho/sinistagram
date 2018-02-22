import React, { Component } from 'react'
import axios from 'axios'
import '../stylesheets/uploadphoto.css'

class UploadPhoto extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            imgURL: '',
            caption: ''
        }
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { user, imgURL, caption } = this.state
        console.log('Adding image')
        // Check that url is a valid url 
        // Send post request to add image: photo_link, caption 
        axios
            .post(`/users/u/${user.user_id}/upload`, {
                photo_url: imgURL,
                caption: caption
            })
            .then(res => {
                // return res.data.data.photo_id
                console.log(res.data) 
            })
            // .then(photo_id => {
            //     // console.log(photo_id)
            //     axios
            //         .post(`/users/p/${photo_id}/fave`, {
            //             user_id: user.user_id,
            //             photo_id: photo_id
            //         })
            //         .then(res => {
            //             console.log(res.data)
            //         })
            //         .catch(err => {
            //             console.log(err)
            //         })
            // })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { user, imgURL, caption } = this.state
        console.log(this.state)

        return (
            <div className='upload-photo-container'>
                <div className='upload-photo-box'>
                    <h1>Upload photo</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' value={imgURL} placeholder='Paste image URL' name='imgURL' onChange={this.handleInput} />
                        <textarea value={caption} placeholder='Caption' name='caption' onChange={this.handleInput} />
                        <input type='submit' value='Add Image' />
                    </form>
                </div>
            </div>
        )
    }
}

export default UploadPhoto