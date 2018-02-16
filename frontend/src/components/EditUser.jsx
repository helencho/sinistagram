import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../App.css';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            profilepicUrl: '',
            userdescription: '',
            email: '',
            editing: false
        }
    }

    switchMode = () => {
        const lastMode = this.state.editing;
        return this.setState({
            editing: !lastMode
        })
        console.log("Currently changing info/ editing?:", this.state.editing)
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = e => {
        e.preventDefault()
        const {username, fullname, profilepicUrl, userdescription, email} = this.state

        this.setState({
            editing: !this.state.editing
        })

        console.log("the state when the submitForm:", this.state)
        console.log("id", this.props.user.user_id)

        fetch(`/users/u/${this.props.user.user_id}/edit`, {
            headers: {
                "ACCEPT": "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                newName: username,
                newEmail: email,
                newFullname: fullname,
                newProfile_pic: profilepicUrl,
                newDescription: userdescription,
                id: this.props.user.user_id
            })
        })
    };

    render() {
        console.log("state:", this.state)
        console.log("props:", this.props)
        const {
            username,
            fullname,
            profilepicUrl,
            userdescription,
            email,
            editing
        } = this.state;
            return (
                <div id="form-main">
  <div id="form-div">
    <form className="form" id="form1" onSubmit={this.submitForm}>
      
      <p className="name">
        <input name="username" type="text" className="validate[required,custom[onlyLetter],length[0,100]] feedback-input editInput" placeholder="Full Name" id="username" />
      </p>
      
      <p className="fullname">
        <input name="fullname" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="Username" />
      </p>
      <p className="profilepicUrl">
        <input name="profilepicUrl" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="Email" />
      </p>
      <p className="email">
        <input name="email" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="New Profile Pic" />
      </p>
      
      <p className="text">
        <textarea name="userdescription" className="validate[required,length[6,300]] feedback-input editInput" id="comment" placeholder="User Description"></textarea>
      </p>
      
      
      <div className="submit-BTN">
        <input type="submit" id="button-blue" value="Submit"/>
        <div className="ease"></div>
      </div>
    </form>
    {editing && (
          <Redirect to={'profile/'}/>
        )}
  </div>
  </div>
            )
    }
};
export default EditUser