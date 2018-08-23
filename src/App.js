import React, { Component } from 'react';
import Button from './button'
import './App.css'

export default class App extends Component {

  state = {
    farmer1Cards: [
      { id: 42, value: 0x43, image: "./Atlas/SpadeThree.png", weight: 50, },
      { id: 5, value: 0x15, image: "./Atlas/ClubFive.png", weight: 55, },
      { id: 37, value: 0x3B, image: "./Atlas/HeartJack.png", weight: 81, },
      { id: 39, value: 0x3D, image: "./Atlas/HeartKing.png", weight: 89, },
      { id: 53, value: 0x4E, image: "./Atlas/SpadeOne.png", weight: 94, },
      { id: 6, value: 0x16, image: "./Atlas/ClubSix.png", weight: 59, },
      { id: 7, value: 0x17, image: "./Atlas/ClubSeven.png", weight: 63, },
      { id: 8, value: 0x18, image: "./Atlas/ClubEight.png", weight: 67, },
      { id: 48, value: 0x49, image: "./Atlas/SpadeNine.png", weight: 74, },
      { id: 49, value: 0x4A, image: "./Atlas/SpadeTen.png", weight: 78, },
      { id: 32, value: 0x36, image: "./Atlas/HeartSix.png", weight: 61, },
      { id: 44, value: 0x45, image: "./Atlas/SpadeFive.png", weight: 58, },
      { id: 10, value: 0x1A, image: "./Atlas/ClubTen.png", weight: 75, },
      { id: 28, value: 0x2F, image: "./Atlas/DiamondTwo.png", weight: 96, },
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
    return (
      <div className="lord-cards">
        {lordCards.map((card) => {
          return (
            <div className="card">
              <img src={card.image} />
            </div>
          )
        })}
      </div>
    )
  }

  renderButton() {
    return (
      <div className="lord-buttons">
        <Button>智能出牌</Button>
      </div>
    )
  }

  renderFarmer1Cards = (farmer1Cards) => {
    farmer1Cards = farmer1Cards.sort((item1, item2) => {
      return item2.weight - item1.weight;
    })
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

          {this.renderButton()}
          {this.renderLordCards(lordCards)}
        </div>
        
      </div>
    )
  }
}