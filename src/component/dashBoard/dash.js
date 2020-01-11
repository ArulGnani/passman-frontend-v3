import React, { Component } from 'react'
import AddPassword from './addPassword'
import ViewAllPasswords from './viewPasswords'
import Profile from './proFile'
import Login from '../auth/login'
import About from './about'

// style 
import '../../style/dash-style.css'

class Dash extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPassword : {},
            allPasswords : [],
            authKey : "",
            tokenErr : false,
            profile : false,
            logout : false,
            login : false,
            about : false,
            searchVal : ""
        }
    }

    // check for auth key 
    componentDidMount = () => {
        this.checkKey()
    }

    checkKey = () => {
        const key = localStorage.getItem('auth-key')
        if (key){
            this.setState({
                authKey : key
            })            
        this.fetchAllPassword(key)
        }else{
            this.setState({
                tokenErr : true
            })
            alert("you are not authorized, pls login...")
        }
    }

    fetchAllPassword = (key) => {
        const authKey = key
        fetch('https://passman-v3.herokuapp.com/api/dash/get-all-passwords',{
            method : "GET",
            headers : { "auth-key" : authKey }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                allPasswords : [...data]
            })
        })
        .catch(err => {
            if (err){
                console.log("")
            }
        })
    }

    addNewPass = (newPass) =>{
        this.setState((old) => ({
            allPasswords : [...old.allPasswords, newPass]
        }))
    }

    deletePassword = (delId) => {
        if (delId){
            this.fetchDeleted(delId)
        }
    }

    fetchDeleted = (delId) => {
        const del = delId
        const delObj = {"delId" : del}
        fetch('https://passman-v3.herokuapp.com/api/dash/delete-password',{
            method : "DELETE",
            headers : { 
                'Content-Type' : 'application/json',
                'auth-key' : this.state.authKey
            },
            body : JSON.stringify(delObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data){
                this.updateStateAfterDelete(del)
            }
        })
        .catch(err => {
            if (err){
                console.log("")
            }
        })
    }

    updateStateAfterDelete = (del) => {
        const key = del
        this.setState({
            allPasswords : this.state.allPasswords.filter(password => password._id !== key)
        })
    }

    gotoProfile = () => {
        this.setState({
            profile : true
        })
    }

    logout = () => {
        this.delKeyInState()
        alert("your are logged out!..")
    }

    delKeyInState = () => {
        this.setState({
            authKey : ""
        })
        this.destroyLocalKey()
    }

    destroyLocalKey = () => {
        const key = localStorage.getItem('auth-key')
        localStorage.removeItem('auth-key')
        this.gotoLogin()
    }

    gotoLogin = () =>{
        this.setState({
            login : true
        })
    }


    gotoAbout = () => {
        this.setState({
            about : true
        })
    }

    search = (event) => {
        this.setState({
            searchVal : event.target.value
        })
    }

    render() {
        if(this.state.tokenErr === true || this.state.login === true){
            return(
                <div>
                    <Login />
                </div>
            )
        }

        if (this.state.profile === true){
            return(
                <div>
                    <Profile />
                </div>
            )
        }

        if (this.state.about === true){
            return(
                <div>
                    <About />
                </div>
            )
        } 

        return (
            <div className="">
                <nav className="navbar navbar-expand-lg navbar-dark" id="nav-bg">
                    <h1 className="navbar-brand" id="dash-header">DashBoard</h1>
                    <button id="btn" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item mr-5">
                                <div id="nav-in" className="nav-link text-center" onClick={this.gotoProfile}>
                                    Profile 
                                </div>
                            </li>
                            <li className="nav-item mr-5">
                                <div id="nav-in" className="nav-link text-center" onClick={this.gotoAbout}>
                                    About
                                </div>
                            </li>
                            <li className="nav-item mr-5">
                                <div id="nav-in" className="nav-link text-center" onClick={this.logout}>
                                    Logout 
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <div>
                        <AddPassword newPassword={this.addNewPass}/>
                    </div>
                    <hr id="nav-line"/>
                    <div>
                        <ViewAllPasswords allPasswords={this.state.allPasswords}
                        deletePassword={this.deletePassword}/>
                    </div>
                </div>        
            </div>
        )
    }
}

export default Dash

       









