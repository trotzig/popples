var Bubble = require('objects/bubble'),
    Constants = require('constants');

// A layer with bubbles
module.exports = function(game) {
  var scene = new window.Scene();
  var bubbleCount = 0;
  var bubbleScore = new window.Label();
  bubbleScore.currentValue = 0;
  bubbleScore.x = 20;
  bubbleScore.y = 20;
  bubbleScore.font = '30px sans-serif';
  bubbleScore.color = '#fff';

  var bubbleScoreKeeper = (burstEvent) => {
    bubbleCount--;
    if (burstEvent.causedByUser) {
      bubbleScore.currentValue++;
    } else {
      bubbleScore.currentValue--;
    }
    bubbleScore.text = bubbleScore.currentValue;
  };

  scene.addChild(bubbleScore);
  var keepThemBubblesComing = () => {
    if (bubbleCount < 40) {
      var size = (Math.random() * (Constants.MAX_BUBBLE_SIZE - 20)) + 20,
          posX = Math.random() * game.width,
          speedModifier = 0.5 + (Math.random() * 2);
      var bubble = new Bubble(size);
      bubble.bubbleFromBottom(game, posX, speedModifier);
      bubble.addBurstListener(bubbleScoreKeeper);
      scene.addChild(bubble.get());
      bubbleCount++;
    }
    var nextTick = Math.random() * 2000;
    setTimeout(keepThemBubblesComing, nextTick);
  };
  keepThemBubblesComing();
  return scene;
};
