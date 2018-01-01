
const cards =
[
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
var clickedCards = [];
var openCards = [];
var moveCount = 0;


shuffle(cards);

for (let i=0; i<cardCount; i++){
  deck.append(`
    <li class="card" id=${i}>
      <i class="fa ${cards[i]}"></i>
   </li>`);
}



function showCard(clickedCard){
    $(clickedCard).attr("class", "card open show");
}

function updateScore(){
  moveCount++;
  $("#score").text(moveCount);
}

function openCard(card){
    card.attr("class", "card open show");
}

function closeCard(card){
  card.removeClass("open show");
  openCards = [];
}

function closeCard2(card){
  card.removeClass("open show");
  openCards = [];
  console.log('here2');
}


$(".restart").on('click', function(){
  window.location.reload();
});


// User clicks card

$('li').on('click' , function(){

  updateScore();
  openCard($(this));

  let clickedCardName = $(this).find('i');
  let clickedCardId = "#" + $(this).attr('id');
 console.log("Card Name: ", clickedCardName);
// clickedCardId = "#0";

  clickedCardName = clickedCardName.attr('class');


if( $.inArray(clickedCardName, openCards)!="-1"  ){
    openCard($(this));
  console.log("Match!!");
}else {
console.log("ID: ", clickedCardId);
    openCards.push(clickedCardName);
    setTimeout(function(){ $(clickedCardId).removeClass("open show"); }, 400);


  console.log("NO Match!!");
}

});



// <li class="card">
// <li class="card match">
// <li class="card open show">





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
