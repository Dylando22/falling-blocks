let Player = {
    x: 500,
    y: 450,
    width: 20,
    height: 20,
    alive: true,
    timeAlive: 0,
    score: 0,

    moveLeft:
    function moveLeft() {
        if(Player.alive && Player.x > 250){
            Player.x -= 5;
        }
  },
    moveRight: function moveRight() {
        if(Player.alive && Player.x < (750 - Player.width)){
            Player.x += 5;
        }
  },

  updateTime: function updateTime(elapsedTime) {
    this.timeAlive += elapsedTime / 1000
  },

  initialize: function initialize() {
    Player.x = 500;
    Player.y = 450;
    Player.width = 20;
    Player.height = 20;
    Player.alive = true;
    Player.timeAlive = 0;
  }
    
  }
  