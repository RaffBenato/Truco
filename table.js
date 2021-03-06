"use strict";

const btnStartRound = document.querySelector(".btn-start");
const btnNextRound = document.querySelector(".btn-next-round");
const btnNextHand = document.querySelector(".btn-next-hand");
const btnNextGameEl = document.querySelector(".btn-next-game");
const btnHideEl = document.querySelector(".btn-hide");
const btnDontHideEl = document.querySelector(".btn-dont-hide");
const btnTrucoEl = document.querySelector(".btn-truco");
const btnAcceptEl = document.querySelector(".btn-accept");
const btnRaiseEl = document.querySelector(".btn-raise");
const btnRunEl = document.querySelector(".btn-run");
const messageEl = document.querySelector(".message");
const roundInfoEl = document.querySelector(".round-info");
const overlayTableEl = document.querySelector(".overlay-table");

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

const pointsUsEl = document.querySelectorAll(".point-us");
const pointsThemEl = document.querySelectorAll(".point-them");

const usTotalEl = document.querySelector(".us-total");
const themTotalEl = document.querySelector(".them-total");

let roundWorth = 1;

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
let hideCard = false;
let isGameOver = false;
let twoDraws = false;
let blindHand = false;
let ourElevenHand = false;
let theirElevenHand = false;
let decidingOnElevenHand = false;
const timeDelay = 600;
let roundNumber = 0;
let randomCard;
let roundWinTracker = [undefined, undefined, undefined];
let handWinnerTracker = [0, 0];
let handCounter = 0;
let globalCurrentRoundWorth;
let globalCall;
let globalSuggestedRoundWorth;
let nextcall = ``;

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
let handTurnCounter = 0;
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
  btnTrucoEl.classList.remove("hidden");
  btnHideEl.classList.remove("hidden");
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

  resetMiddleCards();

  roundTurnCounter = 0;
  roundNumber++;
  playRound();
});

/////////////////////
//NEXT HAND/////////
btnNextHand.addEventListener("click", function () {
  if (blindHand === true) {
    messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
    messageEl.textContent = "Iron Hand!";
    messageEl.classList.remove("hidden");
    btnNextHand.classList.add("hidden");
    setTimeout(function () {
      messageEl.classList.add("hidden");
      nextHand();
    }, timeDelay * 2);
  } else {
    if (ourElevenHand === true) {
      messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
      messageEl.textContent = "11's Hand for Us!";
      messageEl.classList.remove("hidden");
      btnNextHand.classList.add("hidden");
      btnTrucoEl.classList.add("hidden");

      setTimeout(function () {
        messageEl.classList.add("hidden");
        handTurnCounter = 3;
        nextHand();
      }, timeDelay * 2);
    } else if (theirElevenHand === true) {
      messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
      messageEl.textContent = "11's Hand for Them!";
      messageEl.classList.remove("hidden");
      btnNextHand.classList.add("hidden");
      setTimeout(function () {
        messageEl.classList.add("hidden");
        nextHand();
      }, timeDelay * 2);
    } else {
      nextHand();
    }
  }
});

/////////////////////
//NEXT GAME/////////
btnNextGameEl.addEventListener("click", function () {
  handCounter = 0;
  handTurnCounter = 4;
  handWinnerTracker = [0, 0];
  isGameOver = false;
  blindHand = false;
  ourElevenHand = false;
  theirElevenHand = false;

  usTotalEl.textContent = handWinnerTracker[0];
  themTotalEl.textContent = handWinnerTracker[1];
  btnNextGameEl.classList.add("hidden");
  overlayTableEl.classList.add("hidden");
  for (let r = 0; r < 12; r++) {
    pointsUsEl[r].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
    pointsThemEl[r].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
  }

  nextHand();
});

