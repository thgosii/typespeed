// canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");

// entities
const wordEntites = [];

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

function update() {
  // entities
  wordEntites.forEach((wordEntity) => wordEntity.update());
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
