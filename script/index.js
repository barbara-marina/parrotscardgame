let firstCard;
let firstCardValue;

let secondCard;
let secondCardValue;

let cardsNumber = 0;
let rounds = 0;
let score = 0;
let timer = 0;

let intervalTimer = null;
let intervalRounds = null;

startScreen();

function startScreen() {
    document.querySelector('body').innerHTML = `
        <h1>PARROT CARD GAME</h1>
        <main class="cards"></main>
        <div class="show-timer">
            <p>Tempo:</p>
            <span class="timer">0</span>
            <p>s</p>
        </div>
        <div class="show-rounds">
            <p>Jogadas:</p>
            <span class="rounds">0</span>
        </div>
    `;

    startGame();
}

function startGame() {
    intervalTimer = setInterval(timeGame, 1000);
    intervalRounds = setInterval(showRounds, 100);

    let cardsPack = [];

    while((cardsNumber % 2 !== 0) || (cardsNumber < 4) || (cardsNumber > 14)){
        cardsNumber = prompt("Digite um número par de cartas entre 4 e 14:");
    }

    for (let i = 0; i < cardsNumber/2; i++) {
        for (let j = 0; j < 2; j++) {
         cardsPack.push(i);         
        }
    }

    cardsPack = cardsPack.sort(comparator);

    for (let i = 0; i < cardsPack.length; i++) {
        document.querySelector(".cards").innerHTML += `
            <section class="card${cardsPack[i]} card" onclick="flipCard(this)" data-identifier="card">
                <div class="face back-face" data-identifier="back-face">
                    <img src="./assets/parrot.png" alt="parrot">    
                </div>
                <div class="face front-face" data-identifier="front-face">
                    <img src="./assets/parrot${cardsPack[i]}.gif" alt="parrot${cardsPack[i]}">    
                </div>
            </section>
        `;
    }
}

function flipCard(card) {
    if (firstCard === undefined) {
        firstCard = card;
        firstCardValue = firstCard.classList[0];
        turnCard(firstCard);
        rounds++;
    } else if (secondCard === undefined) {
        secondCard = card;
        secondCardValue = secondCard.classList[0];
        turnCard(secondCard);
        rounds++;
        if ((firstCardValue === secondCardValue) && (secondCardValue !== undefined)) {
            score++;
            resetValues();
            setTimeout(endGame, 1000);
        } else {
            setTimeout(turnCard, 1000, firstCard);
            setTimeout(turnCard, 1000, secondCard);
            setTimeout(resetValues, 1000);
        }
    }
}

function turnCard(card) {
    card.classList.toggle("turned-over");
    card.classList.toggle("without-click");
}

function resetValues() {
    firstCard = undefined;
    firstCardValue = undefined;
    secondCard = undefined;
    secondCardValue = undefined;
}

function endGame() {
    if ((cardsNumber / 2) === score ) {
        clearInterval(intervalTimer);
        clearInterval(intervalRounds);
        alert(`Você ganhou em ${rounds} jogadas e em ${timer} segundos!`);
        restartGame();
    }
}

function restartGame() {
    let restart = prompt("Gostaria de reiniciar o Parrot Card Game?");

    if ((restart == "sim") || (restart == "Sim") || (restart == "SIM") || (restart == "s") || (restart == "S")) {
        location.reload();
    }
}

function comparator() { 
	return Math.random() - 0.5; 
}

function showRounds() {
    document.querySelector(".rounds").innerHTML = rounds;
}

function timeGame() {
    document.querySelector(".timer").innerHTML = parseInt(timer) + 1;
    timer = document.querySelector(".timer").innerHTML;
}