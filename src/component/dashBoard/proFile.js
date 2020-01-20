import React, { Component } from 'react'
import Login from '../auth/login'
import Dash from './dash'

// custom css 
import '../../style/profile-style.css'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            profile : {},
            authKey : "",
            tokenErr : false,
            back : false,
            err : ""
        }
    }

    componentDidMount = () => {
        this.checkForKey()
    }

    checkForKey = () => {
        const key = localStorage.getItem('auth-key')
        if (key){
            this.setState({
                authKey : key
            })
            this.fetchProfile(key)
        }else{
            this.setState({
                tokenErr : true
            })
            alert("you are not authorized, pls login...")
        }
    }

    fetchProfile = (key) => {
        console.log(key)
        fetch('https://passman-v3.herokuapp.com/api/dash/user-profile',{
            method : "GET",
            headers : { "auth-key" : key }
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                this.setState({
                    profile : data
                })
            }else{
                this.setState({
                    err : "somthing went wrong!..."
                })
            }
        })
        .catch(err => {
            if (err){
                console.log("")
            }
        })
    }

    gotoDash = () => {
        this.setState({
            back : true
        }) 
    }


    renderProfile = (user) => {
        const password = user.allPasswordGenrated
        if (user.userInfo){
            return(
                <div className="container">
                    <div className="pro-val">
                        <h3>
                            <small className="pro-label">user name :</small>
                            <b className="pro-v">{user.userInfo.name}</b>
                        </h3>
                    </div>
                    <div className="pro-val">
                        <h3>
                            <small className="pro-label">email :</small>
                            <b className="pro-v">{user.userInfo.email}</b>
                        </h3>
                    </div>
                    <div className="pro-val"> 
                        <h3>
                            <small className="pro-label">account created at :</small>
                            <b className="pro-v">{user.userInfo.dateCreated}</b>
                        </h3>
                    </div>
                    <div className="pro-val">
                        <h3>
                            <small className="pro-label">total password created so for :</small>
                            <b className="pro-v">{user.numOfPasswordGenrated}</b>
                        </h3>
                    </div>
                    <hr className="pro-line"/>
                    <div className="pro-password-main">
                        {password.map(pass => {
                            return (
                                <div key={pass._id} className="container" id="pro-box">
                                    <div className="pro-pass-e">
                                        <p className="pro-pass-l">app name:
                                            <b className="pro-pass-v">{pass.appName}</b>
                                        </p>
                                    </div>
                                    <div className="pro-pass-e">
                                        <p className="pro-pass-l">password:
                                            <b className="pro-pass-p">{pass.genPass}</b>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }

    render() {
        const profile = this.renderProfile(this.state.profile)
        const err = this.state.err
        if(this.state.tokenErr){
            return(
                <div>
                    <Login />
                </div>
            )
        }
        if (this.state.back){
            return(
                <div>
                    <Dash />
                </div>
            )
        }
        return (
            <div className="container mt-3">
                <p className="pro-err"> {err} </p>
                <div>
                    <button id="pro-back" 
                    onClick={this.gotoDash}>back</button>
                    {profile}
                </div>
            </div>
        )
    }
}

export default Profile












