import React, { Component } from 'react'
import { Route } from 'react-router-dom'
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
            loggedInAs: '',
            user: '',
            followees: [],
            followers: [],
            photos: [],
            followStatus: false
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
                    loggedInAs: this.props.loggedInAs,
                    user: user
                })
            })
            .then(() => {
                this.getUserPhotos()
                this.getUserFollowees()
                this.getUserFollowers()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Get logged in user's photos 
    getUserPhotos = () => {
        const { user } = this.state
        axios
            .get(`/users/u/${user.user_id}/photos`)
            .then(res => {
                let photos = res.data.data
                this.setState({
                    photos: photos
                })
            })
            .catch(err => console.log(err))
    }

    // Get logged in user's followees 
    getUserFollowees = () => {
        const { user } = this.state
        axios
            .get(`/users/u/${user.user_id}/followees`)
            .then(res => {
                let followees = res.data.data
                this.setState({
                    followees: followees
                })
            })
            .catch(err => console.log(err))
    }
    // If logged in as user is null, button should be log in!! 

    // Get logged in user's followers 
    getUserFollowers = () => {
        const { loggedInAs, user } = this.state
        axios
            .get(`/users/u/${user.user_id}/followers`)
            .then(res => {
                let followers = res.data.data
                let userFoundAsFollowee = followers.find(item => item.follower_id === loggedInAs.user_id)

                // If logged in user is found in the followers list, set followStatus to true
                if (userFoundAsFollowee) {
                    this.setState({
                        followStatus: true,
                        followers: followers
                    })
                } else {
                    this.setState({
                        followStatus: false,
                        followers: followers
                    })
                }
            })
            .catch(err => console.log(err))
    }

    // Render the user's profile based on user ID 
    renderProfile = () => {
        const { loggedInAs, user, photos, followees, followers, followStatus } = this.state
        if (user) {
            return <Profile
                loggedInAs={loggedInAs}
                user={user}
                photos={photos}
                followees={followees}
                followers={followers}
                followStatus={followStatus}
                handleFollow={this.handleFollow}
                handleUnfollow={this.handleUnfollow} />
        } else {
            return <h1>Must be logged in</h1>
        }
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
            return <UploadPhoto
                user={user}
                getUserPhotos={this.getUserPhotos} />
        } else {
            return <h1>Must be logged in</h1>
        }
    }

    handleFollow = () => {
        console.log('Switching follow status to ' + !this.state.followStatus)
        const { loggedInAs, user } = this.state

        axios
            .post(`/users/${loggedInAs.user_id}/follow`, {
                followee_id: user.user_id
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleUnfollow = () => {
        console.log('Switching follow status to ' + !this.state.followStatus) 
        // const { loggedInAs, user } = this.state 

        // Send request to delete a row where follower is = loggedInAs.user_id 
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

