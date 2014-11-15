var backdrop = require('scenes/backdrop.js');
var bubbles = require('scenes/bubbles.js');

window.addEventListener('load', () => {
  enchant();

  var game = new window.Game(window.innerWidth, window.innerHeight);
  game.preload('app/assets/backdrop.png');
  game.preload('app/assets/mouse.png');
  game.scale = 1;
  game.onload = () => {
    game.pushScene(backdrop(game));
    game.pushScene(bubbles(game));
  };
  game.start();
});
