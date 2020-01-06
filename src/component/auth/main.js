import React, { Component } from 'react'
import SiginIn from './signIn.js'
import Login from './login.js'
import '../../style/main.css'


class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            signIn : false
        }
    }

    gotoSigin = () => {
        this.setState({
            signIn : true
        })
    }

    gotoLogin = () => {
        this.setState({
            login : true
        })
    }

    render() {
        if (this.state.signIn){
            return ( <div> <SiginIn /> </div> )
        }
        if(this.state.login){
            return( <div> <Login /> </div> )
        }
        

        return(
            <div className="main">
                <div className="main-signin" onClick={this.gotoSigin}>
                    <h2> sign in </h2>
                    <small>new user!</small>
                </div>
                <hr className="main-line"/>
                <div className="main-login" onClick={this.gotoLogin}>
                    <h2> login </h2>
                    <small>already have an account!</small>
                </div>
                
            </div>
        )

    }
}

export default Main












