function getWordColorByPosition(x) {
  if (x < 300) {
    return "white";
  } else if (x < 600) {
    return "yellow";
  }

  return "red";
}

function Word(text, y) {
  this.text = text;
  this.x = -200;
  this.y = y;
  this.color = "white";
}

Word.prototype.update = function () {
  this.x += 1;

  this.color = getWordColorByPosition(this.x);
};

Word.prototype.render = function (ctx) {
  ctx.font = "20px Arial";
  ctx.fillStyle = this.color;
  ctx.fillText(this.text, this.x, this.y);
};
