module.exports = function(game) {
  var scene = new window.Scene();
  var sprite = new window.Sprite(800, 800);
  sprite.image = game.assets['leave.png'];
  scene.addChild(sprite);
  return scene;
};
