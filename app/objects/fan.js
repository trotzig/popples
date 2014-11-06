var ein = enchant.Easing.QUAD_EASEIN;
var eout = enchant.Easing.QUAD_EASEOUT;
var einout = enchant.Easing.QUAD_EASEINOUT;

class Fan {
  constructor() {
    this.blowing = false;
    this.size = 50;
    this.image = new window.Sprite(this.size, this.size);
    this.image.x = 100;
    this.image.y = 100;
    var surface = new window.Surface(this.size, this.size);
    surface.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    surface.context.lineWidth = 1;
    surface.context.beginPath();
    var halfSize = Math.floor(this.size/2);
    surface.context.arc(halfSize, halfSize, this.size/2.5, 0, Math.PI*2);
    surface.context.stroke();
    surface.context.closePath();
    this.image.image = surface;
    this.image.opacity = 0;
    this.image.addEventListener('enterframe', (e) => {
      if (this.blowing) {
        let event = new window.Event('wind');
        event.transmitter = this.image;
        event._initPosition(this.lastEvent.x, this.lastEvent.y)
        this.image.dispatchEvent(event);
      }
    });
  }

  follow(event) {
    this.image.x = event.x - this.size/2;
    this.image.y = event.y - this.size/2;
    this.lastEvent = event;
  }

  addWindListener(windListenerFunc) {
    this.image.addEventListener('wind', windListenerFunc);
  }

  removeWindListener(windListenerFunc) {
    this.image.removeEventListener('wind', windListenerFunc);
  }

  blowOnTouch(scene) {
    scene.addEventListener('touchmove', (event) => {
      this.follow(event);
    });

    scene.addEventListener('touchstart', (event) => {
      this.follow(event);
      this.blowing = true;
      this.image.scaleX = 1;
      this.image.scaleY = 1;
      this.image.opacity = 1;
      this.image.tl.scaleTo(1.7, 20, einout).scaleTo(1, 20, einout).loop();
    });

    scene.addEventListener('touchend', (event) => {
      this.blowing = false;
      this.image.tl.clear();
      this.image.opacity = 0;
    });
  }

  get() {
    return this.image;
  }
}

module.exports = Fan;
