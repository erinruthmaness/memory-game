import React, { Component } from 'react';

import Player from '../PlayerCard/PlayerCard';
// import Setup from '../Setup/Setup';

import './Dash.css';

class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                {
                    id: 1,
                    score: 0,
                    name: "",
                    set: false
                },
                {
                    id: 2,
                    score: 0,
                    name: "",
                    set: false
                }
            ]
        };
    }

    handlePlayerNameChange = (event) => {
        let playerArray = this.state.players;
        playerArray[parseInt(event.target.id.split("-")[1]) - 1].name = event.target.value
        this.setState({ players: playerArray })
    }

    setPlayer = (index) => {
        let playerArray = this.state.players;
        playerArray[index].set = true;
        this.setState({ players: playerArray })
        //start the game if both names are set
        if (playerArray[0].set && playerArray[1].set) {
            this.props.startGame();
        }
    }

    turn = this.props.turn;

    componentDidMount() {
        console.log("dash mounted")
        console.log(this.state)
      }
    
    render() {
        // if (this.props.setup) {
        //     this.turn = 2;
        //     if (!this.state.players[0].set) {
        //         this.turn = 1;
        //     }
        // }
        return (
            <header id="player-bank" className={(this.props.started || this.props.setup) ? "on-top" : ""}>
                {this.state.players.map(player => {
                    return <Player
                        key={`player-${player.id}`}
                        id={`player-${player.id}`}
                        number={player.id}
                        name={player.name}
                        score={player.score}
                        turn={this.props.turn === player.id}
                        setup={this.props.setup}
                        setPlayer={this.setPlayer.bind(this)}
                        handleChange={this.handlePlayerNameChange.bind(this)}
                        nameSet={player.set}
                    />
                })}
            </header>
        )

    }
}

export default Dash;