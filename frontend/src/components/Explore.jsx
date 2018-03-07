import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/explore.css'

class Explore extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []
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

    render() {
        const userTiles = this.state.users.map(user => (
            <div className='explore-single'>
                <div className='explore-single-img-container'>
                    <img src={user.profile_url} />
                </div>
                <div className='explore-single-info-container'>
                    <p><Link to={`/users/u/${user.user_id}/profile`}>{user.username}</Link></p>
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