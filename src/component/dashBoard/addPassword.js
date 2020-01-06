import React, { Component } from 'react'
import Login from '../auth/login'

class AddPassword extends Component {
    constructor(){
        super()
        this.state = {
            appName : "",
            validationErr : "",
            authKey : "",
            tokenErr : false,
            newPassword : {},
            success : ""
        }
    }

    // check for auth key 
    componentDidMount = () => {
        const key = localStorage.getItem('auth-key')
        if (key){
            this.setState({
                authKey : key
            })
        }else{
            this.setState({
                tokenErr : true
            })
            alert("you are not authorized, pls login...")
        }
    }

    handelChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    addNewPassword = (event) => {
        event.preventDefault()
        const valid = this.isValid()
        if (valid){
            this.setState({
                success : "loading..."
            })
            this.fetchNewPassword()
        }
    }

    fetchNewPassword = () => {
        const appName = this.state.appName
        const key = this.state.authKey
        const sendObj = {"appName" : appName}
        fetch('https://passman-v3.herokuapp.com/api/dash/add',{
            method : "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-key' : key
            },
            body : JSON.stringify(sendObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data._id){
                this.setState({
                    newPassword : data,
                    success : "password generated sucessfully!.."
                })
                this.props.newPassword(data)
                this.resetState()
            }else{
                this.setState({
                    validationErr : data.msg
                })
            }
        })
    }

    isValid = () => {
        if (this.state.appName === ""){
            this.setState({
                validationErr : "*app name can't be empty"
            })
            return false
        }else if (this.state.appName.length < 3){
            this.setState({
                validationErr : "*app name sould be atleast 5 char min"
            })
            return false
        }else{
            return true 
        }
    }

    resetState = () => {
        this.setState({
            appName : "",
            validationErr : "",
            success : ""
        })
    }

    render() {
        const err = this.state.validationErr
        const success = this.state.success
        if (this.state.tokenErr){
            return (
                <div> 
                    <Login />
                </div>
            )
        }
        return (
            <div className="add-container">
                <form className="add-form">
                    <label htmlFor="appname" className="add-form-label">
                        add new password
                    </label>
                    <p className="add-line"><small className="add-err">
                        {err}
                    </small><small className="add-ok">
                        {success}
                    </small></p>
                    <input type="text" className="add-form-input" id="appname" 
                    aria-describedby="emailHelp" placeholder="enter a app name" 
                    name="appName" value={this.state.appName} onChange={this.handelChange}/>
                    <br />
                    <button type="submit" className="add-btn"
                    onClick={this.addNewPassword}>
                        generate new password
                    </button>
                </form>
            </div>
        )
    }
}

export default AddPassword












