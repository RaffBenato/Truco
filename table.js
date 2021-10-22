"use strict";

const btnStartRound = document.querySelector(".btn-start");
const btnNextRound = document.querySelector(".btn-next-round");
const btnNextHand = document.querySelector(".btn-next-hand");
const messageEl = document.querySelector(".message");

//PLAYER 1 ELEMENTS
const player1Card1El = document.querySelector(".player1-card1");
const player1Card1NumberEl = document.querySelectorAll(".player1-card1-number");
const player1Card1SuitEl = document.querySelector(".player1-card1-suit");

const player1Card2El = document.querySelector(".player1-card2");
const player1Card2NumberEl = document.querySelectorAll(".player1-card2-number");
const player1Card2SuitEl = document.querySelector(".player1-card2-suit");

const player1Card3El = document.querySelector(".player1-card3");
const player1Card3NumberEl = document.querySelectorAll(".player1-card3-number");
const player1Card3SuitEl = document.querySelector(".player1-card3-suit");

const player1CardsEl = [player1Card1El, player1Card2El, player1Card3El];

//PLAYER 2 ELEMENTS
const player2Card1El = document.querySelector(".player2-card1");
const player2Card2El = document.querySelector(".player2-card2");
const player2Card3El = document.querySelector(".player2-card3");

const player2CardsEl = [player2Card1El, player2Card2El, player2Card3El];

//PLAYER 3 ELEMENTS
const player3Card1El = document.querySelector(".player3-card1");
const player3Card2El = document.querySelector(".player3-card2");
const player3Card3El = document.querySelector(".player3-card3");

const player3CardsEl = [player3Card1El, player3Card2El, player3Card3El];

//PLAYER 4 ELEMENTS
const player4Card1El = document.querySelector(".player4-card1");
const player4Card2El = document.querySelector(".player4-card2");
const player4Card3El = document.querySelector(".player4-card3");

const player4CardsEl = [player4Card1El, player4Card2El, player4Card3El];

const playersCardsAllEl = [
  player1CardsEl,
  player2CardsEl,
  player3CardsEl,
  player4CardsEl,
];

const playerCardsEl = document.querySelectorAll(".player-card");

//SCORING ELEMENTS
const roundUs1El = document.querySelector(".round-us-1");
const roundUs2El = document.querySelector(".round-us-2");
const roundUs3El = document.querySelector(".round-us-3");
const roundsUsEl = [roundUs1El, roundUs2El, roundUs3El];

const roundThem1El = document.querySelector(".round-them-1");
const roundThem2El = document.querySelector(".round-them-2");
const roundThem3El = document.querySelector(".round-them-3");
const roundsThemEl = [roundThem1El, roundThem2El, roundThem3El];

//MIDDLE TABLE CARDS (PLAYED CARDS)
//PLAYER 1
const positionBottomEl = document.querySelector(".position-bottom");
const positionBottomNumberEl = document.querySelectorAll(
  ".position-bottom-number"
);
const positionBottomSuitEl = document.querySelector(".position-bottom-suit");

//PLAYER 2
const positionLeftEl = document.querySelector(".position-left");
const positionLeftNumberEl = document.querySelectorAll(".position-left-number");
const positionLeftSuitEl = document.querySelector(".position-left-suit");

//PLAYER 3
const positionTopEl = document.querySelector(".position-top");
const positionTopNumberEl = document.querySelectorAll(".position-top-number");
const positionTopSuitEl = document.querySelector(".position-top-suit");

//PLAYER 4
const positionRightEl = document.querySelector(".position-right");
const positionRightNumberEl = document.querySelectorAll(
  ".position-right-number"
);
const positionRightSuitEl = document.querySelector(".position-right-suit");

//ARRAY WITH ALL THE MIDDLE TABLE CARDS
const positionOfCardsEl = [
  positionBottomEl,
  positionLeftEl,
  positionTopEl,
  positionRightEl,
];
const positionNumbersEl = [
  positionBottomNumberEl,
  positionLeftNumberEl,
  positionTopNumberEl,
  positionRightNumberEl,
];
const positionSuitsEl = [
  positionBottomSuitEl,
  positionLeftSuitEl,
  positionTopSuitEl,
  positionRightSuitEl,
];

