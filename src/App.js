import React, { Component } from 'react';

import './App.css';
import Board from './Board/Board'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: true,
      gameStarted: false,
      cards: [],
      firstClick: {
        name: null,
        id: null
      },
      playerTurn: 0
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

  startGame = () => {
    this.setState({ overlay: false, gameStarted: true })
    this.resetGame();
  }

  resetGame = () => {
    let bank = [
      { id: 1, u1: "0xD83C", u2: "0xDF37", name: "tulip", status: "waiting" },
      { id: 2, u1: "0xD83C", u2: "0xDF37", name: "tulip", status: "waiting" },
      { id: 3, u1: "0xD83C", u2: "0xDF38", name: "sakura", status: "waiting" },
      { id: 4, u1: "0xD83C", u2: "0xDF38", name: "sakura", status: "waiting" },
      { id: 5, u1: "0xD83C", u2: "0xDF3B", name: "sunflower", status: "waiting" },
      { id: 6, u1: "0xD83C", u2: "0xDF3B", name: "sunflower", status: "waiting" },
      { id: 7, u1: "0xD83C", u2: "0xDF08", name: "rainbow", status: "waiting" },
      { id: 8, u1: "0xD83C", u2: "0xDF08", name: "rainbow", status: "waiting" },
      { id: 9, u1: "0xD83C", u2: "0xDF35", name: "cactus", status: "waiting" },
      { id: 10, u1: "0xD83C", u2: "0xDF35", name: "cactus", status: "waiting" },
      { id: 11, u1: "0xD83C", u2: "0xDF3A", name: "hibiscus", status: "waiting" },
      { id: 12, u1: "0xD83C", u2: "0xDF3A", name: "hibiscus", status: "waiting" },
      { id: 13, u1: "0xD83C", u2: "0xDF44", name: "mushroom", status: "waiting" },
      { id: 14, u1: "0xD83C", u2: "0xDF44", name: "mushroom", status: "waiting" },
      { id: 15, u1: "0xD83C", u2: "0xDF3C", name: "daisy", status: "waiting" },
      { id: 16, u1: "0xD83C", u2: "0xDF3C", name: "daisy", status: "waiting" },
      { id: 17, u1: "0xD83C", u2: "0xDF39", name: "rose", status: "waiting" },
      { id: 18, u1: "0xD83C", u2: "0xDF39", name: "rose", status: "waiting" },
      { id: 19, u1: "0xD83C", u2: "0xDF33", name: "tree", status: "waiting" },
      { id: 20, u1: "0xD83C", u2: "0xDF33", name: "tree", status: "waiting" }
    ]
    this.setState({ cards: this.shuffle(bank), playerTurn: 1 })
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
        playerTurn: tempState.playerTurn })
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
    //roll up a new game
    console.log("app mounted")
    if (!this.state.gameStarted) {
      this.resetGame();
    }
  }

  render() {
    return (
      <div className="App" >
        {this.state.overlay 
        ? <div id="overlay">
          {this.state.gameStarted 
            ? null 
            : <button id="start" onClick={this.startGame}>Start Game</button>
          }
          </div>
        : null 
        }
        <Board bank={this.state.cards} cardClick={this.cardClick} />
      </div>
    );
  }
}

export default App;
