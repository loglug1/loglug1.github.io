var tool = 4;
var isPaint;

function paint(x, y){
    if(isTectonic){
        if (isInRange(y-1, x-1))    { tiles[y-1][x-1].setDirection(tool); }
        if (isInRange(y-1, x))      { tiles[y-1][x].setDirection(tool); }
        if (isInRange(y-1, x+1))    { tiles[y-1][x+1].setDirection(tool); }
        if (isInRange(y, x-1))      { tiles[y][x-1].setDirection(tool); }
        if (isInRange(y,x))         { tiles[y][x].setDirection(tool); }
        if (isInRange(y, x+1))      { tiles[y][x+1].setDirection(tool); }
        if (isInRange(y+1, x-1))    { tiles[y+1][x-1].setDirection(tool); }
        if (isInRange(y+1, x))      { tiles[y+1][x].setDirection(tool); }
        if (isInRange(y+1, x+1))    { tiles[y+1][x+1].setDirection(tool); }
    }
    else {
        if (isInRange(y-1, x-1))    { tiles[y-1][x-1].setHeight(tool); }
        if (isInRange(y-1, x))      { tiles[y-1][x].setHeight(tool); }
        if (isInRange(y-1, x+1))    { tiles[y-1][x+1].setHeight(tool); }
        if (isInRange(y, x-1))      { tiles[y][x-1].setHeight(tool); }
        if (isInRange(y,x))         { tiles[y][x].setHeight(tool); }
        if (isInRange(y, x+1))      { tiles[y][x+1].setHeight(tool); }
        if (isInRange(y+1, x-1))    { tiles[y+1][x-1].setHeight(tool); }
        if (isInRange(y+1, x))      { tiles[y+1][x].setHeight(tool); }
        if (isInRange(y+1, x+1))    { tiles[y+1][x+1].setHeight(tool); }
    }
    if(isTectonic){drawT();}
    else {draw();}
}

function isInRange(x, y) {
    return (x >= 0 && x < gridSize) && (y >= 0 && y < gridSize);
}

function changeTool(t){
    tool = t;
}