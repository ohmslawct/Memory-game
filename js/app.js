const cards = [
  "fa-anchor",
  "fa-bicycle",
  "fa-bolt",
  "fa-bomb",
  "fa-cube",
  "fa-diamond",
  "fa-leaf",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bicycle",
  "fa-bolt",
  "fa-bomb",
  "fa-cube",
  "fa-diamond",
  "fa-leaf",
  "fa-paper-plane-o"
]

const deck = $('.deck');
const cardCount = 16;
let clickedCards = [];
let openCards = [];
let moveCount = 0;
let totalMatches = 0;

shuffle(cards);

// assign cards to grid
for (let i = 0; i < cardCount; i++) {
  deck.append(`
    <li class="card" id=${i}>
      <i class="fa ${cards[i]}"></i>
   </li>`);
}

// open card
function showCard(clickedCard) {
  $(clickedCard).attr("class", "card open show");
}

// update score
function updateScore() {
  moveCount++;
  $("#score").text(moveCount);
}

// open card
function openCard(card) {
  card.attr("class", "card open show");
}

// close cards
function closeCards(card1, card2){
  setTimeout(function() {
  $(card1).removeClass("open show");
  }, 300);

  setTimeout(function() {
    $(card2).removeClass("open show");
    openCards.splice(0, 2);
  }, 600);
}

// reset
$(".restart").on('click', function() {
  window.location.reload();
});

// User clicks card
$('li').on('click', function() {

  openCard($(this));
  updateScore();

  let clickedCardName = $(this).find('i');
      clickedCardName = clickedCardName.attr('class');
  let clickedCardId = "#" + $(this).attr('id');

  var cardInfo = {
    cardId: "",
    cardName: ""
  }

  cardInfo.cardId = clickedCardId;
  cardInfo.cardName = clickedCardName;
  openCards.push(cardInfo);

  // keep first card open
  if (openCards.length > 1) {

  // detect match on second click, but don't compare if user clicked the same card twice
    if (openCards[0].cardName == openCards[1].cardName && openCards[0].cardId != openCards[1].cardId) {
      openCards.splice(0, 2); // remove cards from the open cards array
      totalMatches++;
    }
  // if selections are not a match
    else {

      var cardInfo = {
        cardId: "",
        cardName: ""
      }
      cardInfo.cardId = clickedCardId;
      cardInfo.cardName = clickedCardName;
      closeCards(openCards[0].cardId, openCards[1].cardId);
    }
  }

  if (totalMatches == 8) {
    openCard($(this));
    setTimeout(function() {
      alert(`Great Work! You won in ${moveCount} moves.`);
    },100);
  }

});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
