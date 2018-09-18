import React, { Component } from 'react';
import axios from 'axios';
import { Menu, Dropdown, Icon, Pagination } from 'antd';
import { shuffle, getRandomIntInclusive } from './tool'
import { config } from './config'
import Button from './button'
import './App.css'

export default class App extends Component {

  currentSnapshotIndex = 0;

  state = {
    farmer1Cards: [],
    farmer1LastCards: [],
    farmer2Cards: [],
    farmer2LastCards: [],
    lordCards: [],
    lordLastCards: [],
    lastCards: [],
    deckCards: [],
    lastIdentity: "lord",
    loadedDecks: [],
    showButtons: [false, false, false],
    snapshots: [],
    isViewMode: false,
    totalSnapshots: 1,
    currentSnapshotIndex: 1,
  }

  deck = [
    // { id: 0, value: 0x00, image: "./pass.png", weight: 1000 },
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
    window.onresize = this.resize;
    this.initialize();
  }

  initialize = () => {
    // 读取预设好的牌组
    this.loadDecks();
    this.dealCards();

    setTimeout(() => {
      this.sortCards();
    }, 1000);
  }

  resize = () => {
    const { farmer1Cards, farmer1LastCards, farmer2Cards, farmer2LastCards, lordCards, lordLastCards, deckCards, lastCards } = this.state;

    this.setState({
      farmer1Cards: [...farmer1Cards],
      farmer1LastCards: [...farmer1LastCards],
      farmer2Cards: [...farmer2Cards],
      farmer2LastCards: [...farmer2LastCards],
      lordCards: [...lordCards],
      lordLastCards: [...lordLastCards],
      lastCards: [...lastCards],
      deckCards: [...deckCards],
    })
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

  onLastSnapshot = () => {
    const { snapshots } = this.state;
    const currentSnapshot = snapshots[this.currentSnapshotIndex];
    const { player_identity } = currentSnapshot;
    switch(player_identity) {
      case 0: this.setState({ lordLastCards: [] }); break;
      case 1: this.setState({ farmer1LastCards: [] }); break;
      case 2: this.setState({ farmer2LastCards: [] }); break;
    }

    this.currentSnapshotIndex--;

    if (snapshots.length === 0 || this.currentSnapshotIndex < 0) {
      alert("没有上一步了");
    } else {
      const lastSnapshot = snapshots[this.currentSnapshotIndex];
      this.setState({ currentSnapshotIndex: this.currentSnapshotIndex });
      this.generateDeckBySnapshot(lastSnapshot);
    }
  }

  onNextSnapshot = () => {
    const { snapshots } = this.state;
    if (snapshots.length === 0 || this.currentSnapshotIndex === snapshots.length) {
      alert("没有下一步了");
    } else {
      this.setState({ currentSnapshotIndex: this.currentSnapshotIndex });
      const snapshot = snapshots[this.currentSnapshotIndex];
      this.generateDeckBySnapshot(snapshot);
      this.currentSnapshotIndex++;
    }
  }

  generateDeckBySnapshot(snapshot) {
    const identityMaps = {
      "0": "lord",
      "1": "farmer1",
      "2": "farmer2",
    };
    const { farmer1_handcard, farmer2_handcard, last_identity, last_playcard, lord_handcard, player_identity, result } = snapshot;
    const deckCards = this.deck.filter((card) => !farmer1_handcard.includes(card.id) && !farmer2_handcard.includes(card.id) && !lord_handcard.includes(card.id));
    this.setState({
      farmer1Cards: this.reformatCards(farmer1_handcard).sort(this.sortRule),
      farmer2Cards: this.reformatCards(farmer2_handcard).sort(this.sortRule),
      lastIdentity: identityMaps[last_identity],
      lastCards: this.reformatCards(last_playcard).sort(this.sortRule),
      lordCards: this.reformatCards(lord_handcard).sort(this.sortRule),
      currentIdentity: identityMaps[player_identity],
      deckCards: deckCards.sort(this.sortRule),
    });

    let resultCards = this.reformatCards(result).sort(this.sortRule);
    // 要不起 没有要出的牌
    if (result.length === 0) {
      resultCards = [{ id: 0, value: 0x00, image: "./pass.png", weight: 1000 }]
    }

    switch(player_identity) {
      case 0: {
        this.setState({
          lordLastCards: this.reformatCards([]).sort(this.sortRule), 
        });

        setTimeout(() => {
          this.setState({ 
            lordLastCards: resultCards, 
            lordCards: this.reformatCards(lord_handcard.filter((card) => !result.includes(card))).sort(this.sortRule) 
          })
        }, 300);
        
      }; break;
      case 1: {
        this.setState({
          farmer1LastCards: this.reformatCards([]).sort(this.sortRule), 
        });

        setTimeout(() => {
          this.setState({ 
            farmer1LastCards: resultCards, 
            farmer1Cards: this.reformatCards(farmer1_handcard.filter((card) => !result.includes(card))).sort(this.sortRule) 
          });
        }, 300);
      }; break;
      case 2: {
        this.setState({
          farmer2LastCards: this.reformatCards([]).sort(this.sortRule), 
        });

        setTimeout(() => {
          this.setState({ 
            farmer2LastCards: resultCards, 
            farmer2Cards: this.reformatCards(farmer2_handcard.filter((card) => !result.includes(card))).sort(this.sortRule) 
          });
        }, 300);
      }; break;
    }
  }


  onSmartFarmer1Cards = (e) => {
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, farmer1LastCards, deckCards } = this.state;
    
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
      const { handcard, status } = data;
      if (!status) {
        alert('接口调用失败');
        return;
      }
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const hasFarmer1LastCards = farmer1LastCards.length > 0;
        const selectedCards = farmer1Cards.filter((card) => handcard.includes(card.id));
        this.setState({
          deckCards: hasFarmer1LastCards ? deckCards.concat(farmer1LastCards) : deckCards,
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
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, farmer2LastCards, deckCards } = this.state;
    
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
      const { handcard, status } = data;
      if (!status) {
        alert('接口调用失败');
        return;
      }
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const hasFarmer2LastCards = farmer2LastCards.length > 0;
        const selectedCards = farmer2Cards.filter((card) => handcard.includes(card.id));
        this.setState({
          deckCards: hasFarmer2LastCards ? deckCards.concat(farmer2LastCards) : deckCards,
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
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, deckCards, lordLastCards } = this.state;
    
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
      const { handcard, status } = data;
      if (!status) {
        alert('接口调用失败');
        return;
      }
      if (handcard.length === 0) {
        alert("没有要出的手牌");
      } else {
        const hasLordLastCards = lordLastCards.length > 0;
        const selectedCards = lordCards.filter((card) => handcard.includes(card.id));
        this.setState({
          deckCards: hasLordLastCards ? deckCards.concat(lordLastCards) : deckCards,
          lordCards: lordCards.filter((card) => !handcard.includes(card.id)),
          lordLastCards: selectedCards,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onRedrawLordCards = (e) => {
    const { lordCards, lordLastCards } = this.state;
    this.setState({
      lordLastCards: [],
      lordCards: lordCards.concat(lordLastCards),
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
    const { deckCards, lastCards, lastIdentity } = this.state;
    const selectedDeckCards = deckCards.filter((card) => card.selected);
    let showButtons = [false, false, false];

    if (deckCards.length > 0 && lastIdentity !== '请选择') {
      switch(lastIdentity) {
        case 'lord': showButtons = [true, false, false]; break;
        case 'farmer1': showButtons = [false, true, false]; break;
        case 'farmer2': showButtons = [false, false, true]; break;
      }
    }
    this.setState({
      showButtons,
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

  onPutLastCardsToDeck = () => {
    const { lastCards, deckCards } = this.state;
    const selectedLastCards = lastCards.filter((card) => card.selected);
    this.setState({ 
      lastCards: lastCards.filter((card) => !card.selected),
      deckCards: deckCards.concat(selectedLastCards.map((card) => {card.selected = false; return card;})),
      showButtons: [false, false, false],
    });
  }

  onPutAllLastCardsToDeck = () => {
    const { lastCards, deckCards } = this.state;
    this.setState({ 
      lastCards: [],
      deckCards: deckCards.concat(lastCards),
      showButtons: [false, false, false],
    });
  }

  onDealLordCards = () => {
    const { farmer1Cards, farmer1LastCards, lastCards, farmer2Cards, farmer2LastCards, lordLastCards, lordCards } = this.state;
    const selectedLordCards = lordCards.filter((card) => card.selected);

    if (lastCards.length > 0) {
      this.setState({
        farmer1Cards: farmer1Cards.concat(farmer1LastCards),
        farmer2Cards: farmer2Cards.concat(farmer2LastCards),
      }, () => {
        this.setState({ 
          lordCards: lordCards.filter((card) => !card.selected),
          lordLastCards: lordLastCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
          lastIdentity: "Lord",
          lastCards: lordLastCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
        });
      });
    } else {
      this.setState({ 
        lordCards: lordCards.filter((card) => !card.selected),
        lordLastCards: lordLastCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
        lastIdentity: "Lord",
        lastCards: lordLastCards.concat(selectedLordCards.map((card) => {card.selected = false; return card;})),
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
      farmer1LastCards: [],
      farmer1Cards: farmer1Cards.concat(farmer1LastCards),
    });
  }

  onRedrawFarmer2Cards = () => {
    const { farmer2Cards, farmer2LastCards } = this.state;

    this.setState({
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

  onSelectLastCard = (card) => {
    const { lastCards } = this.state;
    card.selected = !card.selected;

    this.setState({ lastCards: [...lastCards] });
  }

  onSelectIdentity = ({ key }) => {
    this.setState({ lastIdentity: key, showButtons: [true, true, true] })
  }

  onSelectDeck = (deck) => {
    this.loadDeck(deck);
  }

  loadDeck = (deck) => {
    const farmer1Cards = this.deck.filter((card) => deck.f1.includes(card.id));
    const farmer2Cards = this.deck.filter((card) => deck.f2.includes(card.id));
    const lordCards = this.deck.filter((card) => deck.l.includes(card.id));
    const lastCards = this.deck.filter((card) => deck.lastCard.includes(card.id));
    const deckCards = this.deck.filter((card) => !deck.f1.includes(card.id) && !deck.f2.includes(card.id) && !deck.l.includes(card.id) && !deck.lastCard.includes(card.id));
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
      farmer1Cards: farmer1Cards.sort(this.sortRule),
      farmer2Cards: farmer2Cards.sort(this.sortRule),
      lordCards: lordCards.sort(this.sortRule),
      lastCards: lastCards.sort(this.sortRule),
      lastIdentity,
      showButtons,
      deckCards: deckCards.sort(this.sortRule),
      farmer1LastCards: [],
      farmer2LastCards: [],
      lordLastCards: [],
    });
  }

  onEnterViewMode = () => {
    this.setState({ isViewMode: true });
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, lastIdentity, deckCards, lordLastCards } = this.state;
    
    let lastPlayerIdentity = 0;
    switch(lastIdentity) {
      case 'farmer1': lastPlayerIdentity = 1; break;
      case 'farmer2': lastPlayerIdentity = 2; break;
    }

    axios.post(config.GAME_TABLE_URL, {
      lordCards: this.formatCards(lordCards),
      farmer1Cards: this.formatCards(farmer1Cards),
      farmer2Cards: this.formatCards(farmer2Cards),
      lastPlayerCards: this.formatCards(lastCards),
      playerIdentity: 0,
      lastPlayerIdentity: lastPlayerIdentity,
    })
    .then((response) => {
      const { data } = response;
      console.log('data: ', data);
      const { snapshots, status } = data;
      if (!status) {
        alert('接口调用失败');
        return;
      }
      if (snapshots.length === 0) {
        alert("没有自动生成的牌组");
      } else {
        this.setState({ snapshots, totalSnapshots: snapshots.length });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onExitViewMode = () => {
    this.currentSnapshotIndex = 0;
    this.setState({ 
      isViewMode: false, 
      lastCards: [], 
      farmer1LastCards: [], 
      farmer2LastCards: [], 
      lordLastCards: [],
    });
  }

  getRandomDeck() {
    const { loadedDecks } = this.state;
    const index = getRandomIntInclusive(1, loadedDecks.length);
    const deck = loadedDecks[index - 1];
    this.loadDeck(deck);
  }

  formatCards(cards) {
    return cards.map((card) => {
      return card.value;
    });
  }

  reformatCards(cards) {
    return this.deck.filter((card) => cards.includes(card.id));
  }

  renderLordButtons() {
    const { showButtons, lordLastCards, lordCards, isViewMode } = this.state;
    const showSmartPushButton = showButtons[0];
    const showPutLordCardsToDeckButton = lordCards.filter((card) => card.selected).length > 0;
    const showRedrawLoadCardsButton = lordLastCards.length > 0;
    return (
      <div className="lord-buttons">
        <img className="lord-identity" src="./Atlas/Identity_Landlord.png" />
        <Button onClick={this.onDealLordCards} className="small-margin-right" style={{ display: 'none'}}>出牌</Button>
        <Button onClick={this.onEnterViewMode} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block' }}>生成牌局</Button>
        <Button onClick={this.onExitViewMode} className="small-margin-right" style={{ display: isViewMode ? 'inline-block' : 'none' }}>退出牌局</Button>
        <Button onClick={this.onSmartLordCards} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block' }}>智能出牌</Button>
        <Button onClick={this.onRedrawLordCards} className="small-margin-right" style={{ display: showRedrawLoadCardsButton && !isViewMode ? 'inline-block' : 'none' }}>放回手牌</Button>
        <Button onClick={this.onPutToDeck} className="small-margin-right" style={{ display: showPutLordCardsToDeckButton && !isViewMode ? 'inline-block' : 'none' }}>放回牌堆</Button>
        <Button onClick={this.onSortCards} style={{ display: isViewMode ? 'none' : 'inline-block' }}>一键排序</Button>
        {this.renderPagination()}
      </div>
    )
  }

  renderPagination() {
    const { isViewMode, totalSnapshots } = this.state;
    if (isViewMode) {
      return  <Pagination simple defaultCurrent={1} total={totalSnapshots} pageSize={1} />;
    }
    return null;
  }

  renderFarmer1Buttons() {
    const { showButtons, farmer1LastCards, farmer1Cards, isViewMode } = this.state;
    const showSmartPushButton = showButtons[1];
    const showPutFarmer1CardsToDeckButton = farmer1Cards.filter((card) => card.selected).length > 0;
    const showRedrawFarmer1CardsButton = farmer1LastCards.length > 0;
    return (
      <div className="farmer1-buttons">
        <img className="farmer1-identity" src="./Atlas/Identity_Farmer.png" />
        <Button onClick={this.onDealFarmer1Cards} className="small-margin-right" style={{ display: 'none'}}>出牌</Button>
        <Button onClick={this.onSmartFarmer1Cards} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block' }}>智能出牌</Button>
        <Button onClick={this.onRedrawFarmer1Cards} className="small-margin-right" style={{ display: showRedrawFarmer1CardsButton && !isViewMode ? 'inline-block' : 'none' }}>放回手牌</Button>
        <Button onClick={this.onPutFarmer1CardsToDeck} style={{ visibility: showPutFarmer1CardsToDeckButton && !isViewMode ? 'visible' : 'hidden' }}>放回牌堆</Button>
      </div>
    )
  }

  renderFarmer2Buttons() {
    const { showButtons, farmer2LastCards, farmer2Cards, isViewMode } = this.state;
    const showSmartPushButton = showButtons[2];
    const showPutFarmer2CardsToDeckButton = farmer2Cards.filter((card) => card.selected).length > 0;
    const showRedrawFarmer2CardsButton = farmer2LastCards.length > 0;
    return (
      <div className="farmer2-buttons">
        <img className="farmer2-identity" src="./Atlas/Identity_Farmer.png" />
        <Button onClick={this.onDealFarmer2Cards} className="small-margin-right" style={{ display: 'none'}}>出牌</Button>
        <Button onClick={this.onSmartFarmer2Cards} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block' }}>智能出牌</Button>
        <Button onClick={this.onRedrawFarmer2Cards} className="small-margin-right" style={{ display: showRedrawFarmer2CardsButton && !isViewMode ? 'inline-block' : 'none' }}>放回手牌</Button>
        <Button onClick={this.onPutFarmer2CardsToDeck} style={{ visibility: showPutFarmer2CardsToDeckButton && !isViewMode ? 'visible' : 'hidden' }}>放回牌堆</Button>
      </div>
    )
  }

  renderDeckButtons() {
    const { deckCards, isViewMode } = this.state;
    if (deckCards.length > 0) {
      return (
        <div className="deck-buttons">
          <Button onClick={this.onPutToLeft} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block'}}>放入左侧</Button>
          <Button onClick={this.onPutToBottom} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block'}}>放入下方</Button>
          <Button onClick={this.onPutToRight} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block'}}>放入右侧</Button>
          <Button onClick={this.onPutDeckToLastCards} className="small-margin-right" style={{ display: isViewMode ? 'none' : 'inline-block'}}>放入上次出牌</Button>
        </div>
      )
    }
  }

  renderLastCardsButtons() {
    const { lastCards, isViewMode } = this.state;
    const showPutLastCardsToDecksButton = lastCards.filter((card) => card.selected).length > 0;
    if (lastCards.length > 0) {
      return (
        <div className="last-cards-buttons">
          <Button onClick={this.onPutLastCardsToDeck} className="small-margin-right" style={{ display: showPutLastCardsToDecksButton && !isViewMode ? 'inline-block' : 'none'}}>放回牌堆</Button>
          <Button onClick={this.onPutAllLastCardsToDeck} style={{ display: isViewMode ? 'none' : 'inline-block'}}>全部放回牌堆</Button>
        </div>
      )
    } 
    return null;
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
  
  renderThumbnails = () => {
    // const { snapshots, isViewMode } = this.state;
    // if (isViewMode) {
    //   return (
    //     <div className="thumbnails">
    //       {snapshots.map((snapshot, index) => {
    //         return <div className="thumbnail">index</div>;
    //       })}
    //     </div>
    //   )
    // }
    return null;
  }

  renderDecks = (decks) => {
    const { isViewMode } = this.state;
    return (
      <div className="decks-cards">
        <Button className="" onClick={(e) => this.getRandomDeck()} style={{ display: isViewMode ? 'none' : 'inline-block'}}>随机更换牌组</Button>
      </div>
    )
  }

  renderLastIdentity() {
    const { lastIdentity, isViewMode } = this.state;
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

    if (isViewMode) {
      return (
        <p className="last-player-hint">
          <span className="small-margin-right">上次玩家:</span> 
          <span style={{ color: '#1890ff'}}>{lastIdentity}</span>
        </p>
      )
    }
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
          const selectedClass = card.selected ? 'selected' : '';
          return (
            <div className={`card last-card ${selectedClass}`} onClick={(e) => this.onSelectLastCard(card)}>
              <img className="last-card-img" src={card.image} />
            </div>
          )
        })}
      </div>
    );
  }

  renderCurrentCards = (lordLastCards) => {
    return (
      <div className="current-player-cards">
        {lordLastCards.map((card) => {
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
    const { lordCards, farmer1Cards, farmer2Cards, lastCards, deckCards, lordLastCards, farmer1LastCards, farmer2LastCards, loadedDecks, isViewMode } = this.state;
    const isViewModeMargin = isViewMode ? 150 : 0;
    return (
      <div className="app">
        <div className="previous-snapshot" onClick={this.onLastSnapshot} style={{ display: isViewMode ? 'flex' : 'none'}}>{'<'}</div>
        <div className="next-snapshot" onClick={this.onNextSnapshot} style={{ display: isViewMode ? 'flex' : 'none'}}>{'>'}</div>
        <div className="farmer2" style={{ top: window.innerHeight / 2 - 21 * farmer2Cards.length, left: farmer2LastCards.length > 0 ? 298 + isViewModeMargin: 190 + isViewModeMargin }}>
          {this.renderFarmer2LastCards(farmer2LastCards)}
          {this.renderFarmer2Buttons()}
          {this.renderFarmer2Cards(farmer2Cards)}
        </div>
        <div className="farmer1" style={{ right: 54 - farmer1Cards.length * 20 + 44 + (farmer1LastCards.length > 0 ? 56 : 0) + isViewModeMargin, bottom: farmer1Cards.length * 20 - 14 + window.innerHeight / 2 - 21 * farmer1Cards.length }}>
          {this.renderFarmer1LastCards(farmer1LastCards)}
          {this.renderFarmer1Buttons()}
          {this.renderFarmer1Cards(farmer1Cards)}
        </div>
        <div className="lord">
          {this.renderCurrentCards(lordLastCards)}
          {this.renderLordButtons()}
          {this.renderLordCards(lordCards)}
          {this.renderThumbnails()}
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
            {this.renderLastCardsButtons()}
          </div>
        </div>
        
      </div>
    )
  }
}