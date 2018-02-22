import React, { Component } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import "../stylesheets/following.css";

class Followees extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   allFollowing: this.props.followees
    // };
  }

  onClick = user => {
    return <Profile user={user} />;
  };

  render() {
    const { followees } = this.props

    return (
      <div className="following-container">
        <div className="following-title">Following</div>
        <div className="following-list-box">
          {followees.map(user => (
            <div className="users" id={user.followee_id}>
              <div className="onClick" onClick={this.onClick(user)}>
                <Link to={`/users/u/${user.followee_id}/profile`}>
                  <div className="following-image">
                    <img
                      className="following-profile-pic"
                      src={user.profile_url}
                    />
                  </div>
                </Link>
                <div className="username-fullname">
                  <Link to={`/users/u/${user.followee_id}/profile`}>
                    <h2 className="following-username">{user.username} </h2>
                  </Link>

                  <p>
                    <h2 className="following-fullname"> {user.fullname} </h2>{" "}
                  </p>
                </div>
                <button classsName="button-following">Following</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Followees
