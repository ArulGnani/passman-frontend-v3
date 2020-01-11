import React, { Component } from 'react'
import Login from '../auth/login'

// custom style 
import '../../style/view-all-style.css'

class ViewAllPasswords extends Component {
    constructor(props){
        super(props)
        this.state = {
            allPasswords : [],
            tokenErr : false,
            search : "",
            searchBox : false,
            searchResult : []
        }
    }

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

    componentWillReceiveProps = (props) => {
        this.setState({
            allPasswords : [...props.allPasswords]
        })
    }

    delPassword = (event) => {
        event.preventDefault()
        const delKey = event.target.id
        this.props.deletePassword(delKey)
    }

    handelChange = (event) => {
        if (event.target.value !== ""){
            this.setState({
                search : event.target.value,
            })
        }
    }

    search = () => {
        const searchKey = this.state.search
        if (searchKey){
            const result = this.state.allPasswords.filter(pass => pass.appName === searchKey)
            if (result){
                this.setState({
                    searchResult : result,
                    searchBox : true
                })
            }
        }
    }

    all = () => {
        this.setState({
            searchBox : false,
            search : ""
        })
    }

    render() {
        const searchResult = this.state.searchResult.map(password => {
            return (
                <div className="container my-3 mx-1" id="box" key={password._id}>
                    <h3 className="view-appname-main">
                        <small className="view-appname-label">
                            app name :
                        </small>
                            <b className="view-appname"> 
                                {password.appName} 
                            </b>
                    </h3>
                    <h1 className="view-psd-main">
                        <small className="view-password-label">
                            password :
                        </small>
                            <b className="view-password"> 
                                {password.genPass} </b>
                    </h1>
                    <p className="view-date"><small>
                            DOC : {password.passGenratedAt}
                        </small></p>
                    <button id={password._id} onClick={this.delPassword} 
                    className="view-btn">
                        delete
                    </button>
                </div>
            )
        })
        this.state.allPasswords.reverse()
        const allPasswords = this.state.allPasswords.map(password => {
            return (
                <div className="container my-3 mx-1" id="box" key={password._id}>
                    <h3 className="view-appname-main">
                        <small className="view-appname-label">
                            app name :
                        </small>
                            <b className="view-appname"> 
                                {password.appName} 
                            </b>
                    </h3>
                    <h1 className="view-psd-main">
                        <small className="view-password-label">
                            password :
                        </small>
                            <b className="view-password"> 
                                {password.genPass} </b>
                    </h1>
                    <p className="view-date"><small>
                            DOC : {password.passGenratedAt}
                        </small></p>
                    <button id={password._id} onClick={this.delPassword} 
                    className="view-btn">
                        delete
                    </button>
                </div>
            )
        })
        if (this.state.tokenErr === true){
            return(
                <div>
                    <Login />
                </div>
            )
        }
        if (this.state.searchBox === true){
            return(
                <div className="container">
                    <div className="view-search">
                        <input type="text" value={this.state.search}
                        onChange={this.handelChange} className="view-input"
                        placeholder="find password"/>
                        <button onClick={this.search} className="view-src-btn">
                            search
                        </button>
                        <button onClick={this.all} className="view-all-btn">
                            all
                        </button>
                    </div>                                                    
                </div>
            )
        }
        return (
            <div>
                <div className="container">
                    <div className="view-search">
                        <input type="text" value={this.state.search}
                        onChange={this.handelChange} className="view-input"
                        placeholder="find password"/>
                        <button onClick={this.search} className="view-src-btn">
                            search
                        </button>
                        <button onClick={this.all} className="view-all-btn">
                            all
                        </button>
                    </div>
                </div>
                {/* <hr id="view-line"/> */}
                <div className="container">
                    { allPasswords } 
                </div>
            </div>
        )
    }
}

export default ViewAllPasswords












