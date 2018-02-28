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
        const { user, handleModal } = this.props
        console.log(this.state)

        return (
            <div className='edit-user-container'>
            <button name='showEditUser' onClick={handleModal}>X</button>
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
                        name='showEditUser'
                        onClick={handleModal} />
                    <input
                        type='submit'
                        value='Save' />
                </form>

            </div>
        )
    }
};
export default EditUser