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
            <div className='info-container'>

                <div className='info-user-img-container'>
                    <div>
                        <button name='showEditUser' onClick={this.handleModal}>
                            <img className='info-user-img' src={user.profile_url} alt={user.username} onClick={this.handleModal} name='showEditUser' />
                        </button>
                        <ReactModal isOpen={showEditUser} contentLabel='Edit'>
                            <EditUser user={user} handleModal={this.handleModal} />
                        </ReactModal>
                    </div>
                </div>

                <div className='info-follow-status'>
                    <div className='follow-status-container'>
                        <h1>{user.username}</h1>
                        <div className='following-button-container'>
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

                    <div className='stats-container'>
                        <button>{photos.length} Posts</button>

                        <button name='showFollowers' onClick={this.handleModal}>
                            {followers.length} Followers
                        </button>
                        <ReactModal isOpen={showFollowers} contentLabel='Followers' className='modal'>
                            <Followers followers={followers} handleModal={this.handleModal} />
                        </ReactModal>

                        <button name='showFollowees' onClick={this.handleModal}>
                            {followees.length} Following
                        </button>
                        <ReactModal isOpen={showFollowees} contentLabel='Followees' className='modal'>
                            <Followees followees={followees} handleModal={this.handleModal} />
                        </ReactModal>
                    </div>

                    <div className='bio-container'>
                        <h3>{user.fullname}</h3>
                        <span className='bio'>{user.user_description}</span>
                    </div>
                </div>

            </div>

        )
    }
}

export default UserInfo