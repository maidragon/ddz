import React, { Component } from 'react';
import './App.css'

export default class App extends Component {

  state = {
    farmer1Cards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    ],
    farmer2Cards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    ],
    lordCards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    ],
  }

  renderLordCards = (lordCards) => {
    return lordCards.map((card) => {
      return (
        <div className="card">
          <img src={card.image} />
        </div>
      )
    })
  }

  renderFarmer1Cards = (farmer1Cards) => {
    return farmer1Cards.map((card) => {
      return (
        <div className="farmer1-card">
          <img className="farmer1-card-img" src={card.image} />
        </div>
      )
    })
  }

  render() {
    const { lordCards, farmer1Cards } = this.state;
    return (
      <div className="app">
        <div className="farmer1">
          {this.renderFarmer1Cards(farmer1Cards)}
        </div>
        <div className="farmer2">
          {this.renderLordCards(lordCards)}
        </div>
        <div className="lord">
          {this.renderLordCards(lordCards)}
        </div>
        
      </div>
    )
  }
}