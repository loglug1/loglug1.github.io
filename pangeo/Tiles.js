class Tile{
    constructor(h, dir, vol, w, la,xcor,ycor){
this.height = h;
this.direction = dir;
this.isVolcano = vol;
this.weight = w;
this.isLava = la;
this.x = xcor;
this.y = ycor;
}
setHeight(newHeight){
    this.height = newHeight;
}
setDirection(newDirection){
    this.direction = newDirection;
}
setIsVolcano(newBool){
    this.isVolcano = newBool;
}
setWeight(newWeight){
    this.weight = newWeight;
}
setIsLava(newLava){
    this.isLava = newLava;
}
setX(newX){
    this.x = newX;
}
setY(newY){
    this.y = newY;
}
getHeight(){
    return this.height;
}
getDirection(){
    return this.direction;
}
getIsVolcano(){
    return this.isVolcano;
}
getWeight(){
    return this.weight;
}
getIsLava(){
    return this.isLava;
}
getX(){
    return this.x;
}
getY(){
    return this.Y;
}
};