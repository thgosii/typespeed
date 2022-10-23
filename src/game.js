// canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");
const gameLife = document.getElementById("life");
const gameScore = document.getElementById("score");
const gameMaxScore = document.getElementById("max-score");

// entities
let wordEntities = [];

// interval ticks limits
const wordSpawnTickLimit = 50;

// interval ticks
let wordSpawnTick = wordSpawnTickLimit;

// status
const GAME_STATUS_PAUSED = "paused";
const GAME_STATUS_PLAYING = "playing";
let gameStatus = GAME_STATUS_PAUSED;
let isFirstPlay = true;

// game values
const START_LIVES = 3;
let life = START_LIVES;
let score = 0;
let maxScore = 0;

// audio
const gameMusic = new Audio("assets/audios/lifelover.mp3");

// font
const DEFAULT_FONT_FAMILY = "pixeloid_sansregular";
const defaultFont = `20px ${DEFAULT_FONT_FAMILY}`;
const gameOverFont = `30px ${DEFAULT_FONT_FAMILY}`;

// screen
const gameScreen = {
  width: 800,
  height: 600,
  backgroundColor: "#2f2f2f",
};

function init() {
  canvas.width = gameScreen.width;
  canvas.height = gameScreen.height;
}

function startGame() {
  wordEntities = [];
  score = 0;
  life = START_LIVES;
  gameStatus = GAME_STATUS_PLAYING;

  gameInput.focus();
  gameInput.onblur = () => gameInput.focus();
  gameInput.value = "";

  gameScore.innerHTML = `score: ${score}`;
  gameLife.innerHTML = `life: ${life}`;
  gameMaxScore.innerHTML = `max score: ${maxScore}`;

  gameMusic.play();
}

function gameOver() {
  gameStatus = GAME_STATUS_PAUSED;

  gameMusic.pause();
  gameMusic.currentTime = 0;

  if (score > maxScore) {
    maxScore = score;
  }
}

function processIntervals() {
  wordSpawnTick++;
}

function checkWordTry() {
  const tryText = gameInput.value.trim();

  let scoreToAdd = 0;

  const indexesToRemove = wordEntities
    .map((wordEntity, index) => {
      if (wordEntity.text.toLowerCase() === tryText.toLowerCase()) {
        scoreToAdd += 10 * wordEntity.text.length;
        return index;
      }

      return null;
    })
    .filter((index) => index != null);

  const newWordEntities = [];

  for (let i = 0; i < wordEntities.length; i++) {
    if (indexesToRemove.find((index) => index === i) == null) {
      newWordEntities.push(wordEntities[i]);
    }
  }

  wordEntities = newWordEntities;

  if (indexesToRemove.length > 0) {
    gameInput.value = "";
  }

  score += scoreToAdd;

  gameScore.innerHTML = `score: ${score}`;
}

function spawnWord() {
  const randomText = wordsData[Math.floor(Math.random() * wordsData.length)];
  const randomY = Math.random() * (gameScreen.height - 70) + 50;

  wordEntities.push(new Word(randomText, randomY));
}

function update() {
  if (gameStatus === GAME_STATUS_PLAYING) {
    if (wordSpawnTick > wordSpawnTickLimit) {
      spawnWord();

      wordSpawnTick = 0;
    }

    // entities
    wordEntities.forEach((wordEntity, index) => {
      wordEntity.update();

      // removes a word from array after it passes the screen limit
      if (wordEntity.x > gameScreen.width) {
        wordEntities.splice(index, 1);

        life--;
        gameLife.innerHTML = `life: ${life}`;

        if (life < 1) {
          gameOver();
        }
      }
    });

    processIntervals();
  }
}

function render() {
  // background
  ctx.fillStyle = gameScreen.backgroundColor;
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  ctx.font = defaultFont;

  if (gameStatus === GAME_STATUS_PLAYING) {
    // entities
    wordEntities.forEach((wordEntity) =>
      wordEntity.render(ctx, gameInput.value.trim())
    );
  } else if (gameStatus === GAME_STATUS_PAUSED) {
    ctx.font = gameOverFont;
    ctx.fillStyle = "white";
    ctx.fillText("PRESS 'SPACE' TO START", 205, 300);

    ctx.fillStyle = "#5195a9";
    ctx.fillText("TYPESPEED", 305, 360);
  }
}

function gameLoop() {
  update();
  render();

  window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    checkWordTry();
  } else if (event.code === "Space") {
    if (gameStatus === GAME_STATUS_PAUSED) {
      startGame();

      if (isFirstPlay) {
        isFirstPlay = false;
      }
    }
  }
});

init();

window.requestAnimationFrame(gameLoop);
