var Bubble = require('objects/bubble'),
    Constants = require('constants'),
    Fan = require('objects/fan'),
    ScoreKeeper = require('objects/score_keeper');

// A layer with bubbles
module.exports = function(game) {
  var scene = new window.Scene();
  var bubbleCount = 0;

  var scoreKeeper = new ScoreKeeper();
  scene.addChild(scoreKeeper.get());

  var fan = new Fan();
  fan.blowOnTouch(scene);
  scene.addChild(fan.get());

  var keepThemBubblesComing = () => {
    if (bubbleCount < 40) {
      var size = (Math.random() * (Constants.MAX_BUBBLE_SIZE - 60)) + 60,
          posX = Math.random() * game.width,
          speedModifier = 0.5 + (Math.random() * 2);
      var bubble = new Bubble(size);
      bubble.bubbleFromBottom(game, posX, speedModifier);
      bubble.addBurstListener(scoreKeeper.bubbleBursted.bind(scoreKeeper));
      bubble.addBurstListener(() => bubbleCount--);
      var windListener = bubble.wind.bind(bubble);
      bubble.addBurstListener(() => fan.removeWindListener(windListener));
      fan.addWindListener(windListener);
      scene.addChild(bubble.get());
      bubbleCount++;
    }
    var nextTick = Math.random() * 2000;
    setTimeout(keepThemBubblesComing, nextTick);
  };
  keepThemBubblesComing();
  return scene;
};
