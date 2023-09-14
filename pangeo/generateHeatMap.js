function generateHeatMap() {
    heatMap = new Array(gridSize);
    for (i = 0; i < gridSize; i++) {
        heatMap[i] = new Array(gridSize);
        for(j = 0; j < gridSize; j++) {
            heatMap[i][j] = 0;
        }
    }

    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            heatMap[y][x] = createTowardsArray(y, x).length;
        }
    }
    return heatMap;
}


//DEBUG FUNCTIONS
function getHeat(num) {
    switch(num) {
        case -4:
            return "#00004F";
        case -3:
            return "#000088";
        case -2:
            return "#0000AA";
        case -1:
            return "#0000FF"
        case 0:
            return "#FFFF00"
        case 1:
            return "#004F00";
        case 2:
            return "#008800";
        case 3:
            return "#00AA00";
        case 4:
            return "#00FF00";
    }
}

function drawHeatMap(heatMap) {
    rectSize = canvasSize / gridSize;

    rect = {
        x: 0,
        y: 0,
        width: rectSize,
        color: "#000000"
    }

    for (y = 0; y < gridSize; y++) {
        for (x = 0; x < gridSize; x++) {
            if ((x == 0) || (heatMap[y][x] != heatMap[y][x - 1])) {
                ctx.fillStyle = rect.color;
                ctx.fillRect(rect.x, rect.y, rect.width, rectSize);
                rect.x = x * rectSize;
                rect.y = y * rectSize;
                rect.width = rectSize;
                rect.color = getHeat(heatMap[y][x]);
            } else {
                rect.width += rectSize;
            }
        }
    }
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rectSize);
}