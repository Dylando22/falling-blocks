MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        context.restore();
    }

    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fillStyle;
        context.strokeStyle = spec.strokeStyle;
        context.textBaseline = 'top';

        context.translate(spec.position.x, spec.position.y);
        context.rotate(spec.rotation);
        context.translate(-spec.position.x, -spec.position.y);


        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    function drawBackground(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.center.x,
                        texture.center.y,
                        texture.width, texture.height);
                    context.restore();
        }
    };

    function drawPlayer(player) {
        context.beginPath();
        context.rect(player.x,player.y,player.width,player.height)
        context.fillStyle = "green";
        context.fill();
    };

    function drawScore(player){
        context.lineWidth = 10;
        context.font = '20px Arial';
        context.fillStyle = "white";
        context.fillText(`Time: ${player.timeAlive.toFixed(4)}`, 775, 50);
    }

    function drawGameOver(currentScore){
        context.lineWidth = 10;
        context.font = '80px Arial';
        context.fillStyle = "red";
        context.fillText('Game Over', 300, canvas.height / 4);
        context.font = '25px Arial';
        context.fillText(`Your Score ${currentScore}`, 375, canvas.height / 3);
        context.fillText('Press esc to return to main menu', 325, canvas.height / 2);
    }

    function drawPlatforms(platforms){
        platforms.forEach(platform => {
            if(platform.falling){
                context.beginPath();
                context.fillStyle = "yellow";
                context.rect(platform.x, platform.y,
                    (platform.gapX - platform.x),
                    platform.height)
                context.fill();
                context.restore();
                context.beginPath()    
                context.rect(platform.gapX + platform.gap,
                         platform.y,
                        750 - (platform.gapX + platform.gap),
                        platform.height)
                context.fill();
            }
            else if(platform.isReady){
                context.beginPath();
                context.fillStyle = "blue";
                context.rect(platform.x, platform.y,
                    (platform.gapX - platform.x),
                    platform.height)
                context.fill();
                context.restore();
                context.beginPath()    
                context.rect(platform.gapX + platform.gap,
                         platform.y,
                        750 - (platform.gapX + platform.gap),
                        platform.height)
                context.fill();
            }
    });
    }


    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawBackground: drawBackground,
        drawPlayer: drawPlayer,
        drawScore: drawScore,
        drawGameOver: drawGameOver,
        drawPlatforms, drawPlatforms

    };

    return api;
}());
