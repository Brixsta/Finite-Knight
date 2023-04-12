import * as index from "./index.js";

export class Goblin {
  constructor(x, y) {
    this.height = index.global.cellSize;
    this.width = index.global.cellSize;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.src = "./images/goblin.png";
    this.image.src = this.src;
    this.sx = 0;
    this.sy = 0;
    this.floorImage = new Image();
    this.floorImage.src = "./images/floor-1.png";
    this.direction = "left";
    this.health = 30;
    this.oldHealth = 40;
    this.moveSpeed = 0.5;
    this.takingDamage = false;
    this.dead = false;
    this.deadImage = false;
    this.count = 0;
    this.interval = 20;
    this.damage = 5;
  }

  draw() {
    if (!this.dead) {
      if (index.global.inPlay) this.count++;
      const y = Math.abs(index.player.y - this.y) <= 32;
      const x = Math.abs(index.player.x - this.x) <= 32;
      const attackRange = y && x;

      // goblin turns depending on player's position
      index.ctx.save();
      this.changeDirection();

      if (this.direction === "right") {
        index.ctx.translate(
          this.x + index.global.cellSize / 2,
          this.y + index.global.cellSize / 2
        );
        index.ctx.scale(-1, 1);
        index.ctx.translate(
          -this.x - index.global.cellSize / 2,
          -this.y - index.global.cellSize / 2
        );
      }

      if (attackRange) {
        this.sy = 32;

        // cycle through goblin attack animation
        if (this.count >= this.interval) {
          this.count = 0;
          this.sx += 32;
        }

        // goblin stabs player
        if (this.sx >= 96) {
          this.sx = 0;
          this.decrementPlayerHealth();
        }
      } else {
        this.sy = 0;
      }

      index.ctx.drawImage(
        this.image,
        this.sx,
        this.sy,
        32,
        32,
        this.x,
        this.y,
        32,
        32
      );
      index.ctx.restore();
    } else if (this.dead && !this.deadImage) {
      const body = new Body(this.x, this.y);
      index.global.environment.push(body);
      this.x = -100;
      this.y = -100;
      this.deadImage = true;
    } else {
      this.image.src = this.src;
      index.ctx.drawImage(this.image, this.x, this.y);
    }
  }

  detectPlayerAttack() {
    const y = Math.abs(index.player.y - this.y) <= 36;
    const x = Math.abs(index.player.x - this.x) <= 36;
    const inRange = x && y;

    if (
      inRange &&
      index.player.sy === 96 &&
      index.player.sx === 160 &&
      !this.takingDamage &&
      (index.player.attacking || index.keys.Space)
    ) {
      this.takeDamage();
    }
  }

  flickerRed() {
    if (!this.dead) {
      this.image.src = "./images/goblin-damage.png";
      setTimeout(() => {
        this.image.src = "./images/goblin.png";
      }, 50);
      setTimeout(() => {
        this.image.src = "./images/goblin-damage.png";
      }, 100);
      setTimeout(() => {
        this.image.src = "./images/goblin.png";
        this.takingDamage = false;
      }, 150);
    }
  }

  takeDamage() {
    if (!this.dead) {
      this.takingDamage = true;
      if (this.health - index.player.damage <= 0) {
        this.deathSound();
      } else {
        this.damageSound();
      }
      this.health -= index.player.damage;
      this.flickerRed();
    }
  }

  decrementPlayerHealth() {
    index.player.health -= this.damage;
    index.player.takingDamage = true;
  }

  damageSound() {
    if (!this.dead) {
      const audio = new Audio("");
      const sounds = [
        "./audio/goblin-damage-1.wav",
        "./audio/goblin-damage-2.wav",
        "./audio/goblin-damage-3.wav",
      ];
      const randomNum = Math.floor(Math.random() * sounds.length);
      audio.src = sounds[randomNum];
      audio.volume = 0.01;
      audio.play();
    }
  }

  deathSound() {
    const audio = new Audio("./audio/goblin-death.mp3");
    audio.volume = 0.1;
    audio.play();
  }

  changeDirection() {
    if (!this.dead) {
      const y = Math.abs(index.player.y - this.y) <= 64;
      const x = Math.abs(index.player.x - this.x) <= 64;
      const inRange = x && y;
      if (index.player.x > this.x && inRange) this.direction = "right";
      if (index.player.x < this.x && inRange) this.direction = "left";
    }
  }

  moveTowardsPlayer() {
    if (!this.dead) {
      const y = Math.abs(index.player.y - this.y) <= 60;
      const x = Math.abs(index.player.x - this.x) <= 60;
      const inRange = x && y;

      if (inRange) {
        if (this.x + 32 > index.player.x) this.x -= this.moveSpeed;
        if (this.x - 32 < index.player.x) this.x += this.moveSpeed;
        if (this.y + 32 < index.player.y) this.y += this.moveSpeed;
        if (this.y - 32 > index.player.y) this.y -= this.moveSpeed;
      } else {
        this.count = 0;
        this.sx = 0;
      }
    }
  }

  detectDeath() {
    if (this.health <= 0 && !this.dead) {
      this.dead = true;
    }
  }

  update() {
    this.detectPlayerAttack();
    this.draw();
    this.changeDirection();
    this.moveTowardsPlayer();
    this.detectDeath();
  }
}

class Body {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = index.global.cellSize;
    this.height = index.global.cellSize;
    this.image = new Image();
    this.src = `./images/bones-${Math.floor(Math.random() * 5) + 1}.png`;
    this.image.src = this.src;
  }

  draw() {
    index.ctx.drawImage(this.image, this.x, this.y);
  }

  update() {
    this.draw();
  }
}
