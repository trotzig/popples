var Constants = require('constants');
var ein = enchant.Easing.QUAD_EASEIN;
var eout = enchant.Easing.QUAD_EASEOUT;
var einout = enchant.Easing.QUAD_EASEINOUT;


class Bubble {
  constructor(size) {
    this.size = size;
    this.burstListeners = [];
    this.bursted = false;
    this.bubble = new window.Sprite(this.size, this.size);
    var surface = new window.Surface(this.size, this.size);
    surface.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    surface.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    surface.context.lineWidth = 1;
    surface.context.beginPath();
    var halfSize = Math.floor(this.size/2);
    surface.context.arc(halfSize, halfSize, this.size/2.5, 0, Math.PI*2);
    surface.context.fill();
    surface.context.stroke();
    surface.context.closePath();

    // Draw a small brighter circle in the upper left corner
    surface.context.beginPath();
    surface.context.arc(this.size/3, this.size/3, this.size/10, 0, Math.PI*2);
    surface.context.fill();
    surface.context.closePath();

    this.bubble.image = surface;
  }

  get() {
    return this.bubble;
  }

  bubbleFromBottom(game, posX, speedModifier) {
    this.bubble.scale(0.1);
    this.bubble.x = posX;
    this.bubble.y = game.height - this.size;

    // Burst on touch/click
    this.bubble.addEventListener('touchstart',  this.burst.bind(this, true));

    // Make it appear
    this.bubble.tl.scaleTo(1, 15, eout).and()
                  .moveBy(0, -10 * speedModifier, 15, eout)
                  .then(() => {
      // Wiggle it
      this.bubble.tl.moveBy(-this.size * 0.4, 0, this.size, einout)
                    .moveBy(this.size * 0.4, 0, this.size, einout)
                    .loop();
    });

    // Bubble it towards the top
    game.addEventListener('enterframe', this.moveUp.bind(this, speedModifier));
  }

  burst(causedByUser) {
    this.bursted = true;
    this.bubble.tl.clear()
                  .moveBy(0, -this.size, 5, eout).and()
                  .scaleTo(0.1, 0.1, 2, eout)
                  .moveBy(0, this.size, 8, ein).and()
                  .fadeOut(8)
    var event = {
      causedByUser: causedByUser,
    };
    for (let listener of this.burstListeners) {
      listener(event);
    }
  }

  moveUp(speedModifier) {
    if (this.bursted) {
      // Don't interfer with the bubble being bursted
      return;
    }
    this.bubble.y -= (1 - this.size / (Constants.MAX_BUBBLE_SIZE * 2)) * speedModifier;
    if (this.bubble.y < 50) {
      // Burst it at the top;
      this.burst(false);
    }
  }

  addBurstListener(listener) {
    this.burstListeners.push(listener);
  }
}

module.exports = Bubble;
