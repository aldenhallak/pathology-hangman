var pathologyWords = [
{hint: "Study of diseases",word: "pathology"},
{hint: "Condensation of nucleus with clumping of chromatin in cell death", word: "PYKNOSIS"},
{hint: "Decreased size of cells, tissues or organs, related to inactivity, aging, a loss of trophic hormonal stimulation or a loss of innervation", word: "ATROPHY"},
{hint: "Increased size of an organ due to an increased number of normal cells", word: "HYPERPLASIA"},
{hint: "Increased size of heart or skeletal muscle due to enlargement of individual constituent parenchymal cells", word: "HYPERTROPHY"},
{hint: "Programmed cell death requiring activation of &quot;suicide&quot; genes and input of energy", word: "APOPTOSIS"},
{hint: "Lysis of chromatin due to the action of endonucleases, typically indicative of cell death", word: "KARYOLYSIS"},
{hint: "Generic term for any extracellular material that appears homogeneously red in tissue sections stained with hematoxylin and eosin. Even though it is mostly extracellular it may be also intracellular, as in liver cells of chronic alcoholics", word: "HYALIN"},
{hint: "Exogenously caused death of cells, tissues or parts of organs in a living organism", word: "NECROSIS"}];
let answer = '';
let hint = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  let randomNumber = Math.floor(Math.random() * pathologyWords.length);
  answer = pathologyWords[randomNumber].word.toLowerCase();
  hint = pathologyWords[randomNumber].hint;
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
}

function updateHint() {
  document.getElementById('hint').innerHTML = hint;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.png';

  randomWord();
  updateHint();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

reset();

document.addEventListener('keydown', function(event) {
const key = event.key; // "a", "1", "Shift", etc.
if(event.key.match(/[a-z]/i) && !guessed.includes(event.key)) handleGuess(event.key); 

});
