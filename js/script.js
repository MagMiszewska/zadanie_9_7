//przycisk zainicjowania nowej gry
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

//wybór gracza - rock, paper, scissors - po kliknięciu wywołana funkcja playerPick z parametrem reprezentującym wybó gracza
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors')
});

//logika gry, nadanie wartości początkowych 
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

//wyświetlanie elementów gry
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

//gameState - może przyjąc kilka wartości, zależnie od tego, czy gra nie została jeszcze rozpoczęta, jest w trakcie czy została zakończona - chcemy wyświetlić różne elementy na stronie
function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

//rozpoczęcie gry, zmienne odnoszące się do elementów na stronie, które będziemy aktualizować przed rozpoczęciem rozgrywki
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

//funkcja uruchamiana po wciśnięciu przycisku New game i Play Again
function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }

}

//funkcja odpowiadająca za pobranie wybory gracza
function playerPick(playerPick) {
    console.log(playerPick);
}

//funkcja losująca wybór komputera 
//Math.floor(Math.random()*3) - losowa liczba całkowita 0, 1 lub 2
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

//umieszcanie wyboru na stronie
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    //przyznawanie punktów
    checkRoundWinner(playerPick, computerPick);
}

//logika gry i przyznawanie punktów, najpierw zakładamy, że to my wygraliśmy
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        setGamePoints()
        checkScore();
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        setGamePoints()
        checkScore();
    }
}

//aktualizacja wyniku
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//funkcja sprawdzająca, czy któryś z graczy zdobył 10 punktów
function checkScore() {

    if (computer.score == 10) {
        alert('Computer win!');
        gameState = 'ended';
        setGameElements();
    } else if (player.score == 10) {
        alert('You win!');
        gameState = 'ended';
        setGameElements();
    }
}