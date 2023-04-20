const TileSide = {
  None:  0,
	Up:    1,
	Down:  2,
	Left:  4,
	Right: 8
}

class Tile {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.mode = TileSide.None;
  }


  static showEmpty(x, y, tileSize) {
    fill(0, 255, 0, 50);
    noStroke();
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
  }
  static showDelete(x, y, tileSize) {
    fill(255, 0, 0, 100);
    noStroke();
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
  }
  static removeTile(targetTile, tiles)  {
    let neighbours = [null, null, null, null];
    let targetID = 0;
    for(let i = 0; i < tiles.length; i++) {
      if(tiles[i] != targetTile) {
        if(tiles[i].x == targetTile.x     && tiles[i].y == targetTile.y - 1) neighbours[0] = tiles[i];
        if(tiles[i].x == targetTile.x     && tiles[i].y == targetTile.y + 1) neighbours[1] = tiles[i];
        if(tiles[i].x == targetTile.x - 1 && tiles[i].y == targetTile.y    ) neighbours[2] = tiles[i];
        if(tiles[i].x == targetTile.x + 1 && tiles[i].y == targetTile.y    ) neighbours[3] = tiles[i];
      } else {
        targetID = i;
      }
    }

    if(neighbours[0] != null) neighbours[0].mode &= TileSide.Up |                 TileSide.Left | TileSide.Right;
    if(neighbours[1] != null) neighbours[1].mode &=               TileSide.Down | TileSide.Left | TileSide.Right;
    if(neighbours[2] != null) neighbours[2].mode &= TileSide.Up | TileSide.Down | TileSide.Left;
    if(neighbours[3] != null) neighbours[3].mode &= TileSide.Up | TileSide.Down |                 TileSide.Right;

    tiles.splice(targetID, 1);
  }

  static tileIsEmpty(x, y, tiles) {
    for(let tile of tiles) {
      if(tile.x == x && tile.y == y) return false;
    }
    return true;
  }

  addNeighbors(tiles) {
    for(let tile of tiles) {
      if(tile != this) {
        if(tile.x == this.x && tile.y == this.y - 1) {
          this.mode |= TileSide.Up;
          tile.mode |= TileSide.Down;
        }
        if(tile.x == this.x && tile.y == this.y + 1) {
          this.mode |= TileSide.Down;
          tile.mode |= TileSide.Up;
        }
        if(tile.x == this.x - 1 && tile.y == this.y) {
          this.mode |= TileSide.Left;
          tile.mode |= TileSide.Right;
        }
        if(tile.x == this.x + 1 && tile.y == this.y) {
          this.mode |= TileSide.Right;
          tile.mode |= TileSide.Left;
        }
      }
    }
  }

  showFull() {
    fill(50);
    noStroke();
    rect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
    strokeWeight(this.tileSize / 10);
    stroke(200);

    let cX = this.x * this.tileSize + this.tileSize / 2;
    let cY = this.y * this.tileSize + this.tileSize / 2;

    if(this.mode & TileSide.Up) {
      line(cX, cY, cX, cY - this.tileSize / 2);
    }
    if(this.mode & TileSide.Down) {
      line(cX, cY, cX, cY + this.tileSize / 2);
    }
    if(this.mode & TileSide.Left) {
      line(cX, cY, cX - this.tileSize / 2, cY);
    }
    if(this.mode & TileSide.Right) {
      line(cX, cY, cX + this.tileSize / 2, cY);
    }
  }
}
