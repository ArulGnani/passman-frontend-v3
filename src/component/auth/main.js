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
            <div className="container col-lg-4" id="top">
                <div className="card" id="border-box">
                    <div className="card-body text-center" onClick={this.gotoSigin}
                    id="text-animate">
                        <h2 className="card-title"> 
                            sign in 
                        </h2>
                        <small>new user!</small>
                    </div>
                    <hr id="main-line"/>
                    <div className="card-body text-center" onClick={this.gotoLogin}
                    id="text-animate">
                        <h2 className="card-title"> login </h2>
                        <small>already have an account!</small>
                    </div>
                </div>    
            </div>
        )

    }
}

export default Main