function nextHand() {
  // CLEAR UP CARDS FROM TABLE
  for (let i = 0; i < positionOfCardsEl.length; i++) {
    positionOfCardsEl[i].classList.add("hidden");
    positionOfCardsEl[i].classList.remove(`card-diamond`);
    positionOfCardsEl[i].classList.remove(`card-heart`);
    positionOfCardsEl[i].classList.remove(`card-spade`);
    positionOfCardsEl[i].classList.remove(`card-club`);
    playersCardsAllEl[i][2].classList.add("hidden");

    playersCardsAllEl[0][i]?.classList.remove(`card-diamond`);
    playersCardsAllEl[0][i]?.classList.remove(`card-heart`);
    playersCardsAllEl[0][i]?.classList.remove(`card-spade`);
    playersCardsAllEl[0][i]?.classList.remove(`card-club`);
    playersCardsAllEl[0][i]?.classList.add("hidden");
    if (i < 3) {
      roundsUsEl[i].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
      roundsThemEl[i].style.backgroundColor = "rgba(141, 140, 140, 0.3)";
    }
    trumpNumbersEl[i].textContent = "";
    trumpSuitInfoEl[i].classList.add("hidden");
  }
  trumpNumbersEl[2].textContent = "TRUMP CARDS";
  mountFlipCardEl.classList.remove(`card-${flippedSuit}`);
  mountFlipCardEl.classList.add("hidden");

  messageEl.classList.add("hidden");
  btnNextHand.classList.add("hidden");
  btnTrucoEl.textContent = "Truco!";
  btnTrucoEl.classList.remove("hidden");

  //SETTING UP THE NEW HAND
  roundNumber = 0;
  roundTurnCounter = 0;
  roundWinTracker = [undefined, undefined, undefined];
  handOutIndex = 0;

  trumpCards.length = 0;

  roundInfoEl.textContent = "Round x1";
  roundWorth = 1;

  handPlayer1 = [undefined, undefined, undefined, 0];
  handPlayer2 = [undefined, undefined, undefined, 1];
  handPlayer3 = [undefined, undefined, undefined, 2];
  handPlayer4 = [undefined, undefined, undefined, 3];

  handTurnCounter < 3 ? handTurnCounter++ : (handTurnCounter = 0);
  switch (handTurnCounter) {
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

  deck.length = 0;
  createDeck();
  shuffle(deck);
  handOutCards(handPlayer1);
  handOutCards(handPlayer2);
  handOutCards(handPlayer3);

  if (ourElevenHand === true) {
    btnTrucoEl.classList.add("hidden");
    btnHideEl.classList.add("hidden");

    player3CardsEl.forEach(function (card, i) {
      card.classList.remove(`card-diamond`);
      card.classList.remove(`card-heart`);
      card.classList.remove(`card-spade`);
      card.classList.remove(`card-club`);
      card.innerHTML = ``;
      const html = `
      <div class="number-top">
        <h1 class="player3-card${i + 1}-number">${handPlayer3[i][1]}</h1>
      </div>
      <div class="number-bottom">
        <h1 class="player3-card${i + 1}-number">${handPlayer3[i][1]}</h1>
      </div>
      <div class="suit">
        <img class="suit-img player3-card${i + 1}-suit" src="img/${
        handPlayer3[i][2]
      }.png" alt="" />
      </div>`;
      card.classList.add(`card-${handPlayer3[i][2]}`);
      card.insertAdjacentHTML(`afterbegin`, html);
      card.classList.remove("card-back");
      card.classList.add("card-front");
    });

    btnRunEl.classList.remove("hidden");
    btnAcceptEl.classList.remove("hidden");
    decidingOnElevenHand = true;
    isMyTurn = false;
  } else {
    player3CardsEl.forEach(function (card, i) {
      card.innerHTML = ``;
      card.classList.remove(`card-diamond`);
      card.classList.remove(`card-heart`);
      card.classList.remove(`card-spade`);
      card.classList.remove(`card-club`);
      card.classList.remove("card-front");
      card.classList.add("card-back");
    });
  }

  handOutCards(handPlayer4);
  flipCard();
  findsTrump();
  ChangeTrumpPower();
  setUpCards();
  resetMiddleCards();
  roundTurnCounter = 0;
  if (theirElevenHand === true) {
    const computerDecidesToAcceptElevenHand = randomComputerChoice(1);
    if (computerDecidesToAcceptElevenHand === 0) {
      setTimeout(function () {
        messageEl.classList.remove("hidden");
        messageEl.textContent = "Hand declined!";
        scoreHandWinner("us");
      }, timeDelay * 2);
      setTimeout(function () {
        btnNextHand.classList.remove("hidden");
      }, timeDelay * 4);
    } else {
      setTimeout(function () {
        messageEl.classList.remove("hidden");
        messageEl.textContent = "Hand Accepted!";
        roundInfoEl.textContent = `Truco x3`;
        roundWorth = 3;
      }, timeDelay * 2);
      setTimeout(function () {
        messageEl.classList.add("hidden");
        playRound();
      }, timeDelay * 4);
    }
  } else {
    //////////// IMPORTANT
    if (
      roundTurn[roundTurnCounter] === handPlayer2 ||
      roundTurn[roundTurnCounter] === handPlayer4
    ) {
      let computerDecidestoCallTruco = randomComputerChoice(6);
      // let computerDecidestoCallTruco = 0;
      if (computerDecidestoCallTruco === 0) {
        btnTrucoEl.classList.add("hidden");
        raiseHand(roundWorth, "They");
      } else {
        playRound();
      }
    } else {
      playRound();
    }
  }
}

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

  if (blindHand === true) {
    player1Card1El.classList.add("card-back");
    player1Card2El.classList.add("card-back");
    player1Card3El.classList.add("card-back");

    player1Card1SuitEl.classList.add("hidden");
    player1Card1NumberEl[0].classList.add("hidden");
    player1Card1NumberEl[1].classList.add("hidden");

    player1Card2SuitEl.classList.add("hidden");
    player1Card2NumberEl[0].classList.add("hidden");
    player1Card2NumberEl[1].classList.add("hidden");

    player1Card3SuitEl.classList.add("hidden");
    player1Card3NumberEl[0].classList.add("hidden");
    player1Card3NumberEl[1].classList.add("hidden");
  } else {
    player1Card1El.classList.remove("card-back");
    player1Card2El.classList.remove("card-back");
    player1Card3El.classList.remove("card-back");

    player1Card1SuitEl.classList.remove("hidden");
    player1Card1NumberEl[0].classList.remove("hidden");
    player1Card1NumberEl[1].classList.remove("hidden");

    player1Card2SuitEl.classList.remove("hidden");
    player1Card2NumberEl[0].classList.remove("hidden");
    player1Card2NumberEl[1].classList.remove("hidden");

    player1Card3SuitEl.classList.remove("hidden");
    player1Card3NumberEl[0].classList.remove("hidden");
    player1Card3NumberEl[1].classList.remove("hidden");

    player1Card1El.classList.add(`card-${handPlayer1[0][2]}`);
    player1Card1SuitEl.src = `img/${handPlayer1[0][2]}.png`;
    player1Card1NumberEl[0].textContent = handPlayer1[0][1];
    player1Card1NumberEl[1].textContent = handPlayer1[0][1];

    player1Card2El.classList.add(`card-${handPlayer1[1][2]}`);
    player1Card2SuitEl.src = `img/${handPlayer1[1][2]}.png`;
    player1Card2NumberEl[0].textContent = handPlayer1[1][1];
    player1Card2NumberEl[1].textContent = handPlayer1[1][1];

    player1Card3El.classList.add(`card-${handPlayer1[2][2]}`);
    player1Card3SuitEl.src = `img/${handPlayer1[2][2]}.png`;
    player1Card3NumberEl[0].textContent = handPlayer1[2][1];
    player1Card3NumberEl[1].textContent = handPlayer1[2][1];
  }

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
      if (decidingOnElevenHand === false) isMyTurn = true;
      break;
    } else {
      // if (
      //   roundTurn[roundTurnCounter] === handPlayer2 ||
      //   roundTurn[roundTurnCounter] === handPlayer4
      // ) {
      //   const computerDecidesToCallTruco = randomComputerChoice(1);
      //   if (computerDecidesToCallTruco === 0) {
      //     raiseHand(roundWorth, "They");
      //   }
      // }
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
  if (blindHand === true || ourElevenHand === true) {
    btnHideEl.classList.add("hidden");
    btnTrucoEl.classList.add("hidden");
  } else {
    btnHideEl.classList.remove("hidden");
  }
}
//PLAY CARD
function PlayCard(position, whichPlayer, whichCard) {
  if (hideCard) {
    positionOfCardsEl[position].classList.remove("hidden");
    positionOfCardsEl[position].classList.add("card-back");
    positionNumbersEl[position][0].classList.add("hidden");
    positionNumbersEl[position][1].classList.add("hidden");
    positionSuitsEl[position].classList.add("hidden");
  } else {
    positionOfCardsEl[position].classList.remove("hidden");
    positionOfCardsEl[position].classList.add(
      `card-${whichPlayer[whichCard][2]}`
    );
    positionSuitsEl[position].src = `img/${whichPlayer[whichCard][2]}.png`;
    positionNumbersEl[position][0].textContent = whichPlayer[whichCard][1];
    positionNumbersEl[position][1].textContent = whichPlayer[whichCard][1];
  }
}

