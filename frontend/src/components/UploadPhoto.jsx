import React, { Component } from 'react'

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
        // Check that url is a valid url 
        // Send post request to add image: userid, photourl, caption 
    }

    render() {
        const { user, imgURL, caption } = this.state
        console.log(this.state)

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Upload photo</h1>
                    <input type='text' value={imgURL} placeholder='Paste image URL' name='imgURL' onChange={this.handleInput} />
                    <input type='text' value={caption} placeholder='Caption' name='caption' onChange={this.handleInput} />
                    <input type='submit' value='Add Image' />
                </form>
            </div>
        )
    }
}

export default UploadPhoto