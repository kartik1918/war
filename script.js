let deckId;
let deckImage = document.getElementById('card-img');

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
            let image = ''
            for (let i = 0; i < data.cards.length; i++) {
                image += `<img src='${data.cards[i].image}' />`
            }
            deckImage.innerHTML = image;
        })
})