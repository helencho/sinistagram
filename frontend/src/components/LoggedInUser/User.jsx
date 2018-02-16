import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Profile from './profile'
import Followers from './Followers'
import Following from './Following'
import SinglePhoto from './SinglePhoto'
import EditUser from './EditUser'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            userID: '', 
            following:'',
            followers:'', 
            photos: [],
        }
    }

getUserInfo= () => {
    const id = this.props.match.params.id
    axios
    .get(`/users/u/${id}`)
    .then(res => {
        let UserInfo = res.data.data 
        // console.log("res.data",res.data.data)

        this.setState({
            user: UserInfo,
            userID: UserInfo.user_id
        })
        console.log('UserINFO: ' , UserInfo)

        this.getUserFollowers()
        this.getUserFollowing()
    })
    .catch(err =>{
        console.log(err)
    })

}

    componentDidMount() {
        console.log("component mounted!!!!!!!!!!!!")
        this.getUserInfo()
       
    }

    // Render the user's profile based on user ID 
    renderProfile = () => {
        const {user}= this.state
        if (user) {
          return <Profile user= {user} />
        } else {
          return <h1>Must be logged in</h1>
        }
      }
   
      getUserFollowing = () => {
        const { userID } = this.state
        const id = userID
        console.log('we is ABOUT to call axios')
        axios
            .get(`/users/u/${id}/following`)
            .then(res => {
                let Following = res.data.data
                console.log(Following)
                this.setState({
                    following:Following, 
                })

            })
    }
    
    getUserFollowers = () => {
        const { userID } = this.state
        const id = userID
        console.log('FROM USERS: GETTING THE FOLLOWERS')
        axios
            .get(`/users/u/${id}/followers`)
            .then(res => {
                let Followers = res.data.data
                console.log('FROM USERS: GETTING THE FOLLOWERS:' , Followers)
                this.setState({
                    followers:Followers
                })

            })
    }

    renderFollowing = () => {
        const { following } = this.state;
        return <Following following = { following }/>
    }

    renderFollowers = () => {
        const { followers } = this.state;
        return <Followers followers = { followers } />
    }

    // renderPhoto = () => {
    //     return <SinglePhoto />
    // }
editUser = () => {
    const { user } = this.state;
    return <EditUser user = {user}/>
}
    render() {
        console.log("THe fucking state:",this.state)

        return (
            <div>
                <Route path="/users/u/:id/profile" render={this.renderProfile} />
                <Route path="/users/u/:id/edit" render={this.editUser} />
                <Route path="/users/u/:id/following" render={this.renderFollowing} />
                <Route path="/users/u/:id/followers" render={this.renderFollowers} />
                <Route exact path="/users/u/:id/photo/:photoid" component={SinglePhoto} />
            </div>
        )
    }
}

export default User

