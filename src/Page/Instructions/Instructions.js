import React, { Component } from 'react';

import detectBrowser from '../BrowserDetector';

import './Instructions.css';


class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisBrowser: null,
            copedEmail: false
        };
    }

    copyText = () => {
        if (this.state.thisBrowser.name === "IE") {
            window.clipboardData.setData("Text", "erinruthmaness@gmail.com");
        } else {
            navigator.clipboard.writeText("erinruthmaness@gmail.com");
        }
        this.setState({ copiedEmail: true });
    }


    componentDidMount() {
        this.setState({ thisBrowser: detectBrowser() })
    }

    render() {

        return (
            <article id="instructions" className="rainbow-background">
                <div id="instructions-wrapper">
                <header>Welcome to the <span className="game-name rainbow-text">Memory Game</span>!</header>
                <div className="rainbow-background line-break"></div>
                <section>To begin, enter each player's name above and click "Set" when you have it right!</section>
                <section>The board will fill with twenty cards.  Each player will have a chance to turn over two cards in search of a match.</section>
                <section>If you find a match, you get another turn.  If you don't, the cards will flip back over, and your competitor gets a turn.  Whoever finds the most matches out of ten wins!</section>
                <section>Have fun, and if you know of anyone hiring a JavaScript/jQuery or React developer, <span className={`tooltip${this.state.copiedEmail ? " email-copied" : ""}`} 
                    onClick={this.copyText.bind(this)}>email me
                    <span className="tooltip-text">
                            {this.state.copiedEmail ? "Thank you!" : "Click to copy my email address"}
                        </span>
                    </span>!
                </section>
                <button id="dismiss-instructions" className="pastel-rainbow-background" 
                    onClick={this.props.toggle}>Dismiss</button>
                    </div>
            </article>
        );

    }
}

export default Instructions;