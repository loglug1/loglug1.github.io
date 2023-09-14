const gridSize = 100;
var canvasSize = 600;
var numSquares = Math.pow(gridSize, 2);

var isTectonic = false;
var tileSize = canvasSize/gridSize;

const ctx = document.getElementById("myCanvas").getContext("2d");

var tiles = new Array(gridSize);
for (var i = 0; i < tiles.length; i++) {
tiles[i] = new Array(gridSize);
}

function initilize(){
    for (y = 0; y < gridSize; y++) {
        if (y < 50) {
            direction = 4;
        } else {
            direction = 0;
        }
        for (x = 0; x < gridSize; x++) {
            tiles[y][x] = new Tile(-1, direction, false,0,false, x, y);
            tiles[y][x].weight = Math.floor(Math.random() * 10);
            lavaBool = Math.floor(Math.random()*100)
            if (lavaBool == 1){
                tiles[y][x].isLava == true;
            }
        }
    }


    x = document.getElementById("altoggle");
    x.style.display = "none";
    isTectonic = false;
    x = document.getElementById("toggle");
    x.style.display = "block";
    x = document.getElementById("dropdown");
    x.style.display = "none";
    x = document.getElementById("notBtn name");
    x.style.display = "block";

    draw();
    resizeCanvas();
}

window.onresize = resizeCanvas;