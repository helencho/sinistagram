import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import '../stylesheets/profile.css'
import axios from 'axios';


class UserGallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const { photos } = this.state
        // console.log(this.state)

        return (
            <div>
                <div className='rowOfPics'>
                    {this.props.photos.map(photo => (
                        <div className='grid-image-single-container overlay grey' id={photo.photo_id}>
                            <Link to={`photo/${photo.photo_id}`}>
                                <img className='grid-image-single' alt={photo.caption} src={photo.photo_url} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}

export default UserGallery