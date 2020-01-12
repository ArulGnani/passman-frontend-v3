import React, { Component } from 'react'
import  Main from './auth/main'

// custom css
import '../style/first-page.css'

class FirstPage extends Component {
    constructor(){
        super()
        this.state = {
            moveOn : false
        }
    }

    gotoMain = () => {
        this.setState({
            moveOn : true
        })
    }

    render() {
        if (this.state.moveOn){
            return (
                <div>
                    <Main />
                </div>
            )
        }

        return (
            <div id="first-box">
                <div id="text-area">
                    Pass Man
                </div>
                <div id="next-box">
                    <img id="next" onClick={this.gotoMain} 
                    src="https://img.icons8.com/cotton/64/000000/circled-chevron-right.png" />
                </div>
            </div>
        )
    }
}

export default FirstPage