import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import User from './User'
import Profile from './Profile'
import '../stylesheets/explore.css'

class Explore extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            target: ''
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios
            .get(`/users`)
            .then(res => {
                this.setState({
                    users: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClick = e => {
        let id = e.target.id 
        // console.log('id? ' + id)
        this.setState({
            target: id
        })
    }

    render() {
        if(this.state.target) {
            return <User targetID={this.state.target} />
        }

        const userTiles = this.state.users.map(user => (
            <div id={user.user_id} className='explore-single'>
                <div className='explore-single-img-container'>
                    <img src={user.profile_url} />
                </div>
                <div id={user.user_id} className='explore-single-info-container'>
                    {/* <p id={user.user_id} onClick={this.handleClick} to={`/users/u/${user.user_id}/profile`}>{user.username}</p> */}
                    <p id={user.user_id}><Link id={user.user_id} to={`/users/u/${user.user_id}/profile`}>{user.username}</Link></p>
                    <p>{user.fullname}</p>
                </div>
            </div>
        ))

        return (
            <div className='explore-container'>
                <h1>Discover Villains</h1>
                <div className='explore-tile-container'>
                    {userTiles}
                </div>
            </div>
        )
    }
}

export default Explore 