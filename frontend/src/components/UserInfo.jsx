import React from 'react'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import Followers from './Followers'
// import { Redirect } from 'react-router'
import '../stylesheets/profile.css'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFollowers: false,
            showFollowees: false
        }
    }

    handleModal = e => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    // renderModal = () => {
    //     return (
    //         <div>
    //             <button onClick={this.handleOpenModal}>Open</button>
    //             <ReactModal isOpen={this.state.showModal}
    //                 contentLabel='Example'>
    //                 <button onClick={this.handleCloseModal}>Close</button>
    //             </ReactModal>
    //         </div>
    //     )
    // }

    render() {
        const { loggedInAs, user, photos, followees, followers, followStatus, handleFollow, handleUnfollow } = this.props
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
                            <button className="statFollow" name='showFollowers' onClick={this.handleModal}>Followers</button>
                            <ReactModal isOpen={this.state.showFollowers} contentLabel='Followers'>
                                <button name='showFollowers' onClick={this.handleModal}>Close</button>
                                <Followers followers={followers} />
                            </ReactModal>
                        </div>


                        {/* <div className="statFollow">
                            <Link to={`/users/u/${user.user_id}/followers`}>{followers.length} Followers</Link>
                        </div> */}
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