const trumpNumbersEl = document.querySelectorAll(".trump-number");
const trumpSuitInfoEl = document.querySelectorAll(".suit-info");

const mountFlipCardEl = document.querySelector(".mount-trump");
const mountFlipCardSuitEl = document.querySelector(".flip-suit-img");
const mountFlipCardNumberEl = document.querySelector(".flip-number");

let deck = [];
let card = []; //card array items = [index, number, suit, power]
const cardNumbers = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
const cardSuits = ["diamond", "spade", "heart", "club"];
let isMyTurn = false;
const timeDelay = 600;
let roundNumber = 0;
let randomCard;
let roundWinTracker = [undefined, undefined, undefined];

//FLIPPED AND TRUMP CARDS
let flippedCard = [];
let flippedPower;
let flippedNumber;
let flippedSuit;
let power;
let trumpCards = [];

//PLAYERS
let handPlayer1 = [undefined, undefined, undefined, 0];
let handPlayer2 = [undefined, undefined, undefined, 1];
let handPlayer3 = [undefined, undefined, undefined, 2];
let handPlayer4 = [undefined, undefined, undefined, 3];

//ROUND CARDS
let roundCards = [];
let roundTurn = [handPlayer1, handPlayer2, handPlayer3, handPlayer4];
let roundTurnCounter = 0;

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
  setUpCards();

  btnStartRound.classList.add("hidden");

  playRound();
});

/////////////////////
//NEXT ROUND/////////
btnNextRound.addEventListener("click", function () {
  for (let i = 0; i < positionOfCardsEl.length; i++) {
    positionOfCardsEl[i].classList.add("hidden");
    positionOfCardsEl[i].classList.remove(`card-diamond`);
    positionOfCardsEl[i].classList.remove(`card-heart`);
    positionOfCardsEl[i].classList.remove(`card-spade`);
    positionOfCardsEl[i].classList.remove(`card-club`);
  }
  messageEl.classList.add("hidden");
  btnNextRound.classList.add("hidden");

  roundTurnCounter = 0;
  roundNumber++;
  playRound();
});

