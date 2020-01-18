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
                    <div id="top-design">
                        <span></span>
                    </div>
                    <div id="text-area">
                        Pass Man
                    </div>
                    <div id="next-box">
                            <img id="next" onClick={this.gotoMain}
                            src = "https://img.icons8.com/ios-glyphs/30/000000/circled-chevron-right.png" 
                            height="50px" width="50px" />
                    </div>
                    <div id="botton-design">
                        <span></span>
                    </div>
                </div>
        )
    }
}

export default FirstPage