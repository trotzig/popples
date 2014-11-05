var Constants = require('constants');

class ScoreKeeper {
  constructor() {
    this.label = new window.Label();
    this.label.text = '0';
    this.currentValue = 0;
    this.label.x = 20;
    this.label.y = 20;
    this.label.font = '30px sans-serif';
    this.label.color = 'rgba(255, 255, 255, 0.3)';
  }

  get() {
    return this.label;
  }

  bubbleBursted(event) {
    if (event.causedByUser) {
      this.currentValue++;
    } else {
      this.currentValue--;
    }
    this.label.text = this.currentValue;
  }
}

module.exports = ScoreKeeper;
