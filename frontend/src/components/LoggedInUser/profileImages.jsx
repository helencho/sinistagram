import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import './profile.css'
import axios from "axios";


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
                {/* <div className='suggested'>
                    <h2 className='suggestedFollow'> Suggested </h2>
                </div> */}
                <div className='rowOfPics'>
                    {this.props.images.map(img => (
                        // <Link to={`photo/${img.photo_id}`}>
                        <div className='grid-image-single-container overlay grey' id={img.photo_id}>
                            <Link to={`photo/${img.photo_id}`}>
                                <img className='grid-image-single' alt='img' src={img.photo_link} />
                                {/* <img className='allimages' alt='img' src={img.photo_link} width='275' height='250' /> */}
                            </Link>
                        </div>
                        // </Link>
                    ))}
                </div>
            </div>

        )
    }
}

export default ProfileImages