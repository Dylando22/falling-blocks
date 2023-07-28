MyGame.screens['game-play'] = (function(game, input, graphics, systems, renderer) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let ScoreSet = false;

    let myKeyboard = input.Keyboard()
    let background = {
        imageSrc: 'images/background-center.jpg',
        center: { x: 250, y: 0 },
        width: 500,
        height: 500,
      };
      
      background.image = new Image();
      background.image.ready = false;
      background.image.onload = function() {
        this.ready = true;
      };
      background.image.src = background.imageSrc;

      let background1 = {
        imageSrc: 'images/background-left.png',
        center: { x: 0, y: 0 },
        width: 250,
        height: 500,
      };
      
      background1.image = new Image();
      background1.image.ready = false;
      background1.image.onload = function() {
        this.ready = true;
      };
      background1.image.src = background1.imageSrc;

      let background2 = {
        imageSrc: 'images/background-right.png',
        center: { x:750 , y: 0 },
        width: 250,
        height: 500,
      };
      
      background2.image = new Image();
      background2.image.ready = false;
      background2.image.onload = function() {
        this.ready = true;
      };
      background2.image.src = background2.imageSrc;
      

    let particles = systems.ParticleSystem({
        center: { x: 750, y: 250 },
        size: { mean: 10, stdev: 4 },
        speed: { mean: 50, stdev: 25 },
        lifetime: { mean: 4, stdev: 1 }
    },
    graphics);

    let PlayerDeath = renderer.ParticleSystem(particles, graphics, 'images/particle.png');

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        if(Player.alive){
            Player.updateTime(elapsedTime);
            platformManager.updatePlatforms(elapsedTime);
            platformManager.checkCollisions();
            particles.update(elapsedTime)
        }
        else{
            if(!ScoreSet){
                Player.score = Player.timeAlive.toFixed(4);
                setHighScores();
                ScoreSet = true;
            }
        }

    }

    function render() {
        graphics.drawBackground(background2);
        graphics.drawBackground(background);
        graphics.drawBackground(background1);
        graphics.drawPlayer(Player);
        graphics.drawScore(Player);
        graphics.drawPlatforms(platformManager.platforms);
        PlayerDeath.render();
        if(!Player.alive){
           graphics.drawGameOver(Player.score);
        }

    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });
        myKeyboard.register('ArrowLeft', Player.moveLeft)
        myKeyboard.register('ArrowRight', Player.moveRight)
        ScoreSet = false;
        Player.initialize();
        platformManager.initialize();
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.input, MyGame.graphics, MyGame.systems, MyGame.render));

function setHighScores() {
    let scores = localStorage.getItem('high-scores');
    if(scores === null || scores.length === 0){
        let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
        localStorage.setItem('high-scores', Player.score );
        localStorage.setItem('names',player);
    }
    else{
        let oldNames = localStorage.getItem('names');
        let names = oldNames.split(',');
        let oldScores = scores.split(',');
        let scorestr= ""
        let nameStr= "";
        let scoreEntered = false;
        for(let i = 0; i < oldScores.length; i++){
            if(Player.score > oldScores[i] && !scoreEntered){
                let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
                scoreEntered = true;
                if(player !== null || player == ""){
                    if( i === 0) {
                        scorestr += Player.score + "," + oldScores[i];
                        nameStr += player + "," + names[i];
                    }
                    else{
                        scorestr += "," + Player.score + "," + oldScores[i];
                        nameStr += "," + player + "," + names[i];
                    }
                }
                else{
                    if(i > 0){
                        scorestr += "," + oldScores[i];
                        nameStr += "," + names[i];
                    }
                    else{
                        scorestr += oldScores[i];
                        nameStr += names[i];
                    }
                }
            }
            else {
                if(i > 0){
                    scorestr += "," + oldScores[i];
                    nameStr += "," + names[i];
                }
                else{
                    scorestr += oldScores[i];
                    nameStr += names[i];
                }
            }
        }

        if(scoreEntered === false && oldScores.length < 5){
            let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
            scoreEntered = true;
            scorestr += "," + Player.score
            nameStr += "," + player
        }
        localStorage.setItem('high-scores', scorestr);
        localStorage.setItem('names', nameStr);

    }
}