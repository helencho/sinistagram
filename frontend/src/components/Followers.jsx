import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/followers.css'
import Profile from './Profile'

class Followers extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { followers, handleModal } = this.props
        console.log(followers)

        return (
            <div className="followers-container">
                <div className="followers-title">Followers
                <button name='showFollowers' onClick={handleModal}>X</button>
                </div>

                <div className='follower-list-box'>

                    {followers.map(user => (
                        <div className='users' id={user.follower_id}>
                            <div className='onClick'>
                                <div className='follower-image'>
                                    <img className='follower-profile-pic' src={user.profile_url} alt={user.username} />
                                </div>

                                <div className='username-fullname'>
                                    <Link to={`/users/u/${user.follower_id}/profile`} >
                                        <h2 className='follower-username'>{user.username}</h2>
                                    </Link>

                                    <h2 className="follower-fullname">{user.fullname}</h2>
                                </div>
                                <button className="button-follow">Follow</button>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        );
    }
}

export default Followers;
