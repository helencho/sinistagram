import React from 'react'
import { Route, Link, Switch } from "react-router-dom"
import '../stylesheets/app.css'
import axios from "axios"
import UserGallery from './UserGallery'
import UserInfo from './UserInfo'
import SinglePhoto from './SinglePhoto'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <UserInfo
                    user={this.props.user}
                    photos={this.props.photos}
                    followees={this.props.followees}
                    followers={this.props.followers} />
                <UserGallery photos={this.props.photos} />
            </div>
        )
    }
}

export default Profile 