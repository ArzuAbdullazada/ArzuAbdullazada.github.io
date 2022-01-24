const numberLabel = document.querySelector(".hidden-number-label");
const playBtn = document.querySelector(".play");
const continueBtn = document.querySelector(".continue");
const inputGuessNumber = document.querySelector(".guess");
const message = document.querySelector(".feedback-label");
const scoreLabel = document.querySelector(".score");
const highScoreLabel = document.querySelector(".high-score");
const livesCountLabel = document.querySelector(".lives-count");
const gameOver = document.querySelector(".modal");
const game = document.querySelector(".game-wrapper");
const retry = document.querySelector(".retry");
const numbersGuess = document.querySelector(".numbers-guess");
const guessdNumbersLabel = document.querySelector(".guessed-number");

var guessedNumbers = [];
var score = 0;
var lifLine = 5;

  function randomNumberGenerate() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function showGuessedNumbers(guessedNumbers) {
    numbersGuess.style.opacity = 1;
    guessdNumbersLabel.innerHTML = guessedNumbers;
  }
  function checkIsGameOver(lifLine) {
    if (lifLine === 0) {
      gameOver.style.opacity = 1;
      gameOver.style.transform = "scale(1)";
      game.style.opacity = 0;
    }
  }
  function saveHighScore(score) {
    localStorage.setItem("highscore", score);
  }
  function showHighScore() {
    const highScore = localStorage.getItem("highscore");
    console.log("highscore", highScore);
    console.log("highscore", typeof highScore);
    if (highScore == null) {
      highScoreLabel.innerHTML = 0;
    } else {
      highScoreLabel.innerHTML = highScore;
    }
  }
  function checkHighScore(score) {
    const highScore = JSON.parse(localStorage.getItem("highscore"));
    if (score > highScore) {
      saveHighScore(score);
      showHighScore();
    }
  }
  var answer = randomNumberGenerate();
playBtn.addEventListener("click", () => {
  const user_guess = inputGuessNumber.value;
  if (user_guess < 1 || user_guess > 10) {
    alert("Zəhmət olmasa,1 və 10 arasında ədəd daxil edin!");
  } else {
    if (user_guess < answer) {
      message.innerHTML = "Sizin təxmininiz çox aşağıdır!";
      lifLine--;
      checkIsGameOver(lifLine);
      livesCountLabel.innerHTML = lifLine;
      guessedNumbers.push(user_guess);
      showGuessedNumbers(guessedNumbers);
    } else if (user_guess > answer) {
      message.innerHTML = "Sizin təxmininiz çox yuxarıdır!";
      lifLine--;
      checkIsGameOver(lifLine);
      livesCountLabel.innerHTML = lifLine;
      guessedNumbers.push(user_guess);
      showGuessedNumbers(guessedNumbers);
    } else if (user_guess == answer) {
      message.innerHTML = "Doğru ədədi düzgün tapdınız!";
      numberLabel.innerHTML = user_guess;
      playBtn.disabled = true;
      continueBtn.disabled = false;
      score++;
      scoreLabel.innerHTML = score;
      checkHighScore(score);
    }
  }
  inputGuessNumber.value = "";
});
continueBtn.addEventListener("click", () => {
    answer = randomNumberGenerate();
    console.log("answer contimue", answer);
    playBtn.disabled = false;
    continueBtn.disabled = true;
    numberLabel.innerHTML = "?";
    guessedNumbers = [];
    numbersGuess.style.opacity = 0;
    guessdNumbersLabel.innerHTML = "";
  });
  retry.addEventListener("click", () => {
    gameOver.style.opacity = 0;
    gameOver.style.transform = "scale(0)";
    game.style.opacity = 1;
    message.innerHTML = "";
    lifLine = 5;
    score = 0;
    guessedNumbers = [];
    livesCountLabel.innerHTML = lifLine;
    scoreLabel.innerHTML = score;
    numbersGuess.style.opacity = 0;
    guessdNumbersLabel.innerHTML = "";
    showHighScore();
  });