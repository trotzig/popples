module.exports = function(game) {
  var scene = new window.Scene();
  var asset = game.assets['app/assets/backdrop.png'];
  var sprite = new window.Sprite(asset.width, asset.height);
  sprite.image = asset;
  var scale = Math.min(asset.width, game.width) / asset.width;
  sprite.scaleX = scale;
  sprite.scaleY = scale;
  sprite.x = game.width / 2 - asset.width / 2;
  sprite.y = game.height / 2 - asset.height / 2;
  scene.addChild(sprite);
  return scene;
};
