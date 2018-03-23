import React from 'react'
import '../stylesheets/app.css'
import UserGallery from './UserGallery'
import UserInfo from './UserInfo'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        console.log('profile receiving props')
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <UserInfo
                    loggedInAs={this.props.loggedInAs}
                    user={this.props.user}
                    photos={this.props.photos}
                    followees={this.props.followees}
                    followers={this.props.followers}
                    followStatus={this.props.followStatus}
                    handleFollow={this.props.handleFollow} 
                    handleUnfollow={this.props.handleUnfollow} />
                <UserGallery photos={this.props.photos} />
            </div>
        )
    }
}

export default Profile 