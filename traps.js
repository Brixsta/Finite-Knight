import * as index from "./index.js";

export class SpikeTrap {
  constructor(x, y, direction) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/spike-trap.png";
    this.image.src = this.src;
    this.sx = 0;
    this.sy = 0;
    this.count = 0;
    this.interval = 5;
    this.direction = direction;
    this.velocity = 1;
    this.retracting = false;
  }

  draw() {
    index.ctx.save();
    this.count++;

    // // rotate position of spikes
    if(this.direction === "right") {
      index.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      index.ctx.scale(-1, 1);
      index.ctx.translate(-this.x - this.width / 2 , -this.y - this.height / 2);
    }

    // increment image and protract spikes
    if (this.count >= this.interval && !this.retracting) {
      this.count = 0;
      this.sy += 32;
    } 

    // begin to retract spikes
    if(this.sy === 128) {
      this.retracting = true;
    }

    // decrement image and retract spikes
    if(this.count >= this.interval && this.retracting) {
      this.count = 0;
      this.sy -= 32;
    }

    // pause sequence temporarily
    if(this.retracting && this.sy <= -300) {
      this.retracting = false;
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
    index.ctx.restore();
  }

  detectPlayerCollision () {
    if(this.sy >= 96 && index.player.x + 20 > this.x && index.player.x + 20 < this.x + this.width && index.player.y + 20 > this.y && index.player.y + 10 < this.y + this.height) {
      index.player.dead = true;
      index.player.health = 0;
      const blood = document.querySelector(".health-blood");
    blood.style.height = "0%";
    }
  }

  update() {
    this.draw();
    this.detectPlayerCollision();
  }

}
