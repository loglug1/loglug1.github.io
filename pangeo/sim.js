function simulate(){
    oldTiles = JSON.parse(JSON.stringify(tiles));
    heatMap = generateHeatMap();

    //2nd and 4th collisions
    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if (heatMap[y][x] >= 2) {
                if(tiles[y][x].isLava && tiles[y][x].height){
                    tiles[y][x].isVolcano == true;
                }
                if (++tiles[y][x].height > 4) {
                    tiles[y][x].height = 4;
                    contributers = createTowardsArray(y,x);
                    for (i in contributers) {
                        oldTile = contributers[i];
                        liveTile = tiles[oldTile.y][oldTile.x];
                        if (liveTile.height < 4) {
                            randomDir = Math.floor(Math.random()*2);
                            randomizeDirection(liveTile,randomDir);
                        }
                    }
                }
            }
        }
    }

    //zeros
    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if (heatMap[y][x] == 0) {
                if (--tiles[y][x].height < -4) {
                    tiles[y][x].height = -4;
                    modifier = Math.floor(Math.random() * 4) - 2
                    tiles[y][x].direction = (tiles[y][x].direction + modifier) % 8;
                    tiles[y][x].isVolcano = true;
                    contributers = createAwayArray(y, x);
                    for (i in contributers) {
                        oldTile = contributers[i];
                        liveTile = tiles[oldTile.y][oldTile.x];
                        if (liveTile.height > -4) {
                            liveTile.height--;
                        }
                    }
                }
            }
        }
    }

    //ones
    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if (heatMap[y][x] == 1) {
                
            }
        }
    }

    //volcanos
    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if (tiles[y][x].isVolcano && tiles[y][x].isLava) {
                tile[y][x] += 3;
                if (tiles[y][x].height > 4) {
                    tiles[y][x].height = 4;
                    tiles[y][x].isVolcano = false;
                }
            }
        }
    }

    if (isTectonic) {
        drawT();
    } else {
        draw();
    }
}

function findLava() {
    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if (tiles[y][x].isLava) {
                console.log("Volcano at " + x + ", " + y);
            }
        }
    }
}

function reverseDirection(tile) {
    tile.direction = (tile.direction + 4) % 8
}
function randomizeDirection(tile,rand) {
    switch(rand){
        case 0:
            tile.direction = (tile.direction + 1) % 8;
        case 1:
            tile.direction = (tile.direction + 7) % 8;
        case 2:
            tile.direction = tile.direction;
    }
}
function isToward(pos, adjTile) {
    switch(pos) {
        case 0:
            return adjTile.direction == 4;
        case 1:
            return adjTile.direction == 5;
        case 2:
            return adjTile.direction == 6; 
        case 3:
            return adjTile.direction == 7;
        case 4:
            return adjTile.direction == 0;
        case 5:
            return adjTile.direction == 1;
        case 6:
            return adjTile.direction == 2;
        case 7:
            return adjTile.direction == 3;
    }
}

function isAway(pos, adjTile) {
    return pos == adjTile.direction;
}