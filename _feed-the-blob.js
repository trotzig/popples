var backdrop = require('scenes/backdrop.js');

window.addEventListener('load', function() {
  enchant();

  game = new Game(1000, 800);
  game.preload('leave.png');
  game.onload = function () {
    game.addEventListener('enterframe', function() {
      //sprite.x += width(0.001);
    });
    game.pushScene(backdrop());
  };
  game.start();
});
