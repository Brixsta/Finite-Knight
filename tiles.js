import * as index from "./index.js";

export class Wall {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/wall.png";
    this.image.src = this.src;
    this.playerCollision = false;
  }

  draw() {
    index.ctx.drawImage(this.image, this.x, this.y);
  }

  update() {
    this.draw();
  }
}

export class Floor {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/floor-1.png";
    this.image.src = this.src;
  }

  draw() {
    index.ctx.drawImage(this.image, this.x, this.y);
  }

  update() {
    this.draw();
  }
}

export class Door {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/door.png";
    this.image.src = this.src;
    this.opened = false;
    this.readyToOpen = true;
    this.doorSound = new Audio("./audio/door-open.mp3");
  }

  draw() {
    if (!this.opened) index.ctx.drawImage(this.image, this.x, this.y);
  }

  detectPlayerCollision() {
    if (
      index.player.x + 20 >= this.x &&
      index.player.x <= this.x + this.width &&
      index.player.y + 20 >= this.y &&
      index.player.y <= this.y + this.height &&
      this.readyToOpen
    ) {
      this.opened = true;
      this.readyToOpen = false;

      this.doorSound.volume = 0.1;
      this.doorSound.play();
      this.removeKey();
    }
  }

  removeKey() {
    const keys = document.querySelectorAll(".console-key");
    index.player.keys--;

    keys.forEach((key) => (key.style.opacity = 0.4));

    if (index.player.keys === 1) {
      keys[0].style.opacity = 1;
    }
    if (index.player.keys === 2) {
      keys[0].style.opacity = 1;
      keys[1].style.opacity = 1;
    }
  }

  update() {
    this.draw();
    this.detectPlayerCollision();
  }
}

export class Torch {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/torch.png";
    this.image.src = this.src;
    this.count = 0;
    this.interval = 10;
    const values = [0, 32, 64, 96, 128, 160, 192];
    const randomIndex = Math.floor(Math.random() * values.length);
    this.sx = values[randomIndex];
    this.sy = 0;
  }

  draw() {
    this.count++;

    // cycle through 1st row of images
    if (this.count >= this.interval) {
      this.count = 0;
      this.sx += 32;
    }

    // reset
    if (this.sx >= 224) {
      this.sx = 0;
      this.count = 0;
    }

    index.ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      index.global.cellSize,
      index.global.cellSize,
      this.x,
      this.y,
      index.global.cellSize,
      index.global.cellSize
    );
  }

  update() {
    this.draw();
  }
}

export class Carpet {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/carpet.png";
    this.image.src = this.src;
  }

  draw() {
    if (index.global.level === 1) {
      index.ctx.strokeStyle = "rgba(0,0,0,.8)";
      index.ctx.strokeRect(this.x, this.y, 96, 96);
      index.ctx.drawImage(this.image, this.x, this.y);
    }
  }

  update() {
    this.draw();
  }
}

export class Barrel {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/barrel.png";
    this.image.src = this.src;
  }

  draw() {
    if (index.global.level === 1) {
      index.ctx.drawImage(this.image, this.x, this.y);
    }
  }

  update() {
    this.draw();
  }
}

export class Bookshelf {
  constructor() {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize * 2;
    this.x = null;
    this.y = null;
    this.image = new Image();
    this.src = "./images/bookshelf.png";
    this.image.src = this.src;
  }

  draw() {
    if (index.global.level === 1) {
      this.x = 96;
      this.y = 224;
      // index.ctx.drawImage(this.image, this.x, this.y);
      // drawImage(image, dx, dy, dWidth, dHeight)
      index.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.draw();
  }
}

export class Stairs {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/stairs.png";
    this.image.src = this.src;
    this.victory = false;
  }

  draw() {
    index.ctx.drawImage(this.image, this.x, this.y);
  }

  detectPlayerCollision() {
    if (
      index.player.x + 20 >= this.x &&
      index.player.x <= this.x + this.width &&
      index.player.y + 20 >= this.y &&
      index.player.y + 20 <= this.y + this.height &&
      !this.victory
    ) {
      index.player.moving = false;
      this.victory = true;
      index.global.inPlay = false;
      index.createModal("You Win");
      index.player.sx = 0;
      index.player.attackSound.pause();

      setTimeout(() => {
        index.setKeysToFalse();
      }, 50);
    }
  }

  update() {
    this.draw();
    this.detectPlayerCollision();
  }
}