/////////////////////
//NEXT HAND/////////
btnNextHand.addEventListener("click", function () {
  // CLEAR UP CARDS FROM TABLE
  for (let i = 0; i < positionOfCardsEl.length; i++) {
    positionOfCardsEl[i].classList.add("hidden");
    positionOfCardsEl[i].classList.remove(`card-diamond`);
    positionOfCardsEl[i].classList.remove(`card-heart`);
    positionOfCardsEl[i].classList.remove(`card-spade`);
    positionOfCardsEl[i].classList.remove(`card-club`);
    playersCardsAllEl[i][2].classList.add("hidden");
    playersCardsAllEl[0][i]?.classList.add("hidden");
    if (i < 3) {
      roundsUsEl[i].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
      roundsThemEl[i].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
    }
  }
  mountFlipCardEl.classList.add(`card-${flippedSuit}`);
  mountFlipCardEl.classList.add("hidden");

  messageEl.classList.add("hidden");
  btnNextHand.classList.add("hidden");
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

function setUpCards() {
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

  //SETTING UP PLAYER 1 CARD 1
  player1Card1El.classList.add(`card-${handPlayer1[0][2]}`);
  player1Card1SuitEl.src = `img/${handPlayer1[0][2]}.png`;
  player1Card1NumberEl[0].textContent = handPlayer1[0][1];
  player1Card1NumberEl[1].textContent = handPlayer1[0][1];

  //SETTING UP PLAYER 1 CARD 2
  player1Card2El.classList.add(`card-${handPlayer1[1][2]}`);
  player1Card2SuitEl.src = `img/${handPlayer1[1][2]}.png`;
  player1Card2NumberEl[0].textContent = handPlayer1[1][1];
  player1Card2NumberEl[1].textContent = handPlayer1[1][1];

  //SETTING UP PLAYER 1 CARD 3
  player1Card3El.classList.add(`card-${handPlayer1[2][2]}`);
  player1Card3SuitEl.src = `img/${handPlayer1[2][2]}.png`;
  player1Card3NumberEl[0].textContent = handPlayer1[2][1];
  player1Card3NumberEl[1].textContent = handPlayer1[2][1];

  // DISPLAY CARDS
  for (let i = 0; i < playerCardsEl.length; i++) {
    playerCardsEl[i].classList.remove("hidden");
  }
}
//PLAYING A ROUND
function playRound() {
  for (
    roundTurnCounter = roundTurnCounter;
    roundTurnCounter < roundTurn.length;
    roundTurnCounter++
  ) {
    if (roundTurn[roundTurnCounter] === handPlayer1) {
      isMyTurn = true;
      break;
    } else {
      randomCard = Math.trunc(
        Math.random() * (roundTurn[roundTurnCounter].length - 1)
      ); //PLAYS RANDOM CARD FOR NOW
      roundCards[
        roundTurn[roundTurnCounter][roundTurn[roundTurnCounter].length - 1]
      ] = roundTurn[roundTurnCounter][randomCard];

      PlayCard(
        roundTurn[roundTurnCounter][roundTurn[roundTurnCounter].length - 1],
        roundTurn[roundTurnCounter],
        randomCard
      );

      //DELETES CARD FROM PLAYERS HAND
      roundTurn[roundTurnCounter].splice(randomCard, 1);
      playersCardsAllEl[
        roundTurn[roundTurnCounter][roundTurn[roundTurnCounter].length - 1]
      ][roundNumber].classList.add("hidden");

      if (roundTurnCounter === 3) {
        checkRoundWinner();
      }
    }
  }
}

//PLAY CARD
function PlayCard(position, whichPlayer, whichCard) {
  positionOfCardsEl[position].classList.remove("hidden");
  positionOfCardsEl[position].classList.add(
    `card-${whichPlayer[whichCard][2]}`
  );
  positionSuitsEl[position].src = `img/${whichPlayer[whichCard][2]}.png`;
  positionNumbersEl[position][0].textContent = whichPlayer[whichCard][1];
  positionNumbersEl[position][1].textContent = whichPlayer[whichCard][1];
}

//CHECKS THE ROUND WINNER
function checkRoundWinner() {
  let max = 0;
  let i = 0;
  let roundWinner;
  for (i = 0; i < roundCards.length; i++) {
    if (roundCards[i][3] > max) {
      max = roundCards[i][3];
      roundWinner = i;
    }
  }

  //CHANGE THE ORDER OF PLAY FOR THE NEXT ROUND

  switch (roundWinner) {
    case 0:
      [roundTurn[0], roundTurn[1], roundTurn[2], roundTurn[3]] = [
        handPlayer1,
        handPlayer2,
        handPlayer3,
        handPlayer4,
      ];
      break;
    case 1:
      [roundTurn[0], roundTurn[1], roundTurn[2], roundTurn[3]] = [
        handPlayer2,
        handPlayer3,
        handPlayer4,
        handPlayer1,
      ];
      break;
    case 2:
      [roundTurn[0], roundTurn[1], roundTurn[2], roundTurn[3]] = [
        handPlayer3,
        handPlayer4,
        handPlayer1,
        handPlayer2,
      ];
      break;
    case 3:
      [roundTurn[0], roundTurn[1], roundTurn[2], roundTurn[3]] = [
        handPlayer4,
        handPlayer1,
        handPlayer2,
        handPlayer3,
      ];
      break;
  }

  if (roundWinner + 1 === 1 || roundWinner + 1 === 3) {
    if (max === roundCards[1][3] || max === roundCards[3][3]) {
      showRoundWinner("draw");
    } else {
      showRoundWinner("us");
    }
  } else {
    if (max === roundCards[0][3] || max === roundCards[2][3]) {
      showRoundWinner("draw");
    } else {
      showRoundWinner("them");
    }
  }

  function showRoundWinner(whoWon) {
    if (whoWon === "us") {
      roundWinTracker[roundNumber] = "us";
      messageEl.textContent = "We win the Round!";
      messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";

      roundsUsEl[roundNumber].style.backgroundColor = "#00ff00";
      roundsThemEl[roundNumber].style.backgroundColor = "#ff0000";
    } else if (whoWon === "them") {
      roundWinTracker[roundNumber] = "them";
      messageEl.textContent = "They win the Round!";
      messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";

      roundsUsEl[roundNumber].style.backgroundColor = "#ff0000";
      roundsThemEl[roundNumber].style.backgroundColor = "#00ff00";
    } else {
      roundWinTracker[roundNumber] = "draw";
      messageEl.textContent = "It is a draw!";
      messageEl.style.backgroundColor = "rgba(234, 220, 14, 0.8)";

      roundsUsEl[roundNumber].style.backgroundColor = "rgb(234, 220, 14)";
      roundsThemEl[roundNumber].style.backgroundColor = "rgb(234, 220, 14)";
    }

    //////////////////////////////////
    // LOGIC FOR CHECKING HAND WINNER
    if (roundNumber === 1) {
      if (whoWon === "us") {
        if (roundWinTracker[0] === "draw" || roundWinTracker[0] === "us") {
          setTimeout(function () {
            messageEl.textContent = "We win the Hand!";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else {
          setTimeout(function () {
            btnNextRound.classList.remove("hidden");
          }, timeDelay * 2);
        }
      } else if (whoWon === "them") {
        if (roundWinTracker[0] === "draw" || roundWinTracker[0] === "them") {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else {
          setTimeout(function () {
            btnNextRound.classList.remove("hidden");
          }, timeDelay * 2);
        }
      } else if (whoWon === "draw") {
        if (roundWinTracker[0] === "us") {
          setTimeout(function () {
            messageEl.textContent = "We win the Hand!";
            messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else if (whoWon === "them") {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else {
          let twoDraws = true;
          setTimeout(function () {
            btnNextRound.classList.remove("hidden");
          }, timeDelay * 2);
        }
      }
    } else if (roundNumber === 2) {
      if (whoWon === "us") {
        if (
          roundWinTracker[0] === "us" ||
          roundWinTracker[1] === "us" ||
          twoDraws === true
        ) {
          setTimeout(function () {
            messageEl.textContent = "We win the Hand!";
            messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        }
      } else if (whoWon === "them") {
        if (
          roundWinTracker[0] === "them" ||
          roundWinTracker[1] === "them" ||
          twoDraws === true
        ) {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        }
      } else {
        if (roundWinTracker[0] === "us") {
          setTimeout(function () {
            messageEl.textContent = "We win the Hand!";
            messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else if (roundWinTracker[0] === "them") {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        } else {
          setTimeout(function () {
            messageEl.textContent = "Nobody wins the Hand";
            messageEl.style.backgroundColor = "rgba(234, 220, 14, 0.8)";
            btnNextHand.classList.remove("hidden");
          }, timeDelay * 2);
        }
      }
    } else {
      setTimeout(function () {
        btnNextRound.classList.remove("hidden");
      }, timeDelay * 2);
    }
  }

  messageEl.classList.remove("hidden");
}

//PLAYER 1 BUTTONS
for (let i = 0; i < player1CardsEl.length; i++) {
  player1CardsEl[i].addEventListener("click", function () {
    if (isMyTurn) {
      roundCards[0] = handPlayer1[i];
      PlayCard(0, handPlayer1, i);
      player1CardsEl[i].classList.add("hidden");

      if (roundTurn[3] === handPlayer1) {
        checkRoundWinner();
      } else {
        isMyTurn = false;
        roundTurnCounter++;
        playRound();
      }
    }
  });
}

//ON LOAD
window.onload = function () {};
