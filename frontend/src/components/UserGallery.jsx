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
            showPhoto: false
        }
    }

    handleModal = e => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    render() {
        const { showPhoto } = this.state
        console.log(this.props)

        return (
            <div>
                <div className='rowOfPics'>
                    {this.props.photos.map(photo => (
                        <div className='grid-image-single-container overlay grey'>
                            <img className='grid-image-single' alt={photo.caption} src={photo.photo_url} name='showPhoto' id={photo.photo_id} onClick={this.handleModal} />
                            <ReactModal isOpen={showPhoto} contentLabel='Photo' className='modal-photo'>
                                <SinglePhoto id={photo.author_id} photoid={photo.photo_id} handleModal={this.handleModal} />
                            </ReactModal>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}

export default UserGallery