function resetMiddleCards() {
  for (let i = 0; i < 3; i++) {
    positionOfCardsEl[i].classList.remove("card-back");
    positionNumbersEl[i][0].classList.remove("hidden");
    positionNumbersEl[i][1].classList.remove("hidden");
    positionSuitsEl[i].classList.remove("hidden");
  }
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
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("us");
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
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("them");
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
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("us");
          }, timeDelay * 2);
        } else if (roundWinTracker[0] === "them") {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
            btnNextHand.classList.remove("hidden");
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("them");
          }, timeDelay * 2);
        } else {
          twoDraws = true;
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
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("us");
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
            for (let r = 0; r < roundWorth; r++) scoreHandWinner("them");
          }, timeDelay * 2);
        }
      } else {
        if (roundWinTracker[0] === "us") {
          setTimeout(function () {
            messageEl.textContent = "We win the Hand!";
            messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";
            btnNextHand.classList.remove("hidden");

            for (let r = 0; r < roundWorth; r++) scoreHandWinner("us");
          }, timeDelay * 2);
        } else if (roundWinTracker[0] === "them") {
          setTimeout(function () {
            messageEl.textContent = "They win the Hand!";
            messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
            btnNextHand.classList.remove("hidden");

            for (let r = 0; r < roundWorth; r++) scoreHandWinner("them");
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
///////////////////////////////////////
// SCORING OF THE GAME HANDS
function scoreHandWinner(whoWon) {
  if (whoWon === "us") {
    handWinnerTracker = [handWinnerTracker[0] + 1, handWinnerTracker[1]];
    if (handWinnerTracker[0] >= 12) {
      if ((handWinnerTracker[0] = 12)) {
        pointsUsEl[11].style.backgroundColor = "#00ff00";
      }
      messageEl.textContent = `We win the Game!!!`;
      messageEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";
      btnNextHand.classList.remove("hidden");
      overlayTableEl.style.backgroundColor = "rgba(2, 138, 43, 0.8)";

      overlayTableEl.classList.remove("hidden");
      btnNextGameEl.classList.remove("hidden");
      isGameOver = true;
    }
    !isGameOver
      ? (pointsUsEl[handWinnerTracker[0] - 1].style.backgroundColor = "#00ff00")
      : null;
  } else if (whoWon === "them") {
    handWinnerTracker = [handWinnerTracker[0], handWinnerTracker[1] + 1];
    if (handWinnerTracker[1] >= 12) {
      if ((handWinnerTracker[1] = 12)) {
        pointsThemEl[11].style.backgroundColor = "#00ff00";
      }
      messageEl.textContent = `They win the Game!!!`;
      messageEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
      btnNextHand.classList.remove("hidden");
      overlayTableEl.classList.remove("hidden");
      overlayTableEl.style.backgroundColor = "rgba(236, 14, 14, 0.8)";
      btnNextGameEl.classList.remove("hidden");
      isGameOver = true;
    }
    !isGameOver
      ? (pointsThemEl[handWinnerTracker[1] - 1].style.backgroundColor =
          "#00ff00")
      : null;
  } else {
  }
  handCounter++;
  if (handWinnerTracker[0] === 11) {
    if (handWinnerTracker[0] === 11 && handWinnerTracker[1] === 11) {
      blindHand = true;
      ourElevenHand = false;
      theirElevenHand = false;
    } else {
      blindHand = false;
      ourElevenHand = true;
      theirElevenHand = false;
    }
  } else if (handWinnerTracker[1] === 11) {
    blindHand = false;
    ourElevenHand = false;
    theirElevenHand = true;
  } else {
    blindHand = false;
    ourElevenHand = false;
    theirElevenHand = false;
  }

  handWinnerTracker[0] <= 12
    ? (usTotalEl.textContent = handWinnerTracker[0])
    : (usTotalEl.textContent = 12);
  handWinnerTracker[1] <= 12
    ? (themTotalEl.textContent = handWinnerTracker[1])
    : (themTotalEl.textContent = 12);
  btnNextRound.classList.add("hidden");
}

//////////////////////////////
//HIDE CARDS BUTTON
btnHideEl.addEventListener("click", function () {
  if (isMyTurn) {
    hideCard = true;
    btnHideEl.classList.add("hidden");
    btnDontHideEl.classList.remove("hidden");
  }
});

btnDontHideEl.addEventListener("click", function () {
  hideCard = false;
  btnHideEl.classList.remove("hidden");
  btnDontHideEl.classList.add("hidden");
});

//////////////////////////////
//PLAYER 1 BUTTONS
for (let i = 0; i < player1CardsEl.length; i++) {
  player1CardsEl[i].addEventListener("click", function () {
    if (isMyTurn) {
      isMyTurn = false;
      if (hideCard) {
        roundCards[0] = handPlayer1[i];
        // sets the power of hidden card to 0
        handPlayer1[i][3] = 0;
        PlayCard(0, handPlayer1, i);
        player1CardsEl[i].classList.add("hidden");
        hideCard = false;
        btnHideEl.classList.remove("hidden");
        btnDontHideEl.classList.add("hidden");
        if (roundTurn[3] === handPlayer1) {
          checkRoundWinner();
        } else {
          roundTurnCounter++;
          playRound();
        }
      } else {
        roundCards[0] = handPlayer1[i];
        PlayCard(0, handPlayer1, i);
        player1CardsEl[i].classList.add("hidden");
        if (roundTurn[3] === handPlayer1) {
          checkRoundWinner();
        } else {
          roundTurnCounter++;
          playRound();
        }
      }
    }
  });
}

///////////////////////////////
// BUTTON TRUCO
btnTrucoEl.addEventListener("click", function () {
  if (isMyTurn === true) {
    raiseHand(roundWorth, "We");
    isMyTurn = false;
  }
});

function raiseHand(currentRoundWorth, whoIsRaising) {
  let call = "";
  let suggestedRoundWorth;
  let previousCall = ``;
  switch (currentRoundWorth) {
    case 1:
      call = "Truco";
      suggestedRoundWorth = 3;
      nextcall = `Seis`;
      previousCall = `Round`;
      break;
    case 3:
      call = "Seis";
      suggestedRoundWorth = 6;
      nextcall = `Nove`;
      previousCall = `Truco`;
      break;
    case 6:
      call = "Nove";
      suggestedRoundWorth = 9;
      nextcall = `Doze`;
      previousCall = `Seis`;
      break;
    case 9:
      call = "Doze";
      suggestedRoundWorth = 12;
      previousCall = `Nove`;
      break;
  }
  messageEl.textContent = `${whoIsRaising} called ${call}`;
  messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
  messageEl.classList.remove("hidden");
  setTimeout(function () {
    messageEl.classList.add("hidden");
  }, timeDelay * 2);

  if (whoIsRaising === "We") {
    debugger;
    let trucoChallengeChoice;
    if (currentRoundWorth === 9) {
      trucoChallengeChoice = randomComputerChoice(1);
    } else {
      const trucoChallengeChoice = randomComputerChoice(2);
      // trucoChallengeChoice = 2;
    }

    if (trucoChallengeChoice === 0) {
      roundWorth = suggestedRoundWorth;
      roundInfoEl.textContent = `${call} x${roundWorth}`;
      setTimeout(function () {
        messageEl.textContent = `${call} accepted!`;
        messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
        messageEl.classList.remove("hidden");
        playRound();
        // isMyTurn = true;
      }, timeDelay * 2);
      btnTrucoEl.classList.add("hidden");
      setTimeout(function () {
        messageEl.classList.add("hidden");
      }, timeDelay * 3);
    } else if (trucoChallengeChoice === 1) {
      roundWorth = currentRoundWorth;
      roundInfoEl.textContent = `${previousCall} x${roundWorth}`;
      setTimeout(function () {
        messageEl.textContent = `${call} declined!`;
        messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
        messageEl.classList.remove("hidden");
        btnNextHand.classList.remove("hidden");
      }, timeDelay * 2);
      setTimeout(function () {
        for (let r = 0; r < roundWorth; r++) scoreHandWinner("us");
        btnNextHand.classList.remove("hidden");
      }, timeDelay * 3);
    } else {
      roundWorth = suggestedRoundWorth;
      roundInfoEl.textContent = `${call} x${roundWorth}`;
      btnTrucoEl.classList.add("hidden");

      setTimeout(function () {
        raiseHand(roundWorth, "They");
      }, timeDelay * 2);
    }
  } else if (whoIsRaising === "They") {
    setTimeout(function () {
      messageEl.classList.remove("hidden");
      btnAcceptEl.classList.remove("hidden");
      btnRunEl.classList.remove("hidden");
      if (suggestedRoundWorth !== 12) btnRaiseEl.classList.remove("hidden");

      globalCall = call;
      globalCurrentRoundWorth = currentRoundWorth;
      globalSuggestedRoundWorth = suggestedRoundWorth;
    }, timeDelay * 2.01);
  }
}

btnAcceptEl.addEventListener("click", function () {
  btnAcceptEl.classList.add("hidden");
  btnRunEl.classList.add("hidden");
  btnRaiseEl.classList.add("hidden");
  if (decidingOnElevenHand === true) {
    player3CardsEl.forEach(function (card, i) {
      card.innerHTML = ``;
      card.classList.remove(`card-diamond`);
      card.classList.remove(`card-heart`);
      card.classList.remove(`card-spade`);
      card.classList.remove(`card-club`);
      card.classList.remove("card-front");
      card.classList.add("card-back");
    });

    decidingOnElevenHand = false;
    roundWorth = 3;
    roundInfoEl.textContent = `Truco x3`;
    messageEl.textContent = `Hand accepted!`;
    messageEl.classList.remove("hidden");

    setTimeout(function () {
      messageEl.classList.add("hidden");
    }, timeDelay * 2);
    isMyTurn = true;
  } else {
    roundWorth = globalSuggestedRoundWorth;
    roundInfoEl.textContent = `${globalCall} x${roundWorth}`;
    messageEl.textContent = `${globalCall} accepted!`;

    setTimeout(function () {
      if (globalCall !== `Doze`) {
        btnTrucoEl.textContent = nextcall;
        btnTrucoEl.classList.remove("hidden");
      }
      messageEl.classList.add("hidden");
      playRound();
    }, timeDelay * 2);
    // isMyTurn = true;
  }
});

btnRunEl.addEventListener("click", function () {
  btnAcceptEl.classList.add("hidden");
  btnRunEl.classList.add("hidden");
  btnRaiseEl.classList.add("hidden");

  if (decidingOnElevenHand === true) {
    decidingOnElevenHand = false;
    scoreHandWinner("them");

    messageEl.textContent = `Hand declined!`;
    messageEl.classList.remove("hidden");
    setTimeout(function () {
      btnNextHand.classList.remove("hidden");
      messageEl.classList.add("hidden");
    }, timeDelay * 2);
  } else {
    roundWorth = globalCurrentRoundWorth;

    messageEl.textContent = `${globalCall} declined!`;
    messageEl.style.backgroundColor = "rgba(15, 12, 175, 0.8)";
    messageEl.classList.remove("hidden");
    btnNextHand.classList.remove("hidden");

    for (let r = 0; r < roundWorth; r++) scoreHandWinner("them");
    btnNextHand.classList.remove("hidden");
  }
});

btnRaiseEl.addEventListener("click", function () {
  btnAcceptEl.classList.add("hidden");
  btnRunEl.classList.add("hidden");
  btnRaiseEl.classList.add("hidden");

  roundInfoEl.textContent = `${globalCall} x${roundWorth}`;

  raiseHand(globalSuggestedRoundWorth, "We");
});

function randomComputerChoice(numberOfOptions) {
  return Math.floor(Math.random() * (numberOfOptions + 1));
}
