var Bubble = require('objects/bubble'),
    Constants = require('constants'),
    ScoreKeeper = require('objects/score_keeper');

// A layer with bubbles
module.exports = function(game) {
  var scene = new window.Scene();
  var bubbleCount = 0;

  var scoreKeeper = new ScoreKeeper();
  scene.addChild(scoreKeeper.get());

  var keepThemBubblesComing = () => {
    if (bubbleCount < 40) {
      var size = (Math.random() * (Constants.MAX_BUBBLE_SIZE - 20)) + 20,
          posX = Math.random() * game.width,
          speedModifier = 0.5 + (Math.random() * 2);
      var bubble = new Bubble(size);
      bubble.bubbleFromBottom(game, posX, speedModifier);
      bubble.addBurstListener(scoreKeeper.bubbleBursted.bind(scoreKeeper));
      bubble.addBurstListener(() => bubbleCount--);
      scene.addChild(bubble.get());
      bubbleCount++;
    }
    var nextTick = Math.random() * 2000;
    setTimeout(keepThemBubblesComing, nextTick);
  };
  keepThemBubblesComing();
  return scene;
};
