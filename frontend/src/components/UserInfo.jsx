import React from 'react'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import Followers from './Followers'
import Followees from './Followees'
import EditUser from './EditUser'
import '../stylesheets/profile.css'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFollowers: false,
            showFollowees: false,
            showEditUser: false
        }
    }

    handleModal = e => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    render() {
        const { loggedInAs, user, photos, followees, followers, followStatus, handleFollow, handleUnfollow } = this.props
        const { showFollowers, showFollowees, showEditUser } = this.state
        console.log(this.props)

        return (
            <div className="infoContainer">

                <div className="userImageContainer">
                    <div>
                        <button name='showEditUser' onClick={this.handleModal}>
                            <img className="userIMG" src={user.profile_url} alt={user.username} onClick={this.handleModal} name='showEditUser'/>
                        </button>
                        <ReactModal isOpen={showEditUser} contentLabel='Edit'>
                            <EditUser user={user} handleModal={this.handleModal} />
                        </ReactModal>
                    </div>
                </div>

                {/* <div className="userImageContainer">
                    <Link to={`edit`}>
                        <img className="userIMG" src={user.profile_url} alt={user.username} />
                    </Link>
                </div> */}

                <div className="allUserInfo">
                    <div className="usernameDiv">
                        <h1 id="usernameH1">{user.username}</h1>
                        <div className='following-button'>
                            {loggedInAs ?
                                followStatus ?
                                    <button onClick={handleUnfollow}>Unfollow</button>
                                    :
                                    <button onClick={handleFollow}>Follow</button>
                                :
                                <Link to='/users'><button>Login</button></Link>
                            }
                        </div>
                    </div>

                    <div className="containerForNumberStats">
                        <div className="stat">{photos.length} Posts</div>

                        <div>
                            <button name='showFollowers' onClick={this.handleModal}>Followers</button>
                            <ReactModal isOpen={showFollowers} contentLabel='Followers'>
                                <Followers followers={followers} handleModal={this.handleModal} />
                            </ReactModal>
                        </div>

                        <div>
                            <button name='showFollowees' onClick={this.handleModal}>Following</button>
                            <ReactModal isOpen={showFollowees} contentLabel='Followees'>
                                <Followees followees={followees} handleModal={this.handleModal} />
                            </ReactModal>
                        </div>

                        {/* <div className="statFollow">
                            <Link to={`/users/u/${user.user_id}/followers`}>{followers.length} Followers</Link>
                        </div>
                        <div className="statFollow">
                            <Link to={`/users/u/${user.user_id}/following`}>{followees.length} Following</Link>
                        </div> */}
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