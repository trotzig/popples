// A layer with bubbles

module.exports = function(game) {
  var ein = enchant.Easing.QUAD_EASEIN;
  var eout = enchant.Easing.QUAD_EASEOUT;
  var einout = enchant.Easing.QUAD_EASEINOUT;

  var createBubble = (size, posX) => {
    var posY = game.height + size;
    var bubble = new window.Sprite(size, size);
    var surface = new window.Surface(size, size);
    surface.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    surface.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    surface.context.beginPath();
    var halfSize = Math.floor(size/2);
    surface.context.arc(halfSize, halfSize, halfSize, 0, Math.PI*2, true);
    surface.context.stroke();
    surface.context.fill();
    surface.context.closePath();
    bubble.image = surface;
    bubble.x = posX;
    bubble.y = posY;

    // Burst on touch/click
    bubble.addEventListener('touchstart', () => {
      bubble.tl.clear()
               .moveBy(0, -size, 5, eout).and()
               .scaleTo(0.1, 0.1, 2, eout)
               .moveBy(0, size, 8, ein).and()
               .fadeOut(8);
    });

    // Wiggle it
    bubble.tl.moveBy(-size * 0.4, 0, size, einout)
             .moveBy(size * 0.4, 0, size, einout)
             .loop();

    // Bubble it towards the top
    game.addEventListener('enterframe', () => {
      bubble.y -= 1 - size / 100;
      if (bubble.y < -size) {
        bubble.remove();
      }
    })
    return bubble;
  };

  var scene = new window.Scene();
  var keepThemBubblesComing = () => {
    var size = (Math.random() * 150) + 20,
        posX = Math.random() * game.width,
        nextTick = Math.random() * 1000;
    scene.addChild(createBubble(size, posX));
    setTimeout(keepThemBubblesComing, nextTick);
  };
  keepThemBubblesComing();
  return scene;
};
