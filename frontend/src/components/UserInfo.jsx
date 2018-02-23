import React from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import '../stylesheets/profile.css'
import axios from 'axios'
import Followers from './Followers'
import Followees from './Followees'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, photos, followees, followers } = this.props

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
                            <button>Following</button>
                        </div>
                    </div>

                    <div className="containerForNumberStats">
                        <div className="stat"><strong>{photos.length} </strong> {"Posts"} </div>
                        <div className="statFollow" > <Link to={`/users/u/${user.user_id}/followers`}><strong>{followers.length} </strong>Followers</Link> </div>
                        <div className="statFollow" > <Link to={`/users/u/${user.user_id}/following`}><strong>{followees.length} </strong>Following</Link></div>
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