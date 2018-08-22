import React, { Component } from 'react';
import './App.css'

export default class App extends Component {

  state = {
    farmer1Cards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 17, value: 0x24, image: "./Atlas/DiamondFour.png" },
      { id: 18, value: 0x25, image: "./Atlas/DiamondFive.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
      { id: 7, value: 0x17, image: "./Atlas/ClubSeven.png" },
      { id: 8, value: 0x18, image: "./Atlas/ClubEight.png" },
      { id: 9, value: 0x19, image: "./Atlas/ClubNine.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    ],
    farmer2Cards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 47, value: 0x48, image: "./Atlas/SpadeEight.png" },
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 29, value: 0x33, image: "./Atlas/HeartThree.png" },
      { id: 30, value: 0x34, image: "./Atlas/HeartFour.png" },
      { id: 31, value: 0x35, image: "./Atlas/HeartFive.png" },
      { id: 32, value: 0x36, image: "./Atlas/HeartSix.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
      { id: 29, value: 0x33, image: "./Atlas/HeartThree.png" },
      { id: 30, value: 0x34, image: "./Atlas/HeartFour.png" },
      { id: 31, value: 0x35, image: "./Atlas/HeartFive.png" },
      { id: 32, value: 0x36, image: "./Atlas/HeartSix.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
      
    ],
    lordCards: [
      { id: 5, value: 0x13, image: "./Atlas/ClubThree.png" },
      { id: 29, value: 0x33, image: "./Atlas/HeartThree.png" },
      { id: 30, value: 0x34, image: "./Atlas/HeartFour.png" },
      { id: 31, value: 0x35, image: "./Atlas/HeartFive.png" },
      { id: 32, value: 0x36, image: "./Atlas/HeartSix.png" },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
    ],
    lastCards: [
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png" },
      { id: 49, value: 0x4A, image: "./Atlas/SpadeTen.png" },
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
    return (
      <div className="farmer1-cards">
        {farmer1Cards.map((card) => {
          return (
            <div className="farmer1-card card">
              <img className="farmer1-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderFarmer2Cards = (farmer2Cards) => {
    return farmer2Cards.map((card) => {
      return (
        <div className="farmer2-card card">
          <img className="farmer2-card-img" src={card.image} />
        </div>
      )
    })
  }

  renderLastCards = (lastCards) => {
    return (
      <div className="last-cards">
        {lastCards.map((card) => {
          return (
            <div className="last-card card">
              <img className="last-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards } = this.state;
    return (
      <div className="app">
        <div className="farmer1" style={{ top: window.innerHeight / 2 - 21 * farmer1Cards.length }}>
          {this.renderLastCards(lastCards)}
          {this.renderFarmer1Cards(farmer1Cards)}
        </div>
        <div className="farmer2" style={{ right: 54 - farmer2Cards.length * 20 + 20, bottom: farmer2Cards.length * 20 - 14 + window.innerHeight / 2 - 21 * farmer2Cards.length }}>
          {this.renderFarmer2Cards(farmer2Cards)}
        </div>
        <div className="lord">
          {this.renderLordCards(lordCards)}
        </div>
        
      </div>
    )
  }
}