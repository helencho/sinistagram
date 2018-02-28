import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import "../stylesheets/followers.css";

class Followees extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { followees, handleModal } = this.props
    console.log(followees)

    return (
      <div className='follow-container'>
        <div className='follow-container-nav'>
          <h1>Following</h1>
          <button name='showFollowees' onClick={handleModal}>X</button>
        </div>

        <div className='follow-list-container'>

          {followees.map(user => (
            <div className='follow-list-single-user' id={user.followee_id}>
              <div className='follow-list-single-img'>
                <img src={user.profile_url} alt={user.username} />
              </div>
              <div className='follow-list-single-info'>
                <Link to={`/users/u/${user.followee_id}/profile`}><p>{user.username}</p></Link>
                <p className='follow-list-single-info-name'>{user.fullname}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}
export default Followees
