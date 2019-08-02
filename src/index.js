import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import './index.css';
// eslint-disable-next-line
import { nullLiteral } from '@babel/types';

class App extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        startingDeck : [],
        deck: [],
        discardDeck: [],
        deckCount: 0 , // props.deckCount, 
        dealer: null,
        player: null,
        wallet: 0,
        inputValue: '', 
        currentBet: null,
        gameOver: false,
        message: null,
       };
     }
   

  generateDeck() {
      const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
      const suits = ['♦','♣','♥','♠'];  
      const deck = [];
     
      for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < suits.length; j++) {
          deck.push({number: cards[i], suit: suits[j]});
        }
      }
           
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {startingDeck: deck}
      });
       //console.log(deck);
      return (deck);
    }
    
    dealCards(deck) {
      const playerCard1 = this.getRandomCard(deck);
      const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck);
      const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck);  
         
      const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
      const dealerStartingHand = [dealerCard1.randomCard, {}];
      
      const player = {
        cards: playerStartingHand,
        count: this.getCount(playerStartingHand) //,
        };
      const dealer = {
        cards: dealerStartingHand,
        count: this.getCount(dealerStartingHand)
      };
      
      return {updatedDeck: playerCard2.updatedDeck, player, dealer};
    }
  
 difference(a1, a2) {
      var result = [];
      for (var i = 0; i < a1.length; i++) {
        if (a2.indexOf(a1[i]) <0) {
          result.push(a1[i]);
        }
      }
      return result;
    }
  
    startNewGame(type) {
       if (type === 'continue') {
        if (this.state.wallet > 0) {
          const deck = (this.state.deck.length < 10) ? this.generateDeck() : this.state.deck;
          const { updatedDeck, player, dealer } = this.dealCards(deck);
                    
          this.setState({
            deck: updatedDeck,
            discardDeck : this.state.discardDeck,
            dealer,
            player,
            currentBet: null,
            gameOver: false,
            message: "Place Bet!",
          });
        
        
          console.log(deck); //accurate
          var ooDeck = this.generateDeck()
          var b1 = deck
          var x1 = ooDeck.filter(item1 => 
            !b1.some(item2 => (item2.number === item1.number && item2.suit === item1.suit)))
          
           console.log(x1);
            
        
          setTimeout( () => {
          var regex = /[JQKA]/;
          var dc = 0; //this.state.deckCount;
          for(var i=0; i < x1.length; i++){
           var num = x1[i].number;
           // console.log(discardDeck[i].number)
            if (num > 1 && num < 7)
            { dc++ }
            else if (num === 10 || String(num).match(regex))
            {
             dc--
            }
            console.log(dc)
                   }
            this.setState({
                    deckCount: dc
          });
        }, 100);    
               
        
        } else {
          this.setState({ message: 'Game over! You are broke! Please start a new game.', 
          discardDeck :[]
             });
       // console.log(this.state.discardDeck)
            }
      } else {
        const deck = this.generateDeck();
       const { updatedDeck, player, dealer } = this.dealCards(deck);
   
       /* ??? prove out following code is needed here */
      // this.setState({discardDeck :[] });
  
        this.setState({
          deck: updatedDeck,
          discardDeck : [],
          deckCount: this.state.deckCount, // high low count for (-) hold or (+) bet ... guidance
          dealer,
          player,
          wallet: 1000,
          inputValue: '',
          currentBet: null,
          gameOver: false,
          message: "Place Bet!",
        });
     
       
    console.log(deck); //accurate
    var oDeck = this.generateDeck()
    var b = deck
    var x = oDeck.filter(item1 => 
      !b.some(item2 => (item2.number === item1.number && item2.suit === item1.suit)))
    console.log(x);
  
  
  
    setTimeout( () => {
    var regex = /[JQKA]/;
    var dc = 0; //this.state.deckCount;
    for(var i=0; i < x.length; i++){
     var num = x[i].number;
     // console.log(discardDeck[i].number)
      if (num > 1 && num < 7)
      { dc++ }
      else if (num === 10 || String(num).match(regex))
      {
       dc--
      }
      console.log(dc)
             }
      this.setState({
              deckCount: dc
    });
  }, 100);
    
      }
    }

    getRandomCard(deck) {
     // var discardDeck = this.state.discardDeck; 
      const updatedDeck = deck;
      const randomIndex = Math.floor(Math.random() * updatedDeck.length);
      const randomCard = updatedDeck[randomIndex];
      updatedDeck.splice(randomIndex, 1);
   
   // discardDeck.push(randomCard);
    //discardDeck = [...discardDeck]
   // this.setState({
   //   discardDeck: [...this.state.discardDeck, randomCard]
 // })
    
 console.log(updatedDeck);
 //console.log(deck); //accurate
    var oooDeck = this.generateDeck()
    var b2 = deck
    var x2 = oooDeck.filter(item1 => 
      !b2.some(item2 => (item2.number === item1.number && item2.suit === item1.suit)))
    console.log(x2);
  
  
  
    setTimeout( () => {
    var regex = /[JQKA]/;
    var dc = 0; //this.state.deckCount;
    for(var i=0; i < x2.length; i++){
     var num = x2[i].number;
     // console.log(discardDeck[i].number)
      if (num > 1 && num < 7)
      { dc++ }
      else if (num === 10 || String(num).match(regex))
      {
       dc--
      }
      console.log(dc)
             }
      this.setState({
              deckCount: dc
    });
  }, 100);



 //this.determindiscarddeck() 
   
  // this.countDiscardDeck(this.state.discardDeck);
     
   return { randomCard, updatedDeck};
    }
  
  
  
  
    countDiscardDeck(discardDeck) {
    var regex = /[JQKA]/;
    var dc =0 ;
   
    for(var i=0; i < discardDeck.length; i++){
     var num = discardDeck[i].number;
    // console.log(discardDeck[i].number)
     if (num > 1 && num < 7)
     {dc++  //this.incrementCount()
     }
     else if (num === 10 || String(num).match(regex))
     {dc-- // this.decrementCount()
    }
    }   
    //console.log(dc)
   
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {deckCount: dc}
    });
  }
  
    placeBet() {
      const currentBet = this.state.inputValue;
      if (currentBet > this.state.wallet) {
        this.setState({ message: 'Insufficient funds to bet that amount.' });
      } else if (currentBet % 1 !== 0) {
        this.setState({ message: 'Please bet whole numbers only.' });
      } else {
       // Deduct current bet from wallet
       const wallet = this.state.wallet - currentBet;
           this.setState({ wallet, inputValue: '', currentBet, message:null});
      }
    }
    
    hit() {
     
      if (!this.state.gameOver) {
        if (this.state.currentBet) {
          const { randomCard, updatedDeck } = this.getRandomCard(this.state.deck);
          const player = this.state.player;
          player.cards.push(randomCard);
          player.count = this.getCount(player.cards);
      
  
          if (player.count > 21) {
            this.setState({ player, gameOver: true, message: 'BUST!' });
          } else {
            this.setState({ deck: updatedDeck, player });
          }
        } else {
          this.setState({ message: 'Please place bet.' });
        }
      } else {
        this.setState({ message: 'Game over! Please start a new game.' });
      }
  
  console.log(this.state.deck)
  
  
    }
    
    dealerDraw(dealer, deck) {
      const { randomCard, updatedDeck } = this.getRandomCard(deck);
      dealer.cards.push(randomCard);
      dealer.count = this.getCount(dealer.cards);
      return { dealer, updatedDeck };
    }
    
    getCount(cards) {
      const rearranged = [];
      cards.forEach(card => {
        if (card.number === 'A') {
          rearranged.push(card);
        } else if (card.number) {
          rearranged.unshift(card);
        }
          // (card.number === 'A') ? rearranged.push(card) : rearranged.unshift(card);
              });
      
      return rearranged.reduce((total, card) => {
        if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
          return total + 10;
        } else if (card.number === 'A') {
          return (total + 11 <= 21) ? total + 11 : total + 1;
        } else {
          return total + card.number;
        }
      }, 0);
    }
    
    stand() {
      if (!this.state.gameOver) {
        // Show dealer's 2nd card
        const randomCard = this.getRandomCard(this.state.deck);
        let deck = randomCard.updatedDeck;
        let dealer = this.state.dealer;
        //dealer.cards.forEach(card => {alert(card.number)});
        //last card is undefined so pop from array, place holder {}.
        dealer.cards.pop();
        dealer.cards.push(randomCard.randomCard);
        dealer.count = this.getCount(dealer.cards);
  
        // Keep drawing cards until count is 17 or more
        while(dealer.count < 17) {
          const draw = this.dealerDraw(dealer, deck);
          dealer = draw.dealer;
          deck = draw.updatedDeck;
        }
  
        if (dealer.count > 21) {
          this.setState({
            deck,
            dealer,
            wallet: this.state.wallet + this.state.currentBet * 2,
            gameOver: true,
            message: 'Dealer bust! You win!'
          });
        } else {
          const winner = this.getWinner(dealer, this.state.player);
          let wallet = this.state.wallet;
          let message;
          
          if (winner === 'dealer') {
            message = 'Dealer wins...';
          } else if (winner === 'player') {
            wallet += this.state.currentBet * 2;
            message = 'You win!';
          } else {
            wallet += this.state.currentBet;
            message = 'Push.';
          }
          
          this.setState({
            deck, 
            dealer,
            wallet,
            gameOver: true,
            message
          });
        } 
      } else {
        this.setState({ message: 'Game over! Please start a new game.' });
      }
    }
    
    placeBet2 (amount){
      var inputValue = this.state.inputValue;
     if (inputValue === ''){
     // eslint-disable-next-line 
      inputValue = amount;
     } else {
     // alert(amount );
     // eslint-disable-next-line
      inputValue = inputValue + amount;       
     }
      this.setState({inputValue });
    }
    
    getWinner(dealer, player) {
      if (dealer.count > player.count) {
        return 'dealer';
      } else if (dealer.count < player.count) {
        return 'player';
      } else {
          return 'push';
      }
    }
    
    inputChange(e) {
      const inputValue = +e.target.value;
      this.setState({inputValue});
    }
    
    handleKeyDown(e) {
      const enter = 13;
      console.log(e.keyCode);
      
      if (e.keyCode === enter) {
        this.placeBet();
      }
    }
    
    componentWillMount() {
      this.startNewGame();
      const body = document.querySelector('body');
      body.addEventListener('keydown', this.handleKeyDown.bind(this));
      }





//determine discarddeck and deckcount from current state of deck
   determindiscarddeck (){
    var oDeck = this.generateDeck()
    var b = this.state.deck
    var discarddeck = oDeck.filter(item1 => 
      !b.some(item2 => (item2.number === item1.number && item2.suit === item1.suit)))
    
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {discardDeck: discarddeck}
      });
      
   
  return discarddeck

        // var regex = /[JQKA]/;
        // var dc = 0; //this.state.deckCount;
        // for(var i=0; i < x.length; i++){
        //  var num = x[i].number;
        //  // console.log(discardDeck[i].number)
        //   if (num > 1 && num < 7)
        //   { dc++ }
        //   else if (num === 10 || String(num).match(regex))
        //   {
        //    dc--
        //   }
        //   console.log(dc)
        //          }
        //   this.setState({
        //           deckCount: dc
        // });

  }




      componentDidMount() {
        setTimeout( () => {
          var oDeck = this.generateDeck()
          console.log(oDeck);
          console.log(this.state.deck);
          var b = this.state.deck
          console.log(this.state.discardDeck);
          console.log(b);

          var x = oDeck.filter(item1 => 
            !b.some(item2 => (item2.number === item1.number && item2.suit === item1.suit)))


          // var x = oDeck.filter(n => !b.includes(n));
          // var x = oDeck.map(function(item, index) {
          //   // In this case item correspond to currentValue of array a, 
          //   // using index to get value from array b
          //   return item - b[index];
          // })
          console.log(x);
                 
          var regex = /[JQKA]/;
          var dc = 0; //this.state.deckCount;
          for(var i=0; i < x.length; i++){
           var num = x[i].number;
           // console.log(discardDeck[i].number)
            if (num > 1 && num < 7)
            { dc++ }
            else if (num === 10 || String(num).match(regex))
            {
             dc--
            }
            console.log(dc)
                   }
            this.setState({
                    deckCount: dc
          });
        }, 100);
        //alert(this.state.deckCount);
        //alert(this.state.discardDeck)
      }

    
    render() {
     
     

      return (

       
       <div className= "grid-container">
       <h3 className="dCount" >Count : {this.state.deckCount}  </h3>
         <button className='d1' title="New Game & Resets Wallet"onClick={() => {this.startNewGame()}}>New Game</button>
          <p className="wallet" >Wallet : ${ this.state.wallet }</p>
         {
         !this.state.currentBet ? 
           <table  className="tableBet" >
            <tbody>
            <tr>
            <td> <button className='b1' title="Place $5 bet" onClick={() => {this.placeBet2(5)}}>$5</button> </td>
            <td> <button className='b2' title="Place $10 bet" onClick={() => {this.placeBet2(10)}}>$10</button> </td>
           <td> <button className='b3' title="Place $25 bet" onClick={() => {this.placeBet2(25)}}>$25</button> </td>
            </tr>
            </tbody>
            </table>
 : null
}

{
         !this.state.currentBet ? 
            <form className="betValue">
               <input type="number"  min="10" max="1000" step="20" name="bet" placeholder="$ Wager" value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
              </form>
   : null
  }
  {
         !this.state.currentBet ? 
<button className="d4" title="Place Total Wager" onClick={() => {this.placeBet()}}>Wager</button>
              
            : null
          }
         
          {
            this.state.gameOver ?
            // <div className="buttons">
              <button className="d5" onClick={() => {this.startNewGame('continue')}}>Continue</button>
            // </div>
             : null
          }

          {   
            this.state.currentBet ? 
            <p className="player">Your Hand ({ this.state.player.count })</p>
      : null  
      }
          {   
            this.state.currentBet ? 
                <button className='d2' onClick={() => {this.hit()}}>Hit</button>
                : null
            }
               {   
            this.state.currentBet ? 
                <button className='d3' onClick={() => {this.stand()}}>Stay</button>
                : null  
              }

        {
           this.state.currentBet ? 
        <table className="playercards">
          <tbody>
            <tr>
              { this.state.player.cards.map((card, i) => {
                return <Card key={i} number={card.number} suit={card.suit}/>
              }) }
            </tr>
            </tbody>
          </table>
          
          : null
            } 
         
          {
           this.state.currentBet ? 
          
          <p className="dealer">Dealer's Hand ({ this.state.dealer.count })</p>
           
          : null
          }

        {
           this.state.currentBet ? 
          
          <table className="dealercards">
           <tbody>
            <tr>
              { this.state.dealer.cards.map((card, i) => {
                return <Card key={i} number={card.number} suit={card.suit}/>;
              }) }
            </tr>
            </tbody>
          </table>
          
          : null
           }
       
        {
           this.state.currentBet ? 
        <p className = "bet" >Wager : ${ this.state.currentBet}</p>
       : null
        }

      {/* {
           this.state.currentBet ? 
           <h3 className="dCount" >DeckCount : {this.state.deckCount} </h3>
       : null
        } */}


          <p className="gmessage" > { this.state.message }</p>
           <br/>        
        <a className="footermessage" href="https://fir-crudapp-73d69.firebaseapp.com">KPSdev.org</a>
      </div>
      );
    }
  };
 
  
  const Card = ({ number, suit }) => {
    const combo = (number) ? `${number}${suit}` : null;
    const color = (suit === '♦' || suit === '♥') ? 'card-red' : 'card';
     
    return (
      <td>
        <div className={color}>
          { combo }
        </div>
      </td>
    );
    
  };

  ReactDOM.render(<App />, document.getElementById('main'));
