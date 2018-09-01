import React, { Component } from 'react';
import axios from 'axios';
import { Menu, Dropdown, Icon } from 'antd';
import { shuffle, getRandomIntInclusive } from './tool'
import { config } from './config'
import Button from './button'
import './App.css'

export default class App extends Component {

  state = {
    farmer1Cards: [],
    farmer1LastCards: [],
    farmer2Cards: [],
    farmer2LastCards: [],
    lordCards: [],
    lastCards: [],
    deckCards: [],
    currentPlayerCards: [],
    lastIdentity: "请选择",
    loadedDecks: [],
    showButtons: [true, true, true],
  }

  deck = [
    // 大王
    { id: 1, value: 0x01, image: "./Atlas/LJoker.png", weight: 100, },
    // 小王
    { id: 2, value: 0x02, image: "./Atlas/SJoker.png", weight: 99, },

    // 梅花
    { id: 19, value: 0x13, image: "./Atlas/ClubThree.png", weight: 47, },
    { id: 20, value: 0x14, image: "./Atlas/ClubFour.png", weight: 51, },
    { id: 21, value: 0x15, image: "./Atlas/ClubFive.png", weight: 55, },
    { id: 22, value: 0x16, image: "./Atlas/ClubSix.png", weight: 59, },
    { id: 23, value: 0x17, image: "./Atlas/ClubSeven.png", weight: 63, },
    { id: 24, value: 0x18, image: "./Atlas/ClubEight.png", weight: 67, },
    { id: 25, value: 0x19, image: "./Atlas/ClubNine.png", weight: 71, },
    { id: 26, value: 0x1A, image: "./Atlas/ClubTen.png", weight: 75, },
    { id: 27, value: 0x1B, image: "./Atlas/ClubJack.png", weight: 79, },
    { id: 28, value: 0x1C, image: "./Atlas/ClubQueen.png", weight: 83, },
    { id: 29, value: 0x1D, image: "./Atlas/ClubKing.png", weight: 87, },
    { id: 30, value: 0x1E, image: "./Atlas/ClubOne.png", weight: 91, },
    { id: 31, value: 0x1F, image: "./Atlas/ClubTwo.png", weight: 95, },

    // 方片
    { id: 35, value: 0x23, image: "./Atlas/DiamondThree.png", weight: 48, },
    { id: 36, value: 0x24, image: "./Atlas/DiamondFour.png", weight: 52, },
    { id: 37, value: 0x25, image: "./Atlas/DiamondFive.png", weight: 56, },
    { id: 38, value: 0x26, image: "./Atlas/DiamondSix.png", weight: 60, },
    { id: 39, value: 0x27, image: "./Atlas/DiamondSeven.png", weight: 64, },
    { id: 40, value: 0x28, image: "./Atlas/DiamondEight.png", weight: 68, },
    { id: 41, value: 0x29, image: "./Atlas/DiamondNine.png", weight: 72, },
    { id: 42, value: 0x2A, image: "./Atlas/DiamondTen.png", weight: 76, },
    { id: 43, value: 0x2B, image: "./Atlas/DiamondJack.png", weight: 80, },
    { id: 44, value: 0x2C, image: "./Atlas/DiamondQueen.png", weight: 84, },
    { id: 45, value: 0x2D, image: "./Atlas/DiamondKing.png", weight: 88, },
    { id: 46, value: 0x2E, image: "./Atlas/DiamondOne.png", weight: 92, },
    { id: 47, value: 0x2F, image: "./Atlas/DiamondTwo.png", weight: 96, },

    // 红桃
    { id: 51, value: 0x33, image: "./Atlas/HeartThree.png", weight: 49, },
    { id: 52, value: 0x34, image: "./Atlas/HeartFour.png", weight: 53, },
    { id: 53, value: 0x35, image: "./Atlas/HeartFive.png", weight: 57, },
    { id: 54, value: 0x36, image: "./Atlas/HeartSix.png", weight: 61, },
    { id: 55, value: 0x37, image: "./Atlas/HeartSeven.png", weight: 65, },
    { id: 56, value: 0x38, image: "./Atlas/HeartEight.png", weight: 69, },
    { id: 57, value: 0x39, image: "./Atlas/HeartNine.png", weight: 73, },
    { id: 58, value: 0x3A, image: "./Atlas/HeartTen.png", weight: 77, },
    { id: 59, value: 0x3B, image: "./Atlas/HeartJack.png", weight: 81, },
    { id: 60, value: 0x3C, image: "./Atlas/HeartQueen.png", weight: 85, },
    { id: 61, value: 0x3D, image: "./Atlas/HeartKing.png", weight: 89, },
    { id: 62, value: 0x3E, image: "./Atlas/HeartOne.png", weight: 93 },
    { id: 63, value: 0x3F, image: "./Atlas/HeartTwo.png", weight: 97, },

    // 黑桃
    { id: 67, value: 0x43, image: "./Atlas/SpadeThree.png", weight: 50, },
    { id: 68, value: 0x44, image: "./Atlas/SpadeFour.png", weight: 54, },
    { id: 69, value: 0x45, image: "./Atlas/SpadeFive.png", weight: 58, },
    { id: 70, value: 0x46, image: "./Atlas/SpadeSix.png", weight: 62, },
    { id: 71, value: 0x47, image: "./Atlas/SpadeSeven.png", weight: 66, },
    { id: 72, value: 0x48, image: "./Atlas/SpadeEight.png", weight: 70, },
    { id: 73, value: 0x49, image: "./Atlas/SpadeNine.png", weight: 74, },
    { id: 74, value: 0x4A, image: "./Atlas/SpadeTen.png", weight: 78, },
    { id: 75, value: 0x4B, image: "./Atlas/SpadeJack.png", weight: 82, },
    { id: 76, value: 0x4C, image: "./Atlas/SpadeQueen.png", weight: 86, },
    { id: 77, value: 0x4D, image: "./Atlas/SpadeKing.png", weight: 90, },
    { id: 78, value: 0x4E, image: "./Atlas/SpadeOne.png", weight: 94, },
    { id: 79, value: 0x4F, image: "./Atlas/SpadeTwo.png", weight: 98, },
  ]

  componentDidMount() {
    // 读取预设好的牌组
    this.loadDecks();
    this.dealCards();

    setTimeout(() => {
      this.sortCards();
    }, 1000);
  }

  loadDecks() {
    axios.get(config.DECKS_API_URL)
    .then((response) => {
      const { decks } = response.data;
      this.setState({ loadedDecks: decks });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  dealCards() {
    this.deck = shuffle(this.deck)
    const farmer1Cards = [];
    const farmer2Cards = [];
    const lordCards = [];
    for (let i = 0; i < 51; i++) {
      switch(i % 3) {
        case 0: lordCards.push(this.deck[i]); break;
        case 1: farmer1Cards.push(this.deck[i]); break;
        case 2: farmer2Cards.push(this.deck[i]); break;
        default: ;break;
      }
    }
    lordCards.push(this.deck[51])
    lordCards.push(this.deck[52])
    lordCards.push(this.deck[53])

    this.setState({
      lordCards,
      farmer1Cards,
      farmer2Cards,
    });
  }

  onSmartFarmer1Cards = (e) => {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, farmer1LastCards } = this.state;
    
    let lastPlayerIdentity = 0;
    switch(lastIdentity) {
      case 'farmer1': lastPlayerIdentity = 1; break;
      case 'farmer2': lastPlayerIdentity = 2; break;
    }

    axios.post(config.API_ADDRESS, {
      lordCards: this.formatCards(lordCards),
      farmer1Cards: this.formatCards(farmer1Cards),
      farmer2Cards: this.formatCards(farmer2Cards),
      lastPlayerCards: this.formatCards(lastCards),
      playerIdentity: 1,
      lastPlayerIdentity: lastPlayerIdentity,
    })
    .then((response) => {
      const { data } = response;
      const { handcard } = data;
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const selectedCards = farmer1Cards.filter((card) => handcard.includes(card.id));
        this.setState({
          farmer1Cards: farmer1Cards.filter((card) => !handcard.includes(card.id)),
          farmer1LastCards: selectedCards,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSmartFarmer2Cards = (e) => {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, farmer2LastCards } = this.state;
    
    let lastPlayerIdentity = 0;
    switch(lastIdentity) {
      case 'farmer1': lastPlayerIdentity = 1; break;
      case 'farmer2': lastPlayerIdentity = 2; break;
    }

    axios.post(config.API_ADDRESS, {
      lordCards: this.formatCards(lordCards),
      farmer1Cards: this.formatCards(farmer1Cards),
      farmer2Cards: this.formatCards(farmer2Cards),
      lastPlayerCards: this.formatCards(lastCards),
      playerIdentity: 2,
      lastPlayerIdentity: lastPlayerIdentity,
    })
    .then((response) => {
      const { data } = response;
      const { handcard } = data;
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const selectedCards = farmer2Cards.filter((card) => handcard.includes(card.id));
        this.setState({
          farmer2Cards: farmer2Cards.filter((card) => !handcard.includes(card.id)),
          farmer2LastCards: selectedCards,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSmartLordCards = (e) => {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity } = this.state;
    
    let lastPlayerIdentity = 0;
    switch(lastIdentity) {
      case 'farmer1': lastPlayerIdentity = 1; break;
      case 'farmer2': lastPlayerIdentity = 2; break;
    }

    axios.post(config.API_ADDRESS, {
      lordCards: this.formatCards(lordCards),
      farmer1Cards: this.formatCards(farmer1Cards),
      farmer2Cards: this.formatCards(farmer2Cards),
      lastPlayerCards: this.formatCards(lastCards),
      playerIdentity: 0,
      lastPlayerIdentity: lastPlayerIdentity,
    })
    .then((response) => {
      const { data } = response;
      const { handcard } = data;
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const selectedCards = lordCards.filter((card) => handcard.includes(card.id));
        this.setState({
          lordCards: lordCards.filter((card) => !handcard.includes(card.id)),
          currentPlayerCards: selectedCards,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onRedrawCurrentPlayerCards = (e) => {
    const { lordCards, currentPlayerCards } = this.state;
    this.setState({
      currentPlayerCards: [],
      lordCards: lordCards.concat(currentPlayerCards),
    });
  }

  onPutToDeck = (e) => {
    const { lordCards, deckCards } = this.state;

    const selectedLordCards = lordCards.filter((card) => card.selected);
    this.setState({ 
      lordCards: lordCards.filter((card) => !card.selected),
      deckCards: deckCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;}))
    });
  }

  onPutToLeft = (e) => {
    const { deckCards, farmer2Cards } = this.state;
    const selectedDeckCards = deckCards.filter((card) => card.selected);

    this.setState({
      deckCards: deckCards.filter((card) => !card.selected),
      farmer2Cards: farmer2Cards.concat(selectedDeckCards.map((card) => {card.selected = false; return card;})),
    });
  }

  onPutToBottom = (e) => {
    const { deckCards, lordCards } = this.state;
    const selectedDeckCards = deckCards.filter((card) => card.selected);

    this.setState({
      deckCards: deckCards.filter((card) => !card.selected),
      lordCards: lordCards.concat(selectedDeckCards.map((card) => {card.selected = false; return card;})),
    });
  }

  onPutToRight = (e) => {
    const { deckCards, farmer1Cards } = this.state;
    const selectedDeckCards = deckCards.filter((card) => card.selected);

    this.setState({
      deckCards: deckCards.filter((card) => !card.selected),
      farmer1Cards: farmer1Cards.concat(selectedDeckCards.map((card) => {card.selected = false; return card;})),
    });
  }

  onPutDeckToLastCards = (e) => {
    const { deckCards, lastCards } = this.state;
    const selectedDeckCards = deckCards.filter((card) => card.selected);

    this.setState({
      deckCards: deckCards.filter((card) => !card.selected),
      lastCards: lastCards.concat(selectedDeckCards.map((card) => {card.selected = false; return card;})),
    });
  }

  onPutFarmer2CardsToDeck = () => {
    const { farmer2Cards, deckCards } = this.state;
    const selectedFarmer2Cards = farmer2Cards.filter((card) => card.selected);
    this.setState({ 
      farmer2Cards: farmer2Cards.filter((card) => !card.selected),
      deckCards: deckCards.concat(selectedFarmer2Cards.map((card) => {card.selected = false; return card;}))
    });
  }

  onPutFarmer1CardsToDeck = () => {
    const { farmer1Cards, deckCards } = this.state;
    const selectedFarmer1Cards = farmer1Cards.filter((card) => card.selected);
    this.setState({ 
      farmer1Cards: farmer1Cards.filter((card) => !card.selected),
      deckCards: deckCards.concat(selectedFarmer1Cards.map((card) => {card.selected = false; return card;}))
    });
  }

  onDealLordCards = () => {
    const { farmer1Cards, farmer1LastCards, lastCards, farmer2Cards, farmer2LastCards, currentPlayerCards, lordCards } = this.state;
    const selectedLordCards = lordCards.filter((card) => card.selected);

    if (lastCards.length > 0) {
      this.setState({
        farmer1Cards: farmer1Cards.concat(farmer1LastCards),
        farmer2Cards: farmer2Cards.concat(farmer2LastCards),
      }, () => {
        this.setState({ 
          lordCards: lordCards.filter((card) => !card.selected),
          currentPlayerCards: currentPlayerCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
          lastIdentity: "Lord",
          lastCards: currentPlayerCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
        });
      });
    } else {
      this.setState({ 
        lordCards: lordCards.filter((card) => !card.selected),
        currentPlayerCards: currentPlayerCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
        lastIdentity: "Lord",
        lastCards: currentPlayerCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
      });
    }
  }

  onDealFarmer1Cards = () => {
    const { farmer1Cards, farmer1LastCards, lastCards, farmer2Cards, farmer2LastCards } = this.state;
    const selectedFarmer1Cards = farmer1Cards.filter((card) => card.selected);

    if (lastCards.length > 0) {
      this.setState({
        farmer2Cards: farmer2Cards.concat(farmer2LastCards),
      }, () => {
        this.setState({ 
          farmer1Cards: farmer1Cards.filter((card) => !card.selected),
          farmer1LastCards: farmer1LastCards.concat(selectedFarmer1Cards.map((card) => {card.selected = false; return card;})),
          lastIdentity: "Farmer1",
          lastCards: farmer1LastCards.concat(selectedFarmer1Cards.map((card) => {card.selected = false; return card;})),
        });
      });
    } else {
      this.setState({ 
        farmer1Cards: farmer1Cards.filter((card) => !card.selected),
        farmer1LastCards: farmer1LastCards.concat(selectedFarmer1Cards.map((card) => {card.selected = false; return card;})),
        lastIdentity: "Farmer1",
        lastCards: farmer1LastCards.concat(selectedFarmer1Cards.map((card) => {card.selected = false; return card;})),
      });
    }
  }

  onDealFarmer2Cards = () => {
    const { farmer2Cards, farmer2LastCards, lastCards, farmer1Cards, farmer1LastCards } = this.state;
    const selectedFarmer2Cards = farmer2Cards.filter((card) => card.selected);

    if (lastCards.length > 0) {
      this.setState({
        farmer1Cards: farmer1Cards.concat(farmer1LastCards),
      }, () => {
        this.setState({ 
          farmer2Cards: farmer2Cards.filter((card) => !card.selected),
          farmer2LastCards: farmer2LastCards.concat(selectedFarmer2Cards.map((card) => {card.selected = false; return card;})),
          lastIdentity: "Farmer2",
          lastCards: farmer2LastCards.concat(selectedFarmer2Cards.map((card) => {card.selected = false; return card;})),
        });
      });
    } else {
      this.setState({ 
        farmer2Cards: farmer2Cards.filter((card) => !card.selected),
        farmer2LastCards: farmer2LastCards.concat(selectedFarmer2Cards.map((card) => {card.selected = false; return card;})),
        lastIdentity: "Farmer2",
        lastCards: farmer2LastCards.concat(selectedFarmer2Cards.map((card) => {card.selected = false; return card;})),
      });
    }
  }

  onRedrawFarmer1Cards = () => {
    const { farmer1Cards, farmer1LastCards } = this.state;

    this.setState({
      lastIdentity: "",
      lastCards: [],
      farmer1LastCards: [],
      farmer1Cards: farmer1Cards.concat(farmer1LastCards),
    });
  }

  onRedrawFarmer2Cards = () => {
    const { farmer2Cards, farmer2LastCards } = this.state;

    this.setState({
      lastIdentity: "",
      lastCards: [],
      farmer2LastCards: [],
      farmer2Cards: farmer2Cards.concat(farmer2LastCards),
    });
  }

  sortRule(item1, item2) {
    return item2.weight - item1.weight;
  }

  sortCards() {
    const { farmer1Cards, farmer2Cards, lordCards, deckCards } = this.state;

    this.setState({ 
      farmer1Cards: farmer1Cards.sort(this.sortRule), 
      farmer2Cards:  farmer2Cards.sort(this.sortRule), 
      lordCards: lordCards.sort(this.sortRule),
      deckCards: deckCards.sort(this.sortRule),
    });
  }

  onSortCards = (e) => {
    this.sortCards();
  }

  onSelectLordCard = (card) => {
    const { lordCards } = this.state;
    card.selected = !card.selected;

    this.setState({ lordCards: [...lordCards] });
    // console.log('onSelectCard: ');
  }

  onSelectFarmer1Card = (card) => {
    const { farmer1Cards } = this.state;
    card.selected = !card.selected;

    this.setState({ farmer1Cards: [...farmer1Cards] });
  }

  onSelectFarmer2Card = (card) => {
    const { farmer2Cards } = this.state;
    card.selected = !card.selected;

    this.setState({ farmer2Cards: [...farmer2Cards] });
  }

  onSelectDeckCard = (card) => {
    const { deckCards } = this.state;
    card.selected = !card.selected;

    this.setState({ deckCards: [...deckCards] });
  }

  onSelectIdentity = ({ key }) => {
    this.setState({ lastIdentity: key })
  }

  onSelectDeck = (deck) => {
    this.loadDeck(deck);
  }

  loadDeck = (deck) => {
    const farmer1Cards = this.deck.filter((card) => deck.f1.includes(card.id));
    const farmer2Cards = this.deck.filter((card) => deck.f2.includes(card.id));
    const lordCards = this.deck.filter((card) => deck.l.includes(card.id));
    const lastCards = this.deck.filter((card) => deck.lastCard.includes(card.id));
    let lastIdentity = "lord";
    switch (deck.Last_Identity) {
      case 1: lastIdentity = "farmer1"; break;
      case 2: lastIdentity = "farmer2"; break;
    }
    const currentIdentity = deck.Cur_Identity;
    let showButtons = [true, true, true];
    switch (currentIdentity) {
      case 0: showButtons = [true, false, false]; break;
      case 1: showButtons = [false, true, false]; break;
      case 2: showButtons = [false, false, true]; break;
    }
    this.setState({
      farmer1Cards,
      farmer2Cards,
      lordCards,
      lastCards,
      lastIdentity,
      showButtons,
    });
  }

  getRandomDeck() {
    const { loadedDecks } = this.state;
    console.log('loadedDecks: ', loadedDecks);
    const index = getRandomIntInclusive(1, loadedDecks.length);
    console.log('index: ', index);
    const deck = loadedDecks[index - 1];
    this.loadDeck(deck);
  }

  formatCards(cards) {
    return cards.map((card) => {
      return card.value;
    });
  }

  renderLordButtons() {
    const { showButtons } = this.state;
    const showSmartPushButton = showButtons[0];
    return (
      <div className="lord-buttons">
        <img className="lord-identity" src="./Atlas/Identity_Landlord.png" />
        <Button onClick={this.onDealLordCards} className="small-margin-right">出牌</Button>
        <Button onClick={this.onSmartLordCards} className="small-margin-right" style={{ display: showSmartPushButton ? 'block': 'none' }}>智能出牌</Button>
        <Button onClick={this.onRedrawCurrentPlayerCards} className="small-margin-right">放回手牌</Button>
        <Button onClick={this.onPutToDeck} className="small-margin-right">放回牌堆</Button>
        <Button onClick={this.onSortCards}>排序</Button>
      </div>
    )
  }

  renderFarmer1Buttons() {
    const { showButtons } = this.state;
    const showSmartPushButton = showButtons[1];
    return (
      <div className="farmer1-buttons">
        <img className="farmer1-identity" src="./Atlas/Identity_Farmer.png" />
        <Button onClick={this.onDealFarmer1Cards} className="small-margin-right">出牌</Button>
        <Button onClick={this.onSmartFarmer1Cards} className="small-margin-right" style={{ display: showSmartPushButton ? 'block': 'none' }}>智能出牌</Button>
        <Button onClick={this.onRedrawFarmer1Cards} className="small-margin-right">放回手牌</Button>
        <Button onClick={this.onPutFarmer1CardsToDeck}>放回牌堆</Button>
      </div>
    )
  }

  renderFarmer2Buttons() {
    const { showButtons } = this.state;
    const showSmartPushButton = showButtons[2];
    return (
      <div className="farmer2-buttons">
        <img className="farmer2-identity" src="./Atlas/Identity_Farmer.png" />
        <Button onClick={this.onDealFarmer2Cards} className="small-margin-right">出牌</Button>
        <Button onClick={this.onSmartFarmer2Cards} className="small-margin-right" style={{ display: showSmartPushButton ? 'block': 'none' }}>智能出牌</Button>
        <Button onClick={this.onRedrawFarmer2Cards} className="small-margin-right">放回手牌</Button>
        <Button onClick={this.onPutFarmer2CardsToDeck}>放回牌堆</Button>
      </div>
    )
  }

  renderDeckButtons() {
    const { deckCards } = this.state;
    if (deckCards.length > 0) {
      return (
        <div className="deck-buttons">
          <Button onClick={this.onPutToLeft} className="small-margin-right">放入左侧</Button>
          <Button onClick={this.onPutToBottom} className="small-margin-right">放入下方</Button>
          <Button onClick={this.onPutToRight} className="small-margin-right">放入右侧</Button>
          <Button onClick={this.onPutDeckToLastCards} className="small-margin-right">放入上次出牌</Button>
        </div>
      )
    }
  }

  renderFarmer1Cards = (farmer1Cards) => {

    return (
      <div className="farmer1-cards">
        {farmer1Cards.map((card) => {
          const selectedClass = card.selected ? 'selected' : '';
          return (
            <div className={`farmer1-card card ${selectedClass}`} onClick={(e) => this.onSelectFarmer1Card(card)}>
              <img className="farmer1-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderFarmer1LastCards = (farmer1LastCards) => {
    return (
      <div className="farmer1-last-cards">
        {farmer1LastCards.map((card) => {
          return (
            <div className="farmer1-last-card card">
              <img className="farmer1-last-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderFarmer2Cards = (farmer2Cards) => {
    return (
      <div className="farmer2-cards">
        {farmer2Cards.map((card) => {
          const selectedClass = card.selected ? 'selected' : '';
          return (
            <div className={`farmer2-card card ${selectedClass}`} onClick={(e) => this.onSelectFarmer2Card(card)}>
              <img className="farmer2-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderFarmer2LastCards = (farmer2LastCards) => {
    return (
      <div className="farmer2-last-cards">
        {farmer2LastCards.map((card) => {
          return (
            <div className="farmer2-last-card card">
              <img className="farmer2-last-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderLordCards = (lordCards) => {
    return (
      <div className="lord-cards">
        {lordCards.map((card) => {
          const selectedClass = card.selected ? 'selected' : '';
          return (
            <div className={`card ${selectedClass}`} onClick={(e) => this.onSelectLordCard(card)}>
              <img src={card.image} />
            </div>
          )
        })}
      </div>
    )
  }
  
  renderDecks = (decks) => {
    return (
      <div className="decks-cards">
        <Button className="" onClick={(e) => this.getRandomDeck()}>随机更换牌组</Button>
      </div>
    )
  }

  renderLastIdentity() {
    const { lastIdentity } = this.state;
    const menu = (
      <Menu onClick={this.onSelectIdentity}>
        <Menu.Item key="farmer1">
          <a target="_blank" rel="noopener noreferrer" href="javascript:;">农民1</a>
        </Menu.Item>
        <Menu.Item key="farmer2">
          <a target="_blank" rel="noopener noreferrer" href="javascript:;">农民2</a>
        </Menu.Item>
        <Menu.Item key="lord">
          <a target="_blank" rel="noopener noreferrer" href="javascript:;">地主</a>
        </Menu.Item>
      </Menu>
    );
    // const identitySrc = lastIdentity === 'lord' ? "./Atlas/Identity_Landlord.png" : "./Atlas/Identity_Farmer.png";
    // return <img className="last-identity" src={identitySrc}/>;
    return (
      <p className="last-player-hint">
        <span className="small-margin-right">上次玩家:</span> 
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            {lastIdentity} <Icon type="down" />
          </a>
        </Dropdown>
      </p>
    );
  }

  renderLastCards() {
    const { lastCards } = this.state;
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

  renderCurrentCards = (currentPlayerCards) => {
    return (
      <div className="current-player-cards">
        {currentPlayerCards.map((card) => {
          return (
            <div className="current-player-card card">
              <img className="current-player-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderDeck = (deckCards) => {
    return (
      <div className="deck-cards">
        {deckCards.map((card) => {
          const selectedClass = card.selected ? 'selected' : '';
          return (
            <div className={`deck-card card ${selectedClass}`} onClick={(e) => this.onSelectDeckCard(card)}>
              <img className="deck-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, deckCards, currentPlayerCards, farmer1LastCards, farmer2LastCards, loadedDecks } = this.state;
    return (
      <div className="app">
        <div className="farmer2" style={{ top: window.innerHeight / 2 - 21 * farmer2Cards.length, left: farmer2LastCards.length > 0 ? 298 : 190 }}>
          {this.renderFarmer2LastCards(farmer2LastCards)}
          {this.renderFarmer2Buttons()}
          {this.renderFarmer2Cards(farmer2Cards)}
        </div>
        <div className="farmer1" style={{ right: 54 - farmer1Cards.length * 20 + 44 + (farmer1LastCards.length > 0 ? 56 : 0), bottom: farmer1Cards.length * 20 - 14 + window.innerHeight / 2 - 21 * farmer1Cards.length }}>
          {this.renderFarmer1LastCards(farmer1LastCards)}
          {this.renderFarmer1Buttons()}
          {this.renderFarmer1Cards(farmer1Cards)}
        </div>
        <div className="lord">
          {this.renderCurrentCards(currentPlayerCards)}
          {this.renderLordButtons()}
          {this.renderLordCards(lordCards)}
        </div>
        <div className="deck">
          {this.renderDeck(deckCards)}
          {this.renderDeckButtons()}
        </div>
        <div className="last">
          {this.renderDecks(loadedDecks)}
          <div className="last-cards-zone">
            {this.renderLastIdentity()}
            {this.renderLastCards()}
          </div>
          
        </div>
      </div>
    )
  }
}