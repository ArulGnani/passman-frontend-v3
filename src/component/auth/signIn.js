import React, { Component } from 'react'
import Login from './login'

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "",
            email : "",
            password1 : "",
            password2 : "",
            signIn : true,
            validationErr : ""
        }
    }

    // sets the state 
    handelChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    // signin
    signIn = (event) => {
        event.preventDefault()
        const check = this.checkAllFields()
        if (check !== true){
            this.setState({ validationErr : check })
        }else{
            this.creteNewUser()
        }
    }

    // create's new user 
    creteNewUser = () => {
        const newUser = {
                            "name" : this.state.name,
                            "email" : this.state.email,
                            "password" : this.state.password2 
                        }
        fetch("https://passman-v3.herokuapp.com/api/auth/register",{
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
            if (data.id || data.name){
                this.setState({
                    validationErr : `account created successfully!.. as ${data.name}`
                })
                alert("account created successfully to access yout account LOGIN!..")
                this.switchToLogin()
            }else{
                this.setState({
                    validationErr : data.msg
                })
            }
            this.setAllFieldsEmpty()
        })
        .catch(err => {
            if (err){
                console.log("")
            }
        })
    }

    // client side validation 
    checkAllFields = () => {
        if (this.state.name === "" || this.state.email === "" ||
        this.state.password1 === "" || this.state.password2 === ""){
            return "all fields are required!..."
        }else if(this.state.name.length < 5){
            return "name should have min of 5 char"
        }else if(this.state.email.length < 5){
            return "email should have min of 6 char"
        }else if(this.state.password1.length < 5 || this.state.password2.length < 5){
            return "password should be min 5 char"
        }else if(this.state.password1.length != this.state.password2.length ||
                this.state.password1 != this.state.password2){
            return "password did not match."
        }else {
            return true
        }
    }

    // reset all input fields 
    setAllFieldsEmpty = () => {
        this.setState({
            name : "",
            email : "",
            password1 : "",
            password2 : "",
            validationErr : ""
        })
    }

    // change to login 
    switchToLogin = () => {
        this.setState({
            signIn : false
        })
    }

    render() {
        const validationErr = this.state.validationErr
        if (this.state.signIn){
            return (
                <div className="signin-container">
                    <div className="signin-main">
                    <h2 className="signin-header">sign in</h2>
                    {/* <hr className="signin-line"/> */}
                    <p className="sigin-err"><b>
                        {validationErr}
                    </b></p>
                    <form className="signin-form">
                        <div className="signin-form-name">
                            <input name="name" type="text" className="signin-form-input"  placeholder="choice ur name" 
                            value={this.state.name} onChange={this.handelChange}/>
                        </div>
                        <div className="signin-form-email">
                            <input name="email" type="email" className="signin-form-input" placeholder="email id" 
                            value={this.state.email} onChange={this.handelChange}/>
                        </div>
                        <div className="signin-form-pass1">
                            <input name="password1" type="password" className="signin-form-input" placeholder="password" 
                            value={this.state.password1} onChange={this.handelChange}/>
                        </div>
                        <div className="signin-form-pass2">
                            <input name="password2" type="password" className="signin-form-input" placeholder="conform password" 
                            value={this.state.password2} onChange={this.handelChange}/>
                        </div>
                        <button type="submit" className="signin-btn" onClick={this.signIn}>
                            Sign up
                        </button>
                    </form>
                    </div>       
                    <p className="signin-to-login-text">already have an account 
                        <b className="signin-to-login" onClick={this.switchToLogin}>
                            login
                        </b>
                    </p>     
                </div>
            )
        }else {
            return (
                <div>
                    <Login />
                </div>
            )
        }
    }
}

export default SignIn












