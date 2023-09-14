function createTowardsArray(y, x){

    if ((y-1) < 0){
        munY= (gridSize + (y-1)) % gridSize;
        pluY = y + 1;
    }
    else if((y+1) >= gridSize){
        pluY = (y+1) % gridSize;  
        munY = y - 1;
    }
    else{
        pluY = y + 1;
        munY = y - 1;
    }
    if((x-1) < 0){
        munX = (gridSize + (x-1)) % gridSize;
        pluX = x + 1;
    }
    else if((x+1) >= gridSize){
        pluX = (x+1) % gridSize;
        munX = x - 1;
    }
    else{
        pluX = x + 1;
        munX = x - 1;
    }
    towardTiles = [];
    countToward = 0;
    if(isToward(0, oldTiles[munY][x])){
        towardTiles[countToward] = oldTiles[munY][x];
        countToward++;
    }
    if(isToward(1, oldTiles[munY][pluX])){
        towardTiles[countToward] = oldTiles[munY][pluX];
        countToward++;
    }
    if(isToward(2, oldTiles[y][pluX])){
        towardTiles[countToward] = oldTiles[y][pluX];
        countToward++;
    }
    if(isToward(3, oldTiles[pluY][pluX])){
        towardTiles[countToward] = oldTiles[pluY][pluX];
        countToward++;
    }
    if(isToward(4, oldTiles[pluY][x])){
        towardTiles[countToward] = oldTiles[pluY][x];
        countToward++;
    }
    if(isToward(5, oldTiles[pluY][munX])){
        towardTiles[countToward] = oldTiles[pluY][munX];
        countToward++;
    }
    if(isToward(6, oldTiles[y][munX])){
        towardTiles[countToward] = oldTiles[y][munX];
        countToward++;
    }
    if(isToward(7, oldTiles[munY][munX])){
        towardTiles[countToward] = oldTiles[munY][munX];
        countToward++;
    }
    return towardTiles;
}
function createAwayArray(y, x){
    awayTiles = [];
    countAway = 0;
    if ((y-1) < 0){
        munY= (gridSize + (y-1)) % gridSize;
        pluY = y + 1;
    }
    else if((y+1) >= gridSize){
        pluY= (y+1) % gridSize;  
        munY = y - 1;
    }
    else{
        pluY = y + 1;
        munY = y - 1;
    }
    if((x-1) < 0){
        munX = (gridSize + (x-1))% gridSize;
        pluX = x + 1;
    }
    else if((x+1) >= gridSize){
        pluX = (x+1) % gridSize;
        munX = x - 1;
    }
    else{
        pluX = x + 1;
        munX = x - 1;
    }
    if(isAway(0, oldTiles[munY][x])){
        awayTiles[countAway] = oldTiles[munY][x];
        countAway++;
    }
    if(isAway(1, oldTiles[munY][pluX])){
        awayTiles[countAway] = oldTiles[munY][pluX];
        countAway++;
    }
    if(isAway(2, oldTiles[y][pluX])){
        awayTiles[countAway] = oldTiles[y][pluX];
        countAway++;
    }
    if(isAway(3, oldTiles[pluY][pluX])){
        awayTiles[countAway] = oldTiles[pluY][pluX];
        countAway++;
    }
    if(isAway(4, oldTiles[pluY][x])){
        awayTiles[countAway] = oldTiles[pluY][x];
        countAway++;
    }
    if(isAway(5, oldTiles[pluY][munX])){
        awayTiles[countAway] = oldTiles[pluY][munX];
        countAway++;
    }
    if(isAway(6, oldTiles[y][munX])){
        awayTiles[countAway] = oldTiles[y][munX];
        countAway++;
    }
    if(isAway(7, oldTiles[munY][munX])){
        awayTiles[countAway] = oldTiles[munY][munX];
        countAway++;
    }
    return awayTiles;
}