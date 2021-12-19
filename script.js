let deckId;
const cardsContainer = document.getElementById('cards')

function newDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id;
    });
}

// function drawCards(deckId) {
//     fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
//         .then(res => res.json())
//         .then(data => console.log(data));
// }

document.getElementById('new-deck').addEventListener('click', newDeck);
document.getElementById('draw-cards').addEventListener('click', function() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cardsContainer.children[0].innerHTML = `<img src='${data.cards[0].image}' class="card"/>'`
            cardsContainer.children[1].innerHTML = `<img src='${data.cards[1].image}' class="card"/>'`
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value);
    const card2ValueIndex = valueOptions.indexOf(card2.value);
    if (card1ValueIndex > card2ValueIndex) {
        console.log('Card1 Win')
    } else if (card1ValueIndex < card2ValueIndex) {
        console.log('Card2 Win')
    } else {
        console.log("It's a tie")
    }
}

const card1Obj = {
    value: "ACE"
}

const card2Obj = {
    value: "ACE"
}

determineCardWinner(card1Obj, card2Obj)