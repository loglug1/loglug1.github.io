//used in switch statements as the default
function error(error) {
	throw new Error(error);
	debugger;
}

//create canvas wrapper
var canvas = new fabric.StaticCanvas('canvas');
canvas.setWidth("880");
canvas.setHeight("880");

//load all of the textures for the game
const textures = [
	document.getElementById('black'), //0
	document.getElementById('grass'), //1
	document.getElementById('bricks'),//2
	document.getElementById('door'),  //3
	document.getElementById('floor'), //4
	document.getElementById('tree'),  //5
	document.getElementById('mat'),   //6
	document.getElementById('sign'),  //7
];

const spriteTextures = [
	{north: document.getElementById('playerNorth'), //player, 0
	south: document.getElementById('playerSouth'),
	east: document.getElementById('playerEast'),
	west: document.getElementById('playerWest')},
	{north: document.getElementById('blueNorth'), //blue, 1
	south: document.getElementById('blueSouth'),
	east: document.getElementById('blueEast'),
	west: document.getElementById('blueWest')},
];

//map layouts
//map tile structure: [texture0, collision1, warp2, NPC/Sign3]
//TODO: rethink the third and fourth pieces of data
var map1 = [[[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[3,0,1,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,0,1],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,0,2],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[2,1,0,0],[2,1,0,0],[1,0,0,0],[5,1,0,0]],
			[[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0],[5,1,0,0]]];

