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
      setup: true,
      cards: [],
      firstClick: {
        name: null,
        id: null
      },
      playerTurn: 0,
      playerScore: [0, 0],
      winner: null
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
    //play button after setting names
    console.log("play");
    this.setState({
      overlay: false,
      setup: false,
      playerTurn: 1
    })
    console.log(this.state)
    this.resetBoard();
  }

  resetBoard = () => {
    bank.forEach(card => {
      card.status = "waiting";
    })
    this.setState({
      cards: this.shuffle(bank)
    })
    if (this.state.winner) {
      this.setState({
        firstClick: {
          name: null,
          id: null
        },
        playerTurn: 0,
        playerScore: [0, 0],
        winner: null
      })
    }

  }

  gameOver = () => {
    if (this.state.playerScore[0] > this.state.playerScore[1]) {
      this.setState({ winner: 1 })
    } else if (this.state.playerScore[0] < this.state.playerScore[1]) {
      this.setState({ winner: 2 })
    } else {
      this.setState({ winner: 3 })
    }
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
      tempState.playerScore[tempState.playerTurn - 1]++;
    } else {
      animationStatus = "no-match"
      newStatus = "waiting";
      tempState.playerTurn = this.nextPlayer(tempState.playerTurn)
    }
    //change the status of the cards on the page so they "animate"
    tempState.cards[stateIndex1].status = animationStatus
    tempState.cards[stateIndex2].status = animationStatus
    this.setState({ cards: tempState.cards })
    setTimeout(() => {
      //three seconds later, update state (with card statuses back to normal)
      //which will resume the game 
      tempState.cards[stateIndex1].status = newStatus
      tempState.cards[stateIndex2].status = newStatus
      this.setState({
        overlay: false,
        cards: tempState.cards,
        firstClick: { id: null, name: null },
        playerTurn: tempState.playerTurn,
        playerScore: tempState.playerScore
      })
      if ((tempState.playerScore[0] + tempState.playerScore[1]) === 10) {
        this.gameOver();
      }
    }, 500)
  }

  cardClick = (cardID, cardStatus, cardName) => {
    let tempState = this.state;
    let i = (tempState.cards).findIndex((stateCard) => stateCard.id === cardID)
    if (cardStatus === "waiting") {
      tempState.cards[i].status = "clicked";
      //first click of pair
      if (tempState.firstClick.id === null) {
        tempState.firstClick = { id: cardID, name: cardName }
        this.setState({
          cards: tempState.cards,
          firstClick: tempState.firstClick
        })
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
        }, 200)
      }
    }
  }

  componentDidMount() {
    console.log("app mounted")
    console.log(this.state)
  }

  render() {

    return (
      <div className="App" >
        <PlayerDash
          turn={this.state.playerTurn}
          scores={this.state.playerScore}
          setup={this.state.setup}
          startGame={this.startGame.bind(this)}
          winner={this.state.winner}
          rematch={this.resetBoard.bind(this)} />
        <div className="board-wrapper">
          {this.state.overlay
            ? <Overlay />
            : null
          }
          <Board bank={this.state.cards} cardClick={this.cardClick} />
        </div>
        <div id="app-footer"></div>
      </div >
    );
  }
}

export default App;
