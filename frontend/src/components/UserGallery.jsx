import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import '../stylesheets/profile.css'
import axios from 'axios'
import ReactModal from 'react-modal'
import SinglePhoto from './SinglePhoto'


class UserGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPhoto: false,
            targetPhotoId: ''
        }
    }

    handleModal = e => {
        if (e.target.id) {
            this.setState({
                [e.target.name]: !this.state[e.target.name],
                targetPhotoId: e.target.id
            })
        } else {
            this.setState({
                [e.target.name]: !this.state[e.target.name],
                targetPhotoId: ''
            })
        }
    }

    render() {
        const { showPhoto, targetPhotoId } = this.state
        console.log(this.state)

        return (
            <div>
                <div className='rowOfPics'>
                    {this.props.photos.map(photo => (
                        <div className='grid-image-single-container overlay grey'>
                            <img className='grid-image-single' alt={photo.caption} src={photo.photo_url} name='showPhoto' id={photo.photo_id} onClick={this.handleModal} />
                            <ReactModal isOpen={showPhoto} contentLabel='Photo' className='modal-photo'>
                                <SinglePhoto photoid={targetPhotoId} handleModal={this.handleModal} />
                            </ReactModal>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}

export default UserGallery