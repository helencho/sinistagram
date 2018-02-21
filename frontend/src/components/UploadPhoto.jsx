import React, { Component } from 'react'
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
        console.log('Add image')
        // Check that url is a valid url 
        // Send post request to add image: userid, photourl, caption 
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