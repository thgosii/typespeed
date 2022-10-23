// canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");

// entities
let wordEntities = [];

// interval ticks limits
const wordSpawnTickLimit = 65;

// interval ticks
let wordSpawnTick = wordSpawnTickLimit;

// status
const GAME_STATUS_PAUSED = "paused";
const GAME_STATUS_PLAYING = "playing";
let gameStatus = GAME_STATUS_PAUSED;
let isFirstPlay = true;

// game values
let score = 0;

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
  gameStatus = GAME_STATUS_PLAYING;
  gameInput.focus();
  gameInput.onblur = () => gameInput.focus();
}

function processIntervals() {
  wordSpawnTick++;
}

function checkWordTry() {
  const tryText = gameInput.value.trim();

  const indexesToRemove = wordEntities
    .map((wordEntity, index) =>
      wordEntity.text.toLowerCase() === tryText.toLowerCase() ? index : null
    )
    .filter((wordEntity) => wordEntity != null);

  const newWordEntities = [];

  for (let i = 0; i < wordEntities.length; i++) {
    if (indexesToRemove.find((index) => index === i) == null) {
      newWordEntities.push(wordEntities[i]);
    }
  }

  wordEntities = newWordEntities;

  gameInput.value = "";

  score += indexesToRemove.length * 10;
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
      }
    });

    processIntervals();
  }
}

function render() {
  // background
  ctx.fillStyle = gameScreen.backgroundColor;
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  if (gameStatus === GAME_STATUS_PLAYING) {
    // entities
    wordEntities.forEach((wordEntity) =>
      wordEntity.render(ctx, gameInput.value.trim())
    );
  }
}

function gameLoop() {
  update();
  render();

  window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWordTry();
  } else if (event.key === " ") {
    if (gameStatus === GAME_STATUS_PAUSED) {
      startGame();

      if (isFirstPlay) {
        const music = new Audio("assets/audios/lifelover.mp3");
        music.play();

        isFirstPlay = false;
      }
    }
  }
});

init();

window.requestAnimationFrame(gameLoop);
