import React, { Component } from 'react';

import Overlay from '../Page/Overlay/Overlay';
import PlayerDash from '../Players/Dash/Dash';
import Board from '../Game/Board/Board';
import bank from '../Game/bank';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: true,
      gameStarted: false,
      setup: false,
      cards: [],
      firstClick: {
        name: null,
        id: null
      },
      playerTurn: 0,
    };
  }

  //using the Fisher-Yates (aka Knuth) Shuffle
  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  setUpGame = () => {
    this.setState({
      setup: true,
    })
  }

  startGame = () => {
    console.log(this.state)
    //initial "Start Game button"
    if (!this.state.gameStarted && !this.state.setup) {
      console.log("start game");
      this.setState({
        setup: true
      })
      console.log(this.state)
    } else if (!this.state.gameStarted && this.state.setup) {
      //"play!" button after setting names
      console.log("play");
      this.setState ({
        overlay: false,
        gameStarted: true,
        setup: false,
        playerTurn: 1
      })
      console.log(this.state)
      this.resetBoard();
    } else {
      console.log("error: gameStarted is " + this.state.gameStarted + " and setup is " + this.state.setup);
    }
  }

  resetBoard = () => {
    this.setState({ cards: this.shuffle(bank) })
  }

  nextPlayer = (playerTurn) => {
    if (playerTurn === 1) {
      return 2;
    } else if (playerTurn === 2) {
      return 1;
    } else {
      console.log("player turn error: ", playerTurn)
    }
  }

  cardCompare = (tempState, stateIndex1, stateIndex2) => {
    let animationStatus = null;
    let newStatus = null;
    let card1temp = this.state.cards[stateIndex1]
    let card2temp = this.state.cards[stateIndex2]
    if (card1temp.name === card2temp.name) {
      animationStatus = "match"
      newStatus = "removed";
    } else {
      animationStatus = "no-match"
      newStatus = "waiting";
      tempState.playerTurn = this.nextPlayer(tempState.playerTurn)
    }
    //change the status of the cards on the page so they animate
    tempState.cards[stateIndex1].status = animationStatus
    tempState.cards[stateIndex2].status = animationStatus
    this.setState({ cards: tempState.cards })
    setTimeout(() => {
      //three seconds later, give the new state with card statuses back to normal
      //back to the cardClick function, which will set it to state and resume the game 
      tempState.cards[stateIndex1].status = newStatus
      tempState.cards[stateIndex2].status = newStatus
      this.setState({
        overlay: false,
        cards: tempState.cards,
        firstClick: { id: null, name: null },
        playerTurn: tempState.playerTurn
      })
      console.log(this.state)
    }, 1000)
  }

  cardClick = (cardID, cardStatus, cardName) => {
    let tempState = this.state;
    let i = (tempState.cards).findIndex((stateCard) => stateCard.id === cardID)
    switch (cardStatus) {
      case "waiting":
        tempState.cards[i].status = "clicked";
        //first click of pair
        if (tempState.firstClick.id === null) {
          tempState.firstClick = { id: cardID, name: cardName }
          this.setState({
            cards: tempState.cards,
            firstClick: tempState.firstClick
          })
          console.log(this.state)
        } else { //second click of pair
          this.setState({ overlay: true }) //prevents player from clicking again before match finishes
          let matchIndex = (tempState.cards).findIndex((stateCard) => stateCard.id === tempState.firstClick.id)
          //turns over clicked card
          this.setState({
            cards: tempState.cards,
          })
          //timer for a second so player can look at both cards
          setTimeout(() => {
            this.cardCompare(tempState, i, matchIndex)
          }, 500)
        }
        break;
      case "clicked":
        tempState.cards[i].status = "waiting"
        this.setState({
          cards: tempState.cards,
        })
        break;
      case "removed":
        break;
      default:
        console.log("switch case error: ", cardStatus)
    }
  }

  componentDidMount() {
    console.log("app mounted")
    console.log(this.state)
  }

  render() {

    // {!this.state.gameStarted
    //   ? <button id="start" onClick={this.startGame}>Start Game</button>
    //   : <article className={`player-setup${(this.state.setup) ? "" : " hide-setup"}`}>
    //     {(!this.state.players[0].set)
    //       ? <section className="player-setup-panel">
    //         <label htmlFor="player1-setup">Player 1 Name:</label>
    //         <input id="setupplayer-1" name="player1-setup" value={this.state.players[0].name}
    //           onChange={(e) => this.handlePlayerNameChange(e, 1)}></input>
    //         <button onClick={this.setPlayer.bind(this, 0)}>Next</button>
    //       </section>
    //       : <section className="player-setup-panel">
    //         <label htmlFor="player2-setup">Player 2 Name:</label>
    //         <input id="setupplayer-2" name="player2-setup" value={this.state.players[1].name}
    //         onChange={(e) => this.handlePlayerNameChange(e, 2)}></input>
    //         <button onClick={this.setPlayer.bind(this, 1)}>Play!</button>
    //       </section>
    //     }
    //   </article>
    // }

    return (
      <div className="App" >
        {this.state.overlay
          ? <Overlay 
              setup={this.state.setup}
              started={this.state.gameStarted}
              startSetup={this.setUpGame.bind(this)} />
          : null
        }
        <PlayerDash 
          turn={this.state.playerTurn} 
          setup={this.state.setup}
          started={this.state.gameStarted}
          startGame={this.startGame.bind(this)} />
        <Board bank={this.state.cards} cardClick={this.cardClick} />
      </div >
    );
  }
}

export default App;
