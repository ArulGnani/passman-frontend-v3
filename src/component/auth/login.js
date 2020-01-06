import React, { Component } from 'react'
import SignIn from './signIn'
import Dash from '../dashBoard/dash'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            password : "",
            login : false,
            signIn : false,
            validationErr : "",
            loginToken : ""
        }
    }

    // set the state 
    handelChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    // login 
    login = (event) => {
        event.preventDefault()
        const check = this.checkAllFields()
        if (check !== true){
            this.setState({ validationErr : check })
        }else{
            this.loginUser()
        }
    }


    // login's the user 
    loginUser = () => {
        const newUser = { "email" : this.state.email,
                          "password" : this.state.password }
        fetch("https://passman-v3.herokuapp.com/api/auth/login",{
            method : "POST",
            headers : {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if (data.authKey){
                this.loginSucc()
                this.storeAuthKey(data)
                this.setAllFieldsEmpty()
                this.switchDashBoard()
            }else{
                this.loginErr(data)               
            }
        })
    }

    // set validation to success 
    loginSucc = () => {
        this.setState({
            validationErr : `you are logged in as ${this.state.email}`                     
        })
    }

    // set validation to err 
    loginErr = (data) => {
        const msg = data.msg
        this.setState({
            validationErr : msg             
        })
    }


    // store auth key 
    storeAuthKey = (authToken) => {
        const authKey = authToken.authKey
        const key = localStorage.getItem('auth-key')
        if (key){
            localStorage.removeItem('auth-key')
            localStorage.setItem('auth-key',authKey)
        }else{
            localStorage.setItem('auth-key',authKey)
        }
    }

    // client side login validation 
    checkAllFields = () => {
        if (this.state.email === "" || this.state.password === "" ){
            return "all fields are required!..."
        }else if(this.state.email.length < 5){
            return "check your email min 5 char"
        }else if(this.state.password.length < 5){
            return "check your password min 5 char"
        }else {
            return true
        }
    }

    // reset all fields 
    setAllFieldsEmpty = () => {
        this.setState({
            email : "",
            password : "",
            validationErr : ""
        })
    }

    // switch to dash 
    switchDashBoard = () => {
        this.setState({
            login : true 
        })
    }

    // switch to sign up
    switchToLogin = () => {
        this.setState({
            signIn : true 
        })
    }

    render() {
        const validationErr = this.state.validationErr
        if (this.state.login === true){
            return (
                <div>
                    <Dash />
                </div>
            )
        }
        
        if (this.state.signIn === true){
            return (
                <div>
                    <SignIn />                    
                </div>
            )
        }

        if (this.state.login === false){
            return (
                <div className="login-container">
                        <div className="login-main">
                        <h2 className="login-header">login</h2>
                        <p className="login-err"><b>{validationErr}</b></p>
                        <form className="login-form">
                            <div className="login-email">
                                <input name="email" type="email" className="login-form-input" 
                                placeholder="email id" value={this.state.email} onChange={this.handelChange}/>
                            </div>
                            <div className="login-password">
                                <input name="password" type="password" className="login-form-input" 
                                placeholder="password" value={this.state.password} onChange={this.handelChange}/>
                            </div>
                            <button type="submit" className="login-btn" 
                            onClick={this.login}>
                                Login
                            </button>
                        </form>
                        </div>       
                        <p className="login-to-sigin">want a new account 
                            <b className="login-to-sigin-text" onClick={this.switchToLogin}>
                                Sign Up
                            </b>
                        </p>     
                    </div>
            )
        }
    }
}

export default Login












