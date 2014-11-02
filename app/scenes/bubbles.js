var Bubble = require('objects/bubble'),
    Constants = require('constants');

// A layer with bubbles
module.exports = function(game) {
  var scene = new window.Scene();
  var bubbleScore = new window.Label();
  bubbleScore.currentValue = 0;
  bubbleScore.x = 20;
  bubbleScore.y = 20;
  bubbleScore.font = '30px sans-serif';
  bubbleScore.color = '#fff';

  var bubbleScoreKeeper = (burstEvent) => {
    if (burstEvent.causedByUser) {
      bubbleScore.currentValue++;
    } else {
      bubbleScore.currentValue--;
    }
    bubbleScore.text = bubbleScore.currentValue;
  };

  scene.addChild(bubbleScore);
  var keepThemBubblesComing = () => {
    var size = (Math.random() * (Constants.MAX_BUBBLE_SIZE - 20)) + 20,
        posX = Math.random() * game.width,
        speedModifier = Math.random() * 2,
        nextTick = Math.random() * 2000;
    var bubble = new Bubble(game, size, posX, speedModifier);
    bubble.addBurstListener(bubbleScoreKeeper);
    scene.addChild(bubble.render());
    setTimeout(keepThemBubblesComing, nextTick);
  };
  keepThemBubblesComing();
  return scene;
};
