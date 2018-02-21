import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../stylesheets/login.css'

class NewUserMain extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      fullname: '',
      username: '',
      password: '',
      profilepic: 'https://i.imgur.com/7L40Htk.jpg',
      userAvailable: '',
      message: 'By signing up, you agree to give us your firstborn.',
      validEmail: false
    }
  }

  componentDidMount() {
    this.getAllUsers() 
  }

  getAllUsers = () => {
    axios
      .get('/users')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Track username and password input inside state
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // When user submits form
  handleFormSubmit = e => {
    e.preventDefault()
    const { email, username, password, fullname, profilepic } = this.state

    // if (email) {
    //   axios
    //     .get('/users')
    //     .then(res => {
    //       console.log(res.data)
    //       if (!res.data.data.find(n => n.email_add === email)) {
    //         this.setState({
    //           validEmail: true
    //         })
    //       } else {
    //         this.setState({
    //           validEmail: false,
    //           message: 'Email already in use'
    //         })
    //       }
    //     })
    //     .catch(err => console.log(err))
    // }
    if (email && fullname && username && password) {
      if (username.length < 3) {
        this.setState({
          message: 'Username length must be at least 3'
        })
      }
      if (password.length < 6) {
        this.setState({
          message: 'Password must be at least 6 characters'
        })
      } else {
        axios
          .get('/users')
          .then(res => {
            console.log(res.data)
            if (!res.data.data.find(n => n.username === username)) {
              axios
                .post('/users/new', {
                  username: username,
                  password: password,
                  email: email,
                  fullname: fullname,
                  profilepic: profilepic
                })
                .then(res => {
                  console.log(res)
                  this.setState({
                    email: '',
                    fullname: '',
                    username: '',
                    password: '',
                    message: 'Registered successfully'
                  })
                })
                .catch(err => {
                  console.log(err)
                  this.setState({
                    email: '',
                    fullname: '',
                    username: '',
                    password: '',
                    message: 'Error registering'
                  })
                })
            } else {
              this.setState({
                message: 'Username already exists'
              })
            }
          })
          .catch(err => console.log(err))
      }
    } else {
      this.setState({
        message: 'Please fill all forms'
      })
    }
  }

  render() {
    const { email, username, password, message, fullname } = this.state
    console.log(this.state)

    return (
      <div className='register-user-container'>
        <div className='register-box'>
          <h1 className='sitefont'>Parallelogram</h1>

          <form onSubmit={this.handleFormSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={this.handleInput}
              value={email}
              required />
            <input
              type='text'
              placeholder='Full Name'
              name='fullname'
              onChange={this.handleInput}
              value={fullname}
              required />
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={this.handleInput}
              value={username}
              required />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={this.handleInput}
              value={password}
              required />
            <input
              type='submit'
              value='Sign up' />
          </form>
          <p className='register-message'>{message}</p>
        </div> {/* End register-box */}

        <div className='smaller-box'>
          <p>Have an account? <Link to='/users/login'>Login</Link></p>
        </div> {/* End smaller-box */}
      </div>
    );
  }
}

export default NewUserMain
