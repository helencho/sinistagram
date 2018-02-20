import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../stylesheets/app.css';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newEmail: '',
            newFullName: '',
            newProfilePic: '',
            newDescription: '',
            editing: false
        }
    }

    // switchMode = () => {
    //     const lastMode = this.state.editing 
    //     this.setState({
    //         editing: !lastMode
    //     })
    // };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCancel = () => {
        console.log('hitting cancel')
        // return <Redirect to='/profile' />
    }

    handleSubmit = e => {
        e.preventDefault()
        const { newName, newEmail, newFullName, newProfilePic, newDescription } = this.state

        this.setState({
            editing: !this.state.editing
        })

        axios
            .patch(`/users/u/:id/edit`, {
                newName: newName,
                newEmail: newEmail,
                newFullName: newFullName,
                newProfilePic: newProfilePic,
                newDescription: newDescription
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    editing: !this.state.editing 
                })
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        const { newName, newEmail, newFullName, newProfilePic, newDescription, editing } = this.state
        console.log(this.state)

        return (
            <div className='edit-user-container'>
                <form className='edit-user-form' onSubmit={this.handleSubmit}>
                    <input
                        name='newName'
                        type='text'
                        placeholder='Username'
                        value={newName}
                        onChange={this.handleInput} />
                    <input
                        name='newFullName'
                        type='text'
                        placeholder='Full name'
                        value={newFullName}
                        onChange={this.handleInput} />
                    <input
                        name='newEmail'
                        type='text'
                        placeholder='Email'
                        value={newEmail}
                        onChange={this.handleInput} />
                    <input
                        name='newProfilePic'
                        type='text'
                        placeholder='Profile pic url'
                        value={newProfilePic}
                        onChange={this.handleInput} />
                    <textarea
                        name='newDescription'
                        placeholder='Description about you'
                        value={newDescription}
                        onChange={this.handleInput} />
                    <input
                        type='button'
                        value='Cancel'
                        onClick={this.handleCancel} />
                    <input
                        type='submit'
                        value='Save' />
                </form>

                {/* {editing && (
                    <Redirect to={'profile/'} />
                )} */}

            </div>
            // <div id="form-main">
            //     <div id="form-div">
            //         <form className="form" id="form1" onSubmit={this.submitForm}>

            //             <p className="name">
            //                 <input name="username" type="text" className="validate[required,custom[onlyLetter],length[0,100]] feedback-input editInput" placeholder="Full Name" id="username" />
            //             </p>

            //             <p className="fullname">
            //                 <input name="fullname" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="Username" />
            //             </p>
            //             <p className="profilepicUrl">
            //                 <input name="profilepicUrl" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="Email" />
            //             </p>
            //             <p className="email">
            //                 <input name="email" type="text" className="validate[required,custom[email]] feedback-input editInput" id="email" placeholder="New Profile Pic" />
            //             </p>

            //             <p className="text">
            //                 <textarea name="userdescription" className="validate[required,length[6,300]] feedback-input editInput" id="comment" placeholder="User Description"></textarea>
            //             </p>


            //             <div className="submit-BTN">
            //                 <input type="submit" id="button-blue" value="Submit" />
            //                 <div className="ease"></div>
            //             </div>
            //         </form>
            //         {editing && (
            //             <Redirect to={'profile/'} />
            //         )}
            //     </div>
            // </div>
        )
    }
};
export default EditUser