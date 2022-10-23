// canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");

// entities
const wordEntites = [];

// interval ticks limits
const wordsTickLimit = 10;
const wordSpawnTickLimit = 60;

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

function checkWordTry() {
  const tryText = gameInput.value;

  const index = wordEntites.findIndex(
    (wordEntity) => wordEntity.text.toLowerCase() === tryText.toLowerCase()
  );

  if (index > -1) {
    wordEntites.splice(index, 1);
    gameInput.value = "";
  }
}

function spawnWord() {
  const randomText = wordsData[Math.floor(Math.random() * wordsData.length)];
  const randomY = Math.random() * (gameScreen.height - 70) + 50;

  wordEntites.push(new Word(randomText, randomY));
}

function update() {
  if (wordSpawnTick > wordSpawnTickLimit) {
    spawnWord();

    wordSpawnTick = 0;
  }

  // entities
  if (wordsTick > wordsTickLimit) {
    wordEntites.forEach((wordEntity, index) => {
      wordEntity.update();

      // removes a word from array after it passes the screen limit
      if (wordEntity.x > gameScreen.width) {
        wordEntites.splice(index, 1);
      }
    });

    wordsTick = 0;
  }

  processIntervals();
}

function render() {
  // background
  ctx.fillStyle = gameScreen.backgroundColor;
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  // entities
  wordEntites.forEach((wordEntity) => wordEntity.render(ctx, gameInput.value));
}

function gameLoop() {
  update();
  render();

  window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWordTry();
  }
});

init();

window.requestAnimationFrame(gameLoop);
