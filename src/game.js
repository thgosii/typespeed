const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// elements
const gameInput = document.getElementById("game-input");

const gameScreen = {
  width: 800,
  height: 600,
  backgroundColor: "#2f2f2f",
};

const init = () => {
  canvas.width = gameScreen.width;
  canvas.height = gameScreen.height;

  gameInput.focus();
  gameInput.onblur = () => gameInput.focus();
};

const update = () => {};

const render = () => {
  // background
  ctx.fillStyle = gameScreen.backgroundColor;
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
};

const gameLoop = () => {
  update();
  render();

  window.requestAnimationFrame(gameLoop);
};

init();

window.requestAnimationFrame(gameLoop);
