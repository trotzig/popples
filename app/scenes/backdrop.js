module.exports = function() {
  var scene = new Scene();
  var sprite = new Sprite(800, 800);
  sprite.image = game.assets['leave.png'];
  scene.addChild(sprite);
  return scene;
};
