import React, { Component } from 'react';

import Player from '../PlayerCard/PlayerCard';
import GameOver from '../../Page/GameOver/GameOver';

import './Dash.css';

class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                {
                    id: 1,
                    name: "",
                    set: false
                },
                {
                    id: 2,
                    name: "",
                    set: false
                }
            ]
        };
    }

    handlePlayerNameChange = (event) => {
        if (event.target.value.length) {
            let playerArray = this.state.players;
            playerArray[parseInt(event.target.id.split("-")[1]) - 1].name = event.target.value
            this.setState({ players: playerArray })
        }
    }

    setPlayer = (index) => {
        let playerArray = this.state.players;
        if (playerArray[index].name.length > 0) {
            playerArray[index].set = true;
            this.setState({ players: playerArray })
            //start the game if both names are set
            if (playerArray[0].set && playerArray[1].set) {
                this.props.startGame();
            }
        }
    }

    turn = this.props.turn;

    componentDidMount() {
        console.log("dash mounted")
        console.log(this.state)
    }

    render() {
        return (
            <aside id="player-bank" className={`${this.props.winner ? " winner-declared" : ""}`}>
                {this.state.players.map(player => {
                    return <Player
                        key={`player-${player.id}`}
                        id={`player-${player.id}`}
                        number={player.id}
                        name={player.name}
                        score={this.props.scores[player.id - 1]}
                        turn={this.props.turn === player.id}
                        setup={this.props.setup}
                        setPlayer={this.setPlayer.bind(this)}
                        handleChange={this.handlePlayerNameChange.bind(this)}
                        nameSet={player.set}
                        winner={this.props.winner}
                    />
                })}
                {this.props.winner
                    ? <GameOver
                        player1={this.state.players[0]}
                        player2={this.state.players[1]}
                        winner={this.props.winner}
                        rematch={this.props.rematch} />
                    : null}
            </aside>
        )
    }
}

export default Dash;