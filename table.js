"use strict";

const btnStartRound = document.querySelector(".btn-start");
const player1Card1El = document.querySelector(".player1-card1");
const player1Card1NumberEl = document.querySelectorAll(".player1-card1-number");
const player1Card1SuitEl = document.querySelector(".player1-card1-suit");

const player1Card2El = document.querySelector(".player1-card2");
const player1Card2NumberEl = document.querySelectorAll(".player1-card2-number");
const player1Card2SuitEl = document.querySelector(".player1-card2-suit");

const player1Card3El = document.querySelector(".player1-card3");
const player1Card3NumberEl = document.querySelectorAll(".player1-card3-number");
const player1Card3SuitEl = document.querySelector(".player1-card3-suit");

const player2Card1El = document.querySelector(".player2-card1");
const player2Card2El = document.querySelector(".player2-card2");
const player2Card3El = document.querySelector(".player2-card3");
const player3Card1El = document.querySelector(".player3-card1");
const player3Card2El = document.querySelector(".player3-card2");
const player3Card3El = document.querySelector(".player3-card3");
const player4Card1El = document.querySelector(".player4-card1");
const player4Card2El = document.querySelector(".player4-card2");
const player4Card3El = document.querySelector(".player4-card3");
const playerCardsEl = document.querySelectorAll(".player-card");

const trumpNumbersEl = document.querySelectorAll(".trump-number");
const trumpSuitInfoEl = document.querySelectorAll(".suit-info");

const mountFlipCardEl = document.querySelector(".mount-trump");
const mountFlipCardSuitEl = document.querySelector(".flip-suit-img");
const mountFlipCardNumberEl = document.querySelector(".flip-number");

let deck = [];
let card = []; //card array items = [index, number, suit, power]
const cardNumbers = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
const cardSuits = ["diamond", "spade", "heart", "club"];
const isMyTurn = false;

//FLIPPED AND TRUMP CARDS
let flippedCard = [];
let flippedPower;
let flippedNumber;
let flippedSuit;
let power;
let trumpCards = [];

//PLAYERS
let handPlayer1 = [];
let handPlayer2 = [];
let handPlayer3 = [];
let handPlayer4 = [];

//ROUND CARDS
let roundCards = [];

btnStartRound.addEventListener("click", function () {
  //STARTS ROUND
  createDeck();
  shuffle(deck);
  handOutCards(handPlayer1);
  handOutCards(handPlayer2);
  handOutCards(handPlayer3);
  handOutCards(handPlayer4);
  flipCard();
  findsTrump();
  ChangeTrumpPower();

  //TO BE DELETED
  // console.log(deck);
  console.log(handPlayer1);
  console.log(handPlayer2);
  console.log(handPlayer3);
  console.log(handPlayer4);
  // console.log(flippedCard);
  // console.log(power);
  // console.log(trumpCards);

  btnStartRound.classList.add("hidden");

  //SETTING UP THE FLIPPED CARD
  mountFlipCardEl.classList.add(`card-${flippedSuit}`);
  mountFlipCardSuitEl.src = `img/${flippedSuit}.png`;
  mountFlipCardNumberEl.textContent = flippedNumber;
  mountFlipCardEl.classList.remove("hidden");

  //SETTING UP THE TRUMP CARD NUMBERS
  for (let i = 0; i < 4; i++) {
    trumpNumbersEl[i].textContent = trumpCards[i][1];
    trumpSuitInfoEl[i].classList.remove("hidden");
  }

  //SETTING UP PLAYER 1 CARDS
  player1Card1El.classList.add(`card-${handPlayer1[0][2]}`);
  player1Card1SuitEl.src = `img/${handPlayer1[0][2]}.png`;
  player1Card1NumberEl[0].textContent = handPlayer1[0][1];
  player1Card1NumberEl[1].textContent = handPlayer1[0][1];

  //SETTING UP PLAYER 2 CARDS
  player1Card2El.classList.add(`card-${handPlayer1[1][2]}`);
  player1Card2SuitEl.src = `img/${handPlayer1[1][2]}.png`;
  player1Card2NumberEl[0].textContent = handPlayer1[1][1];
  player1Card2NumberEl[1].textContent = handPlayer1[1][1];

  //SETTING UP PLAYER 3 CARDS
  player1Card3El.classList.add(`card-${handPlayer1[2][2]}`);
  player1Card3SuitEl.src = `img/${handPlayer1[2][2]}.png`;
  player1Card3NumberEl[0].textContent = handPlayer1[2][1];
  player1Card3NumberEl[1].textContent = handPlayer1[2][1];

  // DISPLAY CARDS
  for (let i = 0; i < playerCardsEl.length; i++) {
    playerCardsEl[i].classList.remove("hidden");
  }

  playRound();
});

//CREATES THE DECK OF CARDS
function createDeck() {
  let p = 1;
  let a = 0;
  for (let c = 0; c < 10; c++) {
    for (let i = 0; i < 4; i++) {
      card = [a, cardNumbers[c], cardSuits[i], p];
      deck.push(card);
      a++;
    }
    p++;
  }
}

//SHUFFLE DECK
function shuffle(arr) {
  let currentIndex = arr.length;
  let randomIndex;

  // WHILE THERE IS NOTHING TO SWAP, GOING BACKWARDS...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

//HANDS OUT CARDS
let handOutIndex = 0;
function handOutCards(arr) {
  for (let i = 0; i < 3; i++) {
    arr[i] = deck[handOutIndex];
    handOutIndex++;
  }
}

//FLIPS CARD
function flipCard() {
  flippedCard = deck[handOutIndex];
  flippedPower = flippedCard[3];
  flippedNumber = flippedCard[1];
  flippedSuit = flippedCard[2];
  if (flippedPower === 10) {
    power = 1;
  } else {
    power = flippedPower + 1;
  }
}

//FINDS THE TRUMP CARDS IN THE DECK
function findsTrump() {
  for (let i = 0; i < deck.length; i++) {
    if (deck[i][3] === power) {
      trumpCards.push(deck[i]);
    }
  }
}

//CHANGES THE POWER OF THE TRUMP CARDS
function ChangeTrumpPower() {
  for (let i = 0; i < trumpCards.length; i++) {
    switch (trumpCards[i][2]) {
      case "diamond":
        trumpCards[i][3] = 11;
        break;
      case "spade":
        trumpCards[i][3] = 12;
        break;
      case "heart":
        trumpCards[i][3] = 13;
        break;
      case "club":
        trumpCards[i][3] = 14;
        break;
    }
  }
}

//SIMULATING A ROUND
function playRound() {
  roundCards[0] = handPlayer1[0];
  roundCards[1] = handPlayer2[0];
  roundCards[2] = handPlayer3[0];
  roundCards[3] = handPlayer4[0];
  console.log(roundCards);

  //find the highest powered card
  let max = 0;
  let i = 0;
  let roundWinner;
  for (i = 0; i < roundCards.length; i++) {
    if (roundCards[i][3] > max) {
      max = roundCards[i][3];
      roundWinner = i;
    }
  }
  console.log(
    `Player ${roundWinner + 1} is the winner with the power of ${max}`
  );
}

//ON LOAD
window.onload = function () {};
