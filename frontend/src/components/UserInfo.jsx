import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/profile.css'
// import Followers from './Followers'
// import Followees from './Followees'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { loggedInAs, user, photos, followees, followers, followStatus } = this.props
        console.log(this.props)

        return (
            <div className="infoContainer">

                <div className="userImageContainer">
                    <Link to={`edit`}>
                        <img className="userIMG" src={user.profile_url} alt={user.username} />
                    </Link>
                </div>

                <div className="allUserInfo">
                    <div className="usernameDiv">
                        <h1 id="usernameH1">{user.username}</h1>
                        <div className='following-button'>
                            {loggedInAs ?
                                followStatus ?
                                    <button onClick={this.props.handleUnfollow}>Unfollow</button>
                                    :
                                    <button onClick={this.props.handleFollow}>Follow</button>
                                :
                                <button>Login</button>
                            }
                        </div>
                    </div>

                    <div className="containerForNumberStats">
                        <div className="stat">{photos.length} Posts</div>
                        <div className="statFollow">
                            <Link to={`/users/u/${user.user_id}/followers`}>{followers.length} Followers</Link>
                        </div>
                        <div className="statFollow">
                            <Link to={`/users/u/${user.user_id}/following`}>{followees.length} Following</Link>
                        </div>
                    </div>

                    <div className="nameAndBio">
                        <h3>{user.fullname}</h3>
                        <span className='bio'>{user.description}</span>
                    </div>
                </div>

            </div>

        )
    }
}

export default UserInfo