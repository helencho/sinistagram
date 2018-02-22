import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/followers.css'
import Profile from './Profile'

class Followers extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     followers: []
        // }
    }

    // componentDidMount() {
    //     this.setState({
    //         followers: this.props.followers
    //     })
    // }

    onClick = (user) => {
        return <Profile user={user} />
    }

    render() {
        const { followers } = this.props
        // console.log('HELLLLOOOO PRINCESS', allFollowing)
        // console.log(followers)

        return (
            <div className="followers-container">
                <div className="followers-title">Followers</div>
                <div className='follower-list-box'>

                    {followers.map(user => (

                        <div className='users' id={user.follower_id}>
                            <div className='onClick' onClick={this.onClick(user)} >
                                <Link to={`/users/u/${user.follower_id}/profile`} >
                                    <div className='follower-image'>
                                        <img className='follower-profile-pic' src={user.profile_url} alt={user.username} />
                                    </div>
                                </Link>

                                <div className='username-fullname'>
                                    <Link to={`/users/u/${user.follower_id}/profile`} >
                                        <h2 className='follower-username'>{user.username} </h2>
                                    </Link>
                                    <p> <h2 className="follower-fullname"> {user.fullname} </h2> </p>
                                </div>
                                <button className="button-follow"> Follow </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default Followers;
