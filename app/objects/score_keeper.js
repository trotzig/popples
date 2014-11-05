var Constants = require('constants');

class ScoreKeeper {
  constructor() {
    this.label = new window.Label();
    this.currentValue = 0;
    this.label.x = 20;
    this.label.y = 20;
    this.label.font = '30px sans-serif';
    this.label.color = '#fff';
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
