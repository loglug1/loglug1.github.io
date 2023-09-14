var c = "myCanvas"
function inCanvas(){
    var cap = document.getElementById(c).getContext("2d");
    
    //records mouse whenever over canvas
    cap.canvas.addEventListener("mousemove", function(event){
        var mouseX = event.clientX - cap.canvas.offsetLeft;
        var mouseY = event.clientY - cap.canvas.offsetTop;
        if (isPaint){
            paint(Math.floor(mouseX/tileSize), Math.floor(mouseY/tileSize));
        }
    }, false);

    //records when the mouse first pressed
    cap.canvas.addEventListener("mousedown", function(event){
        var mouseX = event.clientX - cap.canvas.offsetLeft;
        var mouseY = event.clientY - cap.canvas.offsetTop;
        recordPress(mouseX, mouseY);
    });

    //records at the end of mouse click
    cap.canvas.addEventListener("click", function(event){
        var mouseX = event.clientX - cap.canvas.offsetLeft;
        var mouseY = event.clientY - cap.canvas.offsetTop;
        recordPickup();
    }, false);

}
window.addEventListener("load", function(event){
    inCanvas();
});

function recordPress(x,y){
    isPaint = true;
    paint(Math.floor(x/tileSize), Math.floor(y/tileSize));
}

function recordPickup(){
    isPaint = false;
}