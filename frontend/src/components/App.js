import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "../stylesheets/app.css";
import LoginUser from "../components/LoginUser";
import LogOut from "../components/LogOut";
import User from "../components/User";
import Home from "../components/Home";
import NewUserMain from "../components/NewUserMain";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      newUser: true
    };
  }

  setUser = user => {
    this.setState({ user: user });
  };

  logOutUser = () => {
    this.setState({ user: null });
  };

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} />;
  };

  renderLogOut = () => {
    return <LogOut logOutUser={this.logOutUser} />;
  };

  renderNew = () => {
    return <NewUserMain />;
  };

  // Home is the feed screen
  renderHome = () => {
    const { user } = this.state;
    if (user) {
      return <Home user={user} />;
    } else {
      return <h1>Must be logged in</h1>;
    }
  };

  render() {
    const { user, newUser } = this.state;
    console.log(user);
    if (user) {
      console.log(user.fullname);
    }

    return (
      <div>
        <div className="App">
          <div className="topbar instaCloneFont">
            <div className="topbar-left">
              <Link to="/users/home"><i className="fab fa-instagram fa-2x" /></Link>
              <span className="topbar-sitename"><Link to="/users/home">Parallelogram</Link></span>
            </div> {/* End topbar-left */}

            <div className="topbar-middle">
              <form>
                <input className="searchBar" placeholder="Search" />
              </form>
            </div> {/* End topbar-middle */}

            <div className="topbar-right">
              <i className="far fa-compass fa-2x" />
              <i className="far fa-heart fa-2x" />
              {user ?
                <Link to={`/users/u/${user.user_id}/profile`}>
                  <i className="far fa-user fa-2x" />
                </Link>
                :
                <Link to={`/users`}>
                  <i className="far fa-user fa-2x" />
                </Link>
              }
            </div> {/* End topbar-right */}

          </div> {/* End topbar */}
        </div> {/* End App */}

        <div>
          <Route exact path="/" render={this.renderLogin} />
          <Route exact path="/users" render={this.renderLogin} />
          <Route path="/users/login" render={this.renderLogin} />
          <Route path="/users/new" render={this.renderNew} />
          <Route path="/users/logout" render={this.renderLogout} />
          <Route path="/users/home" render={this.renderHome} />
          <Route path="/users/u/:id" component={User} />
        </div>
      </div>
    );
  }
}

export default App;
