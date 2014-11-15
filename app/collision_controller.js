class CollisionController {
  constructor(game) {
    this.game = game;
    this.bubbles = [];
    this.mice = [];

    this.game.addEventListener('enterframe', this.checkCollisions.bind(this));
  }

  addBubble(bubble) {
    this.bubbles.push(bubble);
    bubble.addBurstListener(() => {
      this.bubbles.splice(this.bubbles.indexOf(bubble), 1);
    });
  }

  addMouse(mouse) {
    this.mice.push(mouse);
  }

  checkCollisions() {
    for(let mouse of this.mice) {
      if (!mouse.isTrapped()) {
        for (let bubble of this.bubbles) {
          if (mouse.get().within(bubble.get(), bubble.get().width / 2)) {
            mouse.trapInBubble(bubble);
          }
        }
      }
    }
  }
}

module.exports = CollisionController;
