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
  this.x = -30;
  this.y = y;
  this.color = "white";
}

Word.prototype.update = function () {
  this.x += 2.4;

  this.color = getWordColorByPosition(this.x);
};

Word.prototype.render = function (ctx, tryText) {
  ctx.fillStyle = this.color;
  ctx.fillText(this.text.toLowerCase(), this.x, this.y);

  if (this.text.toLowerCase().startsWith(tryText.toLowerCase())) {
    ctx.fillStyle = "green";
    ctx.fillText(
      this.text.toLowerCase().substring(0, tryText.length),
      this.x,
      this.y
    );
  }
};
