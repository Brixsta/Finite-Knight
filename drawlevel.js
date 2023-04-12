import * as index from "./index.js";
import * as traps from "./traps.js";
import * as consumables from "./consumables.js"
import * as enemies from "./enemies.js";
import * as tiles from "./tiles.js";

export function drawLevel(arr) {
    for (let row = 0; row < index.global.ROWS; row++) {
      for (let col = 0; col < index.global.COLS; col++) {
        let arrindex = index.global.ROWS * row + col;
        let tile = arr[arrindex];
  
        // drawing wall
        if (tile === 0) {
          const wall = new tiles.Wall(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.walls.push(wall);
        }
  
        // drawing floor
        if (tile === 1) {
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing door
        if (tile === "d") {
          const door = new tiles.Door(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.doors.push(door);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing key
        if (tile === "k") {
          const key = new consumables.Key(col * index.global.cellSize, row * index.global.cellSize);
          index.global.consumables.push(key);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing torch
        if (tile === "t") {
          const torch = new tiles.Torch(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.walls.push(torch);
        }
  
        // drawing goblin
        if (tile === "g") {
          const goblin = new enemies.Goblin(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.enemies.push(goblin);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing carpet
        if (tile === "c") {
          const carpet = new tiles.Carpet(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.environment.push(carpet);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing barrel
        if (tile === "b") {
          const barrel = new tiles.Barrel(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.walls.push(barrel);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // drawing bookshelf
        if (tile === "bs") {
          const bookshelf = new tiles.Bookshelf(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.walls.push(bookshelf);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // draw spike trap right
        if (tile === "sr") {
          const spikeTrap = new traps.SpikeTrap(
            col * index.global.cellSize,
            row * index.global.cellSize,
            "right"
          );
          index.global.traps.push(spikeTrap);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
  
        // draw spike trap left
        if (tile === "sl") {
          const spikeTrap = new traps.SpikeTrap(
            col * index.global.cellSize,
            row * index.global.cellSize,
            "left"
          );
          index.global.traps.push(spikeTrap);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }

        // draw health potion
        if (tile === "hp") {
          const healthPotion = new consumables.HealthPotion(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.consumables.push(healthPotion);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }

        // draw stairs
        if (tile === "st") {
          const stairs = new tiles.Stairs(
            col * index.global.cellSize,
            row * index.global.cellSize,
          );
          index.global.environment.push(stairs);
  
          const floor = new tiles.Floor(
            col * index.global.cellSize,
            row * index.global.cellSize
          );
          index.global.floors.push(floor);
        }
      }
    }
  }
  