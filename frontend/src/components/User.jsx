import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Profile from './Profile'
import Followers from './Followers'
import Followees from './Followees'
import SinglePhoto from './SinglePhoto'
import EditUser from './EditUser'
import UploadPhoto from './UploadPhoto'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            userID: '',
            followees: '',
            followers: '',
            photos: [],
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    // Grab logged in user's information 
    getUserInfo = () => {
        const id = this.props.match.params.id
        axios
            .get(`/users/u/${id}`)
            .then(res => {
                let user = res.data.data
                this.setState({
                    user: user,
                    userID: user.user_id
                })
                this.getUserFollowees()
                this.getUserFollowing()
            })
            .catch(err => {
                console.log(err)
            })

    }

    // Render the user's profile based on user ID 
    renderProfile = () => {
        const { user } = this.state
        if (user) {
            return <Profile user={user} />
        } else {
            return <h1>Must be logged in</h1>
        }
    }

    // Get logged in user's followees 
    getUserFollowees = () => {
        const { userID } = this.state
        axios
            .get(`/users/u/${userID}/following`)
            .then(res => {
                let followees = res.data.data
                this.setState({
                    followees: followees
                })
            })
            .catch(err => console.log(err))
    }

    // Get logged in user's followers 
    getUserFollowers = () => {
        const { userID } = this.state
        axios
            .get(`/users/u/${userID}/followers`)
            .then(res => {
                let followers = res.data.data
                this.setState({
                    followers: followers
                })
            })
            .catch(err => console.log(err))
    }

    renderFollowees = () => {
        const { followees } = this.state
        return <Followees followees={followees} />
    }

    renderFollowers = () => {
        const { followers } = this.state
        return <Followers followers={followers} />
    }

    renderUploadPhoto = () => {
        const { user } = this.state
        if (user) {
            return <UploadPhoto user={user} />
        } else {
            return <h1>Must be logged in</h1>
        }
    }

    editUser = () => {
        const { user } = this.state
        return <EditUser user={user} />
    }

    render() {
        console.log(this.state)

        return (
            <div>
                <Route path="/users/u/:id/profile" render={this.renderProfile} />
                <Route path="/users/u/:id/edit" render={this.editUser} />
                <Route path="/users/u/:id/following" render={this.renderFollowees} />
                <Route path="/users/u/:id/followers" render={this.renderFollowers} />
                <Route path="/users/u/:id/upload" render={this.renderUploadPhoto} />
                <Route exact path="/users/u/:id/photo/:photoid" component={SinglePhoto} />
            </div>
        )
    }
}

export default User

