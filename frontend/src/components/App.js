import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../stylesheets/app.css'
import LoginUser from '../components/LoginUser'
import LogOut from '../components/LogOut'
import User from '../components/User'
import Home from '../components/Home'
import NewUserMain from '../components/NewUserMain'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  setUser = user => {
    this.setState({ user: user })
  }

  logOutUser = () => {
    this.setState({ user: null })
  }

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />
  }

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />
  }

  renderNew = () => {
    return <NewUserMain />
  }

  // Home is the feed screen
  renderHome = () => {
    const { user } = this.state
    if (user) {
      return <Home user={user} />
    } else {
      return this.renderLogin()
    }
  }

  render() {
    const { user } = this.state
    // console.log(this.state)

    return (
      <div>
        <div className='App'>
          <div className='topbar instaCloneFont'>
            <div className='topbar-left'>
              <Link to='/users/home'><i className='fab fa-instagram fa-2x' /></Link>
              <span className='topbar-sitename'><Link to='/users/home'>Sinistagram</Link></span>
            </div> {/* End topbar-left */}

            <div className='topbar-middle'>
              <form>
                <input className='searchBar' placeholder='Search' />
              </form>
            </div> {/* End topbar-middle */}

            <div className='topbar-right'>

              {user ?
                <span>
                  <Link to={`/users/u/${user.user_id}/explore`}>
                    <i className='fas fa-globe fa-2x' />
                  </Link>
                  <Link to={`/users/u/${user.user_id}/upload`}>
                    <i className='far fa-images fa-2x' />
                  </Link>
                  <Link to={`/users/u/${user.user_id}/profile`}>
                    <i className='far fa-user fa-2x' />
                  </Link>
                </span>
                :
                <span>
                  <Link to={`/users`}>
                    <i className='fas fa-globe fa-2x' />
                  </Link>
                  <Link to={`/users`}>
                    <i className='far fa-images fa-2x' />
                  </Link>
                  <Link to={`/users`}>
                    <i className='far fa-user fa-2x' />
                  </Link>
                </span>
              }
            </div> {/* End topbar-right */}

          </div> {/* End topbar */}
        </div> {/* End App */}

        <div>
          <Route exact path='/' render={this.renderLogin} />
          <Route exact path='/users' render={this.renderLogin} />
          <Route path='/users/login' render={this.renderLogin} />
          <Route path='/users/new' render={this.renderNew} />
          <Route path='/users/logout' render={this.renderLogout} />
          <Route path='/users/home' render={this.renderHome} />
          <Route path="/users/u/:id" render={(props) => <User loggedInAs={user} {...props} />} />
          {/* Passing params in render: https://stackoverflow.com/questions/45898789/react-router-pass-param-to-component */}
          {/* <Route path='/users/u/:id' component={User} /> */}
        </div>
      </div>
    );
  }
}

export default App;
