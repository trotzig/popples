var ein = enchant.Easing.QUAD_EASEIN;
var eout = enchant.Easing.QUAD_EASEOUT;
var einout = enchant.Easing.QUAD_EASEINOUT;

class Mouse {
  constructor(game) {
    this.game = game;
    var asset = this.game.assets['app/assets/mouse.png'];
    this.image = new window.Sprite(asset.width, asset.height);
    this.image.image = asset;

    this.state = 'falling';
    this.game.addEventListener('enterframe', this.move.bind(this));
  }

  trapInBubble(bubble) {
    this.trappedInBubble = bubble;
    this.state = 'trapped';

    bubble.addBurstListener(() => {
      this.state = 'falling';
      delete this.trappedInBubble;
    });
  }

  move() {
    if (this.image.y > this.game.height - this.image.height) {
      this.state = 'walking';
      this.image.y = this.game.height - this.image.height;
    }
    switch (this.state) {
      case 'falling':
        this.image.y += 4;
        break;
      case 'trapped':
        let b = this.trappedInBubble.get();
        this.image.x = b.x + b.width / 2 - this.image.width / 2;
        this.image.y = b.y + b.height / 2 - this.image.height / 2;
        break;
      case 'walking':
        this.image.x += 1;
        break;
    }
  }

  isTrapped() {
    return this.state === 'trapped';
  }

  get() {
    return this.image;
  }
}

module.exports = Mouse;
