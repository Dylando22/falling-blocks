const platform = {
  x: 0,
  y: 0,
  width: 100,
  height: 20,
  gap: 60,
  gapX: 0,
  falling: false,
  speed: 1.5,
  isReady: false,
  readyCount: 0,

};


const platformManager = {
    platforms: [],

    initialize: function initialize() {
        this.platforms = [];
        for (let i = 0; i < 7; i++) {
            const newPlatform = Object.assign({}, platform);
            newPlatform.x = 250;
            newPlatform.y = 0;
            newPlatform.falling = false;
            newPlatform.readyCount = 0;
            if(i === 0){
                newPlatform.gapX = 500
                newPlatform.isReady = true;
            }
            else{
                let prevGap = this.platforms[i-1].gapX;
                let offset = Math.random() * (30 - 6) + 6
                let direction = Math.random()
                if(direction > .5){
                    let num = prevGap - offset;
                    newPlatform.gapX = Math.round(num);
                }
                else{
                    let num = prevGap + offset;
                    newPlatform.gapX = Math.round(num);
                }
            }
            this.platforms.push(newPlatform);
          }
    },

    updatePlatforms: function updatePlatforms(elapsedTime) {
        platforms = this.platforms;
        for (let i = 0; i < 7; i++) {
            // If the platform is falling then update
          if (platforms[i].falling) {
            platforms[i].y += 1 * platforms[i].speed;
            // If the platform has reached the bottom, change gap location and send to top
            if (platforms[i].y > 500) {
              platforms[i].y = 0;
              platforms[i].x = 250;
              platforms[i].falling = false;
              let prevGap = 0;
                if(i === 0){
                    prevGap = platforms[6].gapX;
                }
                else if( i > 0) {
                    prevGap = platforms[i-1].gapX;
                }
                let offset = Math.random() * (30 - 6) + 6
                let direction = Math.random()
                if(direction > .5){
                    let num = prevGap - offset;
                    platforms[i].gapX = Math.round(num);
                }
                else{
                    let num = prevGap + offset;
                    platforms[i].gapX = Math.round(num);
                }
            }
          }
        //   If the platform is not falling
          else{
            // if it's waiting to fall
            if(platforms[i].isReady){
                // update count
                platforms[i].readyCount += elapsedTime
                // it it has waiting log enough, start falling, stop ready
                if(platforms[i].readyCount > 1000){
                    platforms[i].falling = true;
                    platforms[i].isReady = false;
                    platforms[i].readyCount = 0;
                    // Make next one ready
                    if(i !== 6){
                        platforms[i+1].isReady = true;
                    }
                    else if(i === 6){
                        platforms[0].isReady = true;
                    }
                }


            }

          }
        }
    },

    checkCollisions: function checkCollisions() {
        platforms.forEach(platform => {
        if (Player.x < platform.gapX && Player.y - Player.height < platform.y && Player.y > platform.y - platform.height) {
            Player.alive = false;
        }
        else if (Player.x + Player.width > platform.gapX + platform.gap && Player.y - Player.height < platform.y && Player.y > platform.y - platform.height){
            Player.alive = false;
        }
  });
}
}
