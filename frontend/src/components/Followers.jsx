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
            <div className='follow-container'>

                <div className='follow-container-nav'>
                    <h1>Followers</h1>
                    <button name='showFollowers' onClick={handleModal}>X</button>
                </div>{/* End follow container top*/}

                <div className='follow-list-container'>

                    {followers.map(user => (
                        <div className='follow-list-single-user' id={user.follower_id}>
                            <div className='follow-list-single-img'>
                                <img src={user.profile_url} alt={user.username} />
                            </div>
                            <div className='follow-list-single-info'>
                                <Link to={`/users/u/${user.follower_id}/profile`}><p>{user.username}</p></Link>
                                <p className='follow-list-single-info-name'>{user.fullname}</p>
                            </div>
                        </div>
                    ))}

                </div>{/* End follower list container */}
            </div>
        );
    }
}

export default Followers;
