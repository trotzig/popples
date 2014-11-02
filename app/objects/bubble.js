var Constants = require('constants');
var ein = enchant.Easing.QUAD_EASEIN;
var eout = enchant.Easing.QUAD_EASEOUT;
var einout = enchant.Easing.QUAD_EASEINOUT;


class Bubble {
  constructor(game, size, posX, speedModifier) {
    this.game = game;
    this.size = size;
    this.posX = posX;
    this.speedModifier = speedModifier;
    this.burstListeners = [];
    this.bursted = false;
  }

  render() {
    this.bubble = new window.Sprite(this.size, this.size);
    var surface = new window.Surface(this.size, this.size);
    surface.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    surface.context.beginPath();
    var halfSize = Math.floor(this.size/2);
    surface.context.arc(halfSize, halfSize, halfSize, 0, Math.PI*2, true);
    surface.context.fill();
    surface.context.closePath();
    this.bubble.image = surface;
    this.bubble.x = this.posX;
    this.bubble.y = this.game.height;

    // Burst on touch/click
    this.bubble.addEventListener('touchstart',  this.burst.bind(this, true));

    // Wiggle it
    this.bubble.tl.moveBy(-this.size * 0.4, 0, this.size, einout)
                  .moveBy(this.size * 0.4, 0, this.size, einout)
                  .loop();

    // Bubble it towards the top
    this.game.addEventListener('enterframe', this.moveUp.bind(this));

    return this.bubble;
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

  moveUp() {
    if (this.bursted) {
      // Don't interfer with the bubble being bursted
      return;
    }
    this.bubble.y -= (1 - this.size / Constants.MAX_BUBBLE_SIZE) * this.speedModifier;
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
