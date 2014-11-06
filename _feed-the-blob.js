var backdrop = require('scenes/backdrop.js');
var bubbles = require('scenes/bubbles.js');

window.addEventListener('load', () => {
  enchant();

  var game = new window.Game(705, 705);
  game.preload('app/assets/backdrop.png');
  game.onload = () => {
    game.pushScene(backdrop(game));
    game.pushScene(bubbles(game));
  };
  game.start();
});
