import * as index from "./index.js";

export function detectCollision(x, y) {
    // detect collision with walls
    for (let i = 0; i < index.global.walls.length; i++) {
      let current = index.global.walls[i];
      if (
        index.player.x + x + 23 > current.x &&
        index.player.x + x + 7 < current.x + current.width &&
        index.player.y + y + 30 > current.y &&
        index.player.y + y + 3 < current.y + current.height
      ) {
        return true;
      }
    }
    // detect collision with doors
    for (let i = 0; i < index.global.doors.length; i++) {
      let current = index.global.doors[i];
      if (
        index.player.x + x + 23 > current.x &&
        index.player.x + x + 7 < current.x + current.width &&
        index.player.y + y + 30 > current.y &&
        index.player.y + y + 3 < current.y + current.height
      ) {
        if (!current.opened && index.player.keys < 1) {
          return true;
        }
      }
    }

    // detect collision with enemies
    for (let i = 0; i < index.global.enemies.length; i++) {
      let current = index.global.enemies[i];
      if (
        index.player.x + x + 15 > current.x &&
        index.player.x + x + 17 < current.x + current.width &&
        index.player.y + y + 20 > current.y &&
        index.player.y + y + 7 < current.y + current.height
      ) {
        return true;
      }
    }
  }

  export function detectMovement() {
    const moving = Object.values(index.keys)
      .slice(0, Object.values(index.keys).length - 2)
      .some((key) => key === true);
    if (moving) {
      index.player.moving = true;
    } else {
      index.player.moving = false;
    }
  }
  