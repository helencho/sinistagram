import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import '../stylesheets/profile.css'
import axios from 'axios';


class ProfileImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images
        }
    }

    render() {
        const { images } = this.state
        console.log(this.state)

        return (
            <div>
                <div className='rowOfPics'>
                    {this.props.images.map(img => (
                        <div className='grid-image-single-container overlay grey' id={img.photo_id}>
                            <Link to={`photo/${img.photo_id}`}>
                                <img className='grid-image-single' alt='img' src={img.photo_link} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}

export default ProfileImages