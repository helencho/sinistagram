import React, { Component } from 'react'
import axios from 'axios'
import '../stylesheets/uploadphoto.css'

class UploadPhoto extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            imgURL: '',
            caption: '',
            date: '',
            message: ''
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
        let pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        console.log('Adding image')
        // Check that url is a valid url 

        if (!pattern.test(imgURL)) {
            this.setState({
                message: 'Invalid image URL'
            })
        } else {
            // Send post request to add image: photo_link, caption 
            axios
                .post(`/users/u/${user.user_id}/upload`, {
                    photo_url: imgURL,
                    caption: caption
                })
                .then(res => {
                    console.log(res.data)
                    // let date = new Date()
            
                    this.setState({
                        imgURL: '',
                        caption: '',
                        // date: new Date(),
                        message: 'Uploaded photo'
                    })
                })
                .then(() => {
                    // Rerender gallery photos on User component 
                    this.props.getUserPhotos() 
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        imgURL: '',
                        caption: '',
                        // date: '',
                        message: 'Error uploading :('
                    })
                })
        }
    }

    render() {
        const { user, imgURL, caption, message } = this.state
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
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default UploadPhoto