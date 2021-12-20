let deckId;
let computerScore = 0;
let myScore = 0;
const computerScoreEl = document.getElementById('computer-score')
const myScoreEl = document.getElementById('my-score')
const cardsContainer = document.getElementById('cards')
const drawCardBtn = document.getElementById('draw-cards')
const gameMessage = document.getElementById('game-message')
const remainCards = document.getElementById('remain-cards')

function newDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        remainCards.textContent = `Remaining Cards: ${data.remaining}`
        deckId = data.deck_id;
    });
}

// function drawCards(deckId) {
//     fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
//         .then(res => res.json())
//         .then(data => console.log(data));
// }

document.getElementById('new-deck').addEventListener('click', newDeck);
drawCardBtn.addEventListener('click', function() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            remainCards.textContent = `Remaining Cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `<img src='${data.cards[0].image}' class="card"/>'`
            cardsContainer.children[1].innerHTML = `<img src='${data.cards[1].image}' class="card"/>'`
            const message = determineCardWinner(data.cards[0], data.cards[1])
            gameMessage.textContent = message

            if (data.remaining === 0) {
                drawCardBtn.disabled = true;
                if (computerScore > myScore) {
                    gameMessage.textContent = "The computer won the game!";
                } else if (myScore > computerScore) {
                    gameMessage.textContent = "You won the game!"
                } else {
                    gameMessage.textContent = "It's a tie game!"
                }
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value);
    const card2ValueIndex = valueOptions.indexOf(card2.value);
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++;
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return 'Computer Wins!';
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++;
        myScoreEl.textContent = `My Score: ${myScore}`
        return 'You Win!';
    } else {
        return "War"
    }
}