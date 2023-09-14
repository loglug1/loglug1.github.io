function resizeCanvas() {
    canvasSize = document.getElementById("myCanvas").clientWidth;
    ctx.canvas.width = canvasSize;
    ctx.canvas.height = canvasSize;
    tileSize = canvasSize / gridSize;
    if (isTectonic) {
        drawT();
    } else {
        draw();
    }
}