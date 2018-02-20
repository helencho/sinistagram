import React from 'react'
import { Route, Link, Switch, Redirect } from "react-router-dom"
import '../stylesheets/profile.css';
import axios from 'axios'
import Followers from './Followers'
import Followees from './Followees'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            userID: this.props.user.user_id,
            userName: this.props.user.username,
            numOfPosts: '',
            numOfFollowers: '',
            numOfFollowing: '',
            userImageURL: this.props.user.profile_pic,
            fullName: this.props.user.fullname,
            userDescription: this.props.user.user_description
        }
    }

    getUserFollowing = () => {
        const { userID, numOfFollowing } = this.state
        const id = userID
        console.log('we is ABOUT to call axios')
        axios
            .get(`/users/u/${id}/following`)
            .then(res => {
                let Following = res.data.data
                let NumberOfFollowing = Following.length
                console.log(Following)
                console.log('THE USER IS FOLLOWING NUMBER', NumberOfFollowing)
                this.setState({
                    numOfFollowing: NumberOfFollowing
                })

            })
    }

    getUserFollowers = () => {
        const { userID, numOfFollowers } = this.state
        const id = userID
        console.log('we is ABOUT to call axios FOLLOWERS')
        axios
            .get(`/users/u/${id}/followers`)
            .then(res => {
                let Followers = res.data.data

                let NumberOfFollowers = Followers.length
                console.log('THE USER HAS FOLLOWER NUMBER', NumberOfFollowers)
                this.setState({
                    numOfFollowers: NumberOfFollowers
                })

            })
    }

    getNumberOfPosts = () => {
        const { userID, numOfPosts } = this.state
        const id = userID
        console.log('we is ABOUT to call axios FOLLOWERS')
        axios
            .get(`/users/u/${id}/photos`)
            .then(res => {
                let photos = res.data.data
                let numberOfPhotos = photos.length
                console.log('THE USER HAS this many posts ', numberOfPhotos)
                this.setState({
                    numOfPosts: numberOfPhotos
                })

            })


    }


    componentDidMount() {
        console.log('component is mounted')
        this.getUserFollowing()
        this.getUserFollowers()
        this.getNumberOfPosts()
    }



    // clickFollowers = ()=>{
    //     return(
    //         <Followers followers={this.state.followers}/>
    //     )
    // }

    // clickFollowing = () =>{
    //     console.log('hiiiiii FOLLOWING')
    //     return (
    //         <Following following ={this.state.following} />

    //     )
    // }
    render() {
        const { user, userID, userName, numOfFollowers, numOfPosts, numOfFollowing, userImageURL, fullName, userDescription } = this.state
        console.log('USERID IS ', userID)
        console.log(this.state)
        console.log('HELLUUUURRRR')
        return (
            <div>
                <div className="infoContainer">

                    <div className="userImageContainer">
                        {/* <div className="containerForBtn"> */}
                        <Link to={`edit`}>
                            <img className="userIMG" src={userImageURL} alt={`Image of ${userName}`} />
                        </Link>
                        {/* </div> */}
                    </div>

                    <div className="allUserInfo">
                        {/* <div className="userStats"> */}
                        {/* <div className='overAllUserInfo' width='613.33px'> */}

                        <div className="usernameDiv">
                            <h1 id="usernameH1">{userName}</h1>
                            <div className='following-button'>
                                <button>Following</button>
                            </div>
                        </div>

                        <div className="containerForNumberStats">
                            <div className="stat"><strong>{numOfPosts} </strong> {"Posts"} </div>
                            <div className="statFollow" > <Link to={`/users/u/${userID}/followers`}><strong>{numOfFollowers} </strong> {"Followers"} </Link> </div>
                            <div className="statFollow" > <Link to={`/users/u/${userID}/following`}><strong>{numOfFollowing} </strong> {"Following"} </Link></div>
                        </div>

                        <div className="nameAndBio">
                            <h3>{fullName}</h3>
                            <span className='bio'>{userDescription}</span>
                        </div>

                        {/* </div> */}
                        {/* </div> */}
                    </div>

                </div>
            </div>


        )
    }
}

export default UserInfo