var inside1 =  [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[6,0,0,0],[6,0,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[2,1,0,0],[0,1,0,0]],
				[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,2,0],[0,0,2,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];

//warp ids
var warps = [
	[6,16,'map1'],
	[8,16,'inside1'],
	[6,3,'map1']
];

//TODO: rewrite tile data: include functions stored as variables, maybe combine with warps, maybe pull how they are identified by the render engine
//NPC format: {Sign,NPC, Texture, Dialog}
//Sign format: {Sign/NPC, Text}
var tileData = [
	[1, "You should never see this text in-game."],
	[1, "Hello World!"],
	[2, 1, "That building is scary!"]
];

//player variable to hold anything about the player
//TODO: eventually become the save file
var player = {
	position: {x: 6, y: 15},
	currentMap: map1,
	facing: 'south'
};

//warps the player to the specified warp point
function warp(warpId) {
	var warpData = warps[warpId];
	player.position.x = warpData[0];
	player.position.y = warpData[1];
	player.currentMap = window[warpData[2]];
	gameTick();

}

//function calculates the map coordinates based on the player's position and the display coordinates provided
//when it is run, you have to specify the axis you are calculating for
function calcTiles(playerPos, tilePos, axis) {
  var result;
  switch(axis) {
    case "x":
      switch (tilePos) {
		  case 0:
			result = playerPos - 6;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 1:
			result = playerPos - 5;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 2:
			result = playerPos - 4;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 3:
			result = playerPos - 3;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 4:
			result = playerPos - 2;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 5:
			result = playerPos - 1;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 6:
			result = playerPos;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 7:
			result = playerPos + 1;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 8:
			result = playerPos + 2;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 9:
			result = playerPos + 3;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 10:
			result = playerPos + 4;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 11:
			result = playerPos + 5;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  case 12:
			result = playerPos + 6;
			if (result < 0 || result >= player.currentMap[0].length) {
				result = 0;
			}
		  break;
		  default:
			error();
		  break;
	  }
    break;
    case "y":
      switch (tilePos) {
		  case 0:
			result = playerPos - 6;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 1:
			result = playerPos - 5;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 2:
			result =  playerPos - 4;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 3:
			result =  playerPos - 3;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 4:
			result =  playerPos - 2;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 5:
			result =  playerPos - 1;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 6:
			result =  playerPos;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 7:
			result =  playerPos + 1;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 8:
			result =  playerPos + 2;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 9:
			result =  playerPos + 3;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 10:
			result =  playerPos + 4;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 11:
			result =  playerPos + 5;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  case 12:
			result =  playerPos + 6;
			if (result < 0 || result >= player.currentMap.length) {
				result = 0;
			}
		  break;
		  default:
			error();
		  break;
	  }
    break;
    default:
      error();
    break;
  }
  return result;
}

//variables that hold canvas objects for anything loaded
var tile = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
var staticSprites = [];
var playerSprite
var sprites = [];

//function that renders area around player
//MASTER GRAPHICS RENDERER
function renderMap() {
	var tileX;
	var tileY;
	var imageTop = -80;
	var imageLeft;
	staticSprites = [];
	sprites = [];
	//loop start for iterating through every tile
	for (tileY = 0; tileY < 13; tileY++) {
		imageLeft = -80;
		for (tileX = 0; tileX < 13; tileX++) {
			//calculates the positions on the map of the tiles
			var mapX = calcTiles(player.position.x, tileX, "x");
			var mapY = calcTiles(player.position.y, tileY, "y");
			//line that renders every tile
			tile[tileX][tileY] = new fabric.Image(textures[player.currentMap[mapY][mapX][0]], { left: imageLeft, top: imageTop });
			//tests if there is a sign or NPC
			if (player.currentMap[mapY][mapX][3]) {
				//checks if it is a sign
				if (tileData[player.currentMap[mapY][mapX][3]][0] == 1) {
					staticSprites.push(new fabric.Image(textures[7], {left: imageLeft, top: imageTop}));
				}
				//checks if it is an NPC
				if (tileData[player.currentMap[mapY][mapX][3]][0] == 2) {
					sprites.push([new fabric.Image(spriteTextures[tileData[player.currentMap[mapY][mapX][3]][1]]['south'], {left: imageLeft, top: imageTop}), 'south', {x: mapX, y: mapY}]);
				}
			}
			//console.log(tileX.toString() + ',' + tileY.toString() + tile[tileX][tileY]._element.id);
			imageLeft = imageLeft + 80;
		}
	imageTop = imageTop + 80;
	}
	//write tiles to map
	for (tileY = 0; tileY < 13; tileY++) {
		for (tileX = 0; tileX < 13; tileX++) {
			canvas.add(tile[tileX][tileY]);
		}
	}
	for (var i = 0; i < staticSprites.length; i++) {
		canvas.add(staticSprites[i]);
	}
	for (var i = 0; i < sprites.length; i++) {
		canvas.add(sprites[i][0])
	}
	//add player sprite
	canvas.add(playerSprite);
};

//helps to shorten length of each frame to improve performance on slow devices
var animationModifier = 12;
function calibrate() {
	var timeTable = [];
	for (var i = 0; i < 30; i++) {
		var t0 = performance.now();
		gameTick();
		var t1 = performance.now();
		timeTable.push(t1 - t0);
	}
	var total = 0;
	for(var i = 0; i < timeTable.length; i++) {
	    total += timeTable[i];
	}
	var avg = Math.floor(total / timeTable.length);
	if (avg > 12) {
		window.animationModifier = 12;
	} else {
		window.animationModifier = avg;
	}
	document.getElementById('performance').innerHTML = window.animationModifier;
}

//these variables are used to calculate the frame modifier every 8 frames
var f0 = 0;
var f1 = 0;
var lastTick;
//reads and writes to map data/loaded tiles/sprites
//TODO: make this calculate events in game/make softTick calculate background events
function gameTick() {
	canvas.clear();
	playerSprite = new fabric.Image(spriteTextures[0][player.facing], {left: 400, top: 400});
	renderMap();
	document.getElementById("position").innerHTML = "Position:" + player.position.x.toString() + "," + player.position.y.toString();
	lastTick = f1 - f0;
	document.getElementById('performance').innerHTML = "Last Game Tick Length: " + lastTick + ", Current Animation Modifier: " + window.animationModifier;
}
var animationModifier = 0;
//called to "animate" the background when walkting
//almost like a "half gameTick"
function gameStep(direction, isWarp = false, target = 0) {
	keyPause = true;
	f0 = performance.now();
	playerSprite = new fabric.Image(spriteTextures[0][player.facing], {left: 400, top: 400});
	var leftChange;
	var topChange;
	if (direction == 'up') {topChange = 10; leftChange = 0;}
	else if (direction == 'down') {topChange = -10; leftChange = 0;}
	else if (direction == 'left') {leftChange = 10; topChange = 0;}
	else if (direction == 'right') {leftChange = -10; topChange = 0;}
	var tileX;
	var tileY;
	var i = 0;
	animationModifier = Math.round((lastTick - 96) / 8);
	//var frameTimes = [];
	var frameInterval = setInterval(animate, (12 - animationModifier));
	function animate() {
		if (i == 8) {
			clearInterval(frameInterval);
			//document.getElementById('animationDebug').innerHTML = "Last 8 Frames in ms: " + frameTimes.toString();
			//animationModifier = Math.round((lastTick - 96) / 8);
			f1 = performance.now();
			if (!isWarp) {
				gameTick();
			} else {
				warp(target);
			}
			keyPause = false;
		} else {
			//var a0 = performance.now();
			for (tileY = 0; tileY < 13; tileY++) {
				for (tileX = 0; tileX < 13; tileX++) {
					tile[tileX][tileY].left += leftChange;
					tile[tileX][tileY].top += topChange;
				}
			}
			for (tileY = 0; tileY < 13; tileY++) {
				for (tileX = 0; tileX < 13; tileX++) {
					canvas.add(tile[tileX][tileY]);
				}
			}
			for (var c = 0; c < staticSprites.length; c++) {
				staticSprites[c].left += leftChange;
				staticSprites[c].top += topChange;
			}
			for (var c = 0; c < staticSprites.length; c++) {
				canvas.add(staticSprites[c]);
			}
			for (var c = 0; c < sprites.length; c++) {
				sprites[c][0].left += leftChange;
				sprites[c][0].top += topChange;
			}
			for (var c = 0; c < sprites.length; c++) {
				canvas.add(sprites[c][0]);
			}
			canvas.add(playerSprite);
			i++;
			//var a1 = performance.now();
			//frameTimes.push(Math.round(a1-a0));
		}
	}
}

//called to move the player in one of four directions
function move(direction) {
	if (direction == 'up') {
		newPos = player.position.y - 1;
		target = player.currentMap[newPos][player.position.x];
		if (target[1]) { //check if there is collision
			player.facing = "north";
			gameTick();
		} else if (target[2]) { //check if there is a warp
			gameStep(direction, true, target[2])
		} else { //when there is no warp or collision
			player.position.y = newPos;
			player.facing = 'north';
			gameStep(direction);
		}
	}
	else if (direction == 'down') {
		newPos = player.position.y + 1;
		target = player.currentMap[newPos][player.position.x];
		if (target[1]) { //check if there is collision
			player.facing = "south";
			gameTick();
		} else if (target[2]) { //check if there is a warp
			gameStep(direction, true, target[2]);
		} else { //when there is no warp or collision
			player.position.y = newPos;
			player.facing = 'south';
			gameStep(direction);
		}
	}
	else if (direction == 'left') {
		newPos = player.position.x - 1;
		target = player.currentMap[player.position.y][newPos];
		if (target[1]) { //check if there is collision
			player.facing = "west";
			gameTick();
		} else if (target[2]) { //check if there is a warp
			gameStep(direction, true, target[2]);
		} else { //when there is no warp or collision
			player.position.x = newPos;
			player.facing = 'west';
			gameStep(direction);
		}
	}
	else if (direction == 'right') {
		newPos = player.position.x + 1;
		target = player.currentMap[player.position.y][newPos];
		if (target[1]) { //check if there is collision
			player.facing = "east";
			gameTick();
		} else if (target[2]) { //check if there is a warp
			gameStep(direction, true, target[2]);
		} else { //when there is no warp or collision
			player.position.x = newPos;
			player.facing = 'east';
			gameStep(direction);
		}
	}
}

//function called when player presses action button (spacebar)
//when called it will complete whatever function the tileData calls for
//TODO: change so that it reads a function from the tile data, not a set list of tasks
//TODO: separate NPC and sign dialogs into separate functions
function trigger() {
	if (keyPause) {
		document.getElementById('dialog').style.display = "none";
		document.getElementById('dialog').innerHTML = "";
		keyPause = false;
	} else {
		keyPause = true;
		//find target map data
		if (player.facing == "north") {target = player.currentMap[player.position.y - 1][player.position.x][3]}
		else if (player.facing == "south") {target = player.currentMap[player.position.y + 1][player.position.x][3]}
		else if (player.facing == "east") {target = player.currentMap[player.position.y][player.position.x + 1][3]}
		else if (player.facing == "west") {target = player.currentMap[player.position.y][player.position.x - 1][3]}
		//if it is a sign:
		if (tileData[target][0] == 1) {
			document.getElementById('dialog').innerHTML = "Sign: " + tileData[target][1] + " ▾";
			document.getElementById('dialog').style.display = "block";
		}
		//if it is an NPC:
		if (tileData[target][0] == 2) {
			document.getElementById('dialog').innerHTML = "NPC: " + tileData[target][2] + " ▾";
			document.getElementById('dialog').style.display = "block";
		}
	}
}

// Keyboard input with customisable repeat (set to 0 for no key repeat)
//
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers= {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown= function(event) {
		//this first IF statement is added to ensure the action button (spacebar) can only be hit once
		if ((event || window.event).keyCode == 32 && !((event || window.event).repeat) ) {
			trigger();
		} else {
			var key= (event || window.event).keyCode;
			if (!(key in keys))
				return true;
			if (!(key in timers)) {
				timers[key]= null;
				keys[key]();
				if (repeat!==0)
					timers[key]= setInterval(keys[key], repeat);
			}
			return false;
		}
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};
var keyPause = false;

// Arrow key movement. Repeat instantly
//
KeyboardController({
	37: function() { if (!keyPause) { move('left'); }},
    38: function() { if (!keyPause) { move('up'); }},
    39: function() { if (!keyPause) { move('right'); }},
    40: function() { if (!keyPause) { move('down'); }}
}, 1);
gameTick();
