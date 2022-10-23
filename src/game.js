// canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");

// entities
const wordEntites = [];

// interval ticks limits
const wordsTickLimit = 30;
const wordSpawnTickLimit = 190;

// interval ticks
let wordsTick = wordsTickLimit;
let wordSpawnTick = wordSpawnTickLimit;

const gameScreen = {
  width: 800,
  height: 600,
  backgroundColor: "#2f2f2f",
};

function init() {
  canvas.width = gameScreen.width;
  canvas.height = gameScreen.height;

  gameInput.focus();
  gameInput.onblur = () => gameInput.focus();
}

function processIntervals() {
  wordSpawnTick++;
  wordsTick++;
}

function spawnWord() {
  const randomY = Math.random() * (gameScreen.height - 70) + 50;

  wordEntites.push(new Word("asd", randomY));
}

function update() {
  if (wordSpawnTick > wordSpawnTickLimit) {
    spawnWord();

    wordSpawnTick = 0;
  }

  // entities
  if (wordsTick > wordsTickLimit) {
    wordEntites.forEach((wordEntity) => wordEntity.update());

    wordsTick = 0;
  }

  processIntervals();
}

function render() {
  // background
  ctx.fillStyle = gameScreen.backgroundColor;
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  // entities
  wordEntites.forEach((wordEntity) => wordEntity.render(ctx));
}

function gameLoop() {
  update();
  render();

  window.requestAnimationFrame(gameLoop);
}

init();

window.requestAnimationFrame(gameLoop);
