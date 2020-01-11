import React, { Component } from 'react'
import Dash from './dash'

// custom css 
import '../../style/about-style.css'

class About extends Component {
    constructor(props){
        super(props)
        this.state = {
            dash : false
        }
    }

    gotoDash = () => {
        this.setState({
            dash : true
        })

    }


    render() {
        if (this.state.dash){
            return(
                <div>
                    <Dash />
                </div>
            )
        }
        
        return (
            <div className="container my-5">
                <hr className="abt-line" />
                <div className="abt-main">
                    <h1 className="abt-header">About 
                        <button className="abt-back" onClick={this.gotoDash}>
                            back
                        </button>
                    </h1>
                    <hr className="abt-line" />
                    <p className="abt-session">
                        This is a password manager application the current version being 3.0.2,
                        this application constantly updated
                        <hr />
                        new ui updated <b>v3.5.2</b>
                    </p>
                    <p className="abt-author">
                        creater : <a href="https://github.com/ArulGnani">v47_</a>
                    </p>
                </div>
                <hr className="abt-endline"/>
            </div>
        )
    }
}
export default About


    
