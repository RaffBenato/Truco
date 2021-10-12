"use strict";

const btnStartRound = document.querySelector(".btn-start");
const player1Card1 = document.querySelector(".player1-card1");
const player1Card2 = document.querySelector(".player1-card2");
const player1Card3 = document.querySelector(".player1-card3");
const player2Card1 = document.querySelector(".player2-card1");
const player2Card2 = document.querySelector(".player2-card2");
const player2Card3 = document.querySelector(".player2-card3");
const player3Card1 = document.querySelector(".player3-card1");
const player3Card2 = document.querySelector(".player3-card2");
const player3Card3 = document.querySelector(".player3-card3");
const player4Card1 = document.querySelector(".player4-card1");
const player4Card2 = document.querySelector(".player4-card2");
const player4Card3 = document.querySelector(".player4-card3");
const mountFlipCard = document.querySelector(".mount-trump");

let deck = [];
let card = []; //card array items = [index, number, suit, power]
const cardNumbers = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
const cardSuits = ["diamond", "spade", "heart", "club"];
let flippedCard = [];
let power;
let trumpCards = [];

//PLAYERS
let handPlayer1 = [];
let handPlayer2 = [];
let handPlayer3 = [];
let handPlayer4 = [];

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
  console.log(deck);
  console.log(handPlayer1);
  console.log(handPlayer2);
  console.log(handPlayer3);
  console.log(handPlayer4);
  console.log(flippedCard);
  console.log(power);
  console.log(trumpCards);

  btnStartRound.classList.add("hidden");

  //DISPLAY CARDS
  player1Card1.classList.remove("hidden");
  player1Card2.classList.remove("hidden");
  player1Card3.classList.remove("hidden");
  player2Card1.classList.remove("hidden");
  player2Card2.classList.remove("hidden");
  player2Card3.classList.remove("hidden");
  player3Card1.classList.remove("hidden");
  player3Card2.classList.remove("hidden");
  player3Card3.classList.remove("hidden");
  player4Card1.classList.remove("hidden");
  player4Card2.classList.remove("hidden");
  player4Card3.classList.remove("hidden");
  mountFlipCard.classList.remove("hidden");
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
  let flippedPower = flippedCard[3];
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

//ON LOAD
window.onload = function () {};
