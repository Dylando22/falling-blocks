MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        let scores = localStorage.getItem('high-scores');
        
        if(scores === null || scores.length === 0){
            document.getElementById("no-scores").innerHTML = "No Current Scores"
        }
        else {
           document.getElementById("no-scores").innerHTML = ""
           let list = document.getElementById("scores-list");
           list.textContent = "";
           let arry = scores.split(",").reverse();
           let n = localStorage.getItem('names');
           let names = n.split(',').reverse();
           let size = arry.length;
           if (size > 5){
            size = 5
           }
            for(let i = 0; i< size; i++){
                var node = document.createElement('li');
                node.appendChild(document.createTextNode(names[i] + ": " + arry[i]));
                list.appendChild(node);
            }

        }

    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
