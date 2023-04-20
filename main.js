let tileSize = 50;
let width    = 10;
let height   = 10;

let tiles = [];

let canvas;

function setup() {
  canvas = createCanvas(tileSize * width + 1, tileSize * height + 1);
  canvas.mouseClicked(mouseWasClicked);
}

function mouseWasClicked() {
  if(mouseX > 0 && mouseX < tileSize * width + 1 && mouseY > 0 && mouseY < tileSize * width + 1) {
     let x = Math.floor(mouseX / tileSize);
     let y = Math.floor(mouseY / tileSize);

     if(Tile.tileIsEmpty(x, y, tiles)) {
       tiles.push(new Tile(x, y, tileSize));
       tiles[tiles.length - 1].addNeighbors(tiles);
     } else {
       for(let targetTile of tiles) {
         if(targetTile.x == x && targetTile.y == y) {
           Tile.removeTile(targetTile, tiles);
           break;
         }
       }
     }
  }
}

function draw() {
  background(255);

  stroke(128);
  strokeWeight(1);
  for(let i = 0; i < width + 1; i++) {
    line(i * tileSize, 0, i * tileSize, height * tileSize);
  }
  for(let i = 0; i < height + 1; i++) {
    line(0, i * tileSize, tileSize * width, i * tileSize);
  }

  for(let tile of tiles) {
    tile.showFull();
  }

  if(mouseX > 0 && mouseX < tileSize * width + 1 && mouseY > 0 && mouseY < tileSize * width + 1) {
     let x = Math.floor(mouseX / tileSize);
     let y = Math.floor(mouseY / tileSize);

     if(Tile.tileIsEmpty(x, y, tiles)) {
       Tile.showEmpty(x, y, tileSize);
     } else {
       Tile.showDelete(x, y, tileSize);
     }
  }